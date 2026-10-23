---
description: Install themes and extensions from GitHub, manage their permissions and updates, or make your own.
---

# Plugins

**Settings › Plugins** installs themes and extensions made by other people.
Themes appear next to the built-in ones in **Settings › Appearance › Colour
theme**. Extensions can change texts and settings, add controls and song menu
entries, and run code with the permissions shown before installation.

## Where plugins come from

Glyph loads the list straight from GitHub on your device. The Glyph server is
not involved, so plugins also work with your own server or in direct mode.

| Section | Source | Can install |
| --- | --- | --- |
| **Listed** | the index in [glyphmusic/plugins](https://github.com/glyphmusic/plugins). Each version is checked against the plugin rules (valid file, pinned version) before it is added. | everything |
| **Community** | every GitHub repository with the topic [`glyph-plugin`](https://github.com/topics/glyph-plugin). Nobody checks these. | themes and extensions without code |

The list is cached for an hour. **Refresh** loads it again.

## Plugins are other people's work

Plugins are made by other people, not by Glyph. Glyph has nothing to do with
them and cannot say whether a plugin is good or bad. **You install plugins at
your own risk.**

- **Listed** only means a plugin's file follows the plugin rules. It is no
  review of quality or safety.
- **Community** plugins come straight from GitHub. Nobody from Glyph has
  looked at them.
- Before the first install of a plugin, Glyph shows this warning and asks you
  to confirm (**Install anyway**). You can tick **Don't show this again**.
  Code plugins always ask on first install. Updates come from the same
  repository; new code, permissions or network hosts require confirmation.

Themes contain only colours, no code, so they cannot do anything on your
device beyond changing how Glyph looks.

## On the website

[glyph.my/plugins](https://glyph.my/plugins) shows the same catalog, with the
same search, order and star counts. Click a
plugin to see its details and colours; the page background glows in the
theme's colours. **Install in Glyph** opens the app on that plugin, ready to
install. The link behind it is `glyph://plugin/<id>`, so you can share it too.

## Install, update, remove

- **Browse** lists the plugins with their GitHub stars. Type in the search
  field to find one: the search is forgiving, so `mdnt` finds "Midnight", and it
  looks at names, authors and descriptions. Order the list by **Most stars**,
  **Recently updated** or **Name**; Glyph remembers your choice.
- Click a name for details. **Install** adds a plugin, and a new theme is
  applied right away.
- **Installed** shows what you have. **Use** switches to a theme, and the bin
  removes the plugin. If you remove the theme in use, Glyph switches back to the
  default theme.
- **Update automatically** (on by default) installs a higher version as soon as
  the same repository publishes one. Glyph checks when it starts and when you
  open the page, at most once an hour. Turned off, **Update to …** appears next
  to the plugin instead.
- Plugins are stored on this device in the `plugins` folder of Glyph's data
  folder (**Settings › About › Support › Data folder**). They are not synced.
  If you pick a plugin theme and sync your settings, devices without that
  plugin use the default theme.

## Extensions

Besides themes, plugins can be **extensions**. They can rename texts, hide
settings, add their own page under **Settings › Plugins** (it gets a tab next
to Installed and Browse), add sections to Glyph's settings pages and entries
to the song menu, and run code: show toasts, react to the song that plays,
talk to services like Last.fm, change settings.

- **Before installing**, Glyph lists everything the plugin may do: run code,
  control playback, read or change your library, search, change settings,
  contact a website. Read the list; you can't grant only part of it.
- **Plugins with code** install only from **Listed**.
- **Switch it off** with the switch next to it under **Installed**, or **Turn
  off** on its page. Its texts, rows, sections, menu entries and code are gone
  until you switch it on; its settings stay.
- **Updates** that want new permissions wait until you open the plugin and
  agree, even with automatic updates on.
- **Stopped?** If a plugin's code keeps failing, Glyph stops it and says so.
  Switching it off and on starts it again.
- Anything a plugin adds says where it comes from: its sections carry its
  name and a puzzle icon, its toasts start with its name, its menu entries
  have the puzzle icon.

## Make your own

A theme is one `glyph-plugin.json` file in a GitHub repository that has the
topic `glyph-plugin`. Once both are in place, the theme shows up under
**Community**. [Make plugins](../plugins/README.md) explains everything, from
the [quickstart](../plugins/quickstart.md) to [how Glyph applies a
theme](../plugins/how-it-works.md).

```json
{
  "schema": 1,
  "id": "midnight-coral",
  "name": "Midnight Coral",
  "version": "1.0.0",
  "author": "your-name",
  "kind": "theme",
  "theme": {
    "accent": "#ff7a6b",
    "glow": ["#06103a", "#2a4fd6", "#ff9b8a"],
    "base": "#020308"
  }
}
```

For extensions, start with [Extensions](../plugins/extensions.md) and
[Settings, menus and texts](../plugins/settings-ui.md). The
[API reference](../plugins/api.md) lists what code can do today.
