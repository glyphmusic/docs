---
description: Language, text size, colour themes, the background visualizer, ASCII effects, performance mode, animations (GPU or CPU) and the mini player.
---

# Appearance

Everything here is under **Settings › Appearance**.

| Setting | What it does |
| --- | --- |
| Language | the interface language; empty follows your system |
| Text size | Small, Normal, Large or Extra large text in lists, headings and bars |
| Background visualizer | the shape of the glow behind the app (see below) |
| Glow strength | how strongly the glow shows behind the interface |
| Music reaction | how strongly the glow moves with the music |
| Show covers as ASCII art | draws covers through the ASCII ramp |
| Colour theme | accent colour and background while no song brings its own colours; [plugins](plugins.md) add more |
| ASCII effects | text and pictures decode in, loading placeholders shimmer as ASCII |
| Mini player | a slim bar or a card with a big cover |
| Performance | **Full effects** or **Performance mode** (see below) |
| Animations | **Graphics card (GPU)** or **Processor (CPU)** draws the background (see below) |
| Save power in the background | the glow runs at 10 fps while Glyph is not the active window |
| Startup animation | streams of light form the logo when Glyph starts |

## Background visualizer

The glow behind Glyph has four shapes: **Beam**, **Band**, **Sunrise** and
**Horizon**. With **Automatic (per song)** every song picks one; choose a shape
to keep your favourite for every song and page. The colours still change with
each song.

**Solid** shows one plain colour instead of a glow. When it is picked, a
**Colour** row lets you choose it: the theme's own colour, a few dark ones, or
any colour you like.

## Text size

Text size changes the text, not the layout: buttons, covers and spacing keep
their size. Each device keeps its own text size; it is not synced.

## Performance mode

**Performance mode** makes Glyph lighter on older computers, laptops on
battery and phones:

* the background moves at half the frame rate and is drawn on a coarser grid,
* the ASCII characters in the background are redrawn less often,
* text and pictures no longer decode in, loading placeholders are plain boxes,
* panels and dialogs no longer blur what is behind them.

The colours and shapes stay the same. Each device keeps its own choice; it is
not synced.

## Animations

**Animations** chooses who draws the moving background:

* **Graphics card (GPU)**, the default: the graphics card draws the glow and
  its characters, so the processor stays almost free. A device whose graphics
  card cannot do it (no WebGL 2) uses the processor instead, and the setting
  says so.
* **Processor (CPU)**: the processor draws everything, without the graphics
  card. Pick this when the background flickers, stays black or looks wrong. It
  uses more power.

Both look the same, and the change takes effect at once. It works together
with performance mode. Each device keeps its own choice; it is not synced.
