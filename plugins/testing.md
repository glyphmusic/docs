---
description: Try your plugin in Glyph before you publish it, check it with the validator, and preview it on the website.
---

# Test your plugin

You can see and check a plugin completely on your own machine. Nobody else
sees it until you add the `glyph-plugin` topic.

## 1. Use it in Glyph as a local plugin

Glyph treats any folder in its plugins folder that has a `glyph-plugin.json`
but no `origin.json` as a **local** plugin.

1. Open **Settings › Plugins**. At the bottom, under **Plugins folder**, click
   **Open folder**. (It is `<data>/plugins`; see the table below.)
2. Create a folder named **exactly like your `id`**, for example
   `midnight-coral`.
3. Put your `glyph-plugin.json` in it:

   ```
   plugins/
   └── midnight-coral/
       └── glyph-plugin.json
   ```

4. Click **Reload** next to **Open folder**.

Your plugin appears under **Installed** with *local* in its line. Click
**Use**, or pick its swatch in **Settings › Appearance › Colour theme**.

### The edit loop

Keep the file open in your editor next to Glyph:

1. change a colour, save,
2. click **Reload** in Glyph.

**Reload** reads the folder again and, when your theme is the one in use,
applies it again (the glow fades over to the new colours). No restart needed.

| System | Plugins folder |
| --- | --- |
| Windows | `%APPDATA%\glyph\plugins` |
| macOS | `~/Library/Application Support/glyph/plugins` |
| Linux | `~/.local/share/glyph/plugins` (or `$XDG_DATA_HOME/glyph/plugins`) |
| any | `$GLYPH_DATA_DIR/plugins`, if you set `GLYPH_DATA_DIR` |

### If it doesn't appear

Glyph skips a folder silently when:

- the folder name and the `id` differ,
- the file isn't valid JSON or breaks a rule (run the validator below),
- the file isn't called exactly `glyph-plugin.json`.

### When you are done

Delete your local folder (or click the bin next to the plugin) before you
install the published version from GitHub. Installing over a local folder
turns it into the GitHub plugin and leaves your files in it behind.

## Extensions with code

The same folder holds the code. Put the built module where `main` points,
relative to the folder:

```
plugins/
└── now-playing-toast/
    ├── glyph-plugin.json      "main": "plugin.wasm"
    └── plugin.wasm
```

Local plugins run their code without being listed. The loop:

1. build (`cargo build --release --target wasm32-unknown-unknown`) and copy
   the `.wasm` into the folder (a symlink or a build script saves the copy),
2. click **Reload**: Glyph stops the old code, reads the folder again and
   starts the new code with a fresh `ready` event,
3. open the plugin's detail view (click its name under **Installed**): the
   **Log** section shows the last lines your code logged
   (`glyph::info`, `glyph::warn`) and why it stopped, if it did.

Things to try every time:

- switch the plugin off and on (its switch under **Installed**),
- change each of its settings rows, press each button, pick its song menu
  entry on a song,
- play, pause and skip songs if it has the `playback` permission,
- turn off the network or block its host: every call should fail softly,
- restart Glyph: what you stored with `storage.set` should still be there.

A plugin that keeps failing is stopped after three failures in a row; the
detail view says why ("took too long" means an event used up its budget,
usually a loop that never ends).

## 2. Check it with the validator

`validate.mjs` runs the exact rules Glyph uses. It needs Node.js 20 or newer
and nothing else.

```sh
curl -fsSLO https://raw.githubusercontent.com/glyphmusic/plugins/main/scripts/manifest.mjs
curl -fsSLO https://raw.githubusercontent.com/glyphmusic/plugins/main/scripts/validate.mjs
node validate.mjs                      # ./glyph-plugin.json
node validate.mjs themes/*/glyph-plugin.json
node validate.mjs https://raw.githubusercontent.com/you/glyph-midnight-coral/HEAD/glyph-plugin.json
```

A valid file prints a summary with its colours (as coloured blocks in a
terminal that supports it). For extensions it lists code, permissions, hosts,
settings, menus and texts, and checks that the `.wasm` `main` points to exists
next to a local manifest and is a WebAssembly module:

```
✓ glyph-plugin.json: Midnight Coral 1.0.0 (id midnight-coral, theme)
  accent  #ff7a6b
  glow    #06103a  #2a4fd6  #ff9b8a
  base    #020308
```

A broken one lists every problem and exits with code 1:

```
✗ glyph-plugin.json
  - version must be a semantic version like 1.0.0
  - theme.base must stay near black: each channel at most #24 (got #303030)
```

All messages are explained in the [manifest reference](manifest.md#rules).

## 3. Let GitHub check every push

The [template](https://github.com/glyphmusic/plugin-template) includes
`.github/workflows/validate.yml`. It downloads the same validator and runs it
on every push and pull request, and fails while the `id` is still
`change-me`. A red cross in your repository means Glyph won't accept the
file; the log of the failed step names the problem.

No template? Copy the workflow file into `.github/workflows/` of your
repository.

## 4. In your editor

Add the `$schema` line to your manifest:

```json
"$schema": "https://raw.githubusercontent.com/glyphmusic/plugins/main/schema/glyph-plugin.schema.json"
```

VS Code, JetBrains IDEs, Zed and most other editors then complete field names
and underline mistakes as you type, including settings rows and permissions.
The schema can't express every rule (the near-black limit for `base`, unique
row ids, protected text keys), so still run the validator.

## 5. After publishing

Once the topic is on your repository:

1. Wait a few minutes (GitHub's search needs a moment to pick up new topics).
2. In Glyph, open **Settings › Plugins › Browse** and click **Refresh**.
3. Search for your theme's name. It should be under **Community**.
4. Open `https://glyph.my/plugins/<your id>` in a browser. The page should show
   your colours, and **Install in Glyph** should open Glyph on your plugin.

Not there? See [Troubleshooting](troubleshooting.md).
