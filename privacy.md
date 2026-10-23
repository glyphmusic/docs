---
description: What Glyph stores, where, and what it never collects.
---

# Privacy

Glyph has no ads, no tracking and no telemetry.

## Without an account

Everything stays on your computer: library, playlists, settings, downloads and
caches. The app sends an anonymous installation id to the server so rate limits
work; it is not tied to you and can be reset.

It also sends a hardware id: a SHA-256 of your computer's or phone's machine
id with a Glyph-only salt. Server operators use it to ban a device that abuses
their server, and the ban survives reinstalling the app. The machine id itself
never leaves your device, and the hash differs from what any other app
derives from it. The server only stores it for signed-in devices and for
bans.

## With an account

| Stored on the server | Not stored |
| --- | --- |
| handle | your password |
| password salt and a hash of a key derived on your device | IP addresses |
| passkey public keys, recovery-code hash | user agents |
| device name, platform, first and last seen, approximate country | listening history |
| per device, for bans: a salted hash of the IP address last used and the hardware id | |
| synced items: liked songs, playlists, artists, albums, searches, download list, settings and API keys, **end-to-end encrypted** | audio |
| playlists you show on your profile, readable (the server shows them) | |
| profile picture, banner and what you chose to show | |
| listening statistics, only if you turned them on | |

Not synced: recently played, play counts, lyrics offsets, downloaded files, the
server address and other device-specific settings.

Your devices encrypt the synced items with a key only they hold. While your
account has no password the server keeps that key, so a lost device never
loses the library; the server could then read it. Setting a password replaces
the key with one the server never sees.

**Settings › Server › Transparency** shows what the server you use can see:
your library, API keys, what you search and play (the server needs it to
answer), your profile, control between your devices, Jam, AI assistant requests
and technical data such as your IP address. Glyph works this out from what it
sends, never from what the server says about itself, and warns when a server
does something that only makes sense to read your data.

## Profiles

Profiles are only visible to signed-in users. Playlists and recently played
songs appear only when you turn them on under **Settings › Profile & privacy**.
Turning *recently played* off deletes it on the server.

## Export and delete

* `GET /v1/sync/export` returns all your synced items as JSON.
* **Settings › Account › Delete** removes your account, devices, synced items,
  profile, images and short links at once. The handle is held for 30 days. The
  library on each device stays.

## Your own server

A server keeps an IP address in the clear only when its operator bans that
address or range by hand.

On a [self-hosted server](self-hosting/overview.md) the operator holds this data.
On the public server that is the Glyph project. On a server other than the
official one, Glyph signs you in in the app; that server's own sign-in page
opens only after a warning, because it could read your password.
