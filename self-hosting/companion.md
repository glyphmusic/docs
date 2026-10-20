---
description: Give a Cloudflare server YouTube by running a small helper at home.
---

# YouTube companion

A Cloudflare Worker cannot start programs, so it cannot run yt-dlp or r-dlp. The
companion runs them on a machine you own and the Worker reaches it through a
Cloudflare Tunnel:

```
app -> Worker -> Cloudflare Tunnel -> companion -> YouTube
```

{% hint style="info" %}
A machine at home works best: YouTube blocks data-centre IPs far more often than
home connections. No port has to be opened; the tunnel connects out.
{% endhint %}

You only need the companion with a [Cloudflare server](cloudflare.md). A
[native server](native.md) resolves YouTube itself.

## What it contains

| File | Purpose |
| --- | --- |
| `Dockerfile` | glyph-server with r-dlp, yt-dlp, FFmpeg and Deno; yt-dlp updates itself on start |
| `docker-compose.yml` | the companion, `cloudflared` and Watchtower for automatic image updates |

## Setup

1. **Tunnel.** In the Cloudflare dashboard open *Networking > Tunnels > Create a
   tunnel* (cloudflared) and copy its token. Under *Routes* add a published
   application, for example `ytdlp.example.com`, with service
   `http://companion:8787`.
2. **Token.** Create a random secret of at least 32 characters:
   ```bash
   openssl rand -hex 32
   ```
3. **Start the companion** on a machine with Docker:
   ```bash
   git clone https://github.com/glyphmusic/companion.git
   cd companion
   cp .env.example .env   # set YTDLP_SERVICE_TOKEN and TUNNEL_TOKEN
   docker compose up -d
   ```
4. **Connect the Worker:**
   ```bash
   glyph cloudflare set YTDLP_SERVICE_URL https://ytdlp.example.com
   glyph cloudflare secret YTDLP_SERVICE_TOKEN   # the same secret as in .env
   ```
5. **Check:** `https://ytdlp.example.com/v1/health` answers, and a YouTube search
   in the app returns YouTube results.

## How it behaves

* Three [r-dlp](../components/r-dlp.md) workers are started in advance and resolve
  different songs at the same time. yt-dlp handles search, metadata and anything
  r-dlp cannot resolve.
* Resolved URLs are cached in memory; audio is streamed, not stored.
* The Worker can keep audio in R2, so cached songs play even while the companion
  is off.
* If the machine is off, only YouTube is missing. Every other source keeps working.

## Switch it off and on

From any computer, through the Worker:

```bash
glyph remote companion off
glyph remote companion on
```

Or directly on the companion machine. While off, it answers every request with
403 and the app shows no YouTube results. The switch survives restarts.

```bash
docker compose exec companion glyph-server companion status
docker compose exec companion glyph-server companion off
docker compose exec companion glyph-server companion on
```

## r-dlp updates

On every start the companion fetches the latest stable r-dlp release, checks its
SHA-256 and version and installs it in the cache volume. Offline starts use the
cached or bundled copy. To pick up a new release:

```bash
docker compose restart companion
```

| Variable | Effect |
| --- | --- |
| `GLYPH_RDLP_VERSION=0.1.1` | pin a version |
| `GLYPH_RDLP_AUTO_UPDATE=0` | keep the local copy, do not check GitHub |
| `GLYPH_RDLP_PATH` | use this binary instead; empty falls back to yt-dlp only |

## Updates

Watchtower pulls new images automatically. By hand:

```bash
docker compose pull && docker compose up -d
```
