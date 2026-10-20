---
description: Use Glyph without a server, with your own API keys.
---

# Direct mode and API keys

By default Glyph talks to a Glyph server, which holds the API keys, merges the
results and caches them. In **direct mode** the app asks every source itself.

## Switch to direct mode

Clear the address under **Settings › Server**, or in the
[settings file](config-file.md):

```toml
server_url = ""
```

Accounts, sync, short share links and MCP through the server need a server and
are not available in direct mode.

## Your own keys

Sources without a key are skipped. Audius, Internet Archive, Deezer,
MusicBrainz and LRCLIB need none.

| Key | Used for | Get it at |
| --- | --- | --- |
| `jamendo_client_id` | Jamendo search and full songs | [devportal.jamendo.com](https://devportal.jamendo.com) |
| `soundcloud_client_id` | SoundCloud embedded player; reading SoundCloud playlists without the server | [soundcloud.com/you/apps](https://soundcloud.com/you/apps) |
| `spotify_client_id`, `spotify_client_secret` | Spotify metadata; full playlists over 100 songs by link (without it Glyph reads Spotify's public page) | [developer.spotify.com](https://developer.spotify.com/dashboard) |
| `lastfm` | radio, similar artists, loved tracks import | [last.fm/api](https://www.last.fm/api/account/create) |
| `youtube` | YouTube Data API, optional | Google Cloud console |

Enter them in the app or under `[keys]`:

```toml
[keys]
lastfm = "..."
jamendo_client_id = "..."
```

{% hint style="info" %}
Signed in with a password, your keys sync to your other devices **end-to-end
encrypted**. The server only stores data it cannot open.
{% endhint %}

## Environment variables

They override the file and are never written back or synced:
`GLYPH_SERVER_URL`, `GLYPH_YOUTUBE_KEY`, `GLYPH_JAMENDO_CLIENT_ID`,
`GLYPH_SOUNDCLOUD_CLIENT_ID`, `GLYPH_SPOTIFY_CLIENT_ID`,
`GLYPH_SPOTIFY_CLIENT_SECRET`, `GLYPH_LASTFM_KEY`, `GLYPH_DISCORD_CLIENT_ID`.

## Sources and priority

```toml
[providers]
enabled  = ["audius", "jamendo", "archive", "spotify", "deezer", "musicbrainz", "lastfm", "lrclib"]
priority = ["audius", "jamendo", "soundcloud", "youtube"]   # full-song sources, first wins
youtube_mode = "server"   # or "local"
youtube_only = false
```
