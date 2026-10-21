---
description: Download Glyph for Windows, macOS, Linux or Android, keep it updated, or build it from source.
---

# Install

Download the build for your system from the [download page](https://glyph.my/download)
or from [GitHub releases](https://github.com/glyphmusic/apps/releases/latest).

| System | File |
| --- | --- |
| Windows x64 | `glyph-<version>-windows-x64-setup.exe` (installer) or `glyph-<version>-x86_64-pc-windows-msvc.zip` |
| macOS Apple silicon | `glyph-<version>-aarch64-apple-darwin.tar.gz` |
| macOS Intel | `glyph-<version>-x86_64-apple-darwin.tar.gz` |
| Linux x64 | `glyph-<version>-x86_64-unknown-linux-gnu.tar.gz` |
| Linux arm64 | `glyph-<version>-aarch64-unknown-linux-gnu.tar.gz` |
| Android (preview) | `glyph-<version>-android.apk` |

Every release lists the SHA-256 of each file in `SHA256SUMS.txt`.

## Android (preview)

Since 0.5.0 Glyph also runs on Android 8 or newer, with the same views as the
desktop app in a layout for small screens. Playback keeps going in the
background, with controls in the notification.

1. Open the [download page](https://glyph.my/download) on your phone and
   download `glyph-<version>-android.apk`.
2. Open the file and allow your browser or file manager to install apps when
   Android asks.

Glyph is not in the Play Store yet. To update, install the APK of the new
version over the old one; your library and settings stay.

## Updates

The desktop app checks GitHub for new versions and can install them for you
(**Settings › About**). Pre-releases are opt-in under the same page. If you
installed Glyph with a package manager, update it there instead.

## Build from source

Glyph needs Rust 1.85 or newer:

```bash
cargo build --release -p glyph
```

Linux also needs the development packages listed in the
[desktop README](https://github.com/glyphmusic/apps#build-from-source).
