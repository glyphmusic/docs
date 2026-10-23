---
description: Everything Glyph does with a plugin, from the GitHub topic to the colours on screen. Discovery, catalog, checks, install, applying a theme, updates and deep links.
---

# How plugins work

This page follows a plugin through Glyph: how Glyph finds it, decides whether
it may be installed, stores it, applies it and keeps it up to date. Plugin
makers don't need all of it, but knowing it explains why things behave the
way they do. Contributors will find the code paths at the end.

## The pieces

| Piece | What it is | Where it lives |
| --- | --- | --- |
| **Manifest** | `glyph-plugin.json`, the whole plugin for themes | your repository (root, or a folder for listed plugins) |
| **Topic** | the GitHub topic `glyph-plugin` on your repository | GitHub |
| **Index** | `index.json`: listed plugins, each pinned to a commit | [glyphmusic/plugins](https://github.com/glyphmusic/plugins) |
| **Catalog** | what Glyph built from the index and the topic, cached | `<data>/plugins/catalog.json` on your device |
| **Installed plugin** | the manifest plus where it came from | `<data>/plugins/<id>/` on your device |
| **Theme registry** | installed themes, known to the UI as `plugin:<id>` | in memory while Glyph runs |

`<data>` is Glyph's data folder (see [Where plugins are stored](#where-plugins-are-stored)).

## 1. Discovery: two sources, straight from GitHub

Glyph builds its catalog itself. It does not ask the Glyph server, so plugins
work with your own server, with the public one, and in direct mode. Two
requests run at the same time.

### Listed plugins: the index

```
GET https://raw.githubusercontent.com/glyphmusic/plugins/main/index.json
```

`index.json` is built by CI in glyphmusic/plugins (see [The index
pipeline](#the-index-pipeline)). Each entry carries the repository, an
optional folder, the pinned commit, the manifest itself and, filled in daily,
the repository's stars and last push:

```json
{
  "schema": 1,
  "plugins": [
    {
      "repo": "someone/glyph-midnight-coral",
      "path": "",
      "rev": "4f1c2b0e9d…",
      "stars": 42,
      "updated": "2026-10-20T18:03:11Z",
      "manifest": { "id": "midnight-coral", "name": "Midnight Coral", "…": "…" }
    }
  ]
}
```

Because the manifest is embedded, listing a theme costs Glyph no extra
request. raw.githubusercontent.com has no API rate limit.

### Community plugins: the topic

```
GET https://api.github.com/search/repositories?q=topic:glyph-plugin+fork:true&sort=updated&order=desc&per_page=100
```

This is GitHub's repository search. It returns up to 100 repositories with the
topic, most recently pushed first, including forks. Archived repositories are
dropped. Repositories that are already listed are dropped too, so a plugin
never appears twice.

For the newest 60 of the rest, Glyph fetches the manifest from the root of the
default branch, eight at a time:

```
GET https://raw.githubusercontent.com/<owner>/<repo>/HEAD/glyph-plugin.json
```

A repository without that file, with a file larger than 256 KiB, or with a
manifest that breaks the rules is left out silently. That is why
[Troubleshooting](troubleshooting.md) starts with "is the file at the root and
valid?".

### Rate limits and caching

Without a GitHub login, the search API allows 10 requests per minute per IP
address. Glyph stays far below that:

- The catalog is cached in `<data>/plugins/catalog.json` for **one hour**.
- The search request sends the `ETag` of the last answer. If nothing changed,
  GitHub answers `304 Not Modified`, which doesn't count against the limit, and
  Glyph keeps the community list it already has.
- If one source fails (offline, rate limited), Glyph keeps that part from the
  cache, marks the catalog as partial ("GitHub was not fully reachable") and
  tries again next time instead of waiting an hour.

The catalog is loaded:

| When | Cached copy used if younger than an hour? |
| --- | --- |
| you open **Settings › Plugins** | yes |
| Glyph starts and you have plugins installed (for updates) | yes |
| a `glyph://plugin/<id>` link opens Glyph | yes, then once more without cache if the id is missing |
| you click **Refresh** | no |

### Merging and duplicate ids

Plugin ids are unique in the catalog:

1. Listed entries come first. If the index has an id twice, the first wins.
2. A community plugin whose id is already listed is dropped.
3. Among community plugins with the same id, the repository with more stars
   wins.

Stars and "last updated" of a listed plugin come from the index, but if the
topic search returned the same repository, its fresher numbers win. A plugin
in a folder of a shared repository (`path` not empty) shows no stars: the
repository's stars are not its own.

## 2. Checks: what may be installed

Every manifest goes through the same checks, in the app, on the website and
in the index CI. The [manifest reference](manifest.md#rules) lists them all.
The result is one of three:

| Result | Shown as | Why |
| --- | --- | --- |
| valid | **Install** | everything fine |
| needs a newer Glyph | **Needs a newer Glyph** | `schema` higher than this Glyph knows, a `kind`, permission, settings page or row type it doesn't know yet, or `min_app` above the running version |
| broken | **Invalid** | a rule is broken (bad id, colour, version, too long, …) |

One more rule depends on the source: **community plugins may only be
plugins without code** (themes, and extensions with only `strings`, `hide`
and `theme`). Plugins with `main` install only from **Listed**, where each
version is pinned to a commit and was merged by a maintainer.

## 3. Installing

Clicking **Install** (in the list, the detail view, or after a `glyph://`
link) does this:

1. **First install of this plugin?** Glyph shows the warning that the plugin
   is made by someone else and installed at your own risk, with **Install
   anyway** and **Cancel**. For a plugin with code it also lists everything
   the plugin may do ("Run its own code", "Control playback", "Contact
   api.example.com", …). Ticking **Don't show this again** stores
   `plugins.skip_install_warning = true` in the settings file; it applies to
   plugins without code only. Updates of a plugin you already have don't ask
   again, unless they want new permissions or hosts: then the warning lists
   just those.
2. **Checks again.** The listing must still be valid (see above).
3. **Same id from another repository?** If `<data>/plugins/<id>/origin.json`
   names a different repository, the install is refused ("another plugin
   already uses the id"). A plugin can only be replaced by a newer version of
   itself.
4. **Downloads the code** of a plugin with `main`, from the same commit as
   the manifest (`raw.githubusercontent.com/<repo>/<rev>/<path>/<main>`), at
   most 16 MiB, and checks that it is a WebAssembly module.
5. **Writes the files**, each atomically (temp file, then rename):

```
<data>/plugins/midnight-coral/
├── glyph-plugin.json   the manifest, exactly as listed
├── origin.json         where it came from
├── code.wasm           the code (extensions with main)
├── values.json         the plugin's settings values (once changed)
└── storage.json        the plugin's own data (once it stores something)
```

```json
{
  "repo": "someone/glyph-midnight-coral",
  "path": "",
  "rev": "HEAD",
  "checked": false,
  "installed_at": 1792684800
}
```

`rev` is the pinned commit for listed plugins and `HEAD` for community ones.
`checked: true` means it came from the index.

6. **Reloads the plugin list**: texts, hidden rows and settings pages apply,
   code starts (see [8. How code runs](#8-how-code-runs)), and a theme
   installed for the first time **becomes the active theme**. A toast says
   "Midnight Coral installed".

A theme or an extension without code is complete in its manifest.

### Where plugins are stored

| System | `<data>` |
| --- | --- |
| Windows | `%APPDATA%\glyph` |
| macOS | `~/Library/Application Support/glyph` |
| Linux | `$XDG_DATA_HOME/glyph`, usually `~/.local/share/glyph` |
| Android | the app's private data folder |
| any | the folder in `GLYPH_DATA_DIR`, if set |

**Settings › Plugins › Plugins folder › Open folder** opens `<data>/plugins`.

### Local plugins

When Glyph reads the plugins folder, a folder that has a `glyph-plugin.json`
but no `origin.json` counts as a **local** plugin. That's for plugin makers:
drop your manifest in, click **Reload**, and Glyph uses it without GitHub.
The folder name must equal the manifest's `id`; otherwise the folder is
ignored. A local plugin's code is read from its `main` path inside the folder
(not `code.wasm`), runs without a listing, restarts on each Reload, and its
log shows on its detail view. See [Test your plugin](testing.md).

## 4. How Glyph applies a theme

### At start-up

Before Glyph applies your settings, it reads `<data>/plugins/`. Each folder
must hold a valid manifest whose `id` equals the folder name; anything else
is skipped. Every installed theme is registered as `plugin:<id>` with its
parsed colours. Only then is the theme from your settings applied, so a
plugin theme is there from the first frame.

### The theme setting

The theme you pick is stored in the settings file as
`visuals.theme`: `"ember"`, `"ocean"`, … for built-in themes, or
`"plugin:midnight-coral"` for a plugin. **Settings › Appearance › Colour theme** shows
the built-in swatches followed by one per installed theme plugin. **Use** on
the Plugins page does the same as clicking the swatch.

If the setting names a plugin that isn't installed (removed, or synced from a
device that has it), Glyph uses the default theme and keeps the setting.
Install the plugin and the theme comes back.

### Each frame

Glyph's UI reads its colours from a small set of theme tokens. Before every
frame, Glyph looks up the current theme's colours (built-in or plugin) and
sets them:

| Theme field | Token | Where you see it |
| --- | --- | --- |
| `accent` | the accent colour (Glyph pink by default) | the `glyph` logo, the playing song's number and title, the playing-bars icon, the liked heart, seek and volume bars while hovered or dragged, the start-up animation, the tint of the Liked Songs and Downloads tiles |
| `glow` | the background glow palette while **nothing plays** | the soft light and the ASCII characters behind everything |
| `base` | the window background | the near-black behind the glow |

Panels, text and borders are not themed: they are translucent black and white
on top of the background, so they stay readable on any theme. That's also why
`base` must stay almost black (see [Designing a theme](themes.md)).

### The glow and the music

While a song plays, the background takes its colours from the song's cover.
Your `glow` colours show while nothing plays, and Glyph fades between them
(and between themes) instead of jumping. Without `glow`, each view uses its
own colours.

### Switching, updating, removing

- **Switching** a theme fades the glow over to the new colours. Accent and
  background change on the next frame.
- **Updating** an installed theme that is in use re-applies it, so new colours
  show at once.
- **Removing** the theme in use switches back to the default theme, then
  deletes `<data>/plugins/<id>/`.

## 5. Updates

A plugin has an update when the catalog has a listing with:

1. the **same id**,
2. from the **same repository** as `origin.json` says, and
3. a **higher `version`** (semantic versions: `1.10.0` is higher than `1.9.0`).

With **Update automatically** on (the default), Glyph installs eligible updates as
soon as it loads the catalog: when Glyph starts and when you open the Plugins
page, at most once an hour. With it off, **Update to 1.1.0** appears next to
the plugin, and **Update all** when several are waiting. The setting is
`plugins.auto_update`.

An update that introduces code, requests another permission or adds network
hosts waits for confirmation instead. Review it on the plugin's detail page.
The skip-warning preference does not bypass this confirmation.

**What this means for makers:**

- Raise `version` with every change you want people to get.
- **Community** plugins are read from `HEAD`. If you push new colours without
  raising `version`, people who install later get the new colours, but people
  who already have your theme keep the old ones.
- **Listed** plugins are pinned to a commit. Pushing does nothing until a pull
  request moves `rev` to the new commit.

## Extensions: texts, rows and pages

When Glyph loads the plugin list (start-up, install, removal, switching a
plugin on or off, Reload) it collects from every **switched-on** plugin:

- **Texts.** All `strings` go into one table per language that Glyph's text
  lookup asks first: a plugin text in your language, then Glyph's, then a
  plugin text in English, then Glyph's English text.
- **Hidden rows.** The `hide` keys. When a settings page draws a row, Glyph
  compares the row's label with the hidden labels and skips matches.
- **Settings pages.** Each running plugin with an `own` section becomes a tab
  under Settings › Plugins, after Installed and Browse.
- **Sections on Glyph's pages.** Before a page draws, Glyph builds the
  plugins' sections for it; each goes under the row its `after` names, or to
  the end of the page.

Switching a plugin off (its switch on the Installed list, or **Turn off** on
its detail view) stores its id in `plugins.disabled` and undoes all of that,
without removing it.

## 6. Deep links: "Install in Glyph"

Glyph registers the `glyph://` link scheme on Windows, macOS, Linux and
Android. Two plugin links open it:

| Link | Opens |
| --- | --- |
| `glyph://plugin/<id>` | **Settings › Plugins** on that plugin |
| `https://glyph.my/plugins/<id>` (handed to Glyph) | the same |

The **Install in Glyph** button on glyph.my uses the first one. Glyph then:

1. opens Settings on **Plugins › Browse**,
2. shows the detail view of `<id>`,
3. loads the catalog (from cache if fresh), and if the id isn't in it, asks
   GitHub once more without cache,
4. waits for you: the plugin is shown ready to install, and the first install
   still shows the risk warning.

If Glyph is already running, the link goes to the running app. Invalid ids
(anything outside `a-z`, `0-9`, `-`) are ignored.

## 7. The website

[glyph.my/plugins](https://glyph.my/plugins) is a static page. Your browser
runs the same discovery (index plus topic search), the same checks and the
same search and order rules as the app, and caches the result for ten minutes
in the browser tab. The server only sends the page. Each plugin has
`/plugins/<id>` with its details; the page background glows in the theme's
colours.

## The index pipeline

[glyphmusic/plugins](https://github.com/glyphmusic/plugins) holds one small
file per listed plugin:

`plugins/midnight-coral.json`:

```json
{
  "repo": "someone/glyph-midnight-coral",
  "path": "",
  "rev": "4f1c2b0e9d8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e"
}
```

`scripts/build-index.mjs` turns these into `index.json`:

1. checks each entry (repo `owner/name`, folder path, a full 40-character
   commit, no unknown fields, file named `<id>.json`),
2. fetches the manifest at exactly that commit,
3. checks it with `scripts/manifest.mjs`, the same rules as the app,
4. adds stars and the last push from the GitHub API,
5. writes `index.json`, sorted by id.

GitHub Actions runs it with `--check` on every pull request, and for real on
every push to `main` and once a day (so stars stay fresh), committing
`index.json` when it changed. Entries with `"repo": "glyphmusic/plugins"` and
`"rev": "self"` live in that repository itself (the first-party themes) and are
pinned to the current commit.

## 8. How code runs

Each plugin with code runs on its own thread, in **wasmi**, a WebAssembly
interpreter built into Glyph (no compiler at run time, so it works on phones
too). Glyph starts code when the plugin is installed, switched on, updated,
reloaded (local plugins) and at start-up; it runs only when the plugin is
switched on and came from **Listed** or the plugins folder.

1. Glyph compiles the module, links the three `glyph` functions, and calls
   `glyph_start` with a budget of work ("fuel").
2. It sends a `ready` event with the plugin's settings values.
3. Every frame Glyph answers the calls that arrived and checks what changed:
   a new song sends `track`, play or pause sends `playback` (to plugins with
   the `playback` permission only). Settings changes, button presses, song
   menu picks and timers send their events right away.
4. A call (`{"fn": "player.next"}`) is checked against the manifest's
   permissions on the plugin's thread. Storage, timers, `app.now` and
   `net.fetch` are handled right there; everything else goes to Glyph's UI
   thread, which answers it. Player, queue, library, search, lyrics and stats
   use the same code as Glyph's [AI assistant tools](../using-glyph/ai-assistants.md),
   so plugins see Glyph the way assistants do.
5. Each event gets a fresh budget. A plugin that uses it up, or traps, misses
   that event; three failures in a row stop it, and Glyph shows "stopped" with
   the reason.

`net.fetch` goes from your device straight to the host: https only, the
manifest's hosts only, no redirects, no cookies.

## What Glyph sends where

- To **GitHub**: the requests above, with a `User-Agent` of `Glyph/<version>`.
  No login, no token, nothing about you or your library.
- To the **Glyph server**: nothing plugin-related.
- From **plugin code**: only what its `network` hosts receive through
  `net.fetch`, and only for plugins with the `network` permission.
- Installed plugins, their settings values and storage, and the catalog stay
  on your device. Plugins are not part of account sync; only the theme setting
  is, as part of your appearance settings.

## Code map

For contributors to Glyph:

| What | Where |
| --- | --- |
| manifest, rules, catalog, install, search and order | `glyph-apps/crates/glyph-core/src/plugins.rs` |
| sandbox: module, ABI, limits, storage, timers, network | `glyph-apps/crates/glyph-core/src/plugin_host.rs` |
| app state: load, install, warning, updates, deep link | `glyph-apps/src/app/plugins.rs` |
| plugin calls and events, settings values | `glyph-apps/src/app/plugin_api.rs` |
| Settings › Plugins (list, detail, warning) | `glyph-apps/src/ui/settings/plugins.rs` |
| plugin pages, sections, hidden rows | `glyph-apps/src/ui/settings/plugin_ui.rs` |
| plugin texts | `glyph-apps/src/i18n.rs` (`set_overrides`) |
| song menu entries | `glyph-apps/src/ui/lists/ctx_menu.rs` |
| theme registry, colours per frame | `glyph-apps/src/theme.rs` (`PluginTheme`, `colors`, `set_theme`) |
| `glyph://plugin/<id>` | `glyph-apps/src/instance.rs`, `src/app/poll.rs` |
| settings (`plugins.*`, `visuals.theme`) | `glyph-apps/crates/glyph-core/src/config.rs` |
| website | `glyph-server/crates/glyph-server-core/src/site/plugins.rs`, `plugins.html` |
| index, rules for CI and makers | `glyphmusic/plugins`: `scripts/manifest.mjs`, `build-index.mjs`, `validate.mjs` |
