import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { findPage, notFoundPage, SITE_URL } from "./pages";

/**
 * Keeps <title>, description and canonical in step with the route while the
 * visitor navigates inside the app. The first page load already has the right
 * tags from the pre-rendered HTML; this only covers later clicks.
 */
export default function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = findPage(pathname) || notFoundPage;

    document.title = page.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", page.description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", `${SITE_URL}${page.path}`);
  }, [pathname]);
}
