---
description: Make plugins for Glyph. What a plugin is, how Glyph finds and installs it, and where to start.
---

# Make plugins

A Glyph plugin starts with `glyph-plugin.json` in a GitHub repository.
A **theme** changes colours. An **extension** can replace texts, hide settings
rows, add settings pages and song menu entries, and run WebAssembly code that
uses Glyph's playback, library, search, settings and network APIs.

Themes and extensions without code need no toolchain. Put the file in a
repository, add the topic `glyph-plugin`, and Glyph finds it. Extensions with
code add a `.wasm` module and need a listing before others can install them.
Start with the theme below or go straight to [Extensions](extensions.md).

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

## The short version

1. Create a repository from the [plugin template](https://github.com/glyphmusic/plugin-template).
2. Edit `glyph-plugin.json`: your own `id`, `name` and colours.
3. Try it: copy the file into Glyph's `plugins` folder and press **Reload**.
4. Add the topic `glyph-plugin` to the repository.
5. Within the hour, everyone sees it in **Settings › Plugins** and on
   [glyph.my/plugins](https://glyph.my/plugins).

[Quickstart](quickstart.md) walks through each step.

## How it fits together

```
your repo (topic: glyph-plugin)          glyphmusic/plugins (index.json)
   └─ glyph-plugin.json                     └─ plugins/<id>.json  ── CI ──> index.json
            │                                              │
            └──────────────┐               ┌───────────────┘
                           ▼               ▼
              Glyph on your device (and glyph.my/plugins in a browser)
              1. asks GitHub for repos with the topic, reads each manifest
              2. reads index.json for listed plugins
              3. checks every manifest with the same rules
              4. Install: writes <data>/plugins/<id>/glyph-plugin.json
              5. a theme becomes "plugin:<id>" next to the built-in themes
```

Glyph does all of this itself, straight from GitHub. The Glyph server is not
involved, so plugins work with any server and in direct mode. [How plugins
work](how-it-works.md) explains every step.

## Two places a plugin can come from

| Section in Glyph | Where it comes from | What you do | What can be installed |
| --- | --- | --- | --- |
| **Community** | any GitHub repository with the topic `glyph-plugin` and a valid `glyph-plugin.json` at its root | add the topic | themes and extensions without code |
| **Listed** | `index.json` in [glyphmusic/plugins](https://github.com/glyphmusic/plugins), built from pull requests | open a pull request that pins your version | themes and extensions, including code |

"Listed" means the manifest passed the rules and the version is pinned to a
commit. It is no review of quality or safety. See [Trust and safety](security.md).

## Pages in this section

| Page | For |
| --- | --- |
| [Quickstart](quickstart.md) | your first theme, start to finish |
| [Extensions](extensions.md) | your first extension, with or without WebAssembly code |
| [Services and keys](services.md) | user-owned keys, secure storage, Last.fm and server boundaries |
| [API reference](api.md) | functions, events, permissions and runtime limits |
| [Settings, menus and texts](settings-ui.md) | controls, sections, song menu entries and text replacements |
| [How plugins work](how-it-works.md) | discovery, catalog, install, how Glyph applies a theme, updates, deep links |
| [Manifest reference](manifest.md) | every field of `glyph-plugin.json` and every rule |
| [Designing a theme](themes.md) | where each colour shows up, readability, palettes that work |
| [Test your plugin](testing.md) | local themes and extensions, logs, validation and the edit loop |
| [Publish and update](publishing.md) | the topic, getting listed, versions, sharing links |
| [Troubleshooting](troubleshooting.md) | "my plugin does not show up" and other problems |
| [Trust and safety](security.md) | what Glyph checks, what it doesn't, and why |
| [What's next](roadmap.md) | current extension points and areas that need a new API |

If you only want to install plugins, see [Plugins](../using-glyph/plugins.md)
in the user guide.
