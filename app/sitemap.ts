import type { MetadataRoute } from "next";
import { comboPages, guides, services, serviceOptions, SITE_URL, suburbs } from "../lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-09-02");
  const staticPaths = ["", "/services", "/locations", "/about", "/reviews", "/contact", "/faq", "/guides", "/privacy", "/terms"];
  return [
    ...staticPaths.map((path, index) => ({ url: `${SITE_URL}${path}`, lastModified: updated, changeFrequency: "monthly" as const, priority: index === 0 ? 1 : 0.7 })),
    ...services.map((service) => ({ url: `${SITE_URL}/services/${service.slug}`, lastModified: updated, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...serviceOptions.filter((option) => option.detailSlug === option.slug).map((option) => ({ url: `${SITE_URL}/services/${option.slug}`, lastModified: updated, changeFrequency: "monthly" as const, priority: 0.85 })),
    ...suburbs.map((suburb) => ({ url: `${SITE_URL}/locations/${suburb.slug}`, lastModified: updated, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...comboPages.map((page) => ({ url: `${SITE_URL}/${page.slug}`, lastModified: updated, changeFrequency: "monthly" as const, priority: 0.75 })),
    ...guides.map((guide) => ({ url: `${SITE_URL}/guides/${guide.slug}`, lastModified: updated, changeFrequency: "monthly" as const, priority: 0.65 })),
  ];
}
