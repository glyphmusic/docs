---
description: Fixes for sign-in, the device limit, a forgotten password, API keys that do not sync and sync that looks out of date.
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
(**Settings › Account**). The code shown on both sides must match; if it does
not, cancel.

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

## API keys do not sync to a new device

API keys sync encrypted with your password. On a new device, enter the password
once when Glyph asks for it (**Settings › Account**). If you signed in with a
passkey only and have no password yet, **Set a password** first; until then
settings sync, keys do not.

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
