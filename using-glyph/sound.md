# Sound

Everything here applies to songs Glyph plays itself, not to the embedded
YouTube or SoundCloud players.

| Setting | What it does |
| --- | --- |
| Crossfade | 0–20 seconds between songs |
| Volume level | Loud, Normal or Quiet overall |
| Normalize volume | every song at the same loudness |
| Equalizer | 10 bands, presets, your own curves; share them as code or file |
| Output | the system default or a chosen device |

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
Turn *Save energy in the background* off to keep full speed.
