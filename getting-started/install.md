---
description: Download Glyph for Windows, macOS, Linux or Android, use it in your browser, keep it updated, or build it from source.
---

# Install

Download the build for your system from the [download page](https://glyph.my/download)
or from [GitHub releases](https://github.com/glyphmusic/apps/releases/latest),
or listen straight in your browser at **[glyph.my/web](https://glyph.my/web)**.

| System | Installer / package | Portable archive |
| --- | --- | --- |
| Windows x64 | `glyph-<version>-windows-x64-setup.exe` | `glyph-<version>-x86_64-pc-windows-msvc.zip` |
| macOS Apple silicon | `glyph-<version>-macos-arm64.dmg` | `glyph-<version>-aarch64-apple-darwin.tar.gz` |
| macOS Intel | `glyph-<version>-macos-x64.dmg` | `glyph-<version>-x86_64-apple-darwin.tar.gz` |
| Linux x64 | `glyph-<version>-linux-x64.deb` / `.rpm` | `glyph-<version>-x86_64-unknown-linux-gnu.tar.gz` |
| Linux arm64 | `glyph-<version>-linux-arm64.deb` / `.rpm` | `glyph-<version>-aarch64-unknown-linux-gnu.tar.gz` |
| Android (preview) | `glyph-<version>-android.apk` | |

Every release lists the SHA-256 of each file in `SHA256SUMS.txt` along with its
signature in `SHA256SUMS.txt.minisig`.

## Web player

No install needed: open **[glyph.my/web](https://glyph.my/web)** in any modern
browser. You can also install it as a web app (PWA) from your browser's address
bar or menu. See [Web player](../using-glyph/web-player.md) for what works in
the browser and what requires the desktop or phone app.

## Android (preview)

Since 0.5.0 Glyph also runs on Android 8 or newer, with the same views as the
desktop app in a layout for small screens. Playback keeps going in the
background, with controls in the notification.

1. Open the [download page](https://glyph.my/download) on your phone and
   download `glyph-<version>-android.apk`.
2. Open the file and allow your browser or file manager to install apps when
   Android asks.

Glyph is not in the Play Store yet. Since 0.6.0 the app updates itself:
**Settings › About** downloads the new APK, checks it and hands it to Android's
installer. The first time, Android asks you to allow Glyph to install apps.
You can also install the APK of the new version over the old one by hand; your
library and settings stay. See [Android app](../using-glyph/mobile.md) for
phone gestures, sharing and notifications.

## Updates

The desktop and Android apps check GitHub for new versions and can install them for you
(**Settings › About**). They install only releases signed with the Glyph
release key ([Signed releases](../help/install-and-updates.md#signed-releases)).
The **Latest** channel on the same page gets every new version first; **Stable** gets tested ones. If you installed Glyph with a
package manager, update it there instead.

## Build from source

Glyph needs Rust 1.85 or newer and Node.js 22 or newer (for the Svelte UI):

```bash
npm --prefix glyph-ui ci
npm --prefix glyph-ui run build
cargo build --release -p glyph-tauri
```

Linux also needs the development packages listed in
[Development](../contributing/development.md#desktop-app).
