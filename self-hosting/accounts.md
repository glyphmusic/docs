---
description: Run accounts and sync on your own server, with your own domain.
---

# Accounts on your server

Accounts and sync currently need a [Cloudflare server](cloudflare.md) with a D1
database. A native server reports `accounts: false` and the app hides the
account page.

## Turn them on

Accounts switch on when the Worker has the `GLYPH_DB` database binding and
`PUBLIC_ORIGIN` set. `glyph setup cloudflare` does both. Check with:

```bash
curl https://api.example.com/v1/health   # "accounts": true
```

## Domain and passkeys

| Setting | Example | Meaning |
| --- | --- | --- |
| `PUBLIC_ORIGIN` | `https://api.example.com` | where the sign-in page is served |
| `ACCOUNT_RP_ID` | `example.com` | the domain passkeys belong to |
| `ACCOUNT_EXTRA_ORIGINS` | `android:apk-key-hash:...` | extra WebAuthn origins for mobile apps |

Use a subdomain for the API so the bare domain stays free for a website. Set
`ACCOUNT_RP_ID` to the bare domain: passkeys then work on every subdomain.

{% hint style="warning" %}
A passkey only works for the domain it was created on. **Changing
`ACCOUNT_RP_ID` later invalidates every passkey.** Users still get in with their
password, a pairing code or the recovery code, then add a new passkey. Pick the
final domain before real users sign up.
{% endhint %}

## Admin access

The admin API is off until you set a password hash:

```bash
glyph hash-password                       # prints a hash; the password is stored nowhere
glyph cloudflare secret ADMIN_PASSWORD_HASH
glyph remote login https://api.example.com
glyph remote status
```

Admin logins are locked for 15 minutes after five wrong passwords and only work
over HTTPS. The admin login checks Argon2id on the Worker; if the free plan's
CPU limit stops it, it needs the Workers Paid plan.

## Device limit

The limit is a server setting; the app only shows it.

| Command | Effect |
| --- | --- |
| `glyph remote accounts default-limit` | show the default (5) |
| `glyph remote accounts default-limit 5` | default for every account, 1–100 |
| `glyph remote accounts limit alice 10` | own limit for `@alice` |
| `glyph remote accounts limit alice default` | back to the default |
| `glyph remote accounts show alice` | limit in force and devices |

Changes apply at once. Lowering a limit keeps existing devices signed in; new
ones must wait until the account is below it. At the limit the sign-in page lets
the user remove a device first.

## Only signed-in users

```bash
glyph remote limits --require-account true
```

Every `/v1/*` route then needs a valid account token; guests get HTTP 401
`account_required`. Sign-in, health and public share pages stay reachable.

## How sign-in works

* **Handle**: `@name`, 3–20 characters `a-z 0-9 _`, unique, changeable once per
  30 days. A released handle stays blocked for 30 days.
* **Password**: the device computes `Argon2id(password, salt)`; the server only
  stores the salt and a hash of that key. The password never reaches the server.
* **Passkeys**: WebAuthn ES256/RS256 with user verification; only the public key
  is stored.
* **Pairing code**: a new device shows a code, a signed-in device approves it.
* **Recovery code**: shown once at sign-up, stored as a hash.
* **Tokens**: per device an access token (1 hour) and a refresh token (90 days,
  rotated on every use). Only hashes are stored.
* **Sync**: last writer wins per item; deletions are kept for 180 days.

## Backups

```bash
npx wrangler d1 export glyph --remote --output backup.sql
```

If other people use your server, you hold their personal data. Depending on
your country you may need a privacy notice and an imprint. See
[Privacy](../privacy.md) for what is stored.
