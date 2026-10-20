# Cloudflare

You need a Cloudflare account and Node.js 22 or newer. No Rust and no checkout.

```bash
npm install --global glyph-server
glyph setup cloudflare
```

The setup uses **your** account: it creates a Worker and a D1 database
(optionally an R2 bucket), applies the database migrations, asks for an admin
password (hashed on your computer) and deploys. Your project is
`glyph-cloudflare/wrangler.json`.

## Change options

```bash
glyph cloudflare list
glyph cloudflare set RATE_LIMIT_PER_MIN 120
glyph cloudflare set REQUIRE_ACCOUNT true
glyph cloudflare domain glyph.example.com
glyph cloudflare secret LASTFM_API_KEY
glyph deploy
```

* `set` / `unset` change values in `wrangler.json`; `glyph deploy` applies them.
* `secret` stores a key in Cloudflare without echo; it applies at once.
* `domain` serves the Worker on your own domain (its zone must be on your
  account) and sets `PUBLIC_ORIGIN`.

{% hint style="warning" %}
Passkeys are bound to `PUBLIC_ORIGIN`. Pick your final domain before people
sign up; password sign-in keeps working after a change.
{% endhint %}

| Value | Meaning |
| --- | --- |
| `RATE_LIMIT_PER_MIN` | anonymous requests per minute and IP (60) |
| `YOUTUBE_DAILY_BUDGET_UNITS` | YouTube Data API units per day (9000) |
| `REQUIRE_ACCOUNT` | only signed-in apps may use the API |
| `PUBLIC_ORIGIN` | the HTTPS origin of your server |
| `SHARE_ORIGIN` | origin of short `/p/` playlist links |
| `YTDLP_SERVICE_URL` | your companion, for YouTube |

Secrets: `YOUTUBE_API_KEY`, `JAMENDO_CLIENT_ID`, `SOUNDCLOUD_CLIENT_ID`,
`SOUNDCLOUD_CLIENT_SECRET`, `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`,
`LASTFM_API_KEY`, `YTDLP_SERVICE_TOKEN`, `GLYPH_SERVER_BEARER`.

## Live settings

These change without a deploy, with the admin password:

```bash
glyph remote login https://glyph.example.com
glyph remote limits --rate 120
glyph remote companion off
glyph remote mcp off
glyph remote accounts default-limit 5
```

## YouTube

Workers cannot run yt-dlp. Run the [companion](companion.md)
in Docker on any machine, then:

```bash
glyph cloudflare set YTDLP_SERVICE_URL https://companion.example.com
glyph cloudflare secret YTDLP_SERVICE_TOKEN
```

## Updates

```bash
glyph update cli
glyph update server --worker-config glyph-cloudflare/wrangler.json
```
