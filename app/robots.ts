import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site-data";

export default function robots(): MetadataRoute.Robots {
  const allowedAgents = ["*", "GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];
  return {
    rules: allowedAgents.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
