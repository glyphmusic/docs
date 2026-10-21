---
description: Fixes when search finds nothing, a link does not open, a transfer misses songs, or a shared link fails.
---

# Search, links and transfer problems

## Search finds nothing or shows an error

1. **"Check server and keys in Settings."** The server did not answer. Look at
   **Settings › Server**.
2. **The server is busy or blocked by a source.** Under **Settings › Playback ›
   Sources**, set **Search** to *Local*: this computer then asks the sources
   itself. See [Search and sources](../using-glyph/search-and-sources.md).
3. **No YouTube results.** On a Cloudflare server YouTube needs the
   [companion](../self-hosting/companion.md); while it is off, only YouTube is
   missing. In *Local* mode Glyph uses r-dlp, or yt-dlp if you chose it.
4. **Too narrow.** `"quoted words"` and
   [operators](../using-glyph/search-and-sources.md#search-operators) only match
   exactly. Remove them to see more.
5. **A source is switched off.** Check the switches under **Settings › Playback ›
   Sources**.

## A pasted link does nothing

* Glyph opens links from Spotify, Deezer, SoundCloud, YouTube, Apple Music,
  Bandcamp and Last.fm, see [the list](../using-glyph/transfer-music.md#single-playlists-by-link).
  Other services (Tidal, Amazon Music) need a [playlist file](../using-glyph/transfer-music.md#playlist-files).
* **Private playlists** cannot be read by anyone but the owner. Make it public
  for a moment, or use Google Takeout (YouTube) or copying the songs (Spotify).
* **Short links** (`spotify.link`, `on.soundcloud.com`, `deezer.page.link`) are
  followed to their service only. If one fails, open it in the browser and
  paste the long address.

## A Spotify playlist stops at 100 songs

Through a link Spotify only shows the first 100 songs to other apps. Open the
playlist in the Spotify app, click a song, press `Ctrl+A` (`Cmd+A`), `Ctrl+C`,
and press **Paste** in *Transfer music*. Every song comes over.

## "No song or playlist links on the clipboard."

The copy did not reach the clipboard. In the Spotify **desktop app or web
player**, click a song first so the list has focus, then `Ctrl+A`, `Ctrl+C`.
The mobile app cannot copy songs.

## Transfer: songs "not found yet" or "unsure"

* **Unsure matches** were found, but maybe as a live, remastered or different
  version. Check them on the result page; they are already in your list.
* **Not found yet** songs stay in your list. More sources (YouTube) find more:
  turn them on under **Settings › Playback › Sources** and transfer the same
  list again. Only the missing songs are added, nothing doubles.
* The transfer stopped? It continues after a restart under **Transfer music ›
  Unfinished › Continue**.

## "This server allows up to … songs per playlist."

The server owner set a limit. Split the list into two playlists, or use a
server without that limit.

## A shared Glyph link does not open

* **"Could not create or open the Glyph link"**: short `glyph.my` links need an
  account; sign in, or copy the `glyph:` code instead.
* The link opens the browser: click **Open in Glyph** on the page. If nothing
  happens, start Glyph once (it registers itself for `glyph://` links) and try
  again.
