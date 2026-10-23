---
description: My plugin does not show up, shows as Invalid, does not update, or looks wrong. Causes and fixes.
---

# Troubleshooting

## My plugin doesn't show up under Community

Go through these in order. Most problems are one of the first three.

1. **Is the file at the root, with the exact name?** It must be
   `glyph-plugin.json` (not `glyph_plugin.json`, not `plugin.json`, not in a
   folder) on the **default branch**. Check by opening
   `https://raw.githubusercontent.com/<owner>/<repo>/HEAD/glyph-plugin.json` in
   a browser: you must see your JSON.
2. **Is it valid?** Run `node validate.mjs` (see [Test your plugin](testing.md)).
   Glyph drops invalid community manifests without telling anyone, so a single
   typo hides the plugin.
3. **Does the repository have the topic?** It must be exactly `glyph-plugin`.
   Check: your repository should be on
   [github.com/topics/glyph-plugin](https://github.com/topics/glyph-plugin).
4. **Is the repository public and not archived?** Glyph can't read private
   repositories and skips archived ones.
5. **Did you give it a minute?** GitHub's search picks up a new topic after a
   few minutes. Then click **Refresh** in **Settings › Plugins › Browse**:
   without it, Glyph uses its catalog for up to an hour.
6. **Is the id taken?** If another plugin with more stars, or a listed one,
   uses your `id`, yours is left out. Search the catalog for your id, and pick
   another one if needed.
7. **Is it a fork?** Forks are included. But if the original repository has
   the same id and more stars, the original wins (see 6).
8. **Is your repository among the newest?** Glyph reads the manifests of the 60
   most recently pushed repositories with the topic. Pushing any commit moves
   yours to the front.

## It shows as "Invalid"

The manifest breaks a rule. Run the validator to see which one; every message
is listed in the [manifest reference](manifest.md#rules). The most common:

| Message | Fix |
| --- | --- |
| `version must be a semantic version like 1.0.0` | three numbers: `1.0` → `1.0.0`; no `v` in front |
| `id must be 2-40 characters …` | lowercase and dashes only: `My_Theme` → `my-theme` |
| `theme.base must stay near black …` | every channel at most `24`: `#303030` → `#0a0a0a` |
| `theme.glow must be three colours …` | exactly three `#rrggbb` values in a list |
| `theme.accent must be a colour like #ff8a3d` | six hex digits: `#f80` → `#ff8800`; no colour names |
| `the file must contain one JSON object` | a missing comma or quote; any JSON checker finds it |

## It shows as "Needs a newer Glyph"

The manifest has a `schema`, `kind`, permission, settings page or row type
this Glyph doesn't know, or a `min_app` above the Glyph version you run.
Glyph versions from before extensions show every `"schema": 2` plugin this
way. Update Glyph (**Settings › About**), or lower `min_app` if you set it
higher than needed.

## My extension has no Install button

Plugins with code install only from **Listed**. Under **Community** they show
as **Invalid** with "only checked plugins may run code", and the website
shows no Install button. Open a pull request on glyphmusic/plugins (see
[Publish and update](publishing.md#get-listed)); until then, test it as a
local plugin.

## My extension's code doesn't run

- **Is it switched on?** A switched-off plugin says *off* in its line.
- **Did it stop?** Its line says *stopped*; the detail view names the reason.
  "not a valid WebAssembly module": build for `wasm32-unknown-unknown`, not
  `wasm32-wasip1` (Glyph offers no WASI imports, so a module that imports
  `wasi_snapshot_preview1` can't start). "took too long": an event used up its
  budget; look for a loop that never ends. Switch it off and on to retry.
- **Where is its log?** On the detail view, for local plugins.
- **Does a call answer with an error?** It names what's missing: a permission
  (`… needs the "playback" permission`), a host (`… is not in the plugin's
  "network" list`), or a wrong argument.
- **No `track` events?** They need the `playback` permission.

## My settings section isn't where I put it

- `page` must be one of the [pages](settings-ui.md#where-a-section-goes);
  `after` must be the label key of a row on that page **and tab**
  (`sp.radio` is on Playback › Content, not General). A key that isn't there
  puts the section at the end of the page.
- Sections show only while the plugin's code runs.

## My text replacement doesn't show

- The key must match exactly; search
  [`en.toml`](https://github.com/glyphmusic/apps/blob/main/assets/i18n/en.toml)
  for it.
- A replacement applies in its language. An English-only replacement shows
  in other languages only where Glyph has no translation; add the languages
  you care about.
- `plugins.*`, `account.*` and `mcp.*` can't be replaced.

## It shows as "Name already in use"

You already have a plugin with that `id` installed from a different
repository, or as a local plugin. Remove it (bin icon in **Installed**), then
install the other one.

## My local plugin doesn't appear

- The folder name must equal the `id` exactly: `plugins/midnight-coral/` for
  `"id": "midnight-coral"`.
- The file must be directly inside: `plugins/midnight-coral/glyph-plugin.json`.
- Click **Reload** after every change.
- Run the validator: an invalid local manifest is skipped like any other.

## My update doesn't arrive

- **Did you raise `version`?** Glyph only updates to a higher version. Same
  version, new colours: existing installs keep the old file.
- **Is it listed?** Listed plugins are pinned to a commit. Open a pull request
  that moves `rev` in `plugins/<id>.json`.
- **Did the repository move?** Updates must come from the same `owner/name`
  the plugin was installed from.
- **Is automatic updating off?** Then **Update to …** waits in **Installed**.
- **Cache:** Glyph checks at most once an hour. **Refresh** in Browse checks
  now.

## The theme looks different from what I expected

- **The glow shows only while nothing plays.** While a song plays, the
  background follows the song's cover. Stop playback to see your glow.
- **The glow is faint.** Check **Settings › Appearance › Glow strength**. Your
  `glow` dark colour may also be too dark; raise the middle colour's
  saturation.
- **The accent is hard to see.** It's drawn as text on dark panels. Make it
  lighter (see [Designing a theme](themes.md#the-accent)).
- **Text on the background turned dark.** Glyph switches text on the glow to
  dark ink when the light behind it is very bright. Tone down the bright end
  of your glow.

## "GitHub not reachable" or "GitHub was not fully reachable"

Glyph couldn't load the index or the topic search. Common causes: no internet,
a firewall blocking `api.github.com` or `raw.githubusercontent.com`, or
GitHub's rate limit (10 searches per minute per IP address; shared networks
can hit it). Glyph keeps showing what it loaded last time and tries again on
the next refresh. Installed plugins keep working; they don't need GitHub.

## Install in Glyph does nothing

- Glyph must be installed (and opened once on Linux, so it registers the
  `glyph://` link).
- Some browsers ask before opening an app; allow it.
- If Glyph opens but shows "Plugin not found", the catalog doesn't have that id
  yet. Click **Refresh**, or check the plugin page's address.
