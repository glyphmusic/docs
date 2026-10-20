# AI assistants (MCP)

Glyph includes a [Model Context Protocol](https://modelcontextprotocol.io) server,
so assistants such as Claude can control it: play, pause and skip, search,
manage the queue, create and edit playlists, like songs, read lyrics and more.
It is off until you turn it on under **Settings › Integrations › AI assistants**.

## On this computer

The MCP server listens on `127.0.0.1` only and needs a token. *Copy configuration*
puts a ready `mcpServers` entry on your clipboard:

```json
{
  "mcpServers": {
    "glyph": {
      "type": "http",
      "url": "http://127.0.0.1:39571/mcp",
      "headers": { "Authorization": "Bearer <token>" }
    }
  }
}
```

*New token* makes the old one stop working.

## Through the server

For assistants that run elsewhere (for example in the browser), choose *Through
the server*. You need to be signed in, and Glyph must be open.

1. Add the server's MCP address (shown in the settings, e.g.
   `https://api.example.com/mcp`) to your assistant.
2. The assistant opens the server's sign-in page. Enter your handle.
3. Glyph shows the assistant's name and a code. If the code matches the page,
   click **Allow**.

The server only relays calls to your running app; it never sees your library.
Server owners can turn this off with `glyph remote mcp off`.
