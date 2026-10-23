---
description: Reference of everything plugin code can use in Glyph. The WebAssembly interface, every function with its arguments, answers and permission, every event, and the limits.
---

# API reference

Plugin code talks to Glyph in JSON. This page lists every function and
event. [Extensions](extensions.md) shows how to build a plugin around them.

## The interface

A plugin is a WebAssembly module (`wasm32`, no WASI). Glyph offers three
functions in the import module `glyph`:

| Import | What it does |
| --- | --- |
| `call(ptr: i32, len: i32) -> i32` | Sends the request at `ptr..ptr+len` (UTF-8 JSON). Waits for Glyph's answer and returns its length in bytes. |
| `read(ptr: i32) -> i32` | Copies the pending message to `ptr` and returns its length. The pending message is the last answer, or the event being delivered. |
| `log(level: i32, ptr: i32, len: i32) -> i32` | Writes a line to Glyph's log. Levels: 0 debug, 1 info, 2 warn, 3 error. |

The module exports:

| Export | Required | Called |
| --- | --- | --- |
| `memory` | yes | – |
| `glyph_start()` | no | once, after the module was loaded |
| `glyph_event(len: i32)` | no | for each event; the event (JSON, `len` bytes) is pending: read it first |

Read the event before your first `call`: a call replaces the pending message
with its answer.

### Requests and answers

```json
{ "fn": "player.seek", "args": { "seconds": 42 } }
```

`args` is an object and may be left out. Every answer is one of:

```json
{ "ok": <value> }
{ "error": "what went wrong, in plain words" }
```

A function the plugin lacks the permission for answers with an error naming
the permission. Unknown functions answer `unknown function <name>`.

## Permissions

| Permission | Unlocks |
| --- | --- |
| *(none)* | `app.*`, `ui.*` (except search/artist navigation), `storage.*`, `timer.*`, the `ready`, `setting`, `action`, `menu` and `timer` events |
| `playback` | `player.*`, `queue.*`, the song in `ready`, the `track` and `playback` events |
| `library` | `library.*`, `lyrics.get`, `stats.get` |
| `search` | `search`, `ui.search`, `ui.open_artist` |
| `settings` | `settings.get`, `settings.set` |
| `network` | `net.fetch` to the hosts in the manifest's `network` list |
| `audio` | `audio.spectrum`, `audio.equalizer`, `audio.set_equalizer` |
| `lyrics_provider` | `lyrics.publish` |

## Songs

Functions and events describe songs like this:

```json
{
  "ref": "YouTube:dQw4w9WgXcQ",
  "title": "Song",
  "artist": "Artist",
  "album": "Album",
  "duration_s": 213,
  "explicit": false,
  "liked": true
}
```

`ref` (source and id; treat it as an opaque string) names the song in later calls (`player.play_song`, `queue.add`,
`library.add_to_playlist`, …). Any song an answer or event mentioned can be
used by its `ref`, as can the current song, the queue, the library and the
last search results.

## App

| Function | Arguments | Answer |
| --- | --- | --- |
| `app.info` | – | `{ "version", "platform" ("windows", "macos", "linux", "android"), "lang", "theme", "plugin": { "id", "version" } }` |
| `app.text` | `key` | the text in Glyph's language: one of your `strings` (`<id>.…`) or one of Glyph's; the key itself when unknown |
| `app.now` | – | the time as Unix milliseconds |

## Your settings and the UI

Settings rows come from the manifest (see [Settings, menus and texts](settings-ui.md)).
Glyph keeps their values; your code reads and changes them.

| Function | Arguments | Answer |
| --- | --- | --- |
| `ui.get` | `id` | the row's value; for secret rows only `{ "configured": bool }` |
| `ui.values` | – | `{ "<id>": value }` for every non-secret toggle, slider, select and text row |
| `ui.set` | `id`, `value` | `null`. Sets a non-secret value as if the user did; sends no `setting` event. Sliders are clamped and snapped to their step. |
| `ui.update` | `id` and any of `label`, `desc`, `status`, `hidden`, `disabled`, `options` | `null`. Changes how a row looks until the plugin restarts. `status` is a second line under the label; `value` updates a progress row (0-1); credential controls cannot be patched; `options` replaces a select's options (`[{ "value", "label" }]`). |
| `ui.toast` | `text` (up to 200 characters), `error` (bool) | `null`. Shows `<plugin name>: text`. |
| `ui.open` | – | `null`. Opens your plugin's settings page. |
| `ui.search` | `query` | `null`. Runs a search in Glyph, as if typed. |
| `ui.open_artist` | `name` | `null`. Opens the artist's page. |

## Storage and timers

Storage is a JSON object per plugin, kept in `<data>/plugins/<id>/storage.json`
(1 MiB at most). Timers send `timer` events.

| Function | Arguments | Answer |
| --- | --- | --- |
| `storage.get` | `key` | the value, or `null` |
| `storage.set` | `key` (1-200 characters), `value` (any JSON) | `null`, or an error when storage would exceed 1 MiB |
| `storage.delete` | `key` | `null` |
| `storage.keys` | – | `["key", …]` |
| `storage.clear` | – | `null` |
| `timer.set` | `id` (1-60 characters), `ms` (50 ms to 24 h, default 1000), `repeat` (bool; at least 250 ms) | `null`. A timer with the same `id` is replaced. 32 timers at most. |
| `timer.clear` | `id` | `null` |

## Playback · `playback`

| Function | Arguments | Answer |
| --- | --- | --- |
| `player.state` | – | `{ "song", "playing", "loading", "position_s", "duration_s", "volume" (0-100), "shuffle", "repeat" ("off", "all", "one"), "queue_length", "playing_from" }` |
| `player.play` | – | starts or resumes |
| `player.pause` | – | pauses |
| `player.toggle` | – | play / pause |
| `player.next` | – | next song |
| `player.previous` | – | previous song |
| `player.seek` | `seconds` | jumps in the current song |
| `player.volume` | `volume` (0-100) | sets the volume |
| `player.shuffle` | `on` (bool), `style` ("random", "smart") | |
| `player.repeat` | `mode` ("off", "all", "one") | |
| `player.play_song` | `ref`, or `query` (plays the best hit) | `{ "playing": song }` |
| `player.play_artist` | `name`, `shuffle` | plays up to 40 songs by the artist |
| `queue.get` | – | `{ "up_next": [song], "next_from", "later": [song] (50 at most), "total" }` |
| `queue.add` | `ref` or `query`, `next` (bool: play next instead of last) | `{ "queued": song, "next" }` |
| `queue.remove` | `index` | removes one upcoming song, zero-based |
| `queue.move` | `from`, `to` | reorders upcoming songs, zero-based |

## Search · `search`

| Function | Arguments | Answer |
| --- | --- | --- |
| `search` | `query`, `limit` (1-50, default 10) | `{ "songs": [song] }`, best first, filtered like Glyph's own search. Takes up to 10 seconds. |

## Library · `library`

| Function | Arguments | Answer |
| --- | --- | --- |
| `library.playlists` | – | `{ "playlists": [{ "id", "name", "songs" }] }`; the first is `liked` |
| `library.playlist` | `id` (`liked`, `recent` or a playlist id) | `{ "id", "name", "songs": [song] (500 at most), "total" }` |
| `library.play_playlist` | `id`, `shuffle` | |
| `library.create_playlist` | `name`, `refs` (optional) | `{ "id", "name", "songs" }` |
| `library.rename_playlist` | `id`, `name` | `{ "id", "name" }` |
| `library.delete_playlist` | `id` | |
| `library.add_to_playlist` | `id`, `refs` | |
| `library.remove_from_playlist` | `id`, `index` | |
| `library.like` / `library.unlike` | `ref` (default: the current song) | `{ "song", "liked" }` |
| `lyrics.get` | – | `{ "title", "artist", "source", "lyrics" }` of the current song |
| `stats.get` | `range` ("this_month", "last_month", "year", "all") | `{ "minutes", "plays", "skips", "top_artists": [{ "artist", "minutes", "plays" }], "top_songs": [{ "title", "artist", "minutes", "plays" }] }`; an error while statistics are off |

## Settings · `settings`

Glyph's settings in the same sections as a settings file (Settings › Backup &
share) and account sync: never API keys, passwords, the server address or
values that belong to one device.

| Function | Arguments | Answer |
| --- | --- | --- |
| `settings.get` | `section` (optional) | all sections, or one |
| `settings.set` | `section`, `value` | `{ "changed" }`. `value`'s fields replace the section's fields (shallow); the rest stays. Applied at once, saved and synced like a change by hand. |

| Section | Fields (examples) |
| --- | --- |
| `general` | `language` ("" = system, "en", "de", …) |
| `providers` | `enabled`, `priority`, `youtube_daily_searches` |
| `visuals` | `intensity`, `music_reactivity`, `ascii_covers`, `startup_animation`, `ascii_effects`, `theme` ("ember", "plugin:<id>", …), `throttle_unfocused` |
| `audio` | `crossfade_s`, `quality`, `download_quality`, `level`, `normalize`, `hide_explicit`, `eq_enabled`, `eq_preset`, `eq_gains` (10 values, -12 to 12 dB) |
| `playback`, `player`, `lists`, `stats`, `integrations`, `updates` | as in a settings file |
| `eq_presets` | the user's own equalizer presets |

`settings.get` can read the shareable sections above. `settings.set` may write
only `general`, `visuals`, `audio`, `playback`, `player`, `lists` and
`eq_presets`. Provider, integration, statistics/privacy, update and server
policy cannot be changed by plugins.

## Network · `network`

| Function | Arguments | Answer |
| --- | --- | --- |
| `net.fetch` | `url`, `method` (GET, POST, PUT, PATCH, DELETE, HEAD; default GET), `headers` (`{ "name": "value" }`), `body` (text) or `json` (any JSON, sent with `content-type: application/json`) | `{ "status", "headers": { … }, "body" }` (text) |

- HTTPS only, port 443, no URL user information or fragments. Only hosts from
  the manifest's `network` list are eligible
  (`*.example.com` covers `example.com` and every subdomain).
- Redirects are not followed: a 3xx comes back as it is, so a redirect can't
  lead to a host the plugin may not contact.
- DNS answers must all be public addresses and are pinned into the HTTP
  connection. Private, loopback, link-local and reserved addresses are blocked.
  Glyph's public and configured server hosts, and their resolved addresses,
  are blocked too. Environment proxies are disabled.
- No inherited account tokens, cookies, server bearers or provider keys.
  Reserved identity and transport headers are refused. Explicit plugin-owned
  Authorization headers are allowed.
- Up to 20 seconds for HTTP (DNS checks have separate timeouts), 4 MiB per
  answer. Disabling the plugin cancels its network operation.
- `credentials` can inject this plugin's declared secret fields into `query`
  or `headers`; see [Services and keys](services.md).
- Requests come from the user's device with the user agent
  `Glyph/<version> (plugin)`; no cookies are kept.

## Events

Every event has a `type`:

| Event | Fields | When |
| --- | --- | --- |
| `ready` | `settings` (`{ id: value }` as stored), `song`, `playing` (with `playback`), `lang` | right after `glyph_start` |
| `track` | `song` (or `null`) | the current song changed · `playback` |
| `playback` | `playing` | playback started or paused · `playback` |
| `setting` | `id`, `value` | the user changed a non-secret settings row |
| `credential` | `id`, `configured` | the user saved or removed a secret; never includes its value |
| `action` | `id` | the user pressed one of your buttons |
| `menu` | `id`, `song` | the user picked your song menu entry on `song` |
| `timer` | `id` | a timer is due |

New event types may come with new Glyph versions; ignore types you don't
know.

## Limits

| Limit | Value |
| --- | --- |
| module size | 16 MiB |
| memory | 64 MiB |
| work per `glyph_start` | about 4 billion instructions |
| work per event | about 1 billion instructions |
| failures in a row before the plugin stops | 3 |
| one request, answer or event | 4 MiB |
| wait for Glyph's answer | 20 s |
| storage | 1 MiB |
| timers | 32 |
| log lines kept for the detail view | 100 |
| running code plugins | 16 |
| queued events per plugin | 64 (new events dropped when full) |
| queued calls for the app | 128; up to 32 drained per poll |
| calls per second | 30 per plugin and 30 combined at the app gateway |
| service calls per minute | 12 per plugin and 12 combined at the app gateway |
| external requests per minute | 30 per plugin |

A stopped plugin shows the reason on its page and in its detail view;
switching it off and on, Reload (local plugins) or restarting Glyph starts it
again.

## Local audio · `audio`

- `audio.spectrum`: returns `{ "bands": [0..1, …], "playing": bool }` from
  Glyph's spectrum analyser. There are 32 bands. Poll with a timer; this is
  analysis data, not raw samples or an audio callback.
- `audio.equalizer`: returns `{ "enabled": bool, "gains": [10 values] }`.
- `audio.set_equalizer`: takes `enabled` and ten finite `gains`, each from
  -12 to +12 dB. Applies through Glyph's existing equalizer. Invalid values
  are refused. The change is saved like a manual equalizer change.

## Supply lyrics · `lyrics_provider`

Call `lyrics.publish` with the current song's `ref`, and `plain` and/or `lrc`
(text in LRC format). Ask for `playback` too to receive song events and refs.
Glyph attributes the candidate to your plugin, adds it to lyrics alternatives
and shows it when no other lyrics are selected. It is local, is not uploaded
to a server, and disappears when your code stops or the song changes.

Old song refs are refused. Text is limited to 128 KiB, 2000 timestamp tags,
4000 bytes per LRC line, 2000 expanded lines and timestamps within 24 hours.

## Server and remote-control boundary

There is no raw server, account, admin or MCP-call function. An explicit
allowlist selects host actions; arbitrary function names are refused before
forwarding. Queued calls carry a runtime generation so stopping or restarting
an extension revokes its previous calls.

Search, opening a search or artist, playing by query/artist and queue additions
share the service-call budget. Normal host actions may still make normal
server requests, with the same server authentication, account permissions,
IP/device/account quotas and bans as the app. A plugin does not get a quota
exception or access to server configuration. Those protections must remain
server-enforced even for a modified client. Plugins cannot control playback
or edit the queue during a Jam session.
