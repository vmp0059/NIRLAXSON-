/**
 * seo/pages.js — every indexable URL and its <head> data, in one place.
 *
 * Used twice: by scripts/prerender.mjs to write each page's HTML, and by
 * usePageMeta() to keep the title/description right during client-side
 * navigation. Nothing here renders anything visible.
 */

import { products } from "../assets/products/data";
import { getProductSlug } from "../utils/product";
import logo from "../assets/logo/blue-logo.webp";

export const SITE_URL = "https://nirlaxsonindustries.com";
export const SITE_NAME = "Nirlaxson Industries";

// Link previews (WhatsApp, LinkedIn, Facebook): 1200x630 JPEG, the size and
// format every platform accepts. Lives in public/ so the URL never changes.
const DEFAULT_IMAGE = "/og-image.jpg";

const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}${logo}`,
  email: "info@nirlaxsonindustries.com",
  telephone: "+91-9860480063",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: "+91-9860480063",
    email: "info@nirlaxsonindustries.com",
    areaServed: "IN",
    availableLanguage: ["en", "hi", "mr"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "B No C-103, Balaji Complex, Parnali Naka",
    addressLocality: "Boisar",
    addressRegion: "Maharashtra",
    postalCode: "401501",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/company/nirlaxson-industries",
    "https://www.instagram.com/nirlaxson/",
    "https://www.youtube.com/@nirlaxsonindustries504",
  ],
};

const WEBSITE = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

function breadcrumb(trail) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}

/** Keeps generated descriptions inside the ~160 characters Google shows. */
function clip(text, max = 160) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\s–-]+$/, "") + "…";
}

function productDescription(p) {
  if (p.seo?.description) return p.seo.description;
  const specs = (p.specs || []).map((s) => `${s.label} ${s.value}`).join(", ");
  return clip(`${p.name} by ${SITE_NAME}, Boisar, Maharashtra. ${p.desc} ${specs}.`);
}

const staticPages = [
  {
    path: "/",
    title: "Nirlaxson Industries | Paint, Coating & Chemical Plant Machinery",
    description:
      "Manufacturer of paint, coating and chemical plant equipment in Boisar, Maharashtra: high speed dispersers, bead mills, ribbon blenders, reactors and tanks.",
    schema: [ORGANIZATION, WEBSITE],
  },
  {
    path: "/about",
    title: "About Us | Nirlaxson Industries, Boisar",
    description:
      "Nirlaxson Industries designs and manufactures mixing, dispersing, grinding and process plant equipment for paint, coating and chemical manufacturers.",
    schema: [breadcrumb([["Home", "/"], ["Company Profile", "/about"]])],
  },
  {
    path: "/products",
    title: "Industrial Mixing & Grinding Machinery | Nirlaxson Industries",
    description:
      "Mixing, blending and grinding machinery for paint, coating and chemical plants: dispersers, mills, blenders, reactors, vessels and storage tanks.",
    schema: [breadcrumb([["Home", "/"], ["Our Products", "/products"]])],
  },
  {
    path: "/contact",
    title: "Contact Us | Nirlaxson Industries",
    description:
      "Contact Nirlaxson Industries in Boisar, Palghar, Maharashtra for enquiries and quotations on paint, coating and chemical plant machinery. Call +91 9860480063.",
    schema: [breadcrumb([["Home", "/"], ["Contact Us", "/contact"]])],
  },
];

const productPages = products.map((p) => {
  const path = `/products/${getProductSlug(p)}`;
  return {
    path,
    title: p.seo?.title || `${p.name} | ${SITE_NAME}`,
    description: productDescription(p),
    // Every photo of this product, for the image sitemap. Link previews keep
    // the JPEG DEFAULT_IMAGE: product photos are WebP, which LinkedIn and some
    // other preview scrapers do not display.
    images: [...new Set([p.img, ...(p.gallery || [])].filter(Boolean))],
    schema: [
      breadcrumb([
        ["Home", "/"],
        ["Our Products", "/products"],
        [p.name, path],
      ]),
    ],
  };
});

export const pages = [...staticPages, ...productPages];

/** Served for any URL that does not exist. Never indexed. */
export const notFoundPage = {
  path: "/404",
  title: "Page Not Found | Nirlaxson Industries",
  description: "The page you were looking for could not be found.",
  noindex: true,
  schema: [],
};

export function findPage(pathname) {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return pages.find((p) => p.path === clean) || null;
}

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** The tags injected into <head> for one page. */
export function headTags(page) {
  const url = `${SITE_URL}${page.path}`;
  const image = `${SITE_URL}${DEFAULT_IMAGE}`;
  const tags = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
  ];

  if (page.noindex) {
    tags.push(`<meta name="robots" content="noindex" />`);
    return tags.join("\n    ");
  }

  tags.push(
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${SITE_NAME}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`
  );

  if (page.schema.length) {
    const graph = { "@context": "https://schema.org", "@graph": page.schema };
    // "<" escaped so a product name can never close the script tag early.
    const json = JSON.stringify(graph).replace(/</g, "\\u003c");
    tags.push(`<script type="application/ld+json">${json}</script>`);
  }

  return tags.join("\n    ");
}
