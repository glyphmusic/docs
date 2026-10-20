---
description: Bring your library from Spotify, YouTube Music, SoundCloud, Deezer or Last.fm without logging in, or import single playlists from links and files.
---

# Transfer music

Glyph copies your lists and the song details, never audio files. Every song is
matched to a legal full source, ISRC first; songs without one yet stay in the
list and are tried again when you play them.

Open **Settings › Transfer music** or **Library › Transfer music**.

{% hint style="info" %}
No login, no API key, no app to register. Glyph only reads public pages and
what you hand it (copied links, files). Nothing of yours goes to a Glyph
server except public links it reads for you.
{% endhint %}

## Whole libraries

| From | What comes over | How |
| --- | --- | --- |
| Spotify | liked songs, playlists | copy them in the Spotify app and paste |
| YouTube Music | playlists, liked music | playlist links; private lists from a Google Takeout file |
| SoundCloud | likes | link to your public profile |
| Deezer | favourites, playlists, albums, artists | link to your public profile |
| Last.fm | loved tracks | your user name |

Pick what should come over, then **Transfer**. It runs in the background while
you keep listening, and continues after a restart (*Unfinished › Continue*). A
list you transfer twice only gets its new songs.

When it is done, Glyph shows **unsure matches** (found, but maybe a live or
remastered version) and songs **not found yet**. Both stay in your lists.

### Spotify

1. Open **Liked Songs** (or any playlist) in the Spotify desktop app or the web
   player.
2. Click a song, press `Ctrl+A` (`Cmd+A` on a Mac), then `Ctrl+C`. That copies
   one link per song, every song of the list.
3. In Glyph press **Paste**. Repeat for more playlists: all links collect on the
   page. Playlist links (right-click › *Share* › *Copy link*) work as well.

Copied songs become your **Liked Songs**, every playlist link its own playlist.

{% hint style="warning" %}
Through a playlist link Spotify shows other apps only the first 100 songs
(unless your Glyph server has a Spotify key). For longer playlists copy the
songs themselves as above. Spotify's own mixes (Discover Weekly, Daily Mix)
work the same way: open them and copy the songs.
{% endhint %}

You can also paste the copied songs straight into the search bar: Glyph opens
*Transfer music* with them.

### YouTube Music

* **Public or unlisted playlists:** copy the link (*Share › Copy*) and press
  **Paste**.
* **Liked music and private playlists:** export them with
  [Google Takeout](https://takeout.google.com/settings/takeout/custom/youtube)
  (*YouTube and YouTube Music*, only *playlists* is needed), unzip the download
  and pick the CSV files from the `playlists` folder with **Choose files**.
  Takeout only holds video IDs; Glyph looks up the titles itself.

### SoundCloud, Deezer, Last.fm

Enter your profile link or name and click **Next**. Only what is public on the
profile is visible.

* **SoundCloud:** your likes come over. Sets come over by pasting their links
  (see below). Reading SoundCloud uses the Glyph server's key; with an own
  `soundcloud_client_id` in the [settings file](config-file.md) the app also
  reads your playlists and followed artists itself.
* **Deezer:** favourites, playlists, saved albums and followed artists.
* **Last.fm:** loved tracks (through the server's Last.fm key). With an own
  Last.fm key your top tracks can come over as a playlist too.

## Single playlists by link

Paste a link into **New playlist**, into search, or under *Playlist by link*:

| Service | Links that work |
| --- | --- |
| Spotify | playlists, albums, artists (top songs), songs, `spotify.link` |
| Deezer | playlists, albums, artists, profiles, songs, `deezer.page.link` |
| SoundCloud | sets, likes, a user's tracks, songs, `on.soundcloud.com` |
| YouTube | playlists (also YouTube Music) |
| Apple Music | public playlists and albums |
| Bandcamp | albums and songs |
| Last.fm | profiles (loved tracks) |

None needs a key. Glyph tries the Glyph server first, then your own
[API keys](direct-mode-and-keys.md) if you set any, then the public pages.
Short links are only followed to the service they belong to.

Tidal and Apple Music libraries: paste public playlist links or use a file.

## Playlist files

*Playlist file › Choose file* (or **Import file** in *New playlist*) reads:

* **CSV** from Exportify, TuneMyMusic and similar tools
* the **Spotify data export** (JSON)
* **M3U / M3U8** and **XSPF**
* **Google Takeout** CSVs of YouTube playlists

You can also drag music files from your computer into a playlist.
