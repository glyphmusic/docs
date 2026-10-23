---
description: Rate limits, abuse protection, storage ceilings and private servers.
---

# Limits and protection

The server treats every app as untrusted. All limits below are enforced on the
server.

## Rate limits

```bash
glyph remote limits                         # show
glyph remote limits --rate 120 --import-pages 3
```

| Who | Budget |
| --- | --- |
| guest | `rate_limit_per_min` (default 60) per IP and per installation |
| signed-in device | 4× that, per account and device |
| everyone | a shared ceiling of 8× per IP |
| audio, seeks, covers | separate budgets, 20× |

Twelve rejected requests within 15 minutes ban that IP, account or device for 15
minutes. Answers are HTTP 429 with `Retry-After`. Guests behind one router share
an IP budget.

On a native server limits live in memory and reset on restart. On Cloudflare
they are stored in D1 and shared across locations; changes reach every location
within 30 seconds.

## Busy servers

Metadata requests use eight working slots and up to 64 waiting requests, with a
15-second timeout. Under load three signed-in requests are let in for every guest
request.

## Account limits

| What | Limit |
| --- | --- |
| sign-ups | 5 per hour and IP |
| sign-in starts | 10 per 10 minutes and IP |
| password sign-ins | 20 per 10 minutes and IP, 10 per hour and handle |
| recovery-code sign-ins | 5 per 10 minutes and IP, 5 per hour and handle |
| handle checks | 30 per minute and IP |
| token refresh | 30 per minute and IP |
| sync push | 500 items and 2 MB per request, 1 MB per item |
| playlist covers | 512 KB, JPEG/PNG/WebP |
| profile picture / banner | re-encoded as WebP, max 512 px / 1500×500 |

## Storage ceilings (Cloudflare)

```bash
glyph remote limits --d1-max-mb 500 --r2-max-gb 10
glyph remote limits --audio-days 15
```

* **R2** holds cached audio, covers and user images. When full, expired and then
  rarely played audio and covers go first. User images are never deleted for
  space; if only they remain, new writes are refused.
* **D1** keeps 10 % (at most 50 MB) in reserve. Cleanup removes expired counters
  and pending sign-ins, never accounts or libraries.
* An hourly inventory and a per-minute maintenance job keep the numbers right.
  Deploying activates them.

Cloudflare's own plan limits apply on top: 100,000 requests a day, D1 5 GB, R2
10 GB on the free plans.

## Switches

| Command | Effect |
| --- | --- |
| `glyph companion off --server <url>` | stop YouTube at once; every other source keeps working |
| `glyph remote mcp off` | no AI assistant access through this server |
| `glyph remote limits --require-account true` | only signed-in apps |
| `glyph remote limits --youtube-per-day 200` | at most 200 YouTube songs per account (guests: per address) and day |
| `glyph remote limits --youtube-require-account true` | YouTube audio and downloads only for signed-in accounts; guests keep every other source (Worker with accounts) |

## Bans

Operator bans last until lifted (or `--days`), unlike the automatic 15-minute
ones above:

```bash
glyph remote ban account somehandle        # account, its addresses and hardware
glyph remote ban ip 203.0.113.0/24
glyph remote ban device somehandle d_1a2b  # one device, survives reinstalling
glyph remote ban list
glyph remote unban somehandle
```

Banned clients get HTTP 403 `banned` on every request. Addresses of accounts
are kept only as salted hashes; see the [CLI reference](cli.md#bans) for the
details.

## Private server

Require a shared access token from every app, independent of accounts:

```bash
glyph access              # native: asks for a 32–256 character token twice, applies within seconds
glyph access --disable
glyph cloudflare secret GLYPH_SERVER_BEARER   # Cloudflare
```

Only a hash is stored. `/v1/health` stays public and reports
`server_auth_required: true`; the app then asks for the token once and keeps it
in the system keychain. It never grants admin access or access to another
user's account. Use HTTPS except on loopback.
