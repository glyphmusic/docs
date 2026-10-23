---
description: Every command and flag of the glyph CLI, with ready-to-run examples for common tasks: status, own server, Cloudflare, the YouTube companion, live settings, bans and remote management. Written so people and AI agents can act on it.
---

# CLI reference

The `glyph` command sets up, runs and manages a Glyph server: one on this
machine, one on Cloudflare, or one anywhere else through its admin API.

Install with `npm install --global glyph-server` (Node.js 22+). The package
downloads the matching native binary and checks its SHA-256. Every help text
ends with a link to this page:

```bash
glyph help                 # all commands
glyph <command> --help     # one command, e.g. glyph remote ban --help
```

This page as Markdown: `https://docs.glyph.my/self-hosting/cli.md`. All docs in
one file: `https://docs.glyph.my/llms-full.txt`.

## For AI agents

- Add `--json` to get machine-readable output. Errors then print
  `{"error": {"code", "kind", "message", "hint"}}` on stdout, and the exit
  code tells what went wrong (see [exit codes](#exit-codes)).
- Read-only commands are safe to run any time: `glyph status`,
  `glyph version all`, `glyph check all`, `glyph doctor`, `glyph config list`,
  `glyph remote status`, `glyph remote stats`, `glyph remote ban list`,
  `glyph remote accounts show <handle>`, `glyph companion status`,
  `glyph remote keys list`, `glyph remote logs`.
- Changes to a live server take effect at once and affect every user of it.
  Run them with `--dry-run` first, show the operator what would change, and
  only then run them for real. On a terminal they ask before changing
  anything; `--yes` skips the question. Without a terminal (scripts, agents)
  they do not ask.
- Secrets are asked for without echo. Do not pass them as arguments (they end
  up in shell history); use `--password-stdin` or the environment variables
  named below in scripts.

## Common tasks

| Goal | Command |
| --- | --- |
| See everything at a glance | `glyph status` |
| Find out why YouTube does not play | `glyph check companion` |
| Stop a server from using its YouTube companion (everyone) | `glyph companion off --server <url>` |
| Answer every companion request with 403 (on the companion machine) | `glyph companion off` |
| Let only signed-in apps use the server | `glyph config set require_account true --server <url>` |
| Allow fewer requests per client | `glyph config set rate_limit_per_min 30 --server <url>` |
| Limit YouTube songs per user and day | `glyph remote limits --youtube-per-day 200` |
| Keep YouTube for signed-in accounts | `glyph remote limits --youtube-require-account true` |
| Ban an account, its addresses and its devices | `glyph remote ban account somehandle` |
| Ban an address or a range | `glyph remote ban ip 203.0.113.0/24` |
| Ban one device (survives reinstalling the app) | `glyph remote ban device somehandle <device-id>` |
| Lift a ban | `glyph remote unban somehandle` (or the ban id, IP, hash) |
| Sign out the devices of an account | `glyph remote accounts revoke somehandle` |
| Lock a self-hosted server with a shared token | `glyph access` |
| Give one account more devices | `glyph remote accounts limit somehandle 10` |
| Stop AI assistants from controlling apps through the server | `glyph remote mcp off` |
| Watch the server log | `glyph remote logs --follow` |
| Switch between servers | `glyph remote list`, `glyph remote use <url>` |
| Update a self-hosted server | `glyph update server` |

## Global options

| Option | Does |
| --- | --- |
| `--json` | machine-readable output, errors included |
| `--dry-run` | show what a change would do, change nothing |
| `-y`, `--yes` | do not ask before changes |
| `--config <file>` | `server.toml` to use (env `GLYPH_CONFIG`, default `./server.toml`) |
| `--bind <addr>` | address to listen on (default `0.0.0.0:8787`) |
| `--version` | CLI version |

## Exit codes

| Code | Meaning | What to do |
| --- | --- | --- |
| 0 | done | |
| 1 | other error | read the message |
| 2 | wrong or missing arguments | `glyph <command> --help` |
| 3 | not logged in to that server | `glyph remote login <url>` |
| 4 | server not reachable | check the address: `glyph check server --server <url>` |
| 5 | wrong password, expired login or forbidden | log in again |
| 6 | not found (account, device, ban, or an older server) | check the name; `glyph remote update` |
| 7 | you answered "no", nothing changed | |

`glyph doctor` exits 1 when it finds a problem.

## Status, versions and updates

Targets: `cli`, `server`, `companion`, `r-dlp`, `all`.

| Command | Does |
| --- | --- |
| `glyph status [--server <url>]` | CLI version, the selected server, its sources, limits, accounts and bans |
| `glyph version [target]` | installed and running versions (default `cli`) |
| `glyph check [target]` | connectivity, tools (r-dlp, yt-dlp, FFmpeg) and newer releases (default `all`) |
| `glyph update [target] [--check]` | update one component (default `cli`); `--check` only looks |
| `glyph doctor` | check config, keys, ports and reachability on this machine |

`version`, `check` and `update` take `--server <url>` (a remote server) or
`--local` (only this machine). With npm and Docker Compose:
`glyph check|version|update companion|r-dlp --compose-dir /path/to/project`.
For a Cloudflare server: `glyph update server --worker-config wrangler.json`.

## Settings: one command, three places

`glyph config` reads and changes settings wherever they live:

| Where | Command | Applies |
| --- | --- | --- |
| `server.toml` on this machine | `glyph config set rate_limit_per_min 120` | on the next start |
| a running server (logged in) | `glyph config set rate_limit_per_min 120 --server <url>` | at once |
| a Cloudflare project (npm) | `glyph config set RATE_LIMIT_PER_MIN 120 --worker-config wrangler.json` | on the next `glyph deploy` |

| Command | Does |
| --- | --- |
| `glyph config list` | every option, its value, where it comes from and its default |
| `glyph config get <key>` | one option (`keys.*` only shows whether it is set) |
| `glyph config set <key> [value]` | change an option; `keys.*` without a value is asked for hidden |
| `glyph config unset <key>` | back to the default |
| `glyph config path` | path of `server.toml` |

Live settings (`--server`): `require_account`, `rate_limit_per_min`,
`youtube_daily_budget_units`, `youtube_per_day`, `import_max_pages`,
`playlist_max_tracks`, `companion_enabled`, `mcp_relay`, `audio_cache_days`,
`audio_cache_max_gb`, `d1_max_mb` and `keys.<name>`.

## Own server

| Command | Does |
| --- | --- |
| `glyph` / `glyph serve` | run the server |
| `glyph setup` | answer a few questions, writes `server.toml` |
| `glyph service install\|uninstall\|status` | run at boot (systemd, launchd, Windows service) |
| `glyph access` | require a shared bearer token (asked for twice, 32-256 characters) |
| `glyph access --disable` | make the server public again |
| `glyph companion on\|off\|status` | switch the YouTube companion on this machine |

`glyph access` and `glyph companion` take effect within seconds, no restart.
`glyph companion off` on the companion machine answers every request with
403; YouTube pauses on the server that uses it. To make a server stop using
its companion instead, add `--server <url>`.

`glyph hash-password` prints an Argon2id hash of an admin password (env
`GLYPH_ADMIN_PASSWORD`, or asked) for Docker and Cloudflare secrets.

### setup flags

| Flag | Does |
| --- | --- |
| `--non-interactive` | no questions; everything from flags and environment |
| `--force` | overwrite an existing config file |
| `--skip-tests` | do not test keys against the providers |
| `--mode local\|tunnel\|proxy\|tls` | how the server is reached (default `local`) |
| `--listen <addr>` | address to listen on |
| `--public-url <url>` | URL the apps use, e.g. `https://glyph.example.com` |
| `--tls-domain <host>`, `--tls-email <mail>` | built-in HTTPS with Let's Encrypt (mode `tls`) |
| `--admin-password-file <file>` | admin password; or env `GLYPH_ADMIN_PASSWORD` / `GLYPH_ADMIN_PASSWORD_HASH` |

### service flags

`--user` installs for the current user only (Linux/macOS, no root);
`--system` installs a system daemon on macOS (needs sudo).

## Cloudflare

These commands come with the npm package; the native binary lists them as
`[npm package]` and points there.

| Command | Does |
| --- | --- |
| `glyph setup cloudflare [--dir dir]` | create the Cloudflare resources and deploy |
| `glyph deploy [--config wrangler.json]` | deploy again |
| `glyph cloudflare list` | values in `wrangler.json` |
| `glyph cloudflare set <NAME> <value>` | change a value, then `glyph deploy` |
| `glyph cloudflare unset <NAME>` | back to the default, then `glyph deploy` |
| `glyph cloudflare secret <NAME>` | store a secret in Cloudflare (asked hidden, applies at once) |
| `glyph cloudflare domain <host>` | serve on your own domain |

Values: `RATE_LIMIT_PER_MIN`, `YOUTUBE_DAILY_BUDGET_UNITS`, `REQUIRE_ACCOUNT`,
`PUBLIC_ORIGIN`, `SHARE_ORIGIN`, `YTDLP_SERVICE_URL`. Secrets: provider keys
such as `YOUTUBE_API_KEY`, `YTDLP_SERVICE_TOKEN` and `GLYPH_SERVER_BEARER`;
`glyph cloudflare --help` lists them all. `glyph cloudflare secret
GLYPH_SERVER_BEARER` locks every page the Worker serves except `/v1/health`:
the apps, but also its site, docs, `/p/` links and jam invites.

## Remote management

Manages any running server through its admin API. Log in once; the CLI keeps
only a refresh token in the OS keychain, never the password.

```bash
glyph remote login https://glyph.example.com
echo "$ADMIN_PASSWORD" | glyph remote login https://glyph.example.com --password-stdin
```

The last login is the default server. `glyph remote use <url>` picks another,
`--server <url>` overrides it for one command.

| Command | Does |
| --- | --- |
| `glyph remote login <url> [--password-stdin]` | log in with the admin password |
| `glyph remote logout` | forget the login |
| `glyph remote list` | servers you are logged in to (`*` = default) |
| `glyph remote use <url>` | make a logged-in server the default |
| `glyph remote status` | version, uptime, sources, limits, companion |
| `glyph remote stats` | accounts, active users (1/7/30 days), bans, cache |
| `glyph remote keys [list]` | keys, masked |
| `glyph remote keys set <name> [value]` | store a key (asked hidden when no value) |
| `glyph remote keys unset <name>` | remove a key |
| `glyph remote keys test <provider>` | test a source's keys: `youtube`, `jamendo`, `soundcloud`, `spotify`, `lastfm` |
| `glyph remote cache [stats\|clear]` | cache statistics or clear it |
| `glyph remote limits [flags]` | show limits, or change them with the flags below |
| `glyph remote mcp [on\|off\|status]` | AI assistants (MCP) through this server |
| `glyph remote accounts default-limit [n]` | device limit for accounts without their own (1-100) |
| `glyph remote accounts show <handle>` | limit and devices: id, platform, last seen, hardware hash |
| `glyph remote accounts limit <handle> <n\|default>` | one account's own device limit |
| `glyph remote accounts revoke <handle> [device]` | sign out one device, or all of them |
| `glyph remote logs [-n 100] [--follow]` | recent log lines |
| `glyph remote update [--apply]` | look for a server update, `--apply` installs it |

Key names: `youtube_api_key`, `jamendo_client_id`, `soundcloud_client_id`,
`soundcloud_client_secret`, `spotify_client_id`, `spotify_client_secret`,
`lastfm_api_key`.

### limits flags

| Flag | Does |
| --- | --- |
| `--require-account true\|false` | API and media only for signed-in apps |
| `--rate <n>` | requests per minute per client |
| `--youtube-budget <units>` | YouTube API units per day |
| `--youtube-per-day <n>` | YouTube songs per account (guests: per address) and day; `0` = no limit |
| `--youtube-require-account true\|false` | YouTube audio and downloads only for signed-in accounts (Worker with accounts) |
| `--import-pages <n>` | max pages per playlist import |
| `--playlist-max-tracks <n>` | max songs per playlist (1-50000) |
| `--audio-days <n>` | days companion audio stays in R2 (Worker) |
| `--r2-max-gb <n>` | total R2 storage ceiling (Worker) |
| `--d1-max-mb <n>` | D1 database ceiling (Worker) |

## Bans

A banned client gets `403 banned` on every request, before the server does
anything else. Bans apply at once on the server you talk to and on every
Cloudflare location within a minute.

| Command | Bans |
| --- | --- |
| `glyph remote ban account <handle>` | the account, the last address of each of its devices and their hardware |
| `glyph remote ban account <handle> --no-ip --no-hardware` | only the account |
| `glyph remote ban device <handle> <device-id>` | one device: its hardware and last address |
| `glyph remote ban ip <address\|range>` | an IPv4/IPv6 address or CIDR range, e.g. `203.0.113.0/24` |
| `glyph remote ban hardware <hash>` | a hardware hash from `accounts show` |
| `glyph remote ban install <id>` | one app installation |
| `glyph remote ban list` | every ban in force, with its id |
| `glyph remote unban <target>` | a ban id, `@handle` (the account and everything banned with it), an address/range or a hash |

Every `ban` takes `--reason <text>` (a note for you, never shown to the
user) and `--days <n>` (lifted after that; default: until `unban`).

How it works, and what the server keeps:

- **Addresses**: devices of an account remember a salted hash of the address
  they last used, never the address itself. Banning the account bans those
  hashes. Addresses you type in (`ban ip`) are stored as written.
- **Hardware**: the app sends a SHA-256 of the computer's or phone's machine id
  with a Glyph-only salt. It survives reinstalling the app, reveals nothing
  else about the device, and differs from what other apps derive.
- A device seen before this version has no hashes yet; it gets them with its
  next request. Until then, ban the account.
- Bans live in `bans.json` next to `server.toml` (own server) or in D1
  (Cloudflare). At most 10,000 bans.

More: [limits and protection](limits.md), [YouTube companion](companion.md),
[own computer or VPS](native.md), [Cloudflare](cloudflare.md),
[privacy](../privacy.md).
