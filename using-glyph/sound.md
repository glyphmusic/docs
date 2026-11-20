---
description: Crossfade, volume levels, normalization, equalizer, spatial audio and playing on MPD.
---

# Sound

Everything here applies to songs Glyph plays itself, not to the embedded
YouTube or SoundCloud players.

| Setting | What it does |
| --- | --- |
| Crossfade | 0–20 seconds between songs |
| Volume level | Loud, Normal or Quiet overall |
| Normalize volume | gives every song one steady loudness across its whole length |
| Equalizer | 10 bands, presets, your own curves; share them as code or file |
| Bass | extra bass below about 90 Hz on top of the equalizer curve |
| Headroom | lowers the level before the equalizer so strong boosts do not clip |
| Output | the system default or a chosen device |

## Volume levelling (Normalize volume)

With **Normalize volume** turned on, Glyph measures each song once in the
background (the way streaming services do: deep bass counts less, and quiet
parts or silence are left out) and remembers the result. Every song then gets
one fixed gain for its whole length, so a loud chorus, scream or bass drop does
not turn the rest of the song down.

## Bass and headroom

Both are on the **Settings › Equalizer** page and work while the equalizer is
on.

* **Bass** (−12 to +12 dB) lifts or lowers everything below about 90 Hz, on
  top of the curve. The curve's own 32 Hz and 64 Hz bands still work. The
  equalizer does not change how loud a song is levelled: with volume levelling
  on, a bass boost uses the headroom levelling already created and only catches
  momentary bass peaks without turning the rest of the song down.
* **Headroom** (0 to −12 dB) turns the level down before the equalizer. Boosted
  bands can push loud songs past the maximum and distort (clipping); a few dB
  of headroom prevent that. Glyph already leaves some room for boosts by
  itself; this setting adds to it.

**Reset to flat** puts the curve, bass and headroom back to 0 dB.

## Mono, stereo and spatial

**Settings › Playback › Sound** (or right-click the volume button):

* **Mono** plays everything on both sides.
* **Stereo** plays songs as they are.
* **Spatial** keeps the speaker positions of surround songs (5.1, 7.1) and
  renders them for headphones with a head model (HRTF): sounds come from where
  they were placed. Stereo songs sound wider and outside your head.

## Play on another computer (MPD)

Glyph can send songs to a [Music Player Daemon](https://www.musicpd.org) on
another computer and act as its remote. Enter `host:port` (or
`password@host:port`) under **Settings › Playback**. Sources that only work in an
embedded player keep playing on this computer.

## Background animation

The glowing background drops to 10 fps while Glyph is not the active window.
Turn *Save power in the background* off to keep full speed. Its shape and
strength are under [Appearance](appearance.md).
