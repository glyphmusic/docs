---
description: System media controls, Discord, the mini player and more.
---

# Integrations

## System media controls

Glyph shows the current song in your system's media controls and reacts to media
keys.

| System | Where |
| --- | --- |
| Windows | media overlay, lock screen and taskbar buttons (like, previous, play, next) |
| macOS | Now Playing in Control Center |
| Linux | MPRIS, used by GNOME, KDE and most panels |

While Glyph is in the background, the window title follows the playing song.

## Discord

**Settings › Integrations › Discord Rich Presence** shows the song, artist,
album and cover in your Discord profile. It is off by default. Builds that ship
their own Discord application need nothing else; otherwise enter an application
ID from the [Discord Developer Portal](https://discord.com/developers/applications).

## Mini player

A small window that stays on top. Right-click its button in the player bar to
open it as a **card** with a big cover or as a slim **bar**. The default style is
under **Settings › Appearance › Mini player**.

## AI assistants

Assistants such as Claude can control Glyph through MCP. See
[AI assistants](ai-assistants.md).

## Music Player Daemon

Glyph can play on an MPD on another computer and act as its remote. See
[Sound](sound.md#play-on-another-computer-mpd).

## Last.fm

With a Last.fm key Glyph plays radio from similar songs, shows similar artists
and imports your loved tracks.
