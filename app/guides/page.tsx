import type { Metadata } from "next";
import Link from "../components/SafeLink";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { JsonLd } from "../components/JsonLd";
import { MobileActionBar } from "../components/MobileActionBar";
import { PageCta } from "../components/PageCta";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { guides, SITE_URL } from "../../lib/site-data";
import { breadcrumbSchema, businessSchema, schemaGraph } from "../../lib/schema";

export const metadata: Metadata = { title: "Gold Coast Cleaning Guides", description: "Short, practical Gold Coast cleaning guides for choosing a cleaner, planning a bond clean and preparing a short-stay property.", alternates: { canonical: "/guides" } };

export default function GuidesPage() {
  const schema = schemaGraph(businessSchema(), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }]), { "@type": "Blog", name: "LAP Cleaning Services guides", url: `${SITE_URL}/guides`, blogPost: guides.map((guide) => ({ "@type": "BlogPosting", headline: guide.title, url: `${SITE_URL}/guides/${guide.slug}` })) });
  return <><JsonLd data={schema} /><SiteHeader /><main><header className="simple-hero content-shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides" }]} /><span className="section-kicker">Helpful before you request a quote</span><h1>Cleaning guides for the Gold Coast.</h1><p>Short answers for planning your clean, comparing options and getting ready for a quote.</p></header><section className="guide-list content-shell">{guides.map((guide, index) => <article key={guide.slug}><span>0{index + 1}</span><div><h2>{guide.title}</h2><p>{guide.description}</p></div><Link href={`/guides/${guide.slug}`}>Read guide <span aria-hidden="true">↗</span></Link></article>)}</section><PageCta title="Ready to talk about the property?" /></main><SiteFooter /><MobileActionBar /></>;
}
