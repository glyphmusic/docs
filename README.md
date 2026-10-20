---
description: A fast desktop music player that searches many legal sources at once.
---

# Welcome to Glyph

Glyph is a free, open-source music player for Windows, macOS and Linux. It searches
many legal music sources at the same time, merges the results into one list and
keeps your library, playlists, lyrics and downloads in one quiet, fast app.

{% hint style="info" %}
Glyph is a native app written in Rust. There are no ads, no subscriptions and no
telemetry. An account is optional.
{% endhint %}

## Where to start

* [Install Glyph](getting-started/install.md) and take the [first steps](getting-started/first-steps.md).
* Learn how [search and sources](using-glyph/search-and-sources.md) work.
* Run [your own server](self-hosting/overview.md) at home, on a VPS or on Cloudflare.
* See [what's new](whats-new.md) in every release.

## The parts of Glyph

| Part | What it does | Repository |
| --- | --- | --- |
| Desktop app | The player you install | [glyphmusic/desktop](https://github.com/glyphmusic/desktop) |
| Server and CLI | Search, accounts, sync, sharing; the `glyph` command | [glyphmusic/server](https://github.com/glyphmusic/server) |
| Companion | Optional helper that gives a Cloudflare server YouTube | [glyphmusic/companion](https://github.com/glyphmusic/companion) |
| r-dlp | Fast YouTube audio resolver used by the app and companion | [glyphmusic/r-dlp](https://github.com/glyphmusic/r-dlp) |
