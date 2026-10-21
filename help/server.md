---
description: Fixes for your own Glyph server, the YouTube companion and AI assistants: unreachable, no YouTube, 429 errors, storage full.
---

# Your own server

Setting a server up is explained under [Self-hosting](../self-hosting/overview.md).
Start every search for a problem with:

```bash
glyph doctor                     # config, keys, ports, reachability
glyph check --server <url>       # connectivity and newer releases
glyph version all                # what runs where
```

## The app says the server is not reachable

1. Open `https://<your-server>/v1/health` in a browser. No answer means the
   server is down or the address is wrong.
2. **Native server:** is it running (`glyph service status`)? Is the port open
   in the firewall and, at home, forwarded on the router?
3. **Cloudflare:** run `glyph deploy` again; a custom domain can take a few
   minutes after the first deploy.
4. **Private server:** the app needs the access token once; **Settings ›
   Server** asks for it. A wrong token is rejected every time.
5. **HTTPS errors** on a native server: the domain must point to the server
   before the certificate can be issued.

## No YouTube

* On Cloudflare, YouTube runs on the [companion](../self-hosting/companion.md).
  Is it on? `glyph remote companion on`. Is the machine running?
  `docker compose exec companion glyph-server companion status`.
* YouTube changed something: restart the companion to fetch the latest r-dlp
  (`docker compose restart companion`), or update with `glyph update companion`.
* Every other source keeps working without the companion; only YouTube is
  missing.

## Apps get "429" or "Too many requests"

A rate limit was reached; the app waits and tries again. Twelve rejected
requests in 15 minutes ban that IP, account or device for 15 minutes. Raise the
budget if your users share one network:

```bash
glyph remote limits --rate 120
```

See [Limits and protection](../self-hosting/limits.md).

## Searches are slow or time out

The server lets eight requests work at the same time, the rest wait up to 15
seconds. Add your own [API keys](../self-hosting/providers-and-keys.md) for
sources with tight quotas, or let users switch **Search** to *Local*.

## Radio, similar artists or some sources are missing

They need keys on the server, for example Last.fm for radio. `glyph doctor`
lists which keys are set and work. See
[Sources and API keys](../self-hosting/providers-and-keys.md).

## Cloudflare: storage full or the daily limit reached

* R2 full: old cached audio and covers go first, user images never. Raise the
  ceiling (`glyph remote limits --r2-max-gb 10`) or keep audio shorter
  (`--audio-days 7`).
* The free plan allows 100,000 requests a day. After that the Worker answers
  with errors until midnight UTC. Jam falls back to asking regularly once its
  70,000 daily pushes are used.

## Accounts do not work

* **"This server has no accounts."**: turn them on, see
  [Accounts on your server](../self-hosting/accounts.md).
* **Passkeys fail**: they only work on the domain they were set up for, over
  HTTPS. See [Domain and passkeys](../self-hosting/accounts.md#domain-and-passkeys).
* **A user is at the device limit**:
  `glyph remote accounts limit <handle> 10`.

## AI assistants cannot connect

* **On this computer**: **Settings › Integrations › AI assistants** must be on,
  and the token in the assistant must be the current one; *New token* voids
  the old one.
* **Through the server**: you must be signed in and Glyph must be open. The
  server owner may have turned it off (`glyph remote mcp on` turns it on).
  "Request declined" means the request was not allowed in Glyph; try again and
  click **Allow** when the codes match.
