---
description: Every page, tab and option in Glyph's settings, where it is and what it does.
---

# Settings reference

Open the settings with the gear at the bottom of the sidebar or `Ctrl+0`. The
search field at the top of the settings finds pages, tabs and single options;
picking an option jumps to it and lights it up.

Paths on this page are written like **Settings › Playback › Content ›
Shuffle**: page, tab (if the page has tabs), option. Options
marked *device* stay on this computer; the others
[sync with your account](accounts.md) and travel in
[shared settings](sharing.md).

{% hint style="info" %}
**Advanced switch:** by default Glyph hides pages and options most people rarely
need (`Server`, `Integrations`, `Backup & share`, the `Playback › Sources` tab,
and options such as Spatial audio, Equalizer headroom, Cache size limit, Update
channel, Startup animation, Background power saving and mouse-wheel steps). Turn
on the **Advanced** switch in the settings sidebar to show everything. It stays
on this device.
{% endhint %}

## Overview

A quick summary of the most-used controls: account card, Equalizer and Data
saver switches, colour theme, text size, language, streaming quality, output
device, volume levelling, YouTube extractor, shuffle style, radio and explicit
filter.

## Playback

### General

| Option | What it does |
| --- | --- |
| Streaming quality | Auto, Low, Standard or High for songs that stream. See [Quality](downloads-and-quality.md#quality). |
| Download quality | The same for new downloads; High saves FLAC where the source has it. |
| Crossfade | 0–20 seconds of overlap between songs (not for the YouTube or SoundCloud players). |
| Audio output | The system default (follows when it changes) or a chosen device. *Device* |
| Volume level | Loud, Normal or Quiet overall. |
| Normalize volume | Every song at the same loudness. |
| Play on MPD | Send songs to a Music Player Daemon; enter `host:port`. See [Sound](sound.md#play-on-another-computer-mpd). *Device* |
| Network devices | Look for Chromecast, UPnP/DLNA, Sonos, MPD and AirPlay devices. See [Play on speakers and TVs](devices.md). *Device* |
| Sound | Mono, Stereo or Spatial. See [Sound](sound.md#mono-stereo-and-spatial). |

### Content

| Option | What it does |
| --- | --- |
| Shuffle | *Smart* spreads artists and plays songs you just heard last; *True random* gives every order the same chance. |
| Skip songs that can't play | Automatically skips a song that cannot be played instead of stopping (on by default). |
| Search longer | Tries more videos and alternate search wordings before marking a song as not found (app only). |
| Pause when other apps play | Android only, on by default. Glyph pauses when another app starts playing sound, like a YouTube video or a voice message. |
| Play on afterwards | Android only, on by default. When the other sound stops, Glyph plays on. It stays paused after a music app (like Spotify) and when the other sound played longer than 2 minutes. |
| Media player buttons | Android only. The extra buttons in the phone's media player: *Add to Liked Songs* or *Shuffle + Repeat*. |
| Listening statistics | Off by default. Counts listening time, plays, top artists and songs; turning it off deletes them. See [Accounts, sync and stats](accounts.md). |
| Hide explicit songs | Leaves out songs marked explicit and YouTube songs without a rating (**?**). |
| Radio when the queue ends | Keeps playing similar songs (needs Last.fm on the server or your own key). |
| Glyph Drift (beta) | When the queue ends, keeps going from Glyph's own taste instead of Last.fm. Needs *Music taste & Daily Mixes*. Off by default (app only). See [Taste](taste.md#glyph-drift-beta). |
| Song suggestions | Shows *Recommended* songs under your playlists and on the home page. Off: no suggestions. |
| Music taste & Daily Mixes | Learns your taste from plays, replays, skips and likes for Home, Daily Mixes, radio and search. On by default. See [Taste](taste.md). |
| Server-powered Taste engine | The Glyph server helps with recommendations and mixes (on by default). Off: everything stays on this device. |
| Genre, mood & era tags | Looks up tags for your top artists, so mixes and your taste profile can group music by vibe. |
| Your taste profile | Opens the **Your taste** page. |
| Hidden artists | Artists you hid with *Don't show this artist* (artist page menu); they do not show in search and radio. Show them again here. |

### Sources

| Option | What it does |
| --- | --- |
| Online search via | *Glyph server* (default) or *This device*: who asks the online sources. Not about your own files: those are in [Local files](local-files.md). *Device* |
| YouTube playback | *Local* finds YouTube audio on this device, *Server* lets the Glyph server do it; when the server finds nothing, this device tries itself. *Device* |
| YouTube extractor | r-dlp (built in, fast) or yt-dlp. *Device* |
| yt-dlp (optional) | Install or update yt-dlp, see its version. Not needed with r-dlp. *Device* |
| Use YouTube and SoundCloud | Full songs from both. When YouTube audio cannot be loaded, and for SoundCloud, their official player appears in Now Playing (on Linux in the browser). Off: only the free sources and previews. |
| Use YouTube only | Never fall back to another source or a preview. *Device* |
| Source priority | Drag sources into the order Glyph prefers them; switch sources on or off. |

### Player

Not on phones. All *device*.

| Option | What it does |
| --- | --- |
| Lyrics in Now Playing | Lyrics next to the cover; `Ctrl+L` switches them too. |
| Download button in Now Playing | A button that downloads the playing song. |
| Keyboard shortcuts | Opens **About › Shortcuts**, where every shortcut can get any key and the mouse wheel steps are set. |

More in [Now Playing and the player bar](now-playing.md).

## Equalizer

| Option | What it does |
| --- | --- |
| Equalizer | On or off. Works on songs Glyph plays itself, not on the YouTube or SoundCloud players. |
| Preset | Built-in presets (Bass Boost, Rock, Vocal, …) and the ones you saved. |
| Bass | Extra bass below about 90 Hz, −12 to +12 dB. |
| Headroom | 0 to −12 dB before the equalizer, so boosts do not clip. |
| Share | Copy or import a curve as a code, export or import a `.glyph-eq` file. |
| The curve | Drag a point up or down (±12 dB); double-click a point to put it back to 0. |
| Reset to flat · Delete preset · Save as preset | Below the curve. |

More in [Sound](sound.md).

## Appearance

| Option | What it does |
| --- | --- |
| Language | Interface language; empty follows the system. |
| Text size | Small, Normal, Large or Extra large. *Device* |
| Background visualizer | *Automatic (per song)*, Beam, Band, Sunrise, Horizon, or **Solid** (with its own colour picker). |
| Background picture | Your own picture (or one from a plugin) instead of the glow, with *Darken* and *Blur*. *Device* |
| Glow strength | How strongly the glow shows. |
| Music reaction | How strongly the glow moves with the music. |
| Show covers as ASCII art | Draws covers through the ASCII ramp. |
| Colour theme | Accent and background colours; [plugins](plugins.md) add more. |
| ASCII effects | Text and pictures decode in, placeholders shimmer. |
| Mini player | Bar or Card. |
| Performance | **Full effects** or **Performance mode** (lighter background and effects). *Device* |
| Animations | **Graphics card (GPU)** or **Processor (CPU)** for the moving background, with *Try again* after a GPU fallback. *Device* |
| Save power in the background | 10 fps glow while Glyph is not the active window. |
| Startup animation | Light streams form the logo at start. |

More in [Appearance](appearance.md).

## Account

Signed out, this page signs you in or creates an account (browser, password,
passkey or a pairing code). Signed in, it has four tabs. See
[Accounts, sync and stats](accounts.md).

| Tab | Options |
| --- | --- |
| Overview | Handle (change once every 30 days), sync status and *Sync now*, *Library & API keys* (end-to-end encryption status), account storage usage bar, *Glyph links when sharing* (see [Sharing](sharing.md)), *Sign out*. |
| Profile | Profile picture (square), banner (3:1), *Public profile*, *Show recently played*, profile section order, and which playlists appear on your profile. |
| Devices | Pairing code (approve a new device), every signed-in device with *Remove* and *Sign out all*, device limit. |
| Security | Set or change the password, add a passkey, make a recovery code, delete the account. |

## Server

| Tab | Options |
| --- | --- |
| Connection | Server URL: empty for the public server, your own address, or `off` for [direct mode](direct-mode-and-keys.md). Access token, when the server asks for one. *Device* |
| API keys | YouTube, Jamendo, SoundCloud, Spotify (ID and secret) and Last.fm keys. Synced end-to-end encrypted. |
| Transparency | What the server you use can see, and warnings when it tries to read your data. See [Privacy](../privacy.md). |

## System

Desktop only, all *device*.

| Option | What it does |
| --- | --- |
| Start with your computer | Opens Glyph when you sign in to the computer. |
| On autostart | *Window* opens Glyph as usual; *Background* waits in the system tray (macOS: hidden, open it from the Dock). |
| Offer copied music links | When you copy a song or playlist link in another app, Glyph asks if it should add it. |

## Notifications

Android only, all *device*. See [Android app](mobile.md#notifications).

| Option | What it does |
| --- | --- |
| App updates | Notify when a new version of Glyph is ready to install. |
| New releases | Notify when an artist you follow puts out a new album, EP or single. |

## Integrations

| Option | What it does |
| --- | --- |
| Discord Rich Presence | Shows the playing song in your Discord profile. |
| Discord application ID | Your own Discord app, for its name and pictures. |
| AI assistants (MCP) | Lets assistants such as Claude control Glyph: *On this computer* or *Through the server*, the address and token, and what they may do. See [AI assistants](ai-assistants.md). *Device* |

## Plugins

All *device*.

| Tab | Options |
| --- | --- |
| Installed | Your plugins: switch off, update, remove; *Update automatically*; the plugins folder for plugin makers. |
| Browse | The catalog: *Listed* plugins and *Community* plugins from GitHub, with details before you install. |
| One tab per plugin | Settings a plugin adds. |

Plugins are made by other people; installing one is at your own risk. See
[Plugins](plugins.md).

## Cache & Storage

| Option | What it does |
| --- | --- |
| Storage usage | Space taken by covers, downloads, lyrics, search data and the audio stream cache; tick kinds and *Clear cache*. |
| Cache size limit | 250 MB to 10 GB or no limit. Older cache files go first; downloads are never removed automatically. *Device* |
| Data saver | Small covers, home feeds at most every 12 hours, slower sync, one download at a time. *Device* |
| Download folder | Where downloads are saved; *Change…* moves them along, *Default* back to Glyph's folder. *Device* |
| “Show in folder” after downloads | A button on the message of a finished download. *Device* |
| Local music folders | Opens [Local files](local-files.md). *Device* |
| Open cache folder | Shows the folder in your file manager. |

More in [Downloads and audio quality](downloads-and-quality.md).

## Transfer music

Bring a library over from Spotify, YouTube Music, SoundCloud, Deezer, Last.fm,
Apple Music or Bandcamp: by link, by copied songs, by playlist file (CSV,
JSON, M3U, XSPF, TXT) or by service. See [Transfer music](transfer-music.md).

## Backup & share

| Option | What it does |
| --- | --- |
| Copy as code | All shareable settings as one line of text. |
| Save as file | The same as a `.json` file. |
| Paste a code · Open a file | Apply settings from a code or a file. |
| Previous settings | Undo the last import. |

API keys, the server address and *device* options are never included. See
[Sharing](sharing.md).

## About

| Tab | Options |
| --- | --- |
| Version & updates | Version, *Check for updates*, *Install updates automatically*, Channel (**Stable** gets tested versions, **Latest** gets every new version first), *Introduction* (reopen the welcome tour). In the web player also *Install as app*. See [Install and updates](../help/install-and-updates.md). |
| Support | *Send feedback* (a short note that opens a filled-in GitHub issue), *Shake to send feedback* (phones), Report a problem (GitHub), Copy diagnostic info (no keys, no personal data), Docs, GitHub repository, Data folder (desktop). |
| Shortcuts | Every keyboard shortcut and mouse gesture; click one to change its key. Also *Mouse wheel on the seek bar* (off, 1, 5, 10, 15 or 30 seconds per notch, default 5) and *Mouse wheel on the volume* (off, 1, 2, 5 or 10 % per notch, default 5). Desktop only, *device*. See [Keyboard shortcuts](../getting-started/keyboard-shortcuts.md). |

## Only in the settings file

A few options exist only in `config.toml`, such as the number of parallel
downloads. See [Settings file](config-file.md).
