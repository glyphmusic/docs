---
description: How Glyph learns your music taste, Daily Mixes, the taste profile page, Glyph Drift radio, and how to keep it all on your device.
---

# Taste, Daily Mixes and Drift

Glyph learns what you like from what you play, replay, finish, skip and like.
It uses that for the songs on **Home**, **Daily Mixes**, radio, the
*Recommended* songs under your playlists and the order of search results.

It is on by default. Switch it off under **Settings › Playback › Content ›
Music taste & Daily Mixes**.

## Daily Mixes

**Home › Made for you** shows mixes built for you: *Daily Mix*, *For your mood*,
*Right now* (fits the time of day) and *Discovery* (new artists close to your
favourites). Open a mix to play it, or press **Save as playlist** to keep it.

## Your taste profile

Open **Your taste** from *Made for you* on Home, from the Library, or with
**Settings › Playback › Content › Your taste profile**. The page shows:

* what you are in the mood for right now (for example *Discovery*, *Deep focus*
  or *High energy*) and how much energy and discovery Glyph aims for,
* your top genres, moods and eras; tap a mood to get more of it,
* when you listen, how many songs you finish and how varied you listen,
* **Styles & versions** (Live, Acoustic, Remix, Slowed, Sped up, Lo-Fi, ...):
  tap one to *Prefer*, *Avoid* or reset it,
* **What you like** and **What you avoid**, with *Restore* for an artist you
  want back,
* picks *From similar listeners*.

**Tune taste** lets you pick three or more favourite artists or songs, so Glyph
knows you from the start. The same picker shows once after the welcome tour; it
is optional. **Reset taste profile** forgets what Glyph learned (skips, picks,
disliked songs, genre choices); your liked songs and playlists stay.

**Not interested in this song** in a song's menu keeps it out of your mixes and
suggestions. *Allow this song again* undoes it.

## Server or only this device

By default the Glyph server helps: it gets taste signals (your top and skipped
artists, the last songs of this session) and answers with recommendations,
mixes and picks from similar listeners. To learn which artists go together, the
server keeps artist pairs from many listeners, each listener only as a hashed
id.

Turn off **Settings › Playback › Content › Server-powered Taste engine** to keep
everything on this device. Glyph then builds mixes and radio itself. The same
happens offline and on servers that do not offer it yet.

**Genre, mood & era tags** looks up tags for your top artists, so mixes can be
grouped by vibe. Switch it off if you do not want that.

## Glyph Drift (beta)

A radio for when the queue ends, made from Glyph's own taste instead of
Last.fm. Songs you play to the end lead the way, skipped songs steer it away,
and it adds a few songs at a time, so it follows your mood. It does not need a
Last.fm key.

Turn it on under **Settings › Playback › Content › Glyph Drift (beta)**. It
needs *Music taste & Daily Mixes* on and is not in the web player.

## Settings file

```toml
[taste]
enabled = true              # Music taste & Daily Mixes
server_collab = true        # Server-powered Taste engine; false = only this device
metadata_enrichment = true  # Genre, mood & era tags
drift_radio = false         # Glyph Drift (beta)
```

See [Settings file](config-file.md).
