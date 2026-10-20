---
description: Improve a translation of Glyph or add a new language.
---

# Translations

Glyph's texts live in `assets/i18n/<code>.toml` in the
[desktop repository](https://github.com/glyphmusic/desktop/tree/main/assets/i18n),
one `"key" = "text"` per line. English (`en.toml`) is the reference; a missing
key falls back to English.

## Improve a language

Edit the file and open a pull request. Keep placeholders such as `{n}`, `{name}`
or `{title}` exactly as they are.

## Add a language

1. Copy `en.toml` to `<code>.toml` (ISO 639-1, e.g. `nl.toml`) and translate it.
2. Add the language to `Lang` in `src/i18n.rs` (code, native name, file).
3. Add the code to `language_from_locale` in `crates/glyph-core/src/config.rs`.
4. `cargo test -p glyph i18n` checks that every key and placeholder matches.
