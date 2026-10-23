---
description: Fixes for sign-in, the device limit, a forgotten password, a library that is locked on a new device, privacy alerts and sync that looks out of date.
---

# Accounts and sync problems

How accounts work is explained in [Accounts, sync and stats](../using-glyph/accounts.md).

## Signing in

### "Could not reach the Glyph server."

Check your internet connection and **Settings › Server**. On a private server
the app first needs the server's access token (it asks for it once).

### "This server has no accounts."

The server you use has accounts switched off. Your library stays on this
computer. On your own server, turn them on: see
[Accounts on your server](../self-hosting/accounts.md).

### "Sign-in expired. Start again."

The browser page or the code was not finished in time. Click **Sign in** again;
a new code appears.

### "Handle or password wrong."

* Handles are lowercase, without the `@`.
* After several wrong tries, **"Too many tries. Wait a moment."** appears: wait
  a few minutes before the next try.

### "Device limit reached."

Your account is signed in on as many devices as the server allows. Remove one:

* on the sign-in page in the browser, which lists your devices,
* or on a signed-in device under **Settings › Account › Devices** › **Remove**.

Then sign in again. A passkey sign-in also lets you remove a device first. The
limit itself is set by the server owner.

### "Unknown or expired code."

Pairing codes are short-lived and only work once. Start the sign-in again on the
new device and approve the new code on the signed-in device
(**Settings › Account**). Type the whole code, including the last four
characters: they hand your library's key to the new device. The code shown on
both sides must match; if it does not, cancel.

### Where is "Sign in with your browser"?

On a server other than the official one, Glyph signs you in in the app: with
your password or a pairing code. That server's own sign-in page is still
there under *Use this server's own sign-in page*, after a warning: a modified
server could read your password on its own page.

## Forgot your password

The server never knows your password, so it cannot reset it. Sign in another way
and set a new one under **Settings › Account**:

1. **Passkey** (Windows Hello, Touch ID or your phone), or
2. **a code** approved on a device that is still signed in, or
3. **your recovery code** on the sign-in page.

{% hint style="warning" %}
Without any of these, the account cannot be recovered. Keep the recovery code
(**Settings › Account › Recovery code**) somewhere safe; making a new one
voids the old.
{% endhint %}

Your library is encrypted with a key only your devices have. If you forgot the
password, keep one signed-in device until the new device has your library: that
device holds the key and passes it on. If no signed-in device is left and the
password is gone, the server cannot open the library for you.

## My library is locked on a new device

Your library is end-to-end encrypted. A new device gets the key when you sign in
with your password, through the pairing code, or (on the official server) from
another device of yours as soon as that one is online. Otherwise enter your
password once under **Settings › Account** (Library & API keys).

## "Server holds the key"

Your account has no password, so the server keeps your library's key: nothing is
lost if a device breaks, and the server could read your library. Set a password
under **Settings › Account › Security**; your library then gets a new key the
server never sees. Accounts with a password from before end-to-end encryption
show **Activate**: enter the password once.

API keys sync only once the server no longer holds the key.

## A privacy alert appeared

Glyph shows an alert when the server did something that only makes sense to
read your data, and lists it under **Settings › Server › Transparency**. Glyph
did not send anything readable because of it. If you do not run the server
yourself, ask its operator, or sign out and use another server.

## Sync looks out of date

* Sync runs at start, when the window gets focus and every five minutes.
  Changes are sent two seconds after you make them; focusing the window on the
  other device fetches them.
* *Data saver* syncs less often.
* A playlist marked *Local playlist* stays on one computer on purpose. Right-click
  it and choose *Account playlist* to sync it.
* Two devices changed the same item? The newer change wins.

## After signing in, my library looks different

Signed in, Glyph shows the account's library. If you used Glyph without an
account before, it asked whether to **merge** that data into the account. Chose
*Use account data only* by mistake? Your old data is still on the computer:
**Sign out** shows it again.
