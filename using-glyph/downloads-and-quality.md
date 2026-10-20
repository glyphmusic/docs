---
description: Offline downloads, streaming quality and saving data.
---

# Downloads and audio quality

## Download for offline

Right-click a song, album or playlist and choose **Download**. Only sources that
allow downloads can be saved.

* Playlists can **download new songs automatically**.
* The download button's tooltip shows how many songs of a list are saved and how
  a running download is going.
* Downloaded songs always play from disk first, even online. Glyph checks for a
  newer version in the background and replaces the file only after a complete,
  verified download.
* Signed in, the *list* of downloads syncs; each device downloads the files
  itself.

## Quality

**Settings › Audio** has separate choices for streaming and for downloads.

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
