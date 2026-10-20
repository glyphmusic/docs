---
description: Run the Glyph server as one binary on Windows, macOS, Linux or a VPS, with automatic HTTPS.
---

# Own computer or VPS

The server is one binary for Windows, macOS and Linux.

```bash
npm install --global glyph-server   # or download glyph-server from GitHub releases
glyph setup                          # a few questions, writes server.toml
glyph                                # run it
glyph service install                # start at boot
```

`glyph setup` can turn on automatic HTTPS with Let's Encrypt for your domain.
Install yt-dlp and FFmpeg for YouTube; r-dlp is used when available.

## Change options

```bash
glyph config list
glyph config set rate_limit_per_min 120
glyph config set require_account true
glyph config set tls.domain glyph.example.com
glyph config set lastfm_api_key        # asks without echo
glyph config unset rate_limit_per_min
glyph doctor
```

`glyph config list` shows every option, its value, where it comes from
(`server.toml`, an environment variable or the default) and what it does. API
keys are never printed. Restart the server after a change.

| Option | Default | Meaning |
| --- | --- | --- |
| `bind` | `0.0.0.0:8787` | address to listen on (443 with TLS) |
| `public_url` | – | URL your apps use |
| `cache_dir`, `cache_entries` | memory, 10000 | response cache |
| `trust_proxy` | false | read client IPs from a reverse proxy |
| `rate_limit_per_min` | 60 | anonymous requests per minute and IP |
| `require_account` | false | only signed-in apps |
| `proxy_audio` | true | stream audio through the server |
| `ytdlp_path` | PATH | yt-dlp executable |
| `tls.domain`, `tls.email` | – | automatic HTTPS |
| `keys.*` | – | provider API keys |

Every option also has an environment variable (shown by `glyph config list`),
which wins over the file, handy for Docker.

## Private server

```bash
glyph access          # require a shared bearer; the app asks for it once
glyph access --disable
```
