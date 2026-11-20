---
description: How the repositories, crates and web UI of Glyph fit together across desktop, Android, web and self-hosted servers.
---

# Architecture

Glyph is split into five small repositories. Every app shares the same core
logic and Svelte interface; the server shares its wire types with the apps.

## Repositories

| Repository | Role |
| --- | --- |
| [glyphmusic/apps](https://github.com/glyphmusic/apps) | Desktop app (Tauri 2), Android app, web player (`glyph-ui`) and shared Rust core |
| [glyphmusic/server](https://github.com/glyphmusic/server) | Self-hostable native server, Cloudflare Worker, `glyph` CLI and npm package |
| [glyphmusic/companion](https://github.com/glyphmusic/companion) | Docker helper that gives a Cloudflare Worker YouTube search, audio and lyrics |
| [glyphmusic/r-dlp](https://github.com/glyphmusic/r-dlp) | Standalone fast YouTube audio resolver used by the apps and companion |
| [glyphmusic/docs](https://github.com/glyphmusic/docs) | Documentation rendered live at `docs.glyph.my` and served via MCP |

## Inside `glyphmusic/apps`

The workspace separates pure music/library logic, audio playback, shared UI and
platform shells:

| Path | Role |
| --- | --- |
| `crates/glyph-protocol` | Shared request, response, sync, Jam, MCP and trust types used by both apps and server |
| `crates/glyph-core` | Providers, search, library, settings, E2E encryption, sync, downloads, local files and server client |
| `crates/glyph-audio` | Native audio playback, gapless preloading, crossfade, loudness levelling, 10-band equalizer and spatial (HRTF) rendering |
| `crates/glyph-app` | Shared application controller, commands, Jam, Connect, plugins (Wasmtime), MCP server and Android notification checks |
| `crates/glyph-tauri` | Desktop shell (Windows, macOS, Linux): Tauri 2 window, mini player, tray, media keys, Discord Rich Presence, `glyph://` links |
| `crates/glyph-android` + `mobile/android` | Android shell: native `PlaybackService`, WebView bridge, share sheet, photo/file picker and background notification job |
| `glyph-ui` | Svelte 5 + TypeScript frontend shared across desktop, Android and the browser web player (`/web`) |

At start-up, `glyph-ui/src/lib/api/backend.ts` selects one of three backends:

* **`tauri`**: inside the desktop or Android shell (calls into Rust through the
  Tauri / Android bridge).
* **`web`**: built with `VITE_GLYPH_WEB=1` (`npm run build:web`) and served at
  `/web`; talks directly to `glyph-server`'s `/v1/*` API, plays direct streams
  and the official YouTube embed, and stores local state in the browser.
* **`demo`**: plain `npm run dev` in a browser with sample data for fast UI
  work.

## Inside `glyphmusic/server`

| Path | Role |
| --- | --- |
| `crates/glyph-server-core` | Shared HTTP routing, provider search, resolver, accounts, E2E sync, Jam, MCP relay, share links, docs renderer and abuse limits |
| `crates/glyph-server-native` | Single-binary server for Linux, macOS, Windows and Docker, plus the `glyph` management CLI |
| `crates/glyph-server-worker` | Cloudflare Worker (`wasm32-unknown-unknown`) using D1, KV, R2 (`GLYPH_CACHE` and `GLYPH_USERS`), Durable Objects (`JAM_ROOM`) and static `/web` assets |
| `release-protocol` | Checked-in snapshot of `glyph-protocol` (`node scripts/snapshot-protocol.mjs`) so the server builds standalone |
| `glyph-web` | Checked-in snapshot of the built web player (`node scripts/snapshot-web.mjs`) bundled by the Worker |
| `npm` | The `glyph-server` npm package (`glyph setup cloudflare`, `glyph deploy`, `glyph cloudflare`, binary installer) |

## How data flows

```
Desktop / Android app  ──►  glyph-server (native or Cloudflare Worker)
  (glyph-ui + Rust)            │
                               ├──► Music providers & metadata APIs
                               ├──► D1 / KV / R2 (accounts, encrypted sync, caches)
                               └──► companion (Docker) ──► r-dlp / yt-dlp ──► YouTube

Web player (/web)      ──►  glyph-server (/v1/* metadata, sync, Connect, MCP relay)
  (glyph-ui in browser)──►  Direct audio providers & youtube-nocookie.com embed
```

* **End-to-end encrypted sync:** devices derive the library key locally and
  encrypt synced items (`XChaCha20-Poly1305` + `X25519` + `Argon2id`) before
  pushing to `/v1/sync/push`. The server stores ciphertext without reading it.
* **Untrusted clients:** every rate limit, device limit, size check, ban and
  cache-trust rule is enforced on the server (`glyph_protocol::trust`), never
  trusted from the app.
