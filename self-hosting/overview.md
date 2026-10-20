# Self-hosting overview

The app works with the public Glyph server, but every part can run on your own.

| Option | Good for | Accounts and sync | YouTube |
| --- | --- | --- | --- |
| [Cloudflare](cloudflare.md) | free hosting, your own domain | yes (D1) | with a [companion](companion.md) |
| [Own computer or VPS](native.md) | full control, one binary | not yet | built in (r-dlp / yt-dlp) |

Both are managed with the same [`glyph` CLI](cli.md):

```bash
npm install --global glyph-server
glyph help
```

Point the app at your server under **Settings › Server**.

{% hint style="info" %}
The server treats every app as untrusted: device limits, rate limits, sizes and
access rules are enforced on the server only.
{% endhint %}

The detailed operator guide (trust model, limits, backups, passkeys and domains)
is [SELF_HOSTING.md](https://github.com/glyphmusic/server/blob/main/docs/SELF_HOSTING.md).
