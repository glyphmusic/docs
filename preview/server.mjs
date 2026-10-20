// Local preview of docs.glyph.my: renders the Markdown of this repository
// with the server's real page template (glyph-server/.../site/docs.html), the
// same way the Worker does (SUMMARY.md navigation, GitBook hint/tabs blocks,
// <details>, link rewriting). Files are read on every request, so edits show
// up on reload. The Worker uses pulldown-cmark; this uses marked, so tiny
// Markdown differences are possible.
//
//   cd preview && npm install && npm start      -> http://127.0.0.1:4000
//   GLYPH_SERVER=/path/to/glyph-server PORT=4000 npm start

import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve as resolvePath } from "node:path";
import { fileURLToPath } from "node:url";
import { Marked } from "marked";

const here = dirname(fileURLToPath(import.meta.url));
const docs = resolvePath(here, "..");
const server = resolvePath(process.env.GLYPH_SERVER || join(docs, "..", "glyph-server"));
const site = join(server, "crates", "glyph-server-core", "src", "site");
const port = Number(process.env.PORT || 4000);
const HINTS = ["info", "success", "warning", "danger"];
const REPO = "glyphmusic/docs";

if (!existsSync(join(site, "docs.html"))) {
  console.error(`docs.html not found in ${site}; set GLYPH_SERVER to your glyph-server checkout.`);
  process.exit(1);
}

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const read = f => { try { return readFileSync(join(docs, f), "utf8").replace(/\r\n/g, "\n"); } catch { return null; } };

const validFile = f => f && f.length <= 200 && !f.startsWith("/") && /^[A-Za-z0-9._\/-]+$/.test(f) && f.split("/").every(s => s && s !== "." && s !== "..");

function resolve(dir, p) {
  const parts = p.startsWith("/") ? [] : dir.split("/").filter(Boolean);
  for (const seg of p.split("/")) {
    if (seg === "" || seg === ".") continue;
    if (seg === "..") { if (!parts.length) return null; parts.pop(); } else parts.push(seg);
  }
  let f = parts.join("/");
  if (p.endsWith("/") || !f) f = f ? `${f}/README.md` : "README.md";
  return validFile(f) ? f : null;
}

function pageUrl(file) {
  if (!file.endsWith(".md")) return null;
  let s = file.slice(0, -3);
  if (s.endsWith("README")) s = s.slice(0, -6);
  s = s.replace(/\/+$/, "");
  return `/${s}`;
}

function link(dest, dir) {
  const d = dest.trim(), lower = d.toLowerCase();
  if (d.startsWith("#") || /^(https?:|mailto:)/.test(lower)) return d;
  if (lower.includes(":")) return "#";
  const [p, frag = ""] = d.split(/#(.*)/s);
  const file = resolve(dir, p);
  if (!file) return "#";
  const url = pageUrl(file) ?? `https://github.com/${REPO}/blob/main/${file}`;
  return frag ? `${url}#${frag}` : url;
}

function image(dest, dir) {
  const d = dest.trim();
  if (d.toLowerCase().startsWith("https://")) return d;
  if (d.includes(":")) return "";
  const file = resolve(dir, d.split(/[#?]/)[0]);
  return file ? `/_raw/${file}` : "";
}

const TAGS = new Set(["<details>", "</details>", "<summary>", "</summary>", '<div class="tabs">', '<div class="tab">', '<p class="tab-title">', "</p>", "</div>", "<br>", "<br/>", "<br />"]);
const allowed = t => TAGS.has(t) || HINTS.some(h => t === `<div class="hint ${h}">`);
function sanitize(s) {
  let out = "", rest = s, i;
  while ((i = rest.indexOf("<")) !== -1) {
    out += esc(rest.slice(0, i));
    const tail = rest.slice(i), j = tail.indexOf(">");
    if (j !== -1 && allowed(tail.slice(0, j + 1))) { out += tail.slice(0, j + 1); rest = tail.slice(j + 1); }
    else { out += "&lt;"; rest = tail.slice(1); }
  }
  return out + esc(rest);
}

const attr = (args, name) => (args.match(new RegExp(`${name}="([^"]*)"`)) || [])[1];
function gitbookBlocks(md) {
  let out = "", fence = null;
  for (const line of md.split("\n")) {
    const t = line.trim();
    if (fence) { if (t.startsWith(fence)) fence = null; }
    else if (t.startsWith("```") || t.startsWith("~~~")) fence = t.slice(0, 3);
    else if (t.startsWith("{%") && t.endsWith("%}")) {
      const tag = t.slice(2, -2).trim(), sp = tag.indexOf(" ");
      const name = sp < 0 ? tag : tag.slice(0, sp), args = sp < 0 ? "" : tag.slice(sp + 1);
      const html = {
        hint: `<div class="hint ${HINTS.includes(attr(args, "style")) ? attr(args, "style") : "info"}">`,
        tabs: '<div class="tabs">',
        tab: `<div class="tab">\n<p class="tab-title">${attr(args, "title") || ""}</p>`,
        endhint: "</div>", endtab: "</div>", endtabs: "</div>",
      }[name];
      if (html) out += `\n${html}\n\n`;
      continue;
    }
    out += line + "\n";
  }
  return out;
}

function frontMatter(md) {
  if (!md.startsWith("---\n")) return [null, md];
  const rest = md.slice(4), end = rest.indexOf("\n---");
  if (end < 0) return [null, md];
  const desc = rest.slice(0, end).split("\n").map(l => l.match(/^description:\s*(.*)$/)).find(Boolean);
  return [desc ? desc[1].trim().replace(/^["']|["']$/g, "") || null : null, rest.slice(end + 4).replace(/^[\r\n]+/, "")];
}

function slug(s) {
  let out = "";
  for (const c of s.toLowerCase()) {
    if (/[\p{L}\p{N}]/u.test(c)) out += c;
    else if (/[ _-]/.test(c) && !out.endsWith("-")) out += "-";
  }
  return out.replace(/^-+|-+$/g, "") || "section";
}

function renderMarkdown(md, dir) {
  const [description, body] = frontMatter(md);
  let title = null;
  const sections = [], used = new Set();
  const renderer = {
    html(token) { return sanitize(typeof token === "string" ? token : token.text); },
    heading(text, depth, raw) {
      if (depth === 1 && title === null) { title = raw; return ""; }
      const base = slug(raw); let id = base, n = 1;
      while (used.has(id)) id = `${base}-${++n}`;
      used.add(id);
      if (depth === 2) sections.push([id, raw]);
      return `<h${depth} id="${id}"><a class="anchor" href="#${id}">${text}</a></h${depth}>\n`;
    },
    link(href, linkTitle, text) { return `<a href="${esc(link(href, dir))}"${linkTitle ? ` title="${esc(linkTitle)}"` : ""}>${text}</a>`; },
    image(href, imgTitle, text) { return `<img src="${esc(image(href, dir))}" alt="${esc(text)}"${imgTitle ? ` title="${esc(imgTitle)}"` : ""}>`; },
  };
  const m = new Marked({ gfm: true });
  m.use({ renderer });
  const html = m.parse(gitbookBlocks(body));
  return { title: title ?? "Glyph docs", description, html, sections };
}

function parseNav(summary) {
  const out = [];
  for (const line of (summary || "").split("\n")) {
    if (line.startsWith("## ")) { out.push({ group: line.slice(3).trim() }); continue; }
    const t = line.trimStart(), depth = Math.floor((line.length - t.length) / 2);
    const m = t.match(/^[*-] \[([^\]]*)\]\(([^)]*)\)/);
    if (!m) continue;
    const file = resolve("", m[2].split("#")[0]);
    if (file) out.push({ title: m[1], href: link(m[2], ""), file, depth });
  }
  return out;
}

function renderNav(nav, current) {
  let html = "<ul>";
  for (const e of nav) {
    if (e.group) html += `</ul><p class="grp">${esc(e.group)}</p><ul>`;
    else html += `<li class="d${Math.min(e.depth, 3)}"><a href="${esc(e.href)}"${e.file === current ? ' aria-current="page"' : ""}>${esc(e.title)}</a></li>`;
  }
  return (html + "</ul>").replaceAll("<ul></ul>", "");
}

function pager(nav, current) {
  const items = nav.filter(e => !e.group), i = items.findIndex(e => e.file === current);
  if (i < 0) return "";
  let html = "";
  if (items[i - 1]) html += `<a class="prev" href="${esc(items[i - 1].href)}"><span>previous</span>${esc(items[i - 1].title)}</a>`;
  if (items[i + 1]) html += `<a class="next" href="${esc(items[i + 1].href)}"><span>next</span>${esc(items[i + 1].title)}</a>`;
  return html;
}

function brandCss() {
  const icon = join(site, "icon-64.png");
  if (!existsSync(icon)) return "";
  const url = `url(data:image/png;base64,${readFileSync(icon).toString("base64")})`;
  return `nav .brand::before{content:"";display:inline-block;width:1.6em;height:1.6em;margin-right:.5em;vertical-align:-.45em;border-radius:.25em;background:${url} center/contain no-repeat}`;
}

function fill(title, desc, nav, body) {
  return readFileSync(join(site, "docs.html"), "utf8")
    .replace("/*BASE*/", readFileSync(join(site, "base.css"), "utf8"))
    .replace("/*BRAND*/", brandCss())
    .replaceAll("{{TITLE}}", esc(title)).replaceAll("{{DESC}}", esc(desc))
    .replaceAll("{{CANON}}", "https://docs.glyph.my").replaceAll("{{SITE}}", "https://glyph.my")
    .replaceAll("{{DOCS}}", "/").replace("{{NAV}}", nav).replace("{{BODY}}", body);
}

function page(path) {
  const summary = read("SUMMARY.md"), nav = parseNav(summary);
  const slugPath = path.replace(/^\/+|\/+$/g, "");
  const candidates = slugPath ? [`${slugPath}.md`, `${slugPath}/README.md`] : ["README.md"];
  for (const file of candidates.filter(validFile)) {
    const md = read(file);
    if (md === null) continue;
    const dir = file.includes("/") ? file.slice(0, file.lastIndexOf("/")) : "";
    const doc = renderMarkdown(md, dir);
    let body = `<h1>${esc(doc.title)}</h1>`;
    if (doc.description) body += `<p class="lead">${esc(doc.description)}</p>`;
    if (doc.sections.length >= 3) body += `<nav class="onpage" aria-label="On this page"><ul>${doc.sections.map(([id, t]) => `<li><a href="#${id}">${esc(t)}</a></li>`).join("")}</ul></nav>`;
    body += doc.html;
    body += `<div class="pager">${pager(nav, file)}</div><p class="edit"><a href="https://github.com/${REPO}/edit/main/${esc(file)}">edit this page on github</a></p>`;
    return [200, fill(doc.title, doc.description || "Documentation for Glyph, the free music player.", renderNav(nav, file), body)];
  }
  return [404, fill("Not found", "Page not found.", renderNav(nav, ""), '<h1>not found</h1><p class="lead">This page does not exist (any more). Start at the <a href="/">docs home</a>.</p>')];
}

const TYPES = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", webp: "image/webp", svg: "image/svg+xml" };

createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path === "/favicon.ico" && existsSync(join(site, "glyph.ico"))) {
    res.writeHead(200, { "content-type": "image/x-icon" });
    return res.end(readFileSync(join(site, "glyph.ico")));
  }
  if (path.startsWith("/_raw/")) {
    const file = path.slice(6), type = TYPES[file.split(".").pop().toLowerCase()];
    if (validFile(file) && type && existsSync(join(docs, file))) {
      res.writeHead(200, { "content-type": type });
      return res.end(readFileSync(join(docs, file)));
    }
    res.writeHead(404); return res.end();
  }
  if (path.endsWith(".md")) {
    res.writeHead(301, { location: pageUrl(path.slice(1)) || "/" });
    return res.end();
  }
  try {
    const [status, html] = page(path);
    res.writeHead(status, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
    res.end(html);
  } catch (e) {
    res.writeHead(500, { "content-type": "text/plain" });
    res.end(String(e.stack || e));
  }
}).listen(port, "127.0.0.1", () => console.log(`docs preview: http://127.0.0.1:${port}`));
