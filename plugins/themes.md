---
description: Where each theme colour shows up in Glyph, what keeps a theme readable, and palettes that work.
---

# Designing a theme

A theme has three parts: one **accent**, a **glow** of three colours and a
near-black **base**. That's deliberately little. Glyph's look is a flat, quiet
UI on top of a moving light, and a theme changes the light and the one
highlight colour, not the panels or the text. This page shows where each
colour lands and how to pick colours that look good and stay readable.

## Where each colour shows up

### accent

The single highlight colour. Glyph uses it sparingly, so it should be the
colour you most want people to see.

| Place | What uses it |
| --- | --- |
| Titlebar | the `glyph` logo |
| Song lists | number and title of the playing song, the small playing-bars icon |
| Hearts | a liked song's heart |
| Player bar | seek and volume bars while you hover or drag them, the playing indicator |
| Library | the tint of the Liked Songs and Downloads tiles (a dark tile in the accent's hue) |
| Start-up | the particle animation that forms the logo |

The accent appears as **text on dark panels** (the playing song's title), so
it needs contrast against roughly `#141414`.

### glow

Three colours, **dark → middle → bright**, for the background while nothing
plays. Glyph renders a soft diagonal beam of light from the bottom left to the
top right, with ASCII characters (` .-=+xX0S8#@`) drawn where the light is
strongest:

- **dark** colours the faint outer light and the shadows of the beam,
- **middle** is the body of the beam, the colour people see most,
- **bright** is the hottest core, and the ASCII characters are drawn in a
  lightened version of the colour under them.

While a song plays, the glow takes its colours from the song's cover instead,
and Glyph fades back to your glow when playback stops. Leave `glow` out and
each view keeps its own colours.

### base

The window background under the glow, visible wherever the light is weak:
corners, edges, the space between panels. It must be near black: each channel
at most `#24` (`#242424` is the brightest grey allowed, `#05030a` is a
typical value). A hint of colour in the base ties the theme together without
anyone noticing it directly.

### What a theme doesn't change

Panels (translucent black), text (light ink at a few opacities), borders,
icons and buttons stay the same in every theme. That's on purpose: it keeps
every theme readable and keeps Glyph looking like Glyph. Text that sits
directly on the glow switches to dark ink by itself when the light behind it
is very bright.

## Start from a built-in theme

The built-in themes are good references. Copy one and shift it:

| Theme | accent | glow (dark, middle, bright) | base |
| --- | --- | --- | --- |
| Glyph | `#ff5fd2` | the views' own colours | `#030303` |
| Ember | `#ff8a3d` | `#3a1206` `#ff6516` `#ffc04a` | `#050302` |
| Ocean | `#4da3ff` | `#06124a` `#1d5cff` `#46dcff` | `#020308` |
| Forest | `#3ddc84` | `#04210f` `#1f9d55` `#9cf0b8` | `#020503` |
| Violet | `#b07cff` | `#16052f` `#6526d6` `#b88dff` | `#040208` |
| Crimson | `#ff4d5e` | `#360404` `#b11d0b` `#ff6a4d` | `#060202` |
| Mono | `#e8e8e8` | `#101010` `#5a5a5a` `#d0d0d0` | `#030303` |

And the first-party plugins in [glyphmusic/plugins](https://github.com/glyphmusic/plugins/tree/main/themes):
Aurora (`#3ee6c1` on `#0b0a3a` `#1f8f9e` `#7cf5c8`), Sakura (`#ffb7d0` on
`#2e0a1c` `#c2507e` `#ffd3e2`) and Citrus (`#d4f54a` on `#1a2204` `#7fae12`
`#f3f57a`).

## Rules of thumb

### The glow ramp

- **Keep one hue family**, getting lighter and a bit less saturated from dark
  to bright. Ember goes deep brown → orange → warm yellow. A ramp that jumps
  between unrelated hues looks muddy where they blend.
- **dark** should be really dark: lightness around 10–20 %. It covers large
  areas; too bright and the whole window looks washed out.
- **middle** carries the theme. Make it saturated: lightness 40–55 %,
  saturation 70 % or more.
- **bright** is a highlight: lightness 70–85 %. Pure white looks harsh; a
  tinted near-white glows.
- A small hue shift along the ramp adds depth: Aurora goes from night blue
  through teal to mint.

### The accent

- **Readable on dark panels**: aim for a contrast ratio of at least 4.5:1
  against `#141414` (any WCAG contrast checker works). Most saturated colours
  with 60 % lightness or more pass; dark blues and deep reds often don't.
- **Related to the glow, but not the same**: the accent is often a lighter,
  more saturated version of the glow's middle (Ocean: `#4da3ff` over
  `#1d5cff`). An accent that complements the glow (coral on deep blue) works
  too, if it stays bright.
- **Not white or grey**, unless you build a monochrome theme like Mono: a grey
  accent makes the playing song hard to spot.

### The base

- Put a trace of the glow's hue in it: Ocean's `#020308` is black with a breath
  of blue.
- Stay well under the limit. Bases around `#08` per channel or lower look
  like the built-in themes; near `#24` the window starts to look grey.

## Palette ideas

| Idea | accent | glow | base |
| --- | --- | --- | --- |
| Deep sea, warm highlight | `#ff7a6b` | `#06103a` `#2a4fd6` `#ff9b8a` | `#020308` |
| Synthwave | `#ff4fd8` | `#14052e` `#7a1fd1` `#3fd8ff` | `#05020a` |
| Matcha | `#b6e388` | `#0d1a08` `#4f7d2a` `#d8f0b0` | `#030502` |
| Gold on black | `#f2c14e` | `#1c1203` `#9a6a10` `#f7dc8a` | `#040302` |
| Arctic | `#9fe3ff` | `#06141f` `#2b6f99` `#d9f4ff` | `#020406` |

## Check it on screen

Colour values on paper don't tell you how a theme feels. Try yours in Glyph
(see [Test your plugin](testing.md)) and look at:

1. **Nothing playing**: this is where your glow shows. Look at the beam and
   the ASCII characters.
2. **A song playing**: the glow follows the cover, but your accent marks the
   playing row and the player bar. Is the playing song easy to find?
3. **Hover the seek bar** in the player bar: it turns into the accent.
4. **Your library**: the Liked Songs tile uses a dark version of the accent.
5. **Low glow**: **Settings › Appearance › Glow strength** turned
   down. Does the theme still feel like itself?
6. **A phone or a small window**, if you can: less glow is visible, so the base
   matters more.

## Screenshots for your README

People decide on a theme by looking at it. A good README shows:

- the whole window with nothing playing (the glow at its best),
- a list with a song playing (the accent in use),
- optionally the start-up animation.

Put the images in the repository (for example `screenshots/`) and link them
in your README together with `https://glyph.my/plugins/<your id>`.
