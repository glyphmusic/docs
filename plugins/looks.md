---
description: Restyle all of Glyph with a theme or extension: fonts, corners, icons, background pictures and a style sheet for every window, menu and dialog.
---

# Looks

A theme changes colours. A **look** can change the whole interface: the
font (also your own), how round corners are, Glyph's icons, pictures for the
background, and a style sheet that reaches every part of Glyph: the main
window, settings, menus, dialogs, toasts, tooltips and the mini player. A look
is pure data, so it works in themes and in extensions without code, and
installs from **Community** too.

```json
{
  "schema": 2,
  "id": "paper",
  "name": "Paper",
  "version": "1.0.0",
  "kind": "theme",
  "theme": { "accent": "#f2c14e", "base": "#0a0806" },
  "look": {
    "radius": 0.4,
    "backgrounds": ["backgrounds/paper.webp"],
    "css": "look.css",
    "assets": ["fonts/Literata.woff2", "textures/grain.png"],
    "icons": { "heart": "icons/heart.svg", "heart-fill": "icons/heart-fill.svg" }
  }
}
```

Every field is described in the [manifest reference](manifest.md#look).

## When a look shows

- A **theme's** look shows while people use that theme, together with its
  colours.
- An **extension's** look shows while the extension is turned on.
- Pictures always show up in **Settings › Appearance › Background picture**
  (with the plugin's name under them) while the plugin is installed and on.
  People pick them there; a look never switches the background by itself.
- **Settings › Plugins** always looks like Glyph. While it (or a plugin's
  install warning) is open, every look pauses: the plugin warnings stay
  readable, and people can always turn a look off. `Ctrl+Alt+P` (`⌘⌥P` on a
  Mac) opens it from anywhere, so even a look that hides everything can be
  undone.

## Fonts

`font` picks one of Glyph's font stacks: `inter` (the default), `system`,
`rounded`, `serif` or `mono`. These come from the system.

For your own font, put the file into `assets` and load it in the style sheet:

```css
@font-face {
  font-family: "Literata";
  src: url("fonts/Literata.woff2") format("woff2");
  font-weight: 200 900;
}
:root { --font: "Literata", Georgia, serif; }
```

Glyph uses `--font` everywhere. `--mono` is the monospaced font (ASCII art,
numbers).

## Corners

`radius` scales Glyph's corner radius (`--radius`, 10 px): `0.5` gives 5 px,
`2` gives 20 px. Your style sheet can read it as `var(--radius)` and the
factor as `var(--radius-k)`, or set any corner itself.

## Icons

`icons` replaces Glyph's icons by name: `"heart": "icons/heart.svg"`. Glyph
draws an icon as a mask in the current text colour, so only the shape counts:
draw it black or with `currentColor` on a 24 × 24 box, like Glyph's own set.
Toggles show `<name>-fill` when they are on (`heart-fill`, `pin-fill`,
`list-music-fill`, `thumbs-up-fill`, `layout-split-fill`,
`picture-in-picture-2-fill`); replace both so they match. The names are the
file names in Glyph's icon folder
([assets/icons/ui](https://github.com/glyphmusic/apps/tree/main/assets/icons/ui)),
without `.svg`. Icons you don't list stay Glyph's.

## Background pictures

Up to 8 pictures, `.png`, `.jpg` or `.webp`, at most 8 MB each. Big screens
show them up to 3840 pixels wide; a 2560 × 1440 WebP of 300-800 KB is a good
size. People can darken and blur the picture, but calm pictures without bright
spots in the middle work best.

## The style sheet

`css` points to a style sheet in your repository. Glyph adds it after its own
styles, for the whole interface. Anything CSS can do is allowed: change
colours, sizes, spacing and fonts, move things with grid and flex, hide parts
with `display: none`, add borders, shadows or textures.

### Hooks you can rely on

Glyph's own class names can change in any version. These stay:

| Selector | What it is |
| --- | --- |
| `:root` | the whole app (set variables here) |
| `[data-skin]` | the main window (computer) or the phone screens |
| `[data-part="titlebar"]` | the bar at the top with search |
| `[data-part="sidebar"]` | the left sidebar |
| `[data-part="page"]` | the page in the middle |
| `[data-part="side-panel"]` | the right panel (queue, lyrics, devices) |
| `[data-part="player-bar"]` | the player bar at the bottom |
| `[data-part="settings"]` | the settings window |
| `[data-part="menu"]` | right-click menus (and the menus that slide up on phones) |
| `[data-part="dialog"]` | dialogs (confirm, new playlist, rename) |
| `[data-part="toasts"]` | the messages at the bottom |
| `[data-part="tooltip"]` | tooltips |
| `[data-part="mini-player"]` | the mini player (bar and card) |
| `[data-part="tab-bar"]` | the tabs at the bottom (phones) |
| `[data-part="mini-bar"]` | the small player above the tabs (phones) |
| `[data-part="now-playing"]` | the full-screen player (phones) |

### Variables

Set them on `:root`. The most useful ones:

| Variable | What it is |
| --- | --- |
| `--font`, `--mono` | fonts |
| `--ink` | text colour as `r, g, b` (light by default; Glyph flips it on bright backgrounds) |
| `--text`, `--dim`, `--faint`, `--ghost` | text at full, 72 %, 56 % and 22 % strength |
| `--panel`, `--panel-strong`, `--panel-light` | panel fills |
| `--card`, `--card-hover`, `--hover`, `--active` | cards and hover / pressed fills |
| `--border`, `--border-strong`, `--border-faint` | lines |
| `--danger`, `--ok`, `--warn` | red, green, yellow |
| `--radius` | corner radius |
| `--gap` | space between panels |
| `--page-x`, `--page-top` | page margins |
| `--titlebar-h`, `--player-h` | heights of the titlebar and the player bar |
| `--xs`, `--sm`, `--md`, `--lg` | text sizes |

The accent and the window background come from the theme (`--accent`,
`--bg`); a look can override them too.

```css
:root {
  --panel: rgba(10, 8, 6, .82);
  --gap: 14px;
  --border: rgba(242, 193, 78, .25);
}
[data-part="sidebar"] {
  background: url("textures/grain.png"), var(--panel);
}
[data-part="player-bar"] {
  border-radius: calc(var(--radius) * 2);
}
[data-part="titlebar"] .logo {
  display: none;
}
```

Glyph's own styles are specific (`.row.svelte-1x2y3z`). If a rule does not
win, make your selector more specific or add `!important`.

### Rules

Glyph refuses to install a look whose style sheet:

- is larger than 128 KB or not UTF-8 text,
- uses `url()` for anything but a file listed in `assets` (no web
  addresses, no `data:`),
- uses `@import`, `image-set(`, `image(`, `src(`, `element(`, `@namespace`,
  `@charset` or old script hooks (`expression(`, `javascript:`,
  `-moz-binding`, `behavior:`),
- contains a backslash (`\`) or `<` (escapes could hide the words above),
- has a `}` without a `{`, a `{` without a `}`, an unclosed comment or an
  unclosed string.

Glyph puts the assets into the style sheet itself before it applies it, so a
look never loads anything from anywhere. `node validate.mjs` (see
[Test your plugin](testing.md)) runs the same checks on your files.

## Make your own look

You don't have to publish anything to restyle your own Glyph:

1. Open the plugins folder (**Settings › Plugins**, folder button).
2. Make a folder named like your look's id, for example `my-look`.
3. Put a `glyph-plugin.json` into it, with a `look` and your `look.css`
   (and any fonts, pictures and icons next to it).
4. Click **Reload** in **Settings › Plugins**.

Edit the style sheet and click **Reload** again to see the change. If
something goes wrong, `Ctrl+Alt+P` brings you back to **Settings › Plugins**
in its normal look.
