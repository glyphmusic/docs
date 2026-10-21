---
description: Optional accounts: what syncs between devices, profiles and listening statistics.
---

# Accounts, sync and stats

An account is optional. With one, your liked songs, playlists, artists, albums,
searches, downloads list and settings are the same on every device.

* Sign in under **Settings › Account** with a password, a passkey or a code from
  a device that is already signed in.
* API keys you entered sync **encrypted** with your password; the server cannot
  read them.
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
public keys, device names and the synced items. No IP addresses.

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
