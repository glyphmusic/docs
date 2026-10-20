---
description: Where config.toml lives, options that exist only in the file, and settings backup.
---

# Settings file

Everything in the settings window is stored in `config.toml`:

| System | Path |
| --- | --- |
| Windows | `%APPDATA%\glyph\config.toml` |
| macOS | `~/Library/Application Support/glyph/config.toml` |
| Linux | `~/.config/glyph/config.toml` |

Environment variables such as `GLYPH_SERVER_URL` override the file and are
never written back. Some options exist only in the file:

```toml
[audio]
download_parallelism = 5   # 1..10
download_adaptive = true   # follow your connection speed
```

An empty `server_url` switches to direct mode: the app asks the sources itself
with your own API keys. See
[config.example.toml](https://github.com/glyphmusic/desktop/blob/main/config.example.toml)
for every option.

## Backup and sharing

**Settings › Backup and sharing** copies your settings as one line of text or a
file, and applies someone else's. API keys, the server address and device
specific options (audio output, folders) are never included.
