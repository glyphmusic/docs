---
description: Restyle all of Glyph with a theme or extension: fonts, corners, icons, the app icon, the order of the home page and sidebar, background pictures and a style sheet for every window, menu and dialog.
---

# Looks

A theme changes colours. A **look** can change the whole interface: the
font (also your own), how round corners are, Glyph's icons, the app icon,
pictures for the background, and a style sheet that reaches every part of Glyph: the main
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
    "font": "fonts/Literata.woff2",
    "app_icon": "icon.png",
    "radius": 0.4,
    "backgrounds": ["backgrounds/paper.webp"],
    "css": "look.css",
    "assets": ["textures/grain.png"],
    "icons": { "heart": "icons/heart.svg", "heart-fill": "icons/heart-fill.svg" }
  }
}
```

Every field is described in the [manifest reference](manifest.md#look).

## Which Glyph a look needs

Set [`min_app`](manifest.md#min_app) to the newest version your look needs:
`0.12.11` for a look at all, `0.13.6` if it uses `app_icon`, an own font file,
`mono`, `home`, `sidebar`, `tabs`, `sidebar_position` or `splash`. An older
Glyph ignores parts it doesn't know and would install the plugin without
them, so the index check refuses a lower `min_app`.

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
  undone. The plugin's page there shows a **preview** instead: its app icon,
  the icons it replaces, its background pictures and its startup animation
  (loaded from GitHub at the listed commit).
- The plugin's page also lists what the look **replaces of people's own
  settings** (background and colours for a style sheet, font, corners, app
  icon, layout, startup animation, icons, texts), and shows **Plugin
  conflict** when another plugin in use changes the same thing.

### Two plugins, one thing

Only one plugin can set the font, the corners, the app icon, an icon, a text,
the layout, the sidebar position or the startup animation. Glyph shows
"Plugin conflict" on both plugins' pages and says which one wins. People
pick the winner there with **Use this one**, and Glyph remembers it. Until
they pick, the plugin whose **name comes first** wins.
Style sheets all apply, one after another.

## Fonts

`font` picks the font for all text in Glyph. It is one of Glyph's font
stacks, `inter` (the default), `system`, `rounded`, `serif` or `mono`, which
come from the system, or the path of your own font file:

```json
"look": { "font": "fonts/Literata.woff2", "mono": "fonts/Code.woff2" }
```

`mono` is the same for the monospaced font (numbers, ASCII art). A font file
is a `.woff2`, `.woff`, `.ttf` or `.otf`, at most 2 MB; `.woff2` is the
smallest. Glyph uses it everywhere, also in menus, dialogs and the mini
player. A variable font gives every weight from one file; a font with only one
weight shows all text in that weight. Own font files and `mono` need Glyph 0.13.6 or newer;
older versions wait with the plugin until they are updated.

For more control (several weights, italics), put the files into `assets` and
load them in the style sheet:

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

## App icon

`app_icon` replaces Glyph's app icon with your own:

```json
"look": { "app_icon": "icon.png" }
```

The file is a square `.png`, 64 to 1024 pixels (512 × 512 is a good size), at
most 1 MB. Glyph shows it on the window, the taskbar, the tray and the Dock on
a Mac, and on Android in the app overview. Glyph scales big icons down to
256 pixels for the window and tray. The icon on the Android home screen, the
desktop, the Windows Start menu and a pinned taskbar stays Glyph's, because
the system only lets apps pick from icons they ship with. On Android, the
plugin's page has **Add to home screen**: it puts a Glyph shortcut with your
icon on the home screen (Android asks first).

If the icon has the wrong size or is missing, the plugin's page says so under
"These parts of the look don't work", and Glyph keeps its own icon.

The icon shows while the look is in use: a theme's while that theme is picked,
an extension's while it is on. Turn the plugin off and Glyph's icon comes back.
If two plugins bring an app icon, the one that wins the conflict is used. `app_icon` needs
Glyph 0.13.6 or newer.

## Home page, sidebar and tabs

`home`, `sidebar` and `tabs` put parts of Glyph in a new order or hide them:

```json
"look": {
  "home": { "order": ["mixes", "recent"], "hide": ["trending", "greeting"] },
  "sidebar": { "order": ["lists"], "hide": ["now_playing"] },
  "tabs": { "order": ["library", "home", "search"] }
}
```

`order` lists the parts that come first; the others follow in Glyph's order.
`hide` lists the parts that go away. Both are optional.

| Area | Parts |
| --- | --- |
| `home` (the home page) | `greeting`, `cards` (the big cards at the top), `recent`, `new_releases`, `mixes`, `recs` (recommended), `trending` (popular) |
| `sidebar` (computer) | `home`, `search`, `library`, `now_playing`, `lists` (your recent lists and artists) |
| `tabs` (the tabs at the bottom on phones) | `home`, `search`, `library` |

Settings always stays in the sidebar, and a look never hides every tab, so
people can always reach **Settings › Plugins**. A name Glyph does not know is
skipped, so a layout made for a newer Glyph still works. If two plugins change
the same area, the first one by name wins. These fields need Glyph 0.13.6 or
newer.

## Sidebar on the right

`sidebar_position` puts the sidebar on the right side of the window on
computers:

```json
"look": { "sidebar_position": "right" }
```

The side panel with the queue, lyrics and devices then opens on the left.
Dragging the edges to resize and the tooltips follow. `"left"` is Glyph's
normal layout. Phones are not changed. Glyph 0.13.6 or newer.

## Startup animation

`splash` replaces the Glyph note that the characters fly together into when
Glyph starts:

```json
"look": {
  "splash": {
    "art": [
      "  .--.  ",
      " ( ** ) ",
      "  `--'  "
    ],
    "tint": [
      "        ",
      "   pp   ",
      "        "
    ],
    "speed": 1
  }
}
```

- `art`: up to 40 rows of up to 60 characters. Use printable ASCII
  characters (letters, digits, `.-*#@/\|` and so on); spaces stay empty.
- `tint` (optional): the same rows again. A `p` draws the character at that
  place in the accent colour, anything else in white.
- `speed` (optional): from `0.5` (slow) to `2` (fast); `1` is Glyph's.

Glyph learns about a look only after it has started, so the new animation
shows from the next start on. People who turned the startup animation off in
**Settings › Appearance** see none. Glyph 0.13.6 or newer.

## Corners

`radius` scales every corner of the interface: `0.5` makes them half as
round, `2` twice as round, `0` square. Round shapes (circles, pills) stay
round. Glyph's base radius (`--radius`, 10 px) follows too: `0.5` gives 5 px,
`2` gives 20 px. Your style sheet can read it as `var(--radius)` and the
factor as `var(--radius-k)`, or set any corner itself; the corners in your
style sheet are not scaled. Before Glyph 0.13.7, `radius` only changed a few
panels; before 0.13.8, covers, loading boxes and some menus kept their corners.

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
