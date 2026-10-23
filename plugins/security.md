---
description: Plugins are made by other people. What Glyph checks, what it does not, and how it keeps plugins from doing harm.
---

# Trust and safety

## Plugins are other people's work

Plugins are made by their authors, not by Glyph. Glyph has nothing to do with
them and **cannot say whether a plugin is good or bad. You install plugins at
your own risk.** Glyph says this in three places:

- a note on the Plugins page and on every plugin's detail view,
- the same note on [glyph.my/plugins](https://glyph.my/plugins), with a warning
  above **Install in Glyph** that names the author,
- a confirmation before the **first install** of each plugin: "Install a
  plugin by someone else?" with **Install anyway** and **Cancel**. **Don't
  show this again** turns it off (setting `plugins.skip_install_warning`).

## What "Listed" means, and what it doesn't

| Listed means | Listed does not mean |
| --- | --- |
| the manifest at a pinned commit passed every rule | anyone judged how it looks or works |
| Glyph installs exactly that commit | the author is trustworthy |
| a maintainer merged the pull request | Glyph recommends it |

**Community** plugins skip even that: they come straight from a repository
with the topic, read from its newest commit.

## What a theme can do

A theme is a JSON file with a few colours. Glyph never runs anything from it:

- **No code.** Glyph reads exactly the documented fields. Unknown fields are
  ignored; nothing in the file is executed or interpreted.
- **Checked values.** Every colour must be `#rrggbb`, text fields have length
  limits, the id may only contain `a-z`, `0-9` and `-`, and the file may be at
  most 256 KiB. A file that breaks a rule is refused.
- **No paths from outside.** The id becomes a folder name only after it passed
  the id rule, so a manifest can't write anywhere but `<data>/plugins/<id>/`.
  The folder name must match the id when Glyph reads it back.
- **Readable by force.** The background colour must stay near black, so a theme
  can't make Glyph's text unreadable.
- **No network access of its own.** A theme can't make Glyph contact anyone.
- **No silent takeover.** Updates must come from the same repository as the
  installed plugin, and another repository can't replace a plugin by reusing
  its id.

The worst a theme can do is look bad. Remove it with the bin icon; if it was
in use, Glyph switches back to the default theme.

## Extensions without code

Texts (`strings`) and hidden rows (`hide`) contain no code either, so they may
come from **Community** like themes. Their limits:

- The install warning, the plugin pages, the account and the assistant access
  can't be reworded or hidden (`plugins.*`, `account.*`, `mcp.*`).
- Switching the plugin off or removing it brings back every text and row.

The worst such a plugin can do is mislabel something; that is why the install
warning still applies.

## Plugins with code

Code is a different matter, so it gets stricter rules:

- **Listed only.** Code installs only from the index, where each version is
  pinned to a commit and a maintainer merged it. The topic alone is not
  enough. Plugins in your own plugins folder (local) also run: you put them
  there.
- **A sandbox.** The code runs in a WebAssembly interpreter inside Glyph, on
  its own thread. It has no access to files, the system, other programs or
  Glyph's memory. The only way out is a JSON call to Glyph, and Glyph answers
  only what the plugin's permissions allow.
- **Permissions shown before install.** "Run its own code", "Control playback
  and the queue, and see what plays", "Read and change your playlists …",
  "Search music", "Read and change Glyph's settings …", "Contact
  api.example.com". The warning lists each one on first install, and the
  **Don't show this again** box doesn't skip that code confirmation.
- **Updates that want more ask again.** A new permission or host stops the
  automatic update until you agree.
- **Network per host.** `net.fetch` reaches only the hosts the manifest names,
  over https, without following redirects and without cookies. A plugin
  without the `network` permission can't send anything anywhere: what it sees
  stays on your device.
- **What settings access can't touch.** API keys, passwords, the server
  address, device-bound values and where Glyph updates itself from are never
  readable or writable by plugins.
- **Budgets.** Every event has a work budget, memory is capped at 64 MiB,
  storage at 1 MiB. A plugin that keeps failing is stopped and named.
- **Off switch.** Every extension can be switched off without removing it;
  anything it added to Glyph (settings sections, menu entries, toasts) names
  it, so you know which plugin to blame.

Even so, the principle holds: Glyph checks the rules, not the intent. A
plugin with the `library` and `network` permissions could send your playlists
to its host, which is exactly what its warning says. You install at your own
risk.

## What your installs reveal

- Loading the catalog talks to GitHub only (`raw.githubusercontent.com`,
  `api.github.com`), without a login. GitHub sees your IP address and Glyph's
  version, as with any website.
- Glyph doesn't report which plugins you install or use, to the Glyph server or
  anyone else. Plugin code may contact the hosts its warning named.
- Your installed plugins stay on your device. Account sync carries your theme
  setting (as part of your appearance settings) but not the plugins themselves.

## Report a plugin

- A problem with a plugin's content: contact the author through its
  repository (issues).
- A listed plugin that breaks the rules or is harmful: open an issue on
  [glyphmusic/plugins](https://github.com/glyphmusic/plugins/issues). It can be
  removed from the index; Glyph then no longer offers it.
- A plugin that abuses GitHub (spam, malware, impersonation): report it to
  GitHub with **Report repository** on the repository page.
- A way a manifest could make Glyph misbehave: that's a security problem in
  Glyph. Report it privately to the contact in
  [glyph.my/.well-known/security.txt](https://glyph.my/.well-known/security.txt),
  not in a public issue.

## Service credentials and managed calls

Plugins use user-supplied service credentials declared as secret settings
fields; they never inherit Glyph's Last.fm key or account/server tokens.
Required fields keep the code stopped until setup is complete. See
[Services and keys](services.md) for storage, network boundaries and limits.

The host accepts an explicit list of function names and rechecks permissions
at the app boundary. Stale runtime generations cannot execute queued calls.
UI searches share the service budget with API searches. Direct network calls
cannot reach local/private addresses or Glyph server destinations, and use
neither environment proxies nor the app's authenticated HTTP client.
Normal host actions still obey server authentication, quotas and bans. Server
policy must never trust plugin identity headers supplied by the client.
