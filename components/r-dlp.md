---
description: Glyph's own fast YouTube audio resolver, written in Rust.
---

# r-dlp

r-dlp turns a YouTube video ID into a direct audio URL. It implements only the
small part of yt-dlp that Glyph needs, so it starts and answers much faster. The
desktop app and the [companion](../self-hosting/companion.md) use it when it is
available and fall back to yt-dlp otherwise.

In Glyph's benchmarks the median resolution time dropped from about 3.1 s to
0.8 s for a fresh process and from 1.1 s to 0.06 s for a warm one. This is
resolver time, not the full time from click to sound.

## Use

```bash
r-dlp dQw4w9WgXcQ               # metadata and audio URL as JSON
r-dlp --get-url dQw4w9WgXcQ     # URL only
r-dlp --verify dQw4w9WgXcQ      # also read 1024 real audio bytes
r-dlp serve                     # persistent JSON-lines mode on stdin/stdout
r-dlp serve --warmup            # prime the connection before the first request
```

### Serve mode

`serve` prints `{"ready":true,"version":"..."}` at start. Send one
`{"id":"<video id>"}` line per request; each answer carries the same ID and
either `url` plus metadata or `error`. One process handles requests one after
another; start several for parallel work. Closing stdin stops it.

## Formats

r-dlp picks the highest-bitrate direct MP4 audio first, then Vorbis. Opus,
encrypted formats and translated audio tracks are skipped.

## Limits

Not supported: search, playlists, subtitles, downloads, other sites, age-restricted
or signed-in videos, live streams and signature deciphering. Keep yt-dlp
installed as the fallback. A returned URL must be used from the same public IP
and before it expires.

| Variable | Effect |
| --- | --- |
| `RDLP_HTTP1_ONLY=1` | force HTTP/1.1 instead of HTTP/2 |

## Build

```bash
git clone https://github.com/glyphmusic/r-dlp.git
cd r-dlp
cargo build --release --locked
```

Source and releases: [glyphmusic/r-dlp](https://github.com/glyphmusic/r-dlp).
