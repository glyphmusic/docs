---
description: Offline downloads, streaming quality and saving data.
---

# Downloads and audio quality

## Download for offline

Right-click a song, album or playlist and choose **Download**. Only sources that
allow downloads can be saved. The playing song downloads with the button in
[Now Playing](now-playing.md) or `Ctrl+D`.

* Playlists can **download new songs automatically**.
* **Cancel download** stops a running download. It is in the song's or
  playlist's menu, on the download badge and in the select bar.
* The download button's tooltip shows how many songs of a list are saved and how
  a running download is going.
* Downloaded songs always play from disk first, even online. Glyph checks for a
  newer version in the background and replaces the file only after a complete,
  verified download.
* Signed in, the *list* of downloads syncs; each device downloads the files
  itself.

### When you have no internet

After a few seconds without a connection, a thin **No connection** bar shows
at the very bottom. It shows your downloaded songs and a button that plays
them. On a phone, a sheet also comes up once with **Downloads** and every
playlist that has downloaded songs. Tap one to play its saved songs. The bar
goes away as soon as you are back online.
* When a download is done, its message has a **Show in folder** button that
  opens your file manager at the file. Switch it off under **Settings › Cache &
  Storage › “Show in folder” after downloads**.

## Download folder

Downloads are saved as `Artist - Title.mp3` (or `.m4a`, `.flac`, ...) in
Glyph's data folder. To use another folder, for example your music folder:

1. **Settings › Cache & Storage › Download folder › Change…**
2. Pick the folder.

Glyph moves the songs you already downloaded into the new folder. Files that
were in that folder before are never overwritten: a song whose name is taken
gets a number, `Artist - Title (2).mp3`. **Default** moves the downloads back
into Glyph's data folder. Wait until running downloads have finished before
you switch.

The folder belongs to this device and is not synced. In a folder you picked,
**Clear** under *Cache & Storage* only deletes the songs Glyph downloaded,
never your own files.

## Quality

**Settings › Playback › General** has separate choices for streaming and for downloads.

| Quality | YouTube audio | Good for |
| --- | --- | --- |
| Low (data saver) | 48 kbps AAC | slow or metered connections |
| Standard | 96 kbps AAC | most connections |
| High | best source, about 128 kbps; downloads use FLAC where available | fast connections |
| Auto | chosen from your recent transfer speed | default |

Auto starts at *Standard*, steps down quickly when playback stalls and steps up
only after several fast transfers. While streaming it can switch during a song,
which may cause a short pause. Downloads choose once when they start. A manual
choice is always kept.

## Parallel downloads

Up to five songs download at the same time. These two options exist only in the
[settings file](config-file.md):

```toml
[audio]
download_parallelism = 5   # 1..10
download_adaptive = true   # slow connection: 1, normal: up to 3, fast: the maximum
```

## Data saver

**Settings › Cache & Storage › Data saver** loads small covers, refreshes the
home feeds at most every 12 hours, syncs less often and downloads one song at a
time.

## Cache and storage

The same page shows how much space covers, lyrics, search data, the audio stream
cache and downloads take, and clears each one. With a *Cache size limit* older
files are removed automatically; downloads never are.
