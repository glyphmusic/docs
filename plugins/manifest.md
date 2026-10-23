---
description: Every field of glyph-plugin.json, every rule Glyph checks, and the messages you get when one is broken.
---

# Manifest reference

`glyph-plugin.json` describes a plugin. For a theme, and for an extension
without code, it *is* the plugin: Glyph needs nothing else. Extensions with
code add one `.wasm` file. This page lists every field and every rule. The same rules
run in Glyph, on glyph.my/plugins, in the index CI and in `validate.mjs`, so a
file that passes one passes all.

## A complete example

```json
{
  "$schema": "https://raw.githubusercontent.com/glyphmusic/plugins/main/schema/glyph-plugin.schema.json",
  "schema": 1,
  "id": "midnight-coral",
  "name": "Midnight Coral",
  "version": "1.2.0",
  "author": "your-name",
  "description": "Coral accent on a deep blue glow.",
  "license": "MIT",
  "min_app": "0.7.0",
  "kind": "theme",
  "theme": {
    "accent": "#ff7a6b",
    "glow": ["#06103a", "#2a4fd6", "#ff9b8a"],
    "base": "#020308"
  }
}
```

The smallest valid theme:

```json
{ "id": "coral", "name": "Coral", "version": "1.0.0", "kind": "theme", "theme": { "accent": "#ff7a6b" } }
```

An extension with code (fields explained under [Extension fields](#extension-fields)):

```json
{
  "schema": 2,
  "id": "lastfm-scrobbler",
  "name": "Last.fm Scrobbler",
  "version": "1.0.0",
  "author": "your-name",
  "kind": "extension",
  "main": "plugin.wasm",
  "permissions": ["playback", "network"],
  "network": ["ws.audioscrobbler.com"],
  "settings": [
    { "id": "account", "title": "Last.fm", "items": [
      { "id": "user", "type": "text", "label": "User name" },
      { "id": "connect", "type": "button", "label": "Account", "caption": "Connect" }
    ] }
  ],
  "menus": [ { "id": "love", "label": "Love on Last.fm" } ],
  "strings": { "en": { "lastfm-scrobbler.done": "Scrobbled {title}" } }
}
```

## File

| Rule | |
| --- | --- |
| Name | exactly `glyph-plugin.json` |
| Place | the root of the repository. Listed plugins may live in a folder; the index entry names it in `path`. |
| Format | one JSON object, UTF-8 |
| Size | at most 256 KiB |
| Unknown fields | ignored. That keeps old Glyph versions working with manifests written for newer ones. |

## Fields

### `$schema`

Optional, ignored by Glyph. Points editors to the JSON Schema, so VS Code and
others complete field names and underline mistakes while you type:

```
https://raw.githubusercontent.com/glyphmusic/plugins/main/schema/glyph-plugin.schema.json
```

### `schema`

Optional, default `1`. The version of the manifest format: `1` for themes,
`2` for extensions (a theme may say `2` too). Glyph shows a manifest with a
higher number as **Needs a newer Glyph** instead of failing; Glyph versions
before extensions do the same with `2`. `0` is invalid.

### `id`

Required. Your plugin's permanent name.

- 2 to 40 characters
- lowercase `a-z`, digits `0-9` and `-`
- no dash at the start or end, no two dashes in a row
- not `change-me` (the template's placeholder)
- unique across all plugins

| Valid | Invalid | Why |
| --- | --- | --- |
| `midnight-coral` | `Midnight-Coral` | upper case |
| `lo-fi-2` | `lo_fi` | underscore |
| `ab` | `a` | too short |
| `neon-90s` | `-neon` | dash at the start |
| | `neon--90s` | two dashes |

The id is used as the folder name on disk (`<data>/plugins/<id>/`), in the
theme setting (`plugin:<id>`), in links (`glyph.my/plugins/<id>`,
`glyph://plugin/<id>`) and for updates. **Don't change it after publishing**:
Glyph would treat the new id as a different plugin, and people who have the
old one would never get updates.

Ids are unique per catalog. If two plugins use the same id, a listed one wins
over a community one, and among community plugins the one with more stars
wins. The other doesn't show up. Pick a specific id.

### `name`

Required. What people see: 1 to 40 characters, any language, emoji allowed.
You can change it in an update.

### `version`

Required. A [semantic version](https://semver.org): `MAJOR.MINOR.PATCH`, such
as `1.0.0`, `1.4.2` or `2.0.0-beta.1`. No leading `v`, no leading zeros
(`1.02.0` is invalid).

Glyph compares versions to find updates: an installed plugin updates when the
same repository publishes a **higher** version. `1.10.0` is higher than
`1.9.0`, and `2.0.0-beta.1` is lower than `2.0.0`.

A suggestion for themes: raise PATCH for small colour tweaks, MINOR for
noticeable changes, MAJOR when the theme looks different altogether.

### `author`

Optional, up to 40 characters. Shown next to the version, and named in the
warning before the first install ("This plugin was made by …"). Without it the
warning says "someone else".

### `description`

Optional, up to 200 characters. One or two sentences about the look. It shows
in the list, on the detail view and on the website, and Glyph's search reads
it, so words like "warm", "pastel" or "high contrast" help people find your
theme.

### `license`

Optional, up to 40 characters, for example `MIT`, `CC0-1.0` or `CC-BY-4.0`.
Shown in the details. Add a matching `LICENSE` file to the repository.

### `min_app`

Optional. The oldest Glyph version your plugin works with, as a semantic
version (`0.7.0`). Older Glyph versions show the plugin as **Needs a newer
Glyph**. Themes rarely need this; extensions that use a function added in a
later Glyph should set it.

### `kind`

Required. What the plugin is:

- `"theme"`: colours only (`theme`), nothing else allowed.
- `"extension"`: anything below (needs `"schema": 2`). An extension may bring a
  `theme` too.

Glyph shows unknown kinds as **Needs a newer Glyph**, so new kinds can appear
without breaking older apps.

### `theme`

Required when `kind` is `"theme"`, optional for extensions. All colours are
`#rrggbb` (six hex digits, `#` optional, upper or lower case).

| Field | Required | Meaning |
| --- | --- | --- |
| `accent` | yes | the one highlight colour: logo, playing song, liked heart, active seek and volume bars, start-up animation, the Liked Songs tile |
| `glow` | no | three colours **dark → middle → bright** for the background glow while nothing plays. Without it, each view uses its own colours. |
| `base` | no | window background, default `#030303`. **Each channel at most `#24`**, so `#242424` is the brightest allowed grey. |

Why `base` has a limit: Glyph draws its panels as translucent black and its
text in light ink. A bright base would make text unreadable, so Glyph refuses
it instead of shipping a broken theme. What each colour does on screen, with
advice, is in [Designing a theme](themes.md).

## Extension fields

All optional, but an extension needs at least one of `main`, `strings`,
`hide` or `theme`. `settings`, `menus` and `permissions` need `main`.

### `main`

Path of the plugin's WebAssembly module in the repository, relative to the
manifest (`plugin.wasm`, `dist/plugin.wasm`). It must end in `.wasm`, start
with `\0asm` and be at most 16 MiB. Commit the built file: Glyph downloads it
from the same commit as the manifest and stores it as `code.wasm`. With
`main`, the plugin installs only from **Listed**. See [Extensions](extensions.md).

### `permissions`

What the code may use, from `playback`, `library`, `search`, `settings`,
`network`, `audio`, `lyrics_provider`. Each one is listed in the install warning. A permission Glyph does
not know yet makes the plugin **Needs a newer Glyph**. The functions behind
each permission are in the [API reference](api.md#permissions).

### `network`

Hosts the code may contact with `net.fetch`, up to 20: lowercase names like
`api.example.com`, or `*.example.com` for a domain and all its subdomains. No
schemes, ports or paths. Goes together with the `network` permission: one
without the other is invalid.

### `strings`

Texts by two-letter language code: `{"en": {"key": "text"}, "de": {…}}`, up
to 2000 per language and 500 characters each. Keys starting with your id
(`<id>.`) are your own; any other key replaces Glyph's text. `plugins.*`,
`account.*` and `mcp.*` can't be replaced. See [Settings, menus and
texts](settings-ui.md#glyphs-texts).

### `hide`

Up to 200 label keys of Glyph settings rows to hide (`sp.radio`). Not
`plugins.*`, `account.*` or `mcp.*`.

### `settings`

Up to 20 sections, each `{ "id", "page", "after", "title", "items" }` with
1-40 rows. Pages, row types and their fields: [Settings, menus and
texts](settings-ui.md#settings).

### `menus`

Up to 10 song menu entries, each `{ "id", "label", "menu": "song" }`.

## Rules

The complete list, with the message `validate.mjs` and the index CI print:

| Rule | Message |
| --- | --- |
| the file is one JSON object | `the file must contain one JSON object` |
| `schema` is 1 or 2 (or missing) | `schema must be 1 (themes) or 2 (extensions)` |
| `id` format | `id must be 2-40 characters of a-z, 0-9 and single dashes (not at the start or end)` |
| `id` is not the template's | `give the plugin its own id ("change-me" is the template's)` |
| `name` 1–40 characters | `name must be 1-40 characters` |
| `author`, `license`, `description` are text | `author must be text` (and so on) |
| `author`, `license` ≤ 40 characters | `author may have at most 40 characters` |
| `description` ≤ 200 characters | `description may have at most 200 characters` |
| `version` is semantic | `version must be a semantic version like 1.0.0` |
| `min_app` is semantic | `min_app must be a semantic version like 0.7.0` |
| `kind` is known | `kind must be one of: theme, extension (got …)` |
| theme object present | `a theme plugin needs a "theme" object` |
| a theme has nothing else | `a theme has colours only; use "kind": "extension" for more` |
| extensions use schema 2 | `extensions need "schema": 2` |
| an extension does something | `an extension needs code ("main"), "strings", "hide" or a "theme"` |
| `main` is a .wasm path | `main must be the path of a .wasm file in the repo` |
| settings, menus, permissions come with code | `settings, menus and permissions need code ("main")` |
| permissions are known | `permissions are a list of: playback, library, search, settings, network, audio, lyrics_provider` |
| hosts are host names | `network takes up to 20 host names like api.example.com or *.example.com` |
| `network` permission ⇔ hosts | `the network permission and the "network" hosts go together` |
| text keys | `strings: "…" is not a valid text key` |
| protected texts | `strings: "plugins.…" can't be replaced (…)` |
| protected rows | `hide: "…" can't be hidden` |
| section ids | `settings: section id "…" must be unique, 1-40 of a-z, 0-9, _ and -` |
| section pages | `settings.…: page must be one of own, playback, …` |
| rows per section | `settings.…: needs 1-40 items` |
| row ids unique | `settings: item id "…" is used twice (ids are unique across all sections)` |
| row types | `settings.….…: type must be one of toggle, slider, select, text, button, note, link, progress` |
| slider bounds | `settings.….…: needs min < max and a positive step` |
| select options | `settings.….…: needs 1-50 options, each with a value and a label` |
| defaults fit | `settings.….…: default must be …` |
| link urls | `settings.….…: needs an https url` |
| menu entries | `menus: id "…" must be unique, …` / `menus.…: needs a label of 1-40 characters` |
| the code exists (index CI, `validate.mjs` on local files) | `main: … does not exist (build the plugin first)` / `the code is not a WebAssembly module` |
| `accent` is a colour | `theme.accent must be a colour like #ff8a3d` |
| `glow` is three colours | `theme.glow must be three colours like [...] (dark, middle, bright)` |
| `base` is a colour | `theme.base must be a colour like #050302` |
| `base` near black | `theme.base must stay near black: each channel at most #24 (got …)` |

In Glyph, a manifest that fails shows as **Invalid** (or is left out of the
community list). A future `schema`, unknown `kind`, permission, settings page
or row type, or a too-high `min_app` shows as **Needs a newer Glyph** instead.

## Several plugins in one repository

Only a manifest at the **root** shows up under Community. To publish several
themes from one repository, put each in its own folder and list them in the
index:

```
my-themes/
├── coral/glyph-plugin.json
├── mint/glyph-plugin.json
└── dusk/glyph-plugin.json
```

```json
{ "repo": "you/my-themes", "path": "coral", "rev": "<commit>" }
```

Plugins in folders show no stars, because the repository's stars belong to all
of them. Most makers are better off with one repository per theme.

## JSON Schema

[`schema/glyph-plugin.schema.json`](https://github.com/glyphmusic/plugins/blob/main/schema/glyph-plugin.schema.json)
describes the same format for editors. It catches most mistakes while you
type, but not all (for example the near-black rule for `base`, protected text
keys or unique row ids), so run `validate.mjs` before publishing (see [Test
your plugin](testing.md)).
