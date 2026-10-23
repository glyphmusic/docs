---
description: The HTTP API the app uses, for custom clients and tools.
---

# API reference

All routes are under `/v1`. Request and response types come from the shared
[`glyph-protocol`](https://github.com/glyphmusic/apps/tree/main/crates/glyph-protocol)
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
| GET | `/v1/health` | version, protocol, active sources, `accounts`, `account_required`, `server_auth_required`, `capabilities` (feature names such as `jam`, `mcp_relay`, `youtube_audio`, `youtube_account_required`) |
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
| POST | `/v1/account/login/start`, `/v1/account/login/poll` | browser sign-in and pairing codes for apps |
| POST | `/v1/account/login/approve` | a signed-in device approves a pairing code (and gets the new device's key-exchange message) |
| POST | `/v1/account/token/refresh` | new access token |
| GET | `/v1/account/handle/:h` | is a handle free |
| GET / PATCH / DELETE | `/v1/account` | read, change handle, delete account |
| GET / PATCH / DELETE | `/v1/devices`, `/v1/devices/:id` | list, rename, remove devices |
| POST | `/v1/sync/push` | send changed items |
| GET | `/v1/sync/pull?since=&limit=` | items newer than a revision |
| GET | `/v1/sync/export` | all items as JSON (end-to-end encrypted items stay encrypted) |
| GET / PATCH | `/v1/profile` | own profile settings |
| GET | `/v1/profiles/:handle` | another user's public profile (signed in) |

## Jam

All signed in. The host's app owns the queue and playback; the server only
relays (see [Jam](../using-glyph/jam.md)).

| Method | Path | Does |
| --- | --- | --- |
| POST | `/v1/jam` | start a jam (ends the host's older one) |
| GET / DELETE | `/v1/jam/:code?rev=` | state, waits up to 15 s for a newer revision; the host ends it |
| GET | `/v1/jam/:code/time` | server clock (clock sync) |
| POST | `/v1/jam/:code/join`, `/v1/jam/:code/leave` | join (the state, or `202` waiting for the host), leave |
| POST | `/v1/jam/:code/op` | a member's request: add, vote, remove, control |
| GET | `/v1/jam/:code/ops` | host: waiting requests (waits up to 15 s; `?wait=0` answers at once) |
| GET | `/v1/jam/:code/live` | WebSocket: the server pushes new states, requests for the host and whether the host is online |
| POST | `/v1/jam/:code/state` | host: publish what plays and the queue |
| POST | `/v1/jam/:code/now` | host: publish only the position (seeks, heartbeat); a few hundred bytes |
| POST | `/v1/jam/:code/kick` | host: remove a member (banned by account) |
| POST | `/v1/jam/:code/admit` | host: let someone in who is waiting, or not |
| POST | `/v1/jam/:code/claim` | member: take over after the host was gone for 2 minutes |
| GET | `/jam/:code` | invite page (no sign-in); opens `glyph://jam/:code` |

`/live` runs on the Cloudflare Worker only (Durable Object `JAM_ROOM`, created
on deploy). It stays within the free plan: at most 70,000 pushes and
connections per UTC day; after that the apps get one `fallback` message and
ask with the requests above until the next day. Other servers answer
`404 jam_push_off`, and the apps ask the same way.

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

### What the server trusts

The app is open source, so the server treats every request body as a claim
made by whoever sent it:

* `/v1/resolve`, `/v1/download` and shared playlists may name a provider id
  (`source`/`id`, `external_ids`). The requesting client gets an answer built
  on it, but the shared resolver cache keeps only matches the server's own
  provider search made, without covers, links or ids the client supplied.
* `/v1/youtube/hint` looks the song up in the server's catalog (Deezer) and
  checks the video against that, not against the client's title or length:
  title, the artist's own channel and a length within six seconds must fit.
  An artist's "- Topic" upload replaces any other one.
* `/v1/cover` answers only covers from known image hosts.
* Malformed ids, links outside known music sites and overlong texts are
  dropped before any lookup (`glyph_protocol::trust`). The apps apply the
  same rules to what other people send them (Jam, shared playlists, public
  profiles).
