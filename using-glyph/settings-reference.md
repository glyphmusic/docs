---
description: Every page, tab and option in Glyph's settings, where it is and what it does.
---

# Settings reference

Open the settings with the gear at the bottom of the sidebar or `Ctrl+0`. The
search field at the top of the settings finds pages, tabs and single options;
picking an option jumps to it and lights it up.

Paths on this page are written like **Settings › Playback › Player › Mouse
wheel on the seek bar**: page, tab (if the page has tabs), option. Options
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
| Listening statistics | Off by default. Counts listening time, plays, top artists and songs; turning it off deletes them. See [Accounts, sync and stats](accounts.md). |
| Hide explicit songs | Leaves out songs marked explicit and YouTube songs without a rating (**?**). |
| Radio when the queue ends | Keeps playing similar songs (needs Last.fm on the server or your own key). |
| Song suggestions | Shows *Recommended* songs under your playlists and on the home page. Off: no suggestions. |
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

All *device*.

| Option | What it does |
| --- | --- |
| Mouse wheel on the seek bar | Off, 1, 5, 10, 15 or 30 seconds per wheel notch (default 5). |
| Mouse wheel on the volume | Off, 1, 2, 5 or 10 % per notch (default 5). |
| Lyrics in Now Playing | Lyrics next to the cover; `Ctrl+L` switches them too. |
| Download button in Now Playing | A button that downloads the playing song. |
| Keyboard shortcuts | Opens **About › Shortcuts**, where every shortcut can get any key. |

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
Apple Music or Bandcamp: by link, by playlist file (CSV, JSON, M3U, XSPF) or by
service. See [Transfer music](transfer-music.md).

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
| Version & updates | Version, *Check for updates*, *Install updates automatically*, Channel (**Stable** gets tested versions, **Latest** gets every new version first), *Introduction* (reopen the welcome tour). See [Install and updates](../help/install-and-updates.md). |
| Support | Report a problem (GitHub), Copy diagnostic info (no keys, no personal data), Docs, Data folder. |
| Shortcuts | Every keyboard shortcut and mouse gesture; click one to change its key. See [Keyboard shortcuts](../getting-started/keyboard-shortcuts.md). |

## Only in the settings file

A few options exist only in `config.toml`, such as the number of parallel
downloads. See [Settings file](config-file.md).
