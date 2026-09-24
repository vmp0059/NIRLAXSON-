/**
 * prerender.mjs — turns the built SPA into one real HTML file per page.
 *
 * Runs after `vite build` (browser bundle) and the SSR build of
 * src/entry-server.jsx. For every URL in src/seo/pages.js it renders the
 * unchanged React app to HTML, injects that page's <head> tags, and writes it
 * where Apache will find it:  /about -> dist/about.html,
 * /products/bead-mill -> dist/products/bead-mill.html.
 *
 * Also writes 404.html, sitemap.xml (with product images) and robots.txt.
 * Fails the build if any page breaks the basics: a unique title, a
 * description of 160 characters or fewer, and exactly one <h1>.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, pages, notFoundPage, headTags, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-head-->") || !template.includes("<!--app-html-->")) {
  throw new Error("dist/index.html is missing the <!--app-head--> / <!--app-html--> placeholders");
}

function fileFor(urlPath) {
  return urlPath === "/" ? "index.html" : `${urlPath.slice(1)}.html`;
}

function write(page, url, { fallback = false } = {}) {
  // React 19 adds <link rel="preload" as="image"> for every <img> it renders:
  // 32 on the home page, all fighting the first slide for bandwidth. The
  // <img> tags are already in the HTML, so the browser finds them anyway.
  const app = render(url).replace(/<link rel="preload" as="image"[^>]*\/?>/g, "");
  let html = template
    .replace("<!--app-head-->", headTags(page))
    .replace("<!--app-html-->", app);
  // Served for many different URLs, so the browser renders it fresh rather
  // than hydrating (see src/main.jsx).
  if (fallback) html = html.replace('<div id="root">', '<div id="root" data-fallback>');
  const out = path.join(dist, fileFor(page.path));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}

const problems = [];
const titles = new Map();

for (const page of pages) {
  write(page, page.path);

  if (titles.has(page.title)) problems.push(`duplicate title on ${page.path} and ${titles.get(page.title)}`);
  titles.set(page.title, page.path);
  if (!page.description) problems.push(`no description on ${page.path}`);
  if (page.description.length > 160) problems.push(`description over 160 chars on ${page.path}`);

  const body = fs.readFileSync(path.join(dist, fileFor(page.path)), "utf8");
  const h1s = (body.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) problems.push(`${h1s} <h1> tags on ${page.path} (want exactly 1)`);
}

// Any unknown URL: Apache serves this with a real 404 status (see .htaccess).
write({ ...notFoundPage, path: "/404" }, "/404", { fallback: true });

const today = new Date().toISOString().slice(0, 10);
const xmlEsc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  ...pages.map((p) => {
    const images = (p.images || [])
      .map((src) => `\n    <image:image><image:loc>${xmlEsc(SITE_URL + src)}</image:loc></image:image>`)
      .join("");
    return `  <url>\n    <loc>${SITE_URL}${p.path}</loc>\n    <lastmod>${today}</lastmod>${images}\n  </url>`;
  }),
  "</urlset>",
  "",
].join("\n");
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);

fs.writeFileSync(
  path.join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
);

fs.rmSync(ssrDir, { recursive: true, force: true });

console.log(`prerendered ${pages.length} pages + 404.html, sitemap.xml, robots.txt`);
if (problems.length) {
  console.error("\nSEO problems:\n  " + problems.join("\n  "));
  process.exit(1);
}
