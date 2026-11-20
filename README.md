---
description: A fast music player for desktop, Android and the web that searches many legal sources at once.
---

# Welcome to Glyph

Glyph is a free, open-source music player for Windows, macOS, Linux, Android and
the browser ([glyph.my/web](https://glyph.my/web)). It searches many legal music
sources at the same time, merges the results into one list and keeps your
library, playlists, lyrics and downloads in one quiet, fast app.

{% hint style="info" %}
Glyph's core and audio engine are written in Rust, with one interface shared
across desktop, Android and the web player. There are no ads, no subscriptions
and no telemetry. An account is optional.
{% endhint %}

## Where to start

* [Install Glyph](getting-started/install.md) on desktop or Android, open the
  [web player](using-glyph/web-player.md) in your browser, and take the
  [first steps](getting-started/first-steps.md).
* Look up any option in the [settings reference](using-glyph/settings-reference.md) and any key in
  [keyboard shortcuts](getting-started/keyboard-shortcuts.md).
* [Ask an AI](getting-started/ask-an-ai.md): connect your assistant to these docs at
  `https://docs.glyph.my/mcp`.
* Learn how [search and sources](using-glyph/search-and-sources.md) work.
* Run [your own server](self-hosting/overview.md) at home, on a VPS or on Cloudflare.
* See [what's new](whats-new.md) in every release.

## The parts of Glyph

| Part | What it does | Repository |
| --- | --- | --- |
| Apps & web player | Desktop app, Android app and `/web` browser player | [glyphmusic/apps](https://github.com/glyphmusic/apps) |
| Server and CLI | Search, accounts, sync, sharing; the `glyph` command | [glyphmusic/server](https://github.com/glyphmusic/server) |
| Companion | Optional helper that gives a Cloudflare server YouTube | [glyphmusic/companion](https://github.com/glyphmusic/companion) |
| r-dlp | Fast YouTube audio resolver used by the app and companion | [glyphmusic/r-dlp](https://github.com/glyphmusic/r-dlp) |
