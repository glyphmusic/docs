---
description: Optional accounts: what syncs between devices, profiles and listening statistics.
---

# Accounts, sync and stats

An account is optional. With one, your liked songs, playlists, artists, albums,
searches, downloads list and settings are the same on every device.

* Sign in under **Settings › Account** with a password, a passkey or a code from
  a device that is already signed in. On a server other than the official one
  you sign in in the app; that server's own sign-in page opens only after a
  warning, because a modified server could read your password there.
* Your library, settings and API keys sync **end-to-end encrypted**: only your
  devices can read them. Your password opens them on a new device; a pairing
  code, or on the official server your other devices, hand the key over without
  anything to type.
* While your account has **no password**, the server keeps the key, so a lost
  device never loses your library, and the server could read it. Set a password
  to change that.
* How many devices may be signed in is decided by the server owner.
* Listening history, recommendations and stats belong to the account too. If
  you used Glyph without an account first, signing in asks whether to **merge**
  that data into the account or use only the account's data. The local data
  stays on the computer either way.
* **Sign out** switches back to the library you had without an account.
  Nothing is deleted: downloads and the account's data are still there when
  you sign in again.
* Playlists can also stay [only on one computer](library-and-queue.md#playlists).

The server stores your handle, a password hash computed on your device, passkey
public keys, device names and the synced items, encrypted (playlists you show on
your profile stay readable, because the server shows them). No IP addresses.

## What the server can see

**Settings › Server › Transparency** lists, for the server you use, what its
operator can see: your library (encrypted or not), API keys, what you search
and play, your profile, control between your devices, Jam, AI assistant
requests and technical data such as your IP address. Glyph works this out from
what it sends, not from what the server says about itself.

The same page lists notices. Glyph warns at once when a server does something
that only makes sense to read your data, for example handing out a sign-in salt
that would reveal a key, changing encrypted entries or replacing your library's
key.

## Profile

You can add a photo and a banner and choose which playlists and recently played
songs others see. Profiles are only visible to signed-in users, and private by
default.

## Listening stats

Off by default (**Settings › Playback › Content**). When on, Glyph counts
listening time, plays and skips and shows your top artists and songs per month,
year or all time, plus when you listen. Signed in, all your devices add up.
Turning stats off deletes them.

**Your year in Glyph**: with stats on, the statistics page offers a recap of the
year (and of last year): listening time, your top artist, favourite hour, day
and month, top artists and songs. Save the top songs as a playlist or share
them as a link.

More fixes: [Accounts and sync problems](../help/accounts-and-sync.md).
