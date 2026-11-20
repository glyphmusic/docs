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

Settings that belong to one device stay in its file and are never synced:
shortcuts, mouse wheel steps, text size, performance and animation modes,
background pictures, notifications, music folders and the download folder.

```toml
[visuals]
glow_shape = ""            # "", "strahl", "band", "sonnenaufgang", "horizont", "solid"
solid_color = ""           # hex colour for "solid" background, empty = theme default
performance_mode = false   # lighter background and effects on this device
render_mode = "gpu"        # "gpu" or "cpu"
bg_image = ""              # chosen background picture id, empty = glow
bg_dim = 0.45              # darken background picture (0.0 .. 1.0)
bg_blur = 0.0              # blur background picture

[notifications]            # Android only
app_updates = true
new_releases = true

[ui]
wheel_seek_s = 5          # seek bar: seconds per wheel notch, 0 = off
wheel_volume_pct = 5      # volume: percent per wheel notch, 0 = off
np_lyrics = true          # lyrics next to the cover in Now Playing
np_download = true        # download button in Now Playing
reveal_downloads = true   # "Show in folder" after a download
text_scale = 1.0          # 0.9 .. 1.3

[ui.keys]                 # changed shortcuts; "" = no key
zen = "f11"
download = ""

[local]
folders = ["D:/Music"]    # Library > Local files

[storage]
download_dir = "D:/Music/Glyph"   # empty = Glyph's data folder
```

Shortcut names: `play`, `seek_back`, `seek_forward`, `prev`, `next`,
`volume_up`, `volume_down`, `mute`, `like`, `shuffle`, `repeat`, `download`,
`loop_start`, `loop_end`, `loop_clear`, `search`, `lyrics`, `zen`, `queue`,
`settings`, `quit`. Keys are written like `ctrl-shift-z`, `alt-1`, `f11` or
`space`; change them more easily under **Settings › About › Shortcuts**.

An empty `server_url` switches to direct mode: the app asks the sources itself
with your own API keys. See
[config.example.toml](https://github.com/glyphmusic/apps/blob/main/config.example.toml)
for every option.

## Backup and sharing

**Settings › Backup and sharing** copies your settings as one line of text or a
file, and applies someone else's. API keys, the server address and device
specific options (audio output, folders) are never included.
