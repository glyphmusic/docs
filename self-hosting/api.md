---
description: The HTTP API the app uses, for custom clients and tools.
---

# API reference

All routes are under `/v1`. Request and response types come from the shared
[`glyph-protocol`](https://github.com/glyphmusic/desktop/tree/main/crates/glyph-protocol)
crate. Errors are JSON `ApiError` objects with a `code`.

## Headers

| Header | When |
| --- | --- |
| `x-glyph-install-id` | always; an anonymous id per installation, used for rate limits |
| `Authorization: Bearer <access token>` | signed in |
| `X-Glyph-Server-Authorization: Bearer <token>` | on a [private server](limits.md#private-server) |

Rate-limited answers are HTTP 429 with `retry_after_s` and `Retry-After`.

## Music

| Method | Path | Does |
| --- | --- | --- |
| GET | `/v1/health` | version, protocol, active sources, `accounts`, `account_required`, `server_auth_required` |
| GET | `/v1/search?q=` | NDJSON stream of `results`, `provider_error` and `done` events |
| POST | `/v1/resolve` | `ResolveRequest` → playback source |
| GET | `/v1/audio/:provider/:id` | audio stream with byte ranges; `?quality=low\|standard\|high` |
| POST | `/v1/download` | track → download reference, or `null` if not allowed |
| GET | `/v1/download/:provider/:id` | download stream |
| GET | `/v1/lyrics?title=&artist=&album=&duration=` | lyrics from LRCLIB; duration in seconds |
| GET | `/v1/similar?artist=&title=` | similar songs (Last.fm) |
| POST | `/v1/import/spotify` | `{url}` of a public Spotify, Deezer or YouTube playlist, a SoundCloud link (set, likes, tracks, song) or a Last.fm profile |
| POST | `/v1/cover` | track → cover URL |

A search result keeps its `source` and `id`. If another source finds the same
song later, the track is sent again with more ids; replace it by
(`source`, `id`).

## Sharing

| Method | Path | Does |
| --- | --- | --- |
| POST | `/v1/share` | signed in: create a short link |
| GET / DELETE | `/v1/share/:id` | read; the owner can delete |
| GET | `/p/:id` | landing page of a short link |

## Accounts and sync

| Method | Path | Does |
| --- | --- | --- |
| POST | `/v1/account/login/start`, `/v1/account/login/poll` | browser sign-in for apps |
| POST | `/v1/account/token/refresh` | new access token |
| GET | `/v1/account/handle/:h` | is a handle free |
| GET / PATCH / DELETE | `/v1/account` | read, change handle, delete account |
| GET / PATCH / DELETE | `/v1/devices`, `/v1/devices/:id` | list, rename, remove devices |
| POST | `/v1/sync/push` | send changed items |
| GET | `/v1/sync/pull?since=&limit=` | items newer than a revision |
| GET | `/v1/sync/export` | all items as JSON |
| GET / PATCH | `/v1/profile` | own profile settings |
| GET | `/v1/profiles/:handle` | another user's public profile (signed in) |

### Sync items

Everything that syncs is an item `(kind, key) → value`. The newer `updated_at`
wins; deletions are tombstones.

```json
{ "kind": "liked", "key": "audius:Abc12", "value": { "title": "..." },
  "updated_at": 1760700000000, "deleted": false, "rev": 412 }
```

| kind | key |
| --- | --- |
| `liked`, `download` | track key |
| `playlist` | playlist id |
| `followed`, `hidden` | artist name, lowercase |
| `album` | `title\|artist`, lowercase |
| `search` | track key or `artist:name` |
| `setting` | settings section |

A push takes at most 500 items and 2 MB. A pull with a revision older than 180
days answers `{reset: true}`; the client then pulls everything again.
