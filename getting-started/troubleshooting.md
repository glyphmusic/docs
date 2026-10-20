---
description: Fixes for the most common problems.
---

# Troubleshooting

## A song does not start or stops after a minute

* Check **Settings › Server**: the status line shows whether the server answers.
* YouTube songs need a resolver. Under **Settings › Playback › YouTube
  extractor** switch between *Local* and *Server*, or between r-dlp and yt-dlp.
* The audio output may be stuck. Right-click the volume button and pick another
  output or the system default.

## Only 30-second previews

The song was only found on a source that allows previews (Deezer). Enable
YouTube under **Settings › Playback › Sources** or move it up the priority list.

## No YouTube results

* On a Cloudflare server, YouTube needs the
  [companion](../self-hosting/companion.md). When it is off, only YouTube is
  missing; every other source keeps working.
* In *Local* mode Glyph uses r-dlp, or yt-dlp if you chose it. yt-dlp can be
  installed or updated from the same settings page.

## Radio is greyed out

Radio needs a Last.fm key, on the server or in your own
[API keys](../using-glyph/direct-mode-and-keys.md). Hover the switch to see why
it is off.

## Sign-in does not finish

* At the device limit the sign-in page asks you to remove a device first.
* Lost every device? Use your recovery code on the sign-in page.
* On a private server the app first needs the server's access token
  (**Settings › Server**).

## Sync looks out of date

Sync runs at start, when the window gets focus and every five minutes. Changes
are sent two seconds after you make them. *Data saver* syncs less often.

## Glyph uses a lot of disk space

**Settings › Cache & Storage** shows what takes space and clears covers, lyrics,
the stream cache and search data. A *Cache size limit* removes old files
automatically. Downloads are never removed by the limit.

## Something else

**Settings › Support › Copy diagnostic info** copies version and system details
without keys or personal data. Paste it into a
[GitHub issue](https://github.com/glyphmusic/desktop/issues/new).
