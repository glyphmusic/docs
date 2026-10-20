# Install

Download the build for your system from the [download page](https://glyph.my/download)
or from [GitHub releases](https://github.com/glyphmusic/desktop/releases/latest).

| System | File |
| --- | --- |
| Windows x64 | `glyph-<version>-x86_64-pc-windows-msvc.zip` |
| macOS Apple silicon | `glyph-<version>-aarch64-apple-darwin.tar.gz` |
| macOS Intel | `glyph-<version>-x86_64-apple-darwin.tar.gz` |
| Linux x64 | `glyph-<version>-x86_64-unknown-linux-gnu.tar.gz` |
| Linux arm64 | `glyph-<version>-aarch64-unknown-linux-gnu.tar.gz` |

Every release lists the SHA-256 of each file in `SHA256SUMS.txt`.

## Updates

Glyph checks GitHub for new versions and can install them for you
(**Settings › About**). Pre-releases are opt-in under the same page. If you
installed Glyph with a package manager, update it there instead.

## Build from source

Glyph needs Rust 1.85 or newer:

```bash
cargo build --release -p glyph
```

Linux also needs the development packages listed in the
[desktop README](https://github.com/glyphmusic/desktop#build-from-source).
