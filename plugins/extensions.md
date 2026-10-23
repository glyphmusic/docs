---
description: Extensions change more than colours. Rename texts, hide and add settings, add song menu entries, and run code that controls playback, the library, search, settings and talks to the web.
---

# Extensions

A theme changes colours. An **extension** can change almost everything else:

| An extension can | With | Needs code |
| --- | --- | --- |
| rename any text in Glyph, in any language | `strings` | no |
| hide settings rows | `hide` | no |
| bring colours, like a theme | `theme` | no |
| add its own page under **Settings › Plugins** | `settings` (page `own`) | yes |
| add sections to Glyph's settings pages, after a row of your choice | `settings` (page `playback`, `appearance`, …) | yes |
| add entries to the song menu | `menus` | yes |
| control playback and the queue, see what plays | permission `playback` | yes |
| read and change playlists and likes, read lyrics and listening stats | permission `library` | yes |
| search music | permission `search` | yes |
| read and change Glyph's settings (language, theme, sources, audio, equalizer, …) | permission `settings` | yes |
| talk to web services | permission `network` + `network` hosts | yes |
| read the spectrum and change the local equalizer | permission `audio` | yes |
| supply lyrics for the current song | permission `lyrics_provider` | yes |
| ask for the user's own service keys | secret text rows; [setup guide](services.md) | yes |
| show toasts, open an artist or a search, keep its own data, set timers | always | yes |

Code is a **WebAssembly module**. You write it in Rust, Zig, C, AssemblyScript,
TinyGo or anything else that compiles to `wasm32` without WASI. One `.wasm`
runs on Windows, macOS, Linux and Android.

## A first extension without code

Rename two texts and hide a row. No build step, installable from **Community**:

```json
{
  "schema": 2,
  "id": "plain-words",
  "name": "Plain Words",
  "version": "1.0.0",
  "author": "you",
  "kind": "extension",
  "strings": {
    "en": { "sp.crossfade": "Blend songs", "ctx.radio": "Play similar" },
    "de": { "sp.crossfade": "Songs überblenden", "ctx.radio": "Ähnliches spielen" }
  },
  "hide": ["sp.appearance.throttle"]
}
```

Keys are the names of Glyph's texts; [Settings, menus and texts](settings-ui.md)
explains how to find them. Texts of the plugin warnings, the account and the
assistant access (`plugins.*`, `account.*`, `mcp.*`) can't be replaced or
hidden.

## A first extension with code

The [example extension](https://github.com/glyphmusic/plugins/tree/main/examples/now-playing)
is a complete plugin in Rust: a toast on every new song, a settings page, a
section on Glyph's own settings, a song menu entry, storage and texts in two
languages. Copy it and change it.

### 1. The manifest

```json
{
  "schema": 2,
  "id": "now-playing-toast",
  "name": "Now Playing Toast",
  "version": "1.0.0",
  "kind": "extension",
  "main": "plugin.wasm",
  "permissions": ["playback", "search"],
  "settings": [
    { "id": "main", "items": [
      { "id": "enabled", "type": "toggle", "label": "Show the new song", "default": true }
    ] }
  ],
  "menus": [ { "id": "more", "label": "More by this artist" } ]
}
```

`main` is the path of the module in your repository, next to the manifest.
Commit the built `.wasm`: Glyph downloads exactly that file.

### 2. The code

Copy [`glyph.rs`](https://github.com/glyphmusic/plugins/blob/main/examples/now-playing/src/glyph.rs)
into your crate. It wraps the three functions Glyph offers. Then:

```rust
mod glyph;
use serde_json::json;

#[no_mangle]
pub extern "C" fn glyph_event(len: i32) {
    let ev = glyph::event(len);
    match ev["type"].as_str().unwrap_or("") {
        "track" if !ev["song"].is_null() => {
            let on = glyph::request("ui.get", json!({ "id": "enabled" })).ok();
            if on.and_then(|v| v.as_bool()).unwrap_or(true) {
                glyph::toast(ev["song"]["title"].as_str().unwrap_or("?"));
            }
        }
        "menu" if ev["id"] == "more" => {
            let artist = ev["song"]["artist"].as_str().unwrap_or("");
            let _ = glyph::request("ui.open_artist", json!({ "name": artist }));
        }
        _ => {}
    }
}
```

### 3. Build

```sh
rustup target add wasm32-unknown-unknown
cargo build --release --target wasm32-unknown-unknown
cp target/wasm32-unknown-unknown/release/<crate>.wasm plugin.wasm
```

Use `crate-type = ["cdylib"]`, and in `[profile.release]` `opt-level = "s"`,
`lto = true`, `strip = true`, `panic = "abort"` for a small module.

### 4. Try it

Put `glyph-plugin.json` and `plugin.wasm` into `<Glyph data>/plugins/<id>/`
and press **Settings › Plugins › Plugins folder › Reload**. The plugin runs
as *local*: no listing, no GitHub. Its detail view shows its log; Reload
restarts the code after each build. See [Test your plugin](testing.md).

### 5. Publish

Push the repository, add the topic `glyph-plugin`, then open a pull request on
[glyphmusic/plugins](https://github.com/glyphmusic/plugins). Plugins with code
install only once they are **Listed**. See [Publish and update](publishing.md).

## How your code runs

```
Glyph                                    your plugin (its own thread)
  │  start: compile the .wasm, call glyph_start()
  │  ready event ───────────────────────▶ glyph_event(len) → read(event)
  │                                         call("ui.get") ─┐
  │  ◀───────────────────────────────────── {"fn": …}       │ waits
  │  answer {"ok": …} ─────────────────────▶ read(answer) ◀─┘
  │  track / playback / setting / action / menu / timer events
  │  ...
  │  switched off, removed, updated, Reload: stopped
```

- **One thread per plugin.** Your code never blocks Glyph. A call waits for
  Glyph's answer (up to 20 seconds; a search takes up to 10).
- **Events, not loops.** Glyph calls `glyph_event` when something happens. Do
  your work and return. For anything periodic, set a timer (`timer.set`).
- **A budget.** Each `glyph_start` and each event has a fixed amount of work
  (about a billion WebAssembly instructions). A plugin that runs out is
  stopped for that event; three failures in a row stop the plugin, and Glyph
  says so. Waiting for an answer from Glyph or the network costs nothing.
- **64 MiB of memory**, 1 MiB of storage, 32 timers.
- **State lives in memory** while Glyph runs. What must survive a restart goes
  into `storage.set`.

## Building it smart

- **Read settings when you need them** (`ui.get`), or keep a copy and update
  it on `setting` events. The `ready` event carries all values at start.
- **Show state on your settings page** instead of toasts: `ui.update` sets a
  row's `status` line, label, options, or hides and disables rows.
- **Ask for the fewest permissions.** Users see each one before installing.
  An update that adds a permission or a host waits until the user agrees, so
  it does not reach users who keep automatic updates on.
- **Name your own texts `<id>.something`** and fetch them in Glyph's
  language with `app.text`. Settings rows and menu entries take their labels
  straight from the manifest: write them as `{"en": …, "de": …}`.
- **Don't rely on Glyph's text keys never changing.** Keys rarely change, but
  a renamed key only means your replacement stops applying, never an error.
- **Fail softly.** Every call can answer `{"error": "…"}`: the user may have
  turned something off, the network may be down. Log it (`glyph::warn`) and
  carry on.
- **Keep the module small.** It is downloaded once per version; under 1 MiB
  is easy in Rust with the release profile above.

## Other languages

Glyph needs only this from a module:

| Imports (module `glyph`) | Exports |
| --- | --- |
| `call(ptr: i32, len: i32) -> i32` | `memory` |
| `read(ptr: i32) -> i32` | `glyph_start()` (optional) |
| `log(level: i32, ptr: i32, len: i32) -> i32` | `glyph_event(len: i32)` (optional) |

No other imports are offered: no WASI, so no files, clock or random numbers
from the system. Ask Glyph for the time with `app.now`. [API reference](api.md) describes the exact protocol, which
any language can follow in a few lines.
