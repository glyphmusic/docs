---
description: Send songs, playlists, settings and equalizer curves to others.
---

# Sharing

## Songs, artists and playlists

Right-click and choose **Share**.

| You are | You get |
| --- | --- |
| signed in | a short `glyph.my/p/...` link with a preview card that opens in the web player and can also open in Glyph |
| not signed in, or *Glyph links when sharing* off | the song's own link on its platform; playlists as a `glyph:playlist:...` code you can send as text |

Opening a `glyph.my/p/...` link in a browser opens the
[web player](web-player.md) (`/web/p/<id>`) with the song, album or playlist
ready to play, save to your library or open in the app (link previews in chat
apps still show the rich card). Its songs are also plain audio files:
`yt-dlp <link>` downloads them, and other players can add them. Whoever opens
the link needs no account. Turn Glyph links off under
**Settings › Account › Overview › Glyph links when sharing**.

A shared playlist opens as a preview. Nothing is added to your library until you
click **Add to library**. The owner can delete a short link at any time, and all
of them disappear when the account is deleted.

### On a phone

On the phone app and the web player on a phone, **Share** (including artists and
Jam invites) opens a menu from the bottom: a card with the cover and title, the
link, and buttons for **Copy link**, **WhatsApp**, **Telegram**, **SMS**,
**E-mail** and **More** (the phone's own share menu). On the computer the link
is copied right away.

## Send songs to Glyph

Share a song or playlist link (or a music file) from another app to Glyph:

* **Android:** pick Glyph in the share menu. The **Add to Glyph** sheet opens
  right over the app you are in, so you can tick **Liked Songs**, one or more
  playlists, **Save as playlist** or **Play**, and return straight where you
  were without leaving the other app.
* **Computer:** use **Send to › Glyph** or `glyph <link>`. A small window asks
  where the song goes: **Liked Songs** (ticked at the start), one or more
  playlists, or a new playlist, with a **Play** button to listen first.

### Copied music links

On the computer: copy a Spotify, YouTube or other song or playlist link in any
app, switch to Glyph, and a message offers **Add**. Turn it off under
**Settings › System › Offer copied music links**.

## Profile

Signed-in users see each other's picture and banner under `@handle`. Playlists
and recently played songs are visible only when you switch them on under
**Settings › Profile & privacy**. See [Accounts](accounts.md#profile).

## Settings

**Settings › Backup & share** copies all your settings as one line of text or a
file and applies someone else's. API keys, the server address and
device-specific options are never included.

## Equalizer curves

Share an equalizer curve as a code or a file, and import other people's curves
the same way.
