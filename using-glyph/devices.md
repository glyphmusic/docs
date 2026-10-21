---
description: Play on speakers, TVs and other devices in your network (Chromecast, UPnP/DLNA, Sonos, AirPlay, MPD), control your other Glyph devices, and what to do when a device is missing.
---

# Play on speakers and TVs

Glyph finds playback devices in your home network on its own. Click
**Connect to a device** (the speaker icon next to the volume) in the player bar
and pick one: the music plays there, and Glyph is the remote (play, pause,
skip, seek, volume).

| Device | Examples | Works |
| --- | --- | --- |
| Google Cast | Chromecast, Nest speakers, TVs with Chromecast built-in | yes |
| UPnP / DLNA | smart TVs (Sony, Samsung, LG …), AV receivers, many Wi-Fi speakers | yes |
| Sonos | all Sonos speakers, also in groups | yes |
| MPD | Music Player Daemon on a Raspberry Pi or server | yes |
| AirPlay | AirPort Express, AV receivers, AirPlay speakers, shairport-sync | yes, except devices that require pairing |

Songs that only exist on your computer (downloads, imported files) are sent to
the device by Glyph itself, so the computer must stay on while they play.
YouTube and SoundCloud songs that play in their embedded player cannot go to a
device; they keep playing on the computer and Glyph tells you so.

Turn the search off under **Settings › Playback › Network devices**.

### AirPlay

Glyph plays to AirPlay speakers with classic AirPlay (RAOP): it decodes the song
itself and streams it lossless at 44.1 kHz, so the computer must stay on while
it plays. Volume, pause, seek and the song title on the device work. The speaker
buffers about two seconds, so pressing play or seeking takes that long to be
heard.

Devices that require AirPlay pairing or a password (newer HomePods, Apple TV
with *Require password* or *Only people sharing this home*) refuse the
connection; Glyph shows that message. On an Apple TV, set *AirPlay › Allow
access* to **Everyone** to try anyway.

## Your other Glyph devices

Signed in, the Connect panel also lists **Your Glyph devices**: every other
computer or phone where Glyph is open with the same account. No network
search is involved, so they can be anywhere.

* Click a device to control it from here: play, pause, skip, seek and volume
  act on that device, and the player bar shows what it plays.
* **Play here** under a device moves the current song and the next 99 queued
  songs there, at the same position, and this computer becomes the remote.
* A device that is in a [Jam](jam.md) or controlling another device shows
  *Currently in a Jam or controlling another device* and cannot be picked.

## Your device is not showing?

1. **Same network.** The computer and the device must be in the same home
   network. Guest Wi-Fi and "AP isolation" / "client isolation" on the router
   hide devices from each other.
2. **Firewall.** Glyph needs to receive answers from devices in your network.
   * Windows: when Windows asks whether Glyph may use networks, allow
     **private networks**. Later: *Windows Security › Firewall & network
     protection › Allow an app through firewall* › tick Glyph for *Private*.
     Make sure your home network is set to **Private**, not Public.
   * macOS: *System Settings › Network › Firewall › Options* › allow Glyph.
     On macOS 15 and later also *Privacy & Security › Local Network* › Glyph on.
   * Linux: allow UDP 5353 (mDNS) and 1900 (SSDP) answers, e.g.
     `sudo ufw allow from 192.168.0.0/16`.
3. **VPN and virtual adapters.** Glyph searches on every network adapter.
   A VPN that routes all traffic (full tunnel) can still hide the home network:
   pause it or allow LAN access in the VPN app.
4. **Device ready.** Switch the device on (TVs often only answer when they are
   on or in "quick start" mode). On TVs, turn on **DLNA / media renderer /
   "Renderer"** or **Chromecast built-in** in the TV's network settings.
5. **Spotify Connect-only speakers.** Speakers that only speak Spotify Connect
   cannot play from other apps. Many of them also support Chromecast, AirPlay
   or DLNA; turn that on in the manufacturer's app.
6. **Search again.** Opening the Connect panel searches again; devices that
   were switched on later appear within a few seconds.

## A device shows up but does not play

* **"could not play this song"**: the device does not support the song's audio
  format (some TVs and Sonos cannot play Opus/WebM). Try another song or source.
* **Sonos in a group** plays through the group's main speaker; Glyph does that
  automatically.
* **Silence on a TV** often means its input is not on the media app. Start
  playback again after the TV switched over.

## Play on another computer (MPD)

MPD servers that announce themselves (Zeroconf) appear in the Connect panel.
Others can be entered by hand under **Settings › Playback › Play on MPD**
(`host:port` or `password@host:port`).
