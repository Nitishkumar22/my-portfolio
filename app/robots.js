// app/robots.js — allow all crawlers, including AI agents (GPTBot, ClaudeBot, …).
import { SITE_URL } from "../lib/site";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules:   { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
