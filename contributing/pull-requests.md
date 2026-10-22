---
description: How a pull request for Glyph should look, for people and AI agents: scope, tests, changelog, the description template, the model slug line and the wording check.
---

# Pull requests

These rules apply to every Glyph repository
([apps](https://github.com/glyphmusic/apps),
[server](https://github.com/glyphmusic/server),
[companion](https://github.com/glyphmusic/companion),
[r-dlp](https://github.com/glyphmusic/r-dlp),
[docs](https://github.com/glyphmusic/docs)) and to everyone who opens a pull
request, people and AI agents alike.

{% hint style="info" %}
**AI agents:** read this whole page before you open a pull request, follow the
[template](#the-description) exactly and end the description with your
[model slug](#model-slug). The page is also available as clean Markdown at
`docs.glyph.my/contributing/pull-requests.md`.
{% endhint %}

## Before you start

* **One issue, one pull request.** Link the issue it solves. Without an issue,
  open one first or explain the problem in the description.
* **Look for existing work.** If an open pull request already covers the issue,
  comment there instead of opening a second one.
* **Stay in scope.** No drive-by refactors, reformatting or renames outside the
  change. Put a second idea into its own pull request.
* **The project rules hold** (see [Development](development.md#rules)): every
  feature works on Linux, macOS and Windows, official APIs only, no keys or
  tokens in the source.
* **Shared wire types** live in `crates/glyph-protocol` in the apps repository.
  A change there also needs the server's snapshot
  (`node scripts/snapshot-protocol.mjs` in the server repository).

## Branch and commits

* Branch from `main`: `fix/<issue>-<topic>` or `feat/<issue>-<topic>`, for
  example `fix/142-sleep-timer-preload`.
* Summary line: at most 72 characters, starts with the area and says what
  changes, like `Sleep timer: fade out over the last 30 seconds` or
  `Worker limiter: fall back to the Cache API when D1 fails`.
* Body: short bullets with what changed and why.
* Never commit build output (`target/`, `node_modules/`, `build/`), local
  settings, logs or lockfile changes the pull request does not need.
* Do not bump versions or create tags. Maintainers release.

## Tests

Run what the repository's CI runs (`.github/workflows/`) before you open the
pull request:

| Repository | Commands |
| --- | --- |
| apps | `cargo test -p glyph-protocol -p glyph-core -p glyph-audio`, `cargo check -p glyph` |
| server | `cargo test --workspace`, `cargo check -p glyph-server-worker --target wasm32-unknown-unknown`, `npm test` in `crates/glyph-server-worker` |
| r-dlp | `cargo test --locked` |
| companion | `python3 -m unittest discover -s tests -v` |
| docs | the [local preview](https://github.com/glyphmusic/docs/tree/main/preview) shows the page |

* A bug fix comes with a test that fails without it, wherever the code can be
  tested.
* A visible change comes with a screenshot (or a short recording for motion).
* Say what you could not test, for example "not tried on macOS".

## Changelog and texts

* Add the change to `CHANGELOG.md` under `## Unreleased` (create the heading if
  it is missing) in `### Added`, `### Changed` or `### Fixed`.
* Write it for users, not for developers: what they notice, not which function
  changed. New features start with a bold lead-in: `- **Undo after removing**: ...`.
* New UI texts go into `assets/i18n/en.toml` **and** every other language file
  (see [Translations](translations.md)).
* A new feature or setting also needs a docs page or section in the docs
  repository. Pure bug fixes do not.

## The description

Use this template (it is also the repositories' pull request template). Keep the
headings, fill every section, delete nothing:

```markdown
## What changes

- <user-visible change, one bullet each>

## Why

<the problem, and why this change solves it: every change gets a "because" or "so that">

Fixes #<issue>

## How it was tested

- <commands you ran and their result>
- <manual checks, platforms, screenshots>
- Not tested: <what is missing, or "nothing">

## Notes for review

<risks, follow-ups, decisions the reviewer should know about, or "none">

---
Agent: <model slug> via <tool>
```

The title follows the same rules as a commit summary line.

### Model slug

The last line of every description names who wrote it:

* **AI agents** write the exact model ID they ran on, as the API names it, and
  the tool: `Agent: claude-opus-5-5 via Claude Code`,
  `Agent: claude-sonnet-5-5 via GitHub Actions`. Not a marketing name, not a
  guess. If your tool can tell you the serving model, ask it; if you only know
  the configured model, write that and add `(configured, not verified)`.
* If several models worked on it, list them: `Agent: claude-opus-5-5, claude-haiku-5-5 via Claude Code`.
* **People** write `Agent: none`, or name the agent that helped.

A pull request without this line is sent back.

## Wording check

Before you open the pull request, read the title, the description, the commit
messages and the changelog entry once more and fix every hit below.

| Look for | Problem | Write instead |
| --- | --- | --- |
| *robust, seamless, comprehensive, enhanced, optimized, streamlined, leverage, various* | sounds like a change, says nothing | what changed and by how much: "ranks 500 results in 40 ms instead of 300 ms" |
| *improved, better, fixed issues* on their own | no object | name the thing: "the search field keeps its text on Android" |
| *should fix, should work, might, probably* | untested claim | test it, or move it to *Not tested* |
| *all, every, never, always, fully, completely* | overclaim | only when a test covers it |
| *simply, just, basically, obviously, in order to, it's worth noting* | filler | delete it |
| *this, it, the issue* at the start of a section | no referent | name what you mean |
| function, crate or table names in the changelog | developer view | the effect users notice |
| an abbreviation the reader may not know | unclear | write it out once: "Durable Object (DO)" |
| a change without *because* or *so that* in **Why** | no explanation | say the reason, or the problem it removes |

Agents can run this on the description file and on the diff of `CHANGELOG.md`;
every hit must be rewritten or be precise where it stands:

```bash
grep -nEiw 'robust|seamless(ly)?|comprehensive|enhanced?|optimi[sz]ed|streamlined?|leverag(e|es|ed|ing)|various|simply|just|basically|obviously|should (fix|work)|probably|might|in order to|worth noting' PR_BODY.md
```

Also check:

* English, plain sentences, no emoji, no marketing tone.
* No secrets, tokens, internal hostnames, personal data or full logs in the
  description; shorten logs to the lines that matter.
* Links point to the issue, the docs or code in the repository, nowhere else.

## After opening

* CI must pass. If it fails, fix it in the same pull request and say what was
  wrong.
* Answer review comments in their thread and push new commits; do not
  force-push once a review has started.
* Do not merge your own pull request, do not close other people's, and do not
  open a second one for the same issue.
