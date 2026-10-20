# Search and sources

Glyph only plays legal, free sources. A search asks all enabled sources at once
and merges the answers into one list, ranked by what you listen to.

| Source | What you get |
| --- | --- |
| Audius, Jamendo, Internet Archive | full songs |
| Deezer | official 30-second previews and rich metadata (albums, artists) |
| YouTube | full songs through r-dlp or yt-dlp, or the embedded player |
| SoundCloud | the official embedded player |

Order and on/off switches are under **Settings › Playback › Sources**.

## Tips

* `"quoted words"` match exactly.
* Results that only match a song's **lyrics** appear in their own section,
  marked *In lyrics*.
* Glyph waits until you stop typing before it searches, so typing fast does not
  send a request per key.
* Paste a playlist, album or profile link from Spotify, Deezer, SoundCloud,
  YouTube, Apple Music, Bandcamp or Last.fm to import it. See
  [Transfer music](transfer-music.md).

## YouTube

YouTube needs a resolver. Glyph includes **r-dlp**, its own fast resolver, and
can also use **yt-dlp** if it is installed (**Settings › Playback › YouTube
extractor**). *Local* resolves on your computer; *Server* lets your Glyph server
(and its companion) do it. *Use YouTube only* never falls back to other sources
or previews.

## Artists and albums

Artist pages show popular songs, the full discography (albums, EPs and singles),
similar artists and a verified badge next to verified names. Playing an artist
adds the artist itself to *Recently played*.
