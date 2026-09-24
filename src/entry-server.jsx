/* eslint-disable react-refresh/only-export-components -- build-time only, never hot-reloaded */
/**
 * entry-server.jsx — renders the unchanged App to HTML at build time, so
 * every page ships its real content instead of an empty <div id="root">.
 * Only used by scripts/prerender.mjs; never runs in the browser.
 */
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "./App.jsx";

export { pages, notFoundPage, headTags, SITE_URL } from "./seo/pages";

export function render(url) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>
  );
}
