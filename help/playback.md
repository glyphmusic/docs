---
description: Fixes when a song does not start, stops, stutters, only plays 30 seconds or makes no sound.
---

# Playback problems

## A song does not start

Work through these in order and try the song again after each step.

1. **Server.** **Settings › Server** shows whether the server answers. If it
   does not, check your internet connection, or set the address to `off` to ask
   the sources directly (see [Direct mode](../using-glyph/direct-mode-and-keys.md)).
2. **Another song.** If other songs play, only this one is the problem: try the
   same song from another result in search.
3. **YouTube songs.** They need a resolver. Under **Settings › Playback ›
   YouTube extractor** switch between *Local* and *Server*, or between r-dlp and
   yt-dlp. yt-dlp can be installed and updated on the same page.
4. **Audio output.** If Glyph says the output does not respond, or the song
   loads forever, right-click the volume button and pick another output or
   *System default*.
5. **Update Glyph** under **Settings › About**. YouTube changes often, and new
   versions follow.

A toast **Playback error · …** or **Could not resolve: …** names the reason.
Mention it when you [ask for help](README.md#still-stuck).

## It stops, pauses or stutters

* **Slow connection.** With quality *Auto*, Glyph steps down when playback
  stalls; a fixed *High* does not. Under **Settings › Audio** choose *Auto* or
  *Standard*. See [Quality](../using-glyph/downloads-and-quality.md#quality).
* **Switching quality** during a song can cause one short pause. That is
  normal with *Auto*.
* **Offline or travelling?** [Download](../using-glyph/downloads-and-quality.md)
  songs beforehand: downloads always play from disk.
* **Bluetooth** drops out when the signal is weak. Try the computer's own
  speakers to see if the problem is Glyph or the headphones.

## Only 30-second previews

The song was only found on Deezer, which gives previews. Turn on YouTube under
**Settings › Playback › Sources** and move it above Deezer. On a Cloudflare
server YouTube needs the [companion](../self-hosting/companion.md); if the
server has none, choose *Local* for YouTube so this computer resolves it.

## No sound, but the song is running

1. **Volume** in Glyph and in your system.
2. **Output.** Right-click the volume button: is the right device chosen?
   *System default* follows when you plug in headphones.
3. **Playing somewhere else?** If the Connect panel shows a speaker, TV or
   another Glyph device, the music plays there. Pick *This computer*.
4. **In a Jam** with *Play the music on this device* off, only the host's
   device plays. See [Jam problems](jam.md).

## A song cannot go to a speaker or TV

YouTube and SoundCloud songs that play in their embedded player stay on the
computer. More in [Play on speakers and TVs](../using-glyph/devices.md).

## Radio is greyed out

Radio needs a Last.fm key, on the server or in your own
[API keys](../using-glyph/direct-mode-and-keys.md). Hover the switch to see why
it is off.

## Lyrics are missing or wrong

Open the lyrics options and pick another version; Glyph keeps the choice for
this song. Timing can be shifted there too. See [Lyrics](../using-glyph/lyrics.md).
