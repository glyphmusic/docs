# Changelog

## Unreleased

- Add a page on Taste, Daily Mixes and Glyph Drift (app 0.13.4 and later), with the new Playback › Content settings, the taste profile page and what the server gets.
- Document music videos in Now Playing, the lyric line under the cover on phones, "Not the right one?" for wrong song versions, cancelling downloads, Quick jump and typo-tolerant search, library filter and sort, saving the queue as a playlist, the select bar for any list, batch transfers with TXT files, Send feedback (`Ctrl+Shift+F`, shake on phones) and the web player's install steps.
- Document the Server dashboard's Jam rooms, API blocks, per-device sign-out and profile reset, `glyph remote accounts reset-profile`, the new `/v1/match`, `/v1/video`, `/v1/taste` and `/v1/youtube/hint` routes, and the gentler pace limit for playlist imports.
- Fix settings paths that moved or never existed: mouse wheel steps (now About › Shortcuts), Support (under About), Profile, Security › Delete account and Recovery code, Equalizer, streaming quality; "True random" shuffle; shortcut names in the settings file.
- Add help for the black screen after starting 0.13.4.
- Add dedicated pages for the web player (`glyph.my/web`), the Android app (touch gestures, share sheet, notifications) and the repository architecture.
- Update the settings reference (Overview, Advanced switch, four Account tabs with Profile & storage, Notifications, Skip unplayable, Search longer, Performance, Animations, Introduction), AI assistants (Settings/Plugins permissions, active MCP sessions, web player), Sound (per-song volume levelling and bass boost), Sharing (shared links opening in the web player), config file, and self-hosting docs (R2 split, `web_dir`, `min_app_version`, new `/v1/*` routes).
- Replace outdated GPUI/Vulkan build and troubleshooting references with the current Tauri 2 + Svelte setup.
- Document saving a song to playlists from the heart, background pictures, and plugin looks that restyle the whole interface (new page: Looks, shortcut to Settings › Plugins).
- Document the share menu on phones, sending songs to Glyph, copied music links and "Open with Glyph" (app 0.12.9).
- The local docs preview shows the navigation like the site (group labels, sub-pages).
- Document new look fields for plugins: `app_icon` (own app icon), `font` with an own font file, and `mono` (app 0.13.6).
- Document the look fields `home`, `sidebar` and `tabs`: plugins can put parts of the home page, sidebar and phone tabs in order or hide them (app 0.13.6).
- Document the look fields `sidebar_position` (sidebar on the right) and `splash` (own startup animation) (app 0.13.6).

## 0.10.0 - 2026-11-15

- Update playback help and settings reference for Sources settings, Glyph links when sharing, and audio behind short links.
- Update the AI assistants MCP tool permissions table.
- Add `SECURITY.md`, Dependabot config, and update the local docs preview server (`marked` 18).

## 0.9.0 - 2026-10-25

- Document local music folders, Zen mode, configurable shortcuts, player controls, download folders, equalizer bass and headroom, and appearance settings.
- Add a settings reference and a guide to asking AI assistants for help through the public documentation MCP server.
- Update account, privacy, device, search, lyrics and self-hosting documentation to match the app and server.
