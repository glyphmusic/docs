---
description: How extensions add settings pages, sections and song menu entries, hide settings rows and rename Glyph's texts.
---

# Settings, menus and texts

Extensions change Glyph's interface through the manifest. Glyph draws
everything with its own controls, so a plugin's rows look exactly like
Glyph's. Anything a plugin adds names the plugin.

## Settings

`settings` is a list of **sections**. Each section has rows (`items`) and a
place (`page`):

```json
"settings": [
  {
    "id": "account",
    "title": { "en": "Last.fm account", "de": "Last.fm-Konto" },
    "items": [
      { "id": "user", "type": "text", "label": "User name", "placeholder": "your-name" },
      { "id": "connect", "type": "button", "label": "Connection", "caption": "Connect" }
    ]
  },
  {
    "id": "quick",
    "page": "playback",
    "after": "sp.crossfade",
    "items": [
      { "id": "scrobble", "type": "toggle", "label": "Scrobble to Last.fm", "default": true }
    ]
  }
]
```

Settings and menus need code: nothing else would answer them.

### Where a section goes

| `page` | Shows up |
| --- | --- |
| `own` (default) | on your plugin's own page: a tab under **Settings › Plugins** named like your plugin |
| `playback` | Settings › Playback › General |
| `playback.content` | Settings › Playback › Content |
| `playback.sources` | Settings › Playback › Sources |
| `audio` | Settings › Audio |
| `appearance` | Settings › Appearance |
| `integrations` | Settings › Integrations |
| `storage` | Settings › Cache & storage |
| `system` | Settings › System (desktop only) |
| `about` | Settings › About › Version |

On Glyph's pages a section sits at the end of the page, or right under the
row whose label key you give in `after`. Its heading reads
`<title> · <plugin name>` with a puzzle icon, so users know where it comes
from. If the row is not on the page (another tab, or a newer Glyph renamed
it), the section moves to the end.

Common `after` keys:

| Page | Row label keys |
| --- | --- |
| `playback` | `sp.audio.quality`, `sp.audio.dl_quality`, `sp.crossfade`, `sp.output`, `sp.level`, `sp.normalize`, `sp.devices`, `sp.audio.channels` |
| `playback.content` | `sp.shuffle`, `sp.stats`, `sp.explicit`, `sp.radio`, `sp.hidden` |
| `playback.sources` | `sp.extractor`, `sp.search.mode`, `settings.sources.fallback`, `settings.priority` |
| `audio` | `sp.eq.enable`, `sp.eq.preset`, `sp.eq.share` |
| `appearance` | `settings.language`, `settings.visuals.intensity`, `settings.visuals.music_reactivity`, `settings.visuals.ascii_covers`, `sp.appearance.theme`, `sp.appearance.ascii_fx`, `sp.appearance.mini`, `sp.appearance.throttle`, `sp.appearance.startup` |
| `integrations` | `sp.discord`, `sp.discord.id`, `sp.mcp` |
| `storage` | `sp.storage.limit`, `sp.storage.saver`, `sp.storage.usage` |
| `system` | `sp.system.autostart`, `sp.system.start_mode` |
| `about` | `update.auto`, `update.channel` |

### Rows

Every row has an `id` (1-40 of `a-z`, `0-9`, `_`, `-`, unique across all your
sections), a `type`, a `label` (60 characters) and an optional `desc`
(300 characters, shown behind the (i)). Texts are plain strings or the same
text per language: `{"en": "Scrobble", "de": "Scrobbeln"}`; Glyph picks the
user's language, then English.

| `type` | Control | Extra fields | Value |
| --- | --- | --- | --- |
| `toggle` | switch | `default` (bool) | `true` / `false` |
| `slider` | bar with the value beside it | `min` (0), `max` (100), `step`, `unit` (8 characters, e.g. `%`), `default` | number |
| `select` | dropdown | `options` (1-50 × `{ "value", "label" }`), `default` (a value) | the option's value |
| `text` | text field | `placeholder`, `secret` (secure credential), `required`, `default` (non-secret only) | text (500 characters) |
| `button` | button | `caption` (the text on the button; default: the label) | – (sends an `action` event) |
| `link` | button that opens a web page | `url` (https), `caption` | – |
| `note` | text only, no control | `label` (optional), `desc` (the text) | – |

Glyph stores non-secret values per plugin (`<data>/plugins/<id>/values.json`) and
sends a `setting` event on every change. Your code reads them with `ui.get`
or `ui.values` and can set them with `ui.set`.

### Changing rows at run time

`ui.update` changes a row until the plugin restarts:

```json
{ "fn": "ui.update", "args": { "id": "connect", "status": "Connected as milo", "label": "Disconnect" } }
{ "fn": "ui.update", "args": { "id": "user", "disabled": true } }
{ "fn": "ui.update", "args": { "id": "device", "options": [ { "value": "a1", "label": "Living room" } ] } }
{ "fn": "ui.update", "args": { "id": "advanced", "hidden": true } }
```

`status` is a second line under the label, good for live state ("Connected",
"Last sync 2 min ago", a counter).

## Song menu

```json
"menus": [
  { "id": "love", "label": { "en": "Love on Last.fm", "de": "Auf Last.fm lieben" } }
]
```

Up to 10 entries appear in the song menu (right click on a song, or the
song's sheet on phones), after Glyph's own entries and before *Go to artist*,
each with a puzzle icon. A click sends `{"type": "menu", "id": "love", "song": …}`.
Entries show only while the plugin's code runs.

## Hiding Glyph's rows

```json
"hide": ["sp.appearance.throttle", "sp.devices"]
```

Hides those settings rows everywhere they appear. Works without code, so
community plugins can do it too. The rows of the plugin settings, the account
and assistant access (`plugins.*`, `account.*`, `mcp.*`) can't be hidden.
Switching the plugin off brings the rows back.

## Glyph's texts

```json
"strings": {
  "en": { "sp.crossfade": "Blend songs", "my-plugin.connected": "Connected as {user}" },
  "de": { "sp.crossfade": "Songs überblenden", "my-plugin.connected": "Verbunden als {user}" }
}
```

- A key starting with your plugin's id (`my-plugin.…`) is **your own text**.
  Your code gets it in the user's language with `app.text`.
- Any other key **replaces Glyph's text** with that key. Your English text
  also fills in where Glyph has no translation.
- Language codes are two letters: `en`, `de`, `ru`, `es`, `fr`, `pt`, `it`,
  `pl`, `tr`, `uk`, `af`.
- `plugins.*`, `account.*` and `mcp.*` can't be replaced, so a plugin can't
  reword the install warning or the account and assistant screens.
- Placeholders like `{n}` in Glyph's texts are filled in by Glyph; keep them
  in your replacement.

### Finding keys

All of Glyph's texts are in
[`assets/i18n/en.toml`](https://github.com/glyphmusic/apps/blob/main/assets/i18n/en.toml).
Search it for the text you see in the app; the key is on the left:

```toml
"sp.crossfade" = "Crossfade"
"ctx.radio" = "Start radio"
```

Settings row keys work for `hide` and `after` too: they are the keys of the
rows' labels.

## When several plugins touch the same thing

- Two plugins replacing the same text: the one whose name comes later in
  alphabetical order wins.
- Hidden rows add up.
- Sections after the same row appear in the order Glyph lists the plugins
  (by name).
- Switching a plugin off removes its texts, hidden rows, sections, menu
  entries and stops its code, without removing it.

## Credentials and live progress

A `text` item with `secret: true` is a credential managed by Glyph. It must
be on the plugin's `own` page, declare a `credential` with exact `host`,
`path`, `location` (`query` or `headers`) and field `name`, cannot have a
default and cannot be patched
or set by plugin code. Set `required: true` to keep the code stopped until
the value is saved. The masked field saves on Enter, clears after a successful
save and shows whether a value is already stored. An empty submission deletes
it. See [Services and keys](services.md).

A `progress` row is a read-only bar. Declare its `id`, `type: "progress"`
and `label`, then call `ui.update` with `id` and `value` from 0 to 1. Its
optional `status` carries a readable value. It has no stored setting value.
