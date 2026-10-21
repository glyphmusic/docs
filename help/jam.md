---
description: Fixes for Jam: cannot join, the invite link does not open Glyph, out of sync, Not available for you, Host offline.
---

# Jam problems

How a Jam works is explained in [Jam: listen together](../using-glyph/jam.md).
Find the message you see below.

## Joining

### "Sign in to use Jam (Settings > Account)."

Everyone in a Jam, host and friends, needs an account on the same Glyph server.
Sign in under **Settings › Account**. Friends who use a different server than
the host cannot join; they switch to the host's server under **Settings ›
Server** first.

### "That is not a Jam code."

* A code has six letters and digits, for example `K7P2QX`. Paste the whole
  link (`https://glyph.my/jam/K7P2QX`) or code (`glyph:jam:K7P2QX`) into the
  search bar instead of typing it.
* Codes never contain `O`, `0`, `I` or `1`. If you think you see one, copy the
  code instead of typing it.

### "This Jam has ended."

The host clicked **End Jam**, started a new Jam (which ends the old one), or the
Jam ran for 12 hours. Ask the host for the new link.

### "This Jam is full."

A Jam takes up to 20 people. Someone has to leave first.

### "Waiting for the host…" or "The host did not let you in."

The host has **Let people in by hand** on. They see you under **Waiting to join**
in their Connect panel and click **Let in**. If the host is away from Glyph,
ask them in your chat. You can close the panel meanwhile.

### "You are no longer in this Jam."

The host removed you. You cannot join this Jam again, also not with another
@handle; the host has to start a new one.

### "This server does not support Jam yet."

The server is too old or has no accounts. On your own server, update it
(`glyph update server`, see [Your own server](server.md)) and turn
[accounts](../self-hosting/accounts.md) on.

### The invite link opens the browser, not Glyph

The page shows the code. Copy it and paste it into Glyph's search bar. If the
link should open Glyph but does not, start Glyph once (it registers itself for
`glyph://` links) and open the link again.

## Listening

### "Not available for you"

The host's song cannot be played on your device: the source the host uses does
not work for you, and Glyph found it nowhere else. Your Glyph stays quiet for
this song and joins again with the next one.

* Turn on more sources under **Settings › Playback › Sources**, YouTube above
  all.
* Check **Settings › Server**: if your server is not reachable, nothing can be
  found.
* Songs the host only has on their computer (their own files) never reach
  friends.

### We hear it at different moments

* **Bluetooth headphones and speakers** add their own delay (often 100 to
  300 ms) that Glyph cannot see. Use cable or the device speaker on both sides
  to compare.
* **Same room?** Two devices playing aloud next to each other always sound like
  an echo. Turn **Play the music on this device** off on all but one, then only
  that device plays and the others are remotes.
* **Just seeked or the connection was slow?** Glyph jumps once to catch up and
  then keeps within about 60 ms by playing a little faster or slower.
* **Playing on a TV or speaker** from the Connect panel: these keep in step by
  jumping, so small jumps are normal there.

### Changes show up late

On glyph.my, changes reach everyone at once over a live connection. On other
servers, or when the live connection is used up for the day, Glyph asks the
server regularly instead, so a new song or vote may take a moment. Nothing is
lost.

### "The host has turned this off."

The host decides what friends may do (skip, seek, pause, play songs right away)
under **Friends may**. Ask them to switch it on.

## The host

### "Host offline"

The host's Glyph has not answered for 45 seconds: it was closed, the computer
went to sleep or lost its connection.

* If the host comes back within two minutes, nothing changes.
* After two minutes the friend who joined first takes over as host ("You now
  host the Jam") and the queue continues from there.
* When the old host comes back, they are a guest ("Someone else took over the
  Jam. You are a guest now.").

On phones Glyph keeps running in the background, so locking the phone does not
make the host go offline. On a laptop, keep it from sleeping while you host.

### My queue disappeared after I left

That is expected: in a Jam your queue shows the Jam's queue. **Leave Jam**
brings your own queue back.
