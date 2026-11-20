---
description: Build, test and change the apps (desktop, Android, web), the server and r-dlp.
---

# Development

The backend, audio engine and server are Rust, and the shared interface is
Svelte 5 + TypeScript; everything is dual-licensed MIT or Apache-2.0 (r-dlp:
MIT). See [Architecture](architecture.md) for how the repositories and crates
fit together, and read [Pull requests](pull-requests.md) before opening a PR.

## Desktop app

```bash
git clone https://github.com/glyphmusic/apps.git
cd apps
npm --prefix glyph-ui ci
npm --prefix glyph-ui run build
cargo build --release -p glyph-tauri
```

Requires Rust 1.85 or newer and Node.js 22 or newer. Linux also needs these
development packages (Debian/Ubuntu names):

```bash
sudo apt-get install libwebkit2gtk-4.1-dev libsoup-3.0-dev librsvg2-dev libayatana-appindicator3-dev libgtk-3-dev libasound2-dev libdbus-1-dev libssl-dev pkg-config
```

| Path | Contents |
| --- | --- |
| `crates/glyph-tauri` | Tauri 2 desktop shell (binary `glyph`) |
| `crates/glyph-app` | shared controller, commands, plugins, Jam, Connect, MCP |
| `crates/glyph-android` + `mobile/android` | Android shell and native media service |
| `glyph-ui` | Svelte 5 frontend shared across desktop, Android and `/web` |
| `crates/glyph-core` | sources, search, library, settings, E2E sync |
| `crates/glyph-audio` | playback, crossfade, equalizer, loudness, spatial |
| `crates/glyph-protocol` | types shared with the server |
| `assets/` | fonts, icons, [translations](translations.md) |

Quick feedback without linking: `cargo check -p glyph-tauri` and
`npm --prefix glyph-ui run check`. The `fast` profile gives release speed
without LTO for local tests: `cargo build --profile fast -p glyph-tauri`.

On Windows, `./scripts/run-dev.ps1` builds and opens the dev app,
`./scripts/dev-watch.ps1` rebuilds after every edit.

### Web player

To work on the UI in a browser with sample data, run `npm --prefix glyph-ui run dev`.
To build the production web player bundle served at `/web`:

```bash
npm --prefix glyph-ui run build:web
```

To copy the built web bundle into the server repository (`glyph-web/`), run
`node scripts/snapshot-web.mjs --build` inside `glyphmusic/server`.

### Android

The Android APK is built from `mobile/android` with the Rust library from
`crates/glyph-android` (`./scripts/build-android.ps1` on Windows or the
`.github/workflows/android.yml` workflow steps on Linux/macOS).

### Rules

* Every desktop feature must work on Linux, macOS and Windows; no platform-only
  crate without a fallback.
* Official APIs only, keys only from settings, environment or secrets.
* The server never sees audio the app plays from local r-dlp or yt-dlp.

## Server

```bash
git clone https://github.com/glyphmusic/server.git
cd server
cargo test --workspace
cargo check -p glyph-server-worker --target wasm32-unknown-unknown
```

| Crate | Target |
| --- | --- |
| `glyph-server-core` | shared logic |
| `glyph-server-native` | binary for Linux, macOS, Windows, Docker |
| `glyph-server-worker` | Cloudflare Worker (wasm32) |

Worker tests against a local workerd:

```bash
cd crates/glyph-server-worker
worker-build --dev --no-opt
npm ci
npm test
```

## r-dlp

```bash
git clone https://github.com/glyphmusic/r-dlp.git
cd r-dlp
cargo build --release --locked
```

## Docs

These pages live in [glyphmusic/docs](https://github.com/glyphmusic/docs). The
Glyph server renders them at [docs.glyph.my](https://docs.glyph.my) straight from
the `main` branch: a push is live within about a minute, no deploy needed.

* Edit the Markdown and open a pull request. *Edit this page on GitHub* at the
  bottom of every page opens the right file.
* `SUMMARY.md` is the navigation: `## Group` headings and `* [Title](file.md)`
  items, indented by two spaces for sub-pages.
* A page's first `# Heading` is its title; `description:` in the front matter is
  the line under it.
* Link other pages by their file (`../self-hosting/cli.md#remote-management`).
* Notes: `{% hint style="info" %} … {% endhint %}` (`info`, `success`,
  `warning`, `danger`). Tabs: `{% tabs %}{% tab title="…" %} … {% endtab %}{% endtabs %}`.
  Collapsible answers: `<details><summary>…</summary> … </details>`. Other HTML
  is shown as text.
* Give every page a `description:`. It is the lead line, the search snippet
  and the summary in `llms.txt`.

Preview your changes locally with the real page template: see
[`preview/`](https://github.com/glyphmusic/docs/tree/main/preview).

### For search and LLMs

| Address | Contents |
| --- | --- |
| `docs.glyph.my/search.json` | the index the search box (`Ctrl+K` or `/`) uses |
| `docs.glyph.my/llms.txt` | every page with its description, as [llms.txt](https://llmstxt.org) |
| `docs.glyph.my/llms-full.txt` | all pages as Markdown in one file |
| `docs.glyph.my/<page>.md` | one page as clean Markdown, e.g. `/self-hosting/cli.md` |
