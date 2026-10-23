---
description: Your first Glyph theme in about ten minutes, from template to the catalog.
---

# Quickstart: your first theme

This walks you from nothing to a theme that anyone can install. You need a
GitHub account and Glyph. Nothing else.

## 1. Create the repository

Open [glyphmusic/plugin-template](https://github.com/glyphmusic/plugin-template)
and click **Use this template › Create a new repository**. Name it after your
theme, for example `glyph-midnight-coral`. Keep it **public**: Glyph can only
read public repositories.

You can also start from an empty repository. All you need is a file called
`glyph-plugin.json` at its root.

## 2. Fill in glyph-plugin.json

Open `glyph-plugin.json` in the repository (the pencil icon edits it in the
browser) and change it:

```json
{
  "$schema": "https://raw.githubusercontent.com/glyphmusic/plugins/main/schema/glyph-plugin.schema.json",
  "schema": 1,
  "id": "midnight-coral",
  "name": "Midnight Coral",
  "version": "1.0.0",
  "author": "your-github-name",
  "description": "Coral accent on a deep blue glow.",
  "license": "MIT",
  "kind": "theme",
  "theme": {
    "accent": "#ff7a6b",
    "glow": ["#06103a", "#2a4fd6", "#ff9b8a"],
    "base": "#020308"
  }
}
```

What matters:

- **`id`** is your plugin's permanent name: lowercase letters, digits and
  single dashes, 2–40 characters. Glyph stores the plugin under it, links use
  it (`glyph.my/plugins/midnight-coral`), and it must be unique across all
  plugins. Pick something specific; `blue` is probably taken.
- **`version`** starts at `1.0.0`. Raise it whenever you change something, or
  installed copies won't update.
- **`theme.accent`** is the colour of the Glyph logo, the playing song, the
  liked heart and the seek bar while you drag it.
- **`theme.glow`** is three colours, dark to bright, for the background glow
  while nothing plays.
- **`theme.base`** is the window background. It must stay almost black.

The `$schema` line is optional. Editors like VS Code use it to complete field
names and flag mistakes while you type.

Every field and rule is in the [manifest reference](manifest.md). Tips for
picking colours are in [Designing a theme](themes.md).

## 3. Try it in Glyph

You can see your theme before you publish it.

1. In Glyph, open **Settings › Plugins**, go to **Plugins folder** at the bottom
   and click **Open folder**.
2. In that folder, create a folder named exactly like your `id`
   (`midnight-coral`).
3. Save your `glyph-plugin.json` in it.
4. Back in Glyph, click **Reload**.

Your theme now appears under **Installed** marked as *local*. Click **Use**.
Change a colour in the file, click **Reload** again, and Glyph shows the new
colour right away. [Test your plugin](testing.md) has more ways to check it.

## 4. Check it

The template runs a **Validate** check on every push. It uses the same rules
as Glyph. A green check means Glyph will accept the file; a red one names the
problem in its log.

On your own machine, with Node.js 20 or newer:

```sh
curl -fsSLO https://raw.githubusercontent.com/glyphmusic/plugins/main/scripts/manifest.mjs
curl -fsSLO https://raw.githubusercontent.com/glyphmusic/plugins/main/scripts/validate.mjs
node validate.mjs path/to/glyph-plugin.json
```

```
✓ glyph-plugin.json: Midnight Coral 1.0.0 (id midnight-coral, theme)
  accent  #ff7a6b
  glow    #06103a  #2a4fd6  #ff9b8a
  base    #020308
```

In a terminal with colour, each value shows its colour next to it.

## 5. Publish it

On your repository's page, click the gear next to **About** and add the topic
**`glyph-plugin`**. Save.

That's it. GitHub's search picks the topic up within minutes. Glyph refreshes
its catalog when you open **Settings › Plugins**, at most once an hour
(**Refresh** forces it). Your theme then shows up under
**Community**, with your repository's stars.

Remove the copy from the `plugins` folder before you install the published
version: a local plugin and a GitHub plugin can't share an `id`.

## 6. Share it

Your theme has its own page: `https://glyph.my/plugins/midnight-coral`. It shows
the colours, and its background glows in your theme's colours. **Install in
Glyph** opens the app on your theme, ready to install.

Put that link in your README, together with a screenshot of Glyph wearing your
theme.

## 7. Update it

Change what you want, raise `version` (`1.0.0` → `1.1.0`), push. Glyph installs
the new version for everyone who has your theme, unless they turned off
**Update automatically**.

## Next

Want more than colours? [Extensions](extensions.md) rename texts, add
settings and song menu entries, and run code.


- Get your theme under **Listed**: [Publish and update](publishing.md#get-listed)
- Understand what happens behind the scenes: [How plugins work](how-it-works.md)
- Something doesn't work: [Troubleshooting](troubleshooting.md)
