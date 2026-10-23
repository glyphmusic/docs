---
description: Require a user's own service keys, keep them in secure storage, and contact declared external hosts without inheriting Glyph credentials or server privileges.
---

# Services and keys

A plugin that talks to Last.fm or another external service must use its own
credentials, supplied by the user. It never inherits Glyph's service keys,
server credentials, account tokens or browser cookies. An install grants the
declared capabilities; it does not make the plugin part of Glyph's backend.

These interfaces describe the source implementation. They need a Glyph build
that includes the credential broker and the extension runtime.

## Declare setup

Put credential controls on the plugin's own settings page:

```json
{
  "schema": 2,
  "id": "glyph-lastfm-profile",
  "name": "Last.fm Profile",
  "version": "1.0.0",
  "kind": "extension",
  "main": "plugin.wasm",
  "permissions": ["network"],
  "network": ["ws.audioscrobbler.com"],
  "settings": [{
    "id": "account",
    "title": "Last.fm",
    "items": [{
      "id": "api_key",
      "type": "text",
      "label": "Last.fm API key",
      "desc": "Use your own Last.fm key. Press Enter to save.",
      "secret": true,
      "required": true,
      "credential": {
        "host": "ws.audioscrobbler.com",
        "path": "/2.0/",
        "location": "query",
        "name": "api_key"
      }
    }]
  }]
}
```

Glyph lists required fields before installation. After installing or enabling
a plugin with missing required credentials, it opens the plugin's settings.
The code stays stopped until the required values are saved. Local plugins
show the same setup state; open their settings after Reload.

The field is masked. Enter saves into the OS keychain or the mobile host's
secure credential store and clears the input. An empty submission removes the
stored value. If secure storage is unavailable, Glyph reports a failure;
there is no plaintext fallback. Declared credentials are deleted when the
plugin is removed. A credential-store error is reported rather than silently
pretending deletion succeeded.

Secrets are namespaced by plugin, item id and a SHA-256 hash of the exact
host, path, location and request-field declaration. The setup dialog displays
that destination. A changed declaration cannot reuse the old key: updates
remove the previous binding and require setup again. Hosts cannot use wildcards;
the exact host must also be permitted by the network declaration.

Secrets are namespaced by plugin and item id. They are absent from
`values.json`, plugin `ready`/`setting` values, settings exports and account
sync. Existing plaintext masked values from an earlier implementation are removed
from `values.json` before code starts and must be entered again for the displayed
destination. They are not silently authorized for a newly declared endpoint.

`ui.get` on a secret field returns only `{ "configured": true }` or false.
`ui.values` excludes secrets. Plugins cannot write or relabel credential
controls with `ui.set` or `ui.update`; the user controls them.

## Use a key without reading it

Pass the declared item id to `net.fetch`. Glyph inserts the value after it has
checked the request's destination:

```json
{
  "fn": "net.fetch",
  "args": {
    "url": "https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=your-name&format=json",
    "credentials": { "query": { "api_key": "api_key" } }
  }
}
```

For header-based services, use `credentials.headers`, for example
`{ "headers": { "x-api-key": "api_key" } }` inside `credentials`. Values
are the complete header contents; Glyph does not automatically prepend a
Bearer scheme. Supply the appropriate credential format in setup.

The URL's host and path, the insertion location and the field name must
exactly match the item's `credential` declaration, and the host must also be
in `network`. A plugin can only refer to its own secret text items. Transport errors do not include credential-bearing
URLs. Network destinations receive the supplied credential, so trust the
plugin author and each declared host. The broker redacts direct secret echoes and common JSON/URL escapes in
response text and headers. It cannot promise to recognize arbitrary encodings
or transformations performed by a remote service. Plugin code should never log responses that might contain secrets.

The [Last.fm profile example](https://github.com/glyphmusic/plugins/tree/main/examples/glyph-lastfm-profile)
contains the manifest, Rust code and local setup instructions. Its module must
be built before local installation or publication. It loads a public profile
with a user-supplied API key; it does not implement scrobbling. See Last.fm's
[user.getInfo reference](https://www.last.fm/api/show/user.getInfo),
[key registration](https://www.last.fm/api/account/create) and
[authentication specification](https://www.last.fm/api/authspec) for the
separate authorization and signing requirements of authenticated operations.

## Network boundary

- HTTPS on port 443, only declared hosts. No redirects or environment proxy.
- Reject private, loopback, link-local and reserved destinations, including
  DNS answers that resolve to them. Pin checked DNS answers into the HTTP client.
- Block direct access to Glyph's public and configured servers, including
  matching resolved addresses. No raw server or account request function.
- No inherited keys, tokens or cookies. Reserved identity, cookie, proxy and
  transport headers are rejected; ordinary plugin-owned authorization is
  explicitly supplied by the plugin or credential broker.
- Request, response, queue and frequency limits apply. Turning a plugin off
  cancels its pending network operation and revokes queued host calls from
  that runtime instance.

## Normal app actions and server policy

An allowed search or play action can still use Glyph's ordinary backend.
It follows the existing account authorization, IP/account/device quotas and
bans. The plugin cannot change the server address, provider policy,
integrations, statistics/privacy settings or update policy through
`settings.set`. During a Jam, plugin playback and queue mutations are denied.

The server must enforce its own policy for every client request. It cannot
trust a client header that claims a request came from a safe plugin, nor
grant extra quota for changing plugin or installation ids. Client sandbox
checks are an additional boundary; server authentication and quotas remain
necessary for modified clients too.
