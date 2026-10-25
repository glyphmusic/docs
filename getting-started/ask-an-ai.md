---
description: Let an AI assistant answer questions about Glyph from these docs, through the docs' MCP server, llms.txt or Glyph's own MCP tools.
---

# Ask an AI about Glyph

These docs are written so an AI assistant can answer "how do I …" questions
about Glyph from them. Connect your assistant to the docs once, then ask in
your own words, for example *"How do I change where Glyph saves downloads?"*
or *"Which key starts zen mode, and can I change it?"*.

## The docs MCP server

The docs have their own [Model Context Protocol](https://modelcontextprotocol.io)
server. It is public: no account, no key, nothing to install.

```
https://docs.glyph.my/mcp
```

| Tool | Does |
| --- | --- |
| `search_docs` | finds the sections that match a question or a few keywords; returns a snippet, the address and a path for `read_doc` |
| `read_doc` | reads one page, or one section of it, as Markdown |
| `list_docs` | lists every page with a one-line description |

The server reads the same pages as this site, so answers follow the docs within
about a minute of a change. Every Glyph server offers it too, at `/docs/mcp`.

{% tabs %}
{% tab title="Claude Code" %}
```bash
claude mcp add --transport http glyph-docs https://docs.glyph.my/mcp
```
{% endtab %}

{% tab title="Claude (app and web)" %}
**Settings › Connectors › Add custom connector**, name it *Glyph docs* and
enter `https://docs.glyph.my/mcp`.
{% endtab %}

{% tab title="VS Code" %}
In `.vscode/mcp.json`:

```json
{
  "servers": {
    "glyph-docs": { "type": "http", "url": "https://docs.glyph.my/mcp" }
  }
}
```
{% endtab %}

{% tab title="Cursor and others" %}
In the `mcpServers` section of the assistant's MCP configuration:

```json
{
  "mcpServers": {
    "glyph-docs": { "url": "https://docs.glyph.my/mcp" }
  }
}
```
{% endtab %}
{% endtabs %}

## Inside Glyph's own MCP server

If you already let an assistant [control Glyph](../using-glyph/ai-assistants.md),
it has two more tools there: `docs_search` and `docs_read`. They ask the docs
server above and are always available, also when the assistant may not touch
playback or playlists, because they read nothing of yours. So the assistant
that plays your music can also explain a setting or turn on the right one.

## Without MCP

Any assistant that can read web pages can use these:

| Address | Contains |
| --- | --- |
| `https://docs.glyph.my/llms.txt` | every page with its description ([llmstxt.org](https://llmstxt.org)) |
| `https://docs.glyph.my/llms-full.txt` | all pages in one Markdown file |
| `https://docs.glyph.my/<page>.md` | one page as Markdown, e.g. `/using-glyph/local-files.md` |

## Where things are

The [settings reference](../using-glyph/settings-reference.md) lists every
settings page, tab and option, and [Keyboard shortcuts](keyboard-shortcuts.md)
every key. Most "where is …" questions are answered there.
