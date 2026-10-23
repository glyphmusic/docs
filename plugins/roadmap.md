---
description: Current extension points, their limits, and how to propose the next plugin API.
---

# What's next

The plugin implementation includes themes and schema-2 extensions. Extensions
can replace texts, hide settings rows, add settings sections and song menu
entries, and run WebAssembly code. See [Extensions](extensions.md),
[Settings, menus and texts](settings-ui.md) and the [API reference](api.md)
for the supported contract.

These pages describe the source implementation. Availability in an installed
Glyph release depends on that release including the extension runtime; a
manifest with schema 2 shows as **Needs a newer Glyph** in older versions.

## Where new APIs are needed

The current API exposes specific app actions and declarative controls. A
plugin cannot replace arbitrary GPUI widgets, draw a custom canvas,
process raw audio or register a music catalog provider. Spectrum analysis,
local equalizer control, live progress rows and song-scoped lyrics candidates
are available through the [current API](api.md).

Those features need dedicated host interfaces: for example an audio callback
with a bounded processing budget, a drawing surface, or a provider contract
with cancellation and error handling. They are possible directions, not
existing manifest fields or promised release dates.

## Compatibility

- `glyph-plugin.json` stays the entry point. Themes use schema 1 or 2;
  extensions require schema 2.
- New capabilities should use explicit API functions and permissions.
  Use `min_app` when an extension depends on a newer Glyph function.
- Unknown kinds, permissions and settings row types show as **Needs a newer
  Glyph** instead of being treated as supported.
- Code is one WebAssembly module without WASI. Native libraries are outside
  the current plugin contract.

## Propose an extension point

Open an issue on [glyphmusic/plugins](https://github.com/glyphmusic/plugins/issues).
Describe the plugin you want to make, what the current API cannot express,
which data it needs and how its controls should appear. A concrete example
helps define a host API that other plugin makers can use too.
