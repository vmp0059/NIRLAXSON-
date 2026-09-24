# Nirlaxson Industries — website

Company website for [Nirlaxson Industries](https://nirlaxsonindustries.com),
manufacturer of paint, coating, process and chemical plant machinery in
Boisar, Maharashtra.

React 19 + Vite, pre-rendered to static HTML at build time and served by
Apache (cPanel). One PHP endpoint handles the enquiry forms.

## Quick start

```bash
npm install
npm run dev        # dev server with hot reload, http://localhost:5173
npm run build      # production build into dist/ (see "How the build works")
npm run preview    # serve dist/ locally, http://localhost:4173
npm run lint       # ESLint; the project is expected to pass with zero problems
```

Node 20 or newer.

## Project structure

```
index.html                  HTML shell; <!--app-head--> / <!--app-html--> are filled at build time
public/
  .htaccess                 Apache: clean URLs, real 404s, HTTPS, caching, security headers
  api/enquiry.php           Enquiry endpoint used by all three contact forms
  clients/                  Client logos (home page slider)
  og-image.jpg              Default link-preview image (1200x630)
scripts/
  prerender.mjs             Writes one HTML file per page, sitemap.xml and robots.txt
src/
  main.jsx                  Browser entry: hydrates the pre-rendered HTML
  entry-server.jsx          Build-time entry: renders the app to HTML
  App.jsx                   Layout and routes
  pages/                    One component per route
  components/               Page sections, grouped by page
  assets/products/data.js   Product catalogue: every product page is generated from this
  seo/pages.js              Title, description and structured data for every URL
  seo/usePageMeta.js        Keeps <title> etc. correct during in-app navigation
```

## How the build works

`npm run build` runs three steps:

1. `vite build` builds the browser bundle.
2. `vite build --ssr src/entry-server.jsx` builds a Node version of the same app.
3. `scripts/prerender.mjs` renders every URL listed in `src/seo/pages.js` to a
   real HTML file (`/about` → `dist/about.html`,
   `/products/bead-mill` → `dist/products/bead-mill.html`), injects that page's
   `<head>` tags, and writes `404.html`, `sitemap.xml` and `robots.txt`.

Search engines therefore receive the full page content, not an empty
`<div id="root">`. In the browser, React attaches to that HTML (hydration) and
the site behaves as a normal single-page app.

The build **fails** if any page has a duplicate title, a description over 160
characters, or anything other than exactly one `<h1>`.

### Rules for components

Because every page is rendered in Node first:

- Do not touch `window`, `document` or `localStorage` during render. Use them
  inside `useEffect` or event handlers.
- The first render must be identical on the server and in the browser. Anything
  that depends on the URL query string or the viewport belongs in an effect
  (see `FormPanel.jsx`).
- Keep HTML valid. A heading inside a `<p>`, for example, is rearranged by the
  browser's parser and breaks hydration.

## Common tasks

**Add a product.** Add an entry to `src/assets/products/data.js` with a `slug`
and, ideally, `seo.title` / `seo.description`. Its page, sitemap entry and
structured data are generated automatically.

**Change a page title or description.** Edit `src/seo/pages.js`.

**Add an image.** Use WebP (`cwebp -q 90 in.png -o out.webp`) and import it
from the component so Vite fingerprints it.

## Deployment

Upload the contents of `dist/`, including the hidden `.htaccess`, to
`public_html/`. One-time server setup (email config, mailbox, DNS) is in
[SETUP.md](SETUP.md).

**Never add a catch-all rewrite to `/index.html`.** That makes every made-up URL
return the home page with status 200, which search engines treat as endless
duplicate pages. Unknown URLs must return the real 404.

## Enquiry forms

The contact, quote and feedback forms post JSON to `/api/enquiry.php`, which:

1. rejects bots (hidden honeypot field, time-on-form check, 5 per hour per IP),
2. saves the enquiry to `nirlaxson-private/leads.csv` **before** anything else,
3. emails it to the sales inbox through the server's own mail system. Visitor
   input is stripped of line breaks before it reaches any mail header, and
   cells that Excel would run as formulas are neutralised in the CSV.

The form only shows success once the server has confirmed the enquiry was
stored.
