---
description: Which sources a server offers, which keys they need and their quotas.
---

# Sources and API keys

The server holds the API keys, so the apps never see them. Sources without a key
are switched off; `GET /v1/health` lists the active ones.

| Source | Needs | Key name |
| --- | --- | --- |
| Audius, Internet Archive, Deezer, LRCLIB | nothing | – |
| YouTube search and audio | yt-dlp/r-dlp (native) or the [companion](companion.md) (Cloudflare) | `YTDLP_PATH` (native); `YTDLP_SERVICE_URL`, `YTDLP_SERVICE_TOKEN` (Worker) |
| YouTube playlist import | API key | `YOUTUBE_API_KEY` |
| Jamendo | client id | `JAMENDO_CLIENT_ID` |
| SoundCloud | client credentials | `SOUNDCLOUD_CLIENT_ID`, `SOUNDCLOUD_CLIENT_SECRET` |
| Spotify (metadata only) | client credentials | `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` |
| Last.fm | API key | `LASTFM_API_KEY` |

## Set keys

{% tabs %}
{% tab title="Native" %}
```bash
glyph config set lastfm_api_key   # asks without echo
```
Or as environment variables, which win over `server.toml`.
{% endtab %}

{% tab title="Cloudflare" %}
```bash
glyph cloudflare secret LASTFM_API_KEY
```
{% endtab %}

{% tab title="Remote" %}
```bash
glyph remote keys set lastfm      # youtube, jamendo, soundcloud, spotify, lastfm
```
{% endtab %}
{% endtabs %}

Keys are never returned in responses or error messages. A source that fails or
runs out of quota is skipped for 10 minutes.

## Quotas

* **YouTube search** uses yt-dlp or r-dlp: no key, no quota. Only ids, titles,
  channels, durations and thumbnails are read.
* **YouTube Data API** (playlist import only): 10,000 units a day. The server
  stops at `YOUTUBE_DAILY_BUDGET_UNITS` (default 9000), reset at midnight UTC.
* **Spotify** may restrict apps in development mode. Check Spotify's developer
  policy before opening the import to others.

## How a song is resolved

The server looks a song up by ISRC first, then by title, artist and duration
(±3 s). Full-song sources are tried in order, by default Audius, Jamendo,
SoundCloud, YouTube; a Deezer preview is the last resort. With `proxy_audio`
(on by default, always on Cloudflare) audio streams through the server with
byte ranges, so the app can seek and never sees short-lived provider URLs.
