---
description: Bring your library from Spotify, YouTube Music, SoundCloud, Deezer or Last.fm, or import single playlists from links and files.
---

# Transfer music

Glyph copies your lists and the song details, never audio files. Every song is
matched to a legal full source, ISRC first; songs without one yet stay in the
list and are tried again when you play them.

Open **Settings › Transfer music** or **Library › Transfer music**.

## Whole libraries

| From | What comes over | Needs |
| --- | --- | --- |
| Spotify | liked songs, playlists, saved albums, followed artists | your own Spotify app, browser login |
| YouTube Music | liked music, playlists, subscribed artists | your own Google app, browser login |
| SoundCloud | likes, playlists, followed artists | a public profile and a SoundCloud client ID |
| Deezer | favourites, playlists, albums, artists | a public profile |
| Last.fm | loved tracks, optionally your top tracks | your user name |

Pick what should come over, then **Transfer**. It runs in the background while
you keep listening, and continues after a restart (*Unfinished › Continue*). A
list you transfer twice only gets its new songs.

When it is done, Glyph shows **unsure matches** (found, but maybe a live or
remastered version) and songs **not found yet**. Both stay in your lists.

{% hint style="info" %}
Logins are read-only, stay on this computer and are forgotten when Glyph closes.
They never go to a Glyph server.
{% endhint %}

### Spotify

Spotify only lets apps you registered yourself read a library:

1. Open the [Spotify developer dashboard](https://developer.spotify.com/dashboard)
   and create an app (any name, *Web API*).
2. Add the redirect address Glyph shows, `http://127.0.0.1:43117/callback`, and
   save.
3. Copy the app's client ID into Glyph. While the app is in development mode,
   add your Spotify account under *User Management*.
4. Click **Log in in the browser**.

Spotify's own mixes (Discover Weekly, Daily Mix, editorial playlists) are closed
to other apps and do not come over.

### YouTube Music

1. In the [Google Cloud console](https://console.cloud.google.com) create a
   project and enable the *YouTube Data API v3*.
2. Create an OAuth client of type *Desktop app* and add yourself as a test user.
3. Copy the client ID and client secret into Glyph and log in.

From liked videos only music videos come over.

### SoundCloud, Deezer, Last.fm

Enter your profile link or name and click **Read profile**. Only what is public
on the profile is visible. SoundCloud also needs a client ID, saved with your
other [API keys](direct-mode-and-keys.md).

## Single playlists by link

Paste a link into **New playlist**, into search, or under *Playlist by link*:

| Service | Links that work |
| --- | --- |
| Spotify | playlists, albums, artists (top songs), songs, `spotify.link` |
| Deezer | playlists, albums, artists, profiles, songs, `deezer.page.link` |
| SoundCloud | sets, likes, a user's tracks, songs, `on.soundcloud.com` |
| YouTube | playlists, videos |
| Apple Music | public playlists and albums |
| Bandcamp | albums |
| Last.fm | profiles (loved tracks) |

No key or login is needed. Spotify links show at most 100 songs this way. For
longer lists or *Liked Songs*, select all songs in the Spotify app (`Ctrl+A`,
`Ctrl+C`) and paste them: that is one link per song.

Tidal and Apple Music libraries: paste public playlist links or use a file.

## Playlist files

*Playlist file › Choose file* reads:

* **CSV** from Exportify, TuneMyMusic and similar tools
* the **Spotify data export** (JSON)
* **M3U / M3U8** and **XSPF**
* **Google Takeout** CSVs of YouTube playlists

You can also drag music files from your computer into a playlist.
