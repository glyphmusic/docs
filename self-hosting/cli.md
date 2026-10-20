# CLI reference

Install with `npm install --global glyph-server` (Node.js 22+). The package
downloads the matching native binary and checks its SHA-256. `glyph help` lists
everything; `glyph <command> --help` explains one command.

## Versions and health

| Command | Does |
| --- | --- |
| `glyph version [cli\|server\|companion\|r-dlp\|all]` | installed and running versions |
| `glyph check [target]` | connectivity, tools and newer releases |
| `glyph update [target] [--check]` | update the CLI, server, companion or r-dlp |
| `glyph doctor` | check config, keys, ports and reachability |

`--server <url>` picks a server, `--local` inspects this machine.

## Own server

| Command | Does |
| --- | --- |
| `glyph setup` | interactive setup, writes `server.toml` |
| `glyph` / `glyph serve` | run the server |
| `glyph service install\|uninstall\|status` | start at boot |
| `glyph config list\|get\|set\|unset\|path` | read and change `server.toml` |
| `glyph access [--disable]` | require a shared bearer |
| `glyph companion on\|off\|status` | switch the YouTube companion |
| `glyph hash-password` | Argon2id hash for secrets |

## Cloudflare

| Command | Does |
| --- | --- |
| `glyph setup cloudflare [--dir dir]` | create resources and deploy |
| `glyph deploy [--config wrangler.json]` | deploy again |
| `glyph cloudflare list\|set\|unset\|secret\|domain` | change options |

## Remote management

| Command | Does |
| --- | --- |
| `glyph remote login <url>` | remember a server and its admin password |
| `glyph remote status` | version, limits, companion, MCP |
| `glyph remote limits ...` | rate limit, accounts required, budgets |
| `glyph remote keys set <name>` | store a provider key |
| `glyph remote companion on\|off` | YouTube companion |
| `glyph remote mcp on\|off` | AI assistant access through the server |
| `glyph remote accounts ...` | device limits per account |
| `glyph remote logs [--follow]` | server logs |
