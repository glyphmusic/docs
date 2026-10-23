---
description: Publish a plugin with the glyph-plugin topic, get it listed in glyphmusic/plugins, ship updates, and share it.
---

# Publish and update

## Publish: add the topic

A public repository with a valid `glyph-plugin.json` at its root and the topic
`glyph-plugin` is a published plugin. To add the topic:

1. Open your repository on GitHub.
2. Click the gear next to **About** (top right of the file list).
3. Under **Topics**, type `glyph-plugin` and press Enter. Save.

Or with the GitHub CLI:

```sh
gh repo edit you/glyph-midnight-coral --add-topic glyph-plugin
```

Other topics are fine too (`glyph`, `theme`, `dark-theme`); only
`glyph-plugin` matters to Glyph.

Your plugin then appears under **Community** in Glyph and on
[glyph.my/plugins](https://glyph.my/plugins), usually within minutes. Glyph's
own cache is an hour, so an already open Glyph may need **Refresh**.

What people see: name, version, author, your repository's stars, the
description, the colours, and a link to your repository.

### Checklist before you publish

- [ ] The repository is **public**.
- [ ] `glyph-plugin.json` is at the **root** of the default branch.
- [ ] The `id` is your own (not `change-me`) and specific enough to be unique.
- [ ] `node validate.mjs` passes (or the Validate workflow is green).
- [ ] You tried it in Glyph as a local plugin.
- [ ] `author`, `description` and `license` are filled in, and a `LICENSE` file
      matches `license`.
- [ ] The README has a screenshot and the link `https://glyph.my/plugins/<id>`.

## Extensions with code

Everything below applies, plus:

- **Commit the built `.wasm`** at the path `main` names. Glyph downloads that
  file from the same commit as the manifest; it never builds anything.
- **Get listed.** Code installs only from **Listed**, so the topic alone
  shows your plugin but nobody can install it. The index CI checks that the
  `.wasm` exists at the pinned commit, starts with `\0asm` and is at most
  16 MiB.
- **New permissions slow updates down.** An update that adds a permission or
  a host waits for each user to agree, even with automatic updates on. Ask
  for what you need in the first version, and no more.
- **Keep a changelog** in your README: users see each update's version, not
  what changed.

## Get listed

Plugins under **Listed** come from `index.json` in
[glyphmusic/plugins](https://github.com/glyphmusic/plugins). Being listed
means: the manifest passed the rules, and Glyph installs exactly the commit you
named. It is no review of quality or safety (see [Trust and safety](security.md)).
For plugins with code, this is required for installation from the catalog.

To get listed, open a pull request on glyphmusic/plugins that adds one file,
`plugins/<id>.json`:

```json
{
  "repo": "you/glyph-midnight-coral",
  "path": "",
  "rev": "4f1c2b0e9d8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e"
}
```

| Field | Meaning |
| --- | --- |
| `repo` | your repository, `owner/name` |
| `path` | folder of the manifest inside the repository; `""` for the root |
| `rev` | the **full 40-character commit hash** of the version to list |

Rules the CI checks:

- the file is named after the plugin's `id` (`midnight-coral.json`),
- no other fields,
- `rev` is a full commit hash (not a branch or tag: those can move),
- the manifest at that commit passes every rule,
- the `id` isn't listed yet.

Get the commit hash with `git rev-parse HEAD`, or copy it from the commit list
on GitHub. The pull request template asks for name, repository and what the
plugin does; fill it in and tick the checklist.

The CI runs `node scripts/build-index.mjs --check` on your pull request. Once
it's merged, the CI rebuilds `index.json` and your plugin moves from
Community to Listed (it doesn't show in both).

Keep the `glyph-plugin` topic on your repository: it keeps the stars in
Glyph fresh, and if the index can't be reached, your plugin still shows up
under Community.

## Ship an update

1. Change the manifest and rebuild and commit the module if the code changed.
2. **Raise `version`.** `1.0.0` → `1.0.1` for a small tweak, `1.1.0` for a
   visible change, `2.0.0` for a new look.
3. Push.

| Your plugin is | Then |
| --- | --- |
| **Community** | Glyph reads `HEAD`. Everyone with your plugin gets the new version on their next catalog refresh (unless they turned off **Update automatically**, then they see **Update to …**). |
| **Listed** | Nothing happens until the index moves. Open a pull request that changes `rev` in `plugins/<id>.json` to the new commit. |

Glyph only updates to a **higher** version from the **same repository**. If
you push without raising `version`, new installs get the new file but existing
installs keep the old one.

An update that introduces code, adds permissions or adds network hosts needs
the user's confirmation. It stays pending even when automatic updates are
enabled. Explain those changes in your changelog.

### Things you can't change later

- **`id`.** A new id is a new plugin. People with the old one keep it and get
  no updates.
- **The repository.** Updates must come from the repository a plugin was
  installed from, and Glyph compares it by name (`owner/name`). If you rename
  or transfer the repository, people who already installed the plugin get no
  more updates; they have to remove it and install it again.

### Taking a plugin down

- Remove the `glyph-plugin` topic (Community), or open a pull request that
  deletes `plugins/<id>.json` (Listed). The plugin disappears from the catalog
  within an hour.
- People who installed it keep their copy; it simply gets no more updates.

## Share it

Every plugin in the catalog has a page:

```
https://glyph.my/plugins/<id>
```

It shows the description, version, author, license, stars, last update,
source and colours, with the page background glowing in your theme's colours.
**Install in Glyph** opens `glyph://plugin/<id>`, which opens Glyph on your
plugin, ready to install (after the usual warning for a first install).

Good places for the link: your README, release notes, social posts. Put a
screenshot next to it.

A direct app link works too, for example in a README badge:

```markdown
[![Install in Glyph](https://img.shields.io/badge/Install_in-Glyph-ff5fd2)](https://glyph.my/plugins/midnight-coral)
```

Link to the glyph.my page rather than to `glyph://` directly: the page works
for people who don't have Glyph yet and offers the download.
