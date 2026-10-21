---
description: Listen together with friends. One queue, everyone adds songs, everyone hears the same song at the same moment.
---

# Jam: listen together

A Jam is a shared listening session. One person hosts it, friends join with a
code, a link or a QR code, and everybody hears the same song at the same
moment. Friends add songs to one shared queue, vote for what plays next and
react to what is playing.

Jam needs an account on the Glyph server for everyone taking part (see
[Accounts, sync and stats](accounts.md)).

## Start a Jam

1. Click **Connect to a device** (the speaker icon next to the volume) in the
   player bar.
2. Click **Start a Jam**.
3. Invite friends:
   * let them scan the **QR code** with their phone camera,
   * or click **Copy link** and send the link (`https://glyph.my/jam/K7P2QX`),
   * or copy the code with the copy icon (`glyph:jam:K7P2QX`).

The link opens Glyph right in the Jam (Windows, macOS, Linux and Android).
Without Glyph it shows the code and the download.

Your songs under **Up next** are the Jam's queue, and everyone sees the same
queue as you, including what you play after it. Songs friends add land there
with the friend's profile picture next to them. Play, pause and skip as usual:
everybody follows you.

### What friends may do

Under **Friends may** you decide, any time during the Jam:

| Switch | Default |
| --- | --- |
| Add songs and vote | on |
| Play songs right away (a picked song starts at once instead of being queued) | off |
| Skip songs | off |
| Seek within songs | off |
| Play and pause | off |
| Let people in by hand | off |

With **Let people in by hand** on, new people wait until you click
**Let in** (or **×**) next to their name under **Waiting to join**.

You can also remove someone (the **×** next to their name). They cannot join
this Jam again, not even after changing their @handle. **End Jam** ends it
for everyone; a Jam also ends by itself after 12 hours.

## Join a Jam

Open the link or scan the QR code, paste the code or link into the search bar,
or type the code into the field under **Start a Jam** in the Connect panel and
click **Join**. When the host lets people in by hand, Glyph waits until they
do.

### Where you listen

* **Play the music on this device** (on): Glyph plays the host's song here, at
  the host's moment.
* Off: the music only plays at the host's device, for example when you sit in
  the same room. Your Glyph shows what plays and where it is, and you can
  still add songs, vote and react.

### While you are in a Jam

* Your queue shows the Jam's queue. **Add to queue**, or clicking a song,
  sends the song to the Jam. When the host allows it, a clicked song plays
  right away.
* The thumbs-up next to a song votes for it; songs with more votes move up.
  You can remove songs you added yourself.
* The four icons next to the Jam's name (heart, fire, sparkles, thumbs-up)
  react to the song playing; everyone sees it pop up and in **Activity**.
* Play, pause, skip and seek go to the host when they allow it. Otherwise
  Glyph tells you that the host turned it off.
* The volume stays yours.

**Leave Jam** takes you out; your own queue comes back.

## How everyone stays together

* **Same version.** Glyph plays the song from the same source as the host
  when it can, so intros and lengths match. When that source does not work
  for you, it finds the song elsewhere; if it finds nothing, the Jam shows
  **Not available for you**.
* **Same moment.** Each Glyph syncs its clock with the server and aims to
  stay within about 60 ms of the host (speakers with their own delay, like
  Bluetooth, add to that). Small gaps are closed by
  playing up to 2 % faster or slower for a moment (hardly audible); after a
  seek or on a slow connection it jumps once.
* **Next song ready.** Since everyone's queue is the host's, the next song is
  loaded ahead and starts without a gap.
* **Host gone.** When the host's Glyph does not answer for a while, the Jam
  shows **Host offline**. After two minutes the guest who joined first takes
  over (then the next one, if they are gone too); the old host comes back as
  a guest. On phones Glyph keeps running in the background, so a host who
  just locks the phone stays the host.

## Good to know

* You can still send the music to a speaker or TV while in a Jam
  (see [Play on speakers and TVs](devices.md)); there it keeps in step by
  jumping, not by tempo.
* With Discord Rich Presence on (see [Integrations](integrations.md)), Discord
  shows that you listen in a Jam and how many are in it.
* Profile pictures show when people have one (see
  [Accounts, sync and stats](accounts.md)).
* Up to 20 people and 200 queued songs per Jam.

## Something not working?

See [Jam problems](../help/jam.md): every message with the steps that fix it.
