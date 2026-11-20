---
description: Listen to Glyph in any browser at glyph.my/web, install it as a web app, and see what stays exclusive to the desktop and phone apps.
---

# Web player

Open **[glyph.my/web](https://glyph.my/web)** to use Glyph directly in your
browser, with no download and no account required. It runs the same interface as
the desktop and Android apps, adapted for both desktop and mobile screens.

## Install as an app (PWA)

The web player includes a web app manifest, so you can install it from your
browser for an app icon and its own window:

* **Desktop (Chrome, Edge, Brave):** click the install icon in the address bar.
* **Android:** open the browser menu and tap **Add to Home screen** or
  **Install app**.
* **iOS (Safari):** tap **Share › Add to Home Screen**.

## What works in the browser

* **Search and playback:** search all enabled sources, play full songs from
  direct sources (Audius, Jamendo, Internet Archive) and YouTube (via the
  official YouTube embed), plus 30-second previews from Deezer. Upcoming songs
  in your queue preload automatically.
* **Library and end-to-end encrypted sync:** sign in with your `@handle` to
  sync your liked songs, playlists, followed artists, saved albums, listening
  statistics and settings end-to-end encrypted with your desktop and phone apps.
  Without an account, your library stays in your browser (`localStorage` and
  `IndexedDB`).
* **Shared links:** opening a `glyph.my/p/...` link in a browser opens it right
  in the web player, ready to play, save to your library or open in the app.
* **Connect:** signed in, you can see your online desktop and phone devices in
  the Connect panel and control or transfer playback between them.
* **Mini player:** in browsers that support Document Picture-in-Picture, the
  mini player opens as a floating window on top of other tabs (with a popup
  fallback elsewhere).
* **AI assistants (MCP):** signed in, you can turn on server-relay MCP under
  **Settings › Integrations** so remote assistants can control playback and read
  your library while the tab is open.
* **Appearance:** colour themes, background visualizer, background pictures
  (stored in the browser), performance mode and GPU/CPU animations.

{% hint style="info" %}
No audio from the web player passes through the Glyph server. Direct sources
stream straight from the provider, and YouTube tracks play through the official
`youtube-nocookie.com` embed.
{% endhint %}

## Available only in the desktop and phone apps

Features that need native audio processing, local file access or home-network
protocols require the installed app ([Install](../getting-started/install.md)):

* Offline downloads and [local music folders](local-files.md)
* Equalizer, crossfade, volume levelling, spatial audio and output device
  selection
* Local YouTube extraction (`r-dlp` / `yt-dlp`) and full SoundCloud streams
* [Speakers and TVs](devices.md) (Chromecast, AirPlay, UPnP/DLNA, Sonos, MPD)
* [Plugins](plugins.md) (themes with looks and WebAssembly extensions)
* Local HTTP MCP server (`127.0.0.1`), Discord Rich Presence, system tray and
  autostart

## Self-hosting the web player

The Cloudflare Worker bundles the web player automatically at `/web`. On a
[native server](../self-hosting/native.md), build the web bundle from
`glyph-apps/glyph-ui` (`npm run build:web`) and point `web_dir` in `server.toml`
(or `GLYPH_WEB_DIR`) at the built folder.
