// app/sitemap.js
import { ROUTES, SITE_URL } from "../lib/site";

export const dynamic = "force-static";

export default function sitemap() {
  return Object.values(ROUTES).map(r => ({
    url:             `${SITE_URL}${r.path === "/" ? "" : r.path}`,
    lastModified:    new Date(),
    changeFrequency: "monthly",
    priority:        r.path === "/" ? 1 : 0.8,
  }));
}
