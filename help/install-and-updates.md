---
description: Fixes when Windows or macOS blocks Glyph, an update fails, or Glyph does not start on Linux.
---

# Install and update problems

## Windows: "Windows protected your PC"

Glyph is not signed with a paid Microsoft certificate yet, so SmartScreen warns
about new versions. Click **More info › Run anyway**.

If your antivirus removes the file, check the download first: compare its
SHA-256 with `SHA256SUMS.txt` on the
[release page](https://github.com/glyphmusic/apps/releases/latest).

```powershell
Get-FileHash .\glyph-<version>-x86_64-pc-windows-msvc.zip
```

The value must match the line for that file. Then allow it in your antivirus.

## macOS: "Glyph cannot be opened"

Glyph is not notarized by Apple yet, so macOS blocks the first start. Open
**System Settings › Privacy & Security** and click **Open Anyway** below the
message about `glyph`, then start it again.

Or, in Terminal, remove the download mark from the unpacked folder once:

```bash
xattr -dr com.apple.quarantine ~/Downloads/glyph-<version>-aarch64-apple-darwin
```

## Linux: Glyph does not start

Start it from a terminal to see the error:

```bash
./glyph
```

* **Missing library** (`error while loading shared libraries`): install the
  packages from the
  [build instructions](https://github.com/glyphmusic/apps#build-from-source),
  in particular Vulkan, Wayland/X11, ALSA and WebKitGTK.
* **No window, a GPU error**: Glyph draws with Vulkan. Install your GPU's Vulkan
  driver (`mesa-vulkan-drivers` on Debian/Ubuntu for Intel and AMD).
* **No sound**: Glyph plays through ALSA; with PipeWire or PulseAudio install
  their ALSA plugin (`pipewire-alsa` or `pulseaudio-alsa`).

## "Update failed: …"

1. Check your connection: updates come from GitHub.
2. Try again under **Settings › About**.
3. Still failing? Download the new version from the
   [download page](https://glyph.my/download) and install it over the old one.
   Your library and settings stay.

Versions before 0.2.2 cannot read the new checksum file and need one manual
update this way. If you installed Glyph with a package manager, update it there.

If the message says the release is not signed, or not signed by the Glyph
release key, Glyph did not install it on purpose: install the release by hand
only if you trust where it came from.

## Is my download genuine?

Every release lists the SHA-256 of each file in `SHA256SUMS.txt`. Compare it
with `Get-FileHash` (Windows) or `shasum -a 256` (macOS, Linux).

## Signed releases

`SHA256SUMS.txt` comes with `SHA256SUMS.txt.minisig`, a
[minisign](https://jedisct1.github.io/minisign/) signature by the Glyph
release key. Its trusted comment names the repository and the version
(`glyph-release repo=glyphmusic/apps tag=v1.2.3`), so a signature for one
release does not fit another. The app, `glyph update`, the npm installer and
the companion's r-dlp updater install nothing without it; access to the GitHub
account alone is not enough to ship code to your devices.

Check a download yourself with the public key from `release-key.pub` in each
repository:

```bash
minisign -Vm SHA256SUMS.txt -P RWQ2xWZMYa2l251YUhrekvWRC+kaD698lXz0itKGjvNYAauLRTWCzg9o
sha256sum --check --ignore-missing SHA256SUMS.txt
```

Releases published before signing started carry no signature; Glyph installs
them only by hand.
