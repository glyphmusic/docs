---
description: Which legal sources Glyph searches, search tips and operators, YouTube resolvers and artist pages.
---

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

The **Search** setting on that page chooses **Server** (default) or **Local**.
Local searches contact enabled providers directly from your device, including
when the Glyph server is rate-limited or blocked by a provider. Providers that
require API keys use your own configured keys. This choice stays on this device
and applies to further result pages too. Results use the normal playback and
library actions. YouTube playback is configured separately: select **Local**
for YouTube as well to resolve its audio without the Glyph server.

## Tips

* `"quoted words"` match exactly.
* Use [search operators](#search-operators) to narrow results by source,
  artist, title, album, length and more.
* Results that only match a song's **lyrics** appear in their own section,
  marked *In lyrics*.
* Glyph waits until you stop typing before it searches, so typing fast does not
  send a request per key.
* Paste a playlist, album or profile link from Spotify, Deezer, SoundCloud,
  YouTube, Apple Music, Bandcamp or Last.fm to import it. See
  [Transfer music](transfer-music.md).

## Search operators

Type operators anywhere in the search bar, in upper or lower case, and combine
them freely.

| Operator | Example | Shows only |
| --- | --- | --- |
| `yt:` `au:` `sc:` `sp:` `dz:` `ja:` `ia:` | `yt: believer` | songs from YouTube, Audius, SoundCloud, Spotify, Deezer, Jamendo or Internet Archive |
| `youtube:`, `soundcloud:`, ... | `soundcloud: drake` | the same, with the full source name |
| `artist:` / `a:` / `by:` | `believer artist:imagine dragons` | songs by that artist |
| `title:` / `t:` / `song:` | `title:halo` | songs with that in the title |
| `album:` / `al:` | `album:kind of blue` | songs from that album |
| `-word`, `-"two words"` | `believer -live` | songs without that word |
| `explicit:yes` / `explicit:no` | `explicit:no eminem` | explicit or clean songs |
| `dur:` | `dur:>3`, `dur:<2:30`, `dur:3-5`, `dur:long`, `dur:short` | songs of that length (minutes or m:ss) |

* Several sources at once show songs from any of them: `yt: sc: believer`.
* The value of `artist:`, `title:` and `album:` runs to the next operator, so
  put other words before it.
* `-word` matches whole words: `-live` keeps "Deliver".
* Operators filter the results; Glyph still searches all enabled sources. A
  source that is switched off shows nothing.
* Songs without a known length are left out when `dur:` is used.
* Words with an unknown prefix, such as `Re:Zero`, are searched as typed.

## YouTube

YouTube needs a resolver. Glyph includes **r-dlp**, its own fast resolver, and
can also use **yt-dlp** if it is installed (**Settings › Playback › YouTube
extractor**). *Local* resolves on your computer; *Server* lets your Glyph server
(and its companion) do it. *Use YouTube only* never falls back to other sources
or previews.

## Explicit-content ratings

An **E** marks a song rated explicit. YouTube does not provide this rating, so
Glyph looks up otherwise unrated YouTube results in Deezer. A matching song
uses its explicit or clean rating; a **?** means no rating was found.
**Hide explicit songs** also hides songs with an unknown rating.

## Artists and albums

Artist pages show popular songs, the full discography (albums, EPs and singles),
similar artists and a verified badge next to verified names. Playing an artist
adds the artist itself to *Recently played*.

Follow an artist with the button on their page. **Home** then shows *New from
artists you follow*: their albums, EPs and singles from the last eight weeks
(Deezer catalog), newest first. The radio button on an artist page plays songs
similar to theirs.
