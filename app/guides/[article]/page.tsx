import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { JsonLd } from "../../components/JsonLd";
import { MobileActionBar } from "../../components/MobileActionBar";
import { PageCta } from "../../components/PageCta";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { business, guides, SITE_URL } from "../../../lib/site-data";
import { breadcrumbSchema, businessSchema, schemaGraph } from "../../../lib/schema";

type Props = { params: Promise<{ article: string }> };
export function generateStaticParams() { return guides.map((guide) => ({ article: guide.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const resolvedParams = await params; const guide = guides.find((item) => item.slug === resolvedParams.article); if (!guide) return {}; return { title: guide.title, description: guide.description, alternates: { canonical: `/guides/${guide.slug}` }, openGraph: { title: guide.title, description: guide.description, url: `/guides/${guide.slug}`, type: "article", images: [{ url: "/images/lap-cleaner-gold-coast-home.jpg", width: 960, height: 1200, alt: "LAP Cleaning Services Gold Coast guide" }] }, twitter: { card: "summary_large_image", title: guide.title, description: guide.description, images: ["/images/lap-cleaner-gold-coast-home.jpg"] } }; }

export default async function GuidePage({ params }: Props) {
  const resolvedParams = await params;
  const guide = guides.find((item) => item.slug === resolvedParams.article); if (!guide) notFound();
  const url = `${SITE_URL}/guides/${guide.slug}`;
  const schema = schemaGraph(businessSchema(), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }, { name: guide.title, path: `/guides/${guide.slug}` }]), { "@type": "BlogPosting", headline: guide.title, description: guide.description, url, mainEntityOfPage: url, datePublished: "2026-09-02", dateModified: "2026-09-02", author: { "@type": "Organization", name: business.name }, publisher: { "@id": `${SITE_URL}/#business` }, image: `${SITE_URL}/images/lap-cleaner-gold-coast-home.jpg`, inLanguage: "en-AU" });
  return <><JsonLd data={schema} /><SiteHeader /><main><article className="guide-article"><header className="content-shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: guide.title }]} /><span className="section-kicker">LAP cleaning guide · Updated 2 September 2026</span><h1>{guide.title}</h1><p>{guide.intro}</p></header><div className="article-body content-shell"><aside><strong>In this guide</strong>{guide.sections.map(([heading]) => <a key={heading} href={`#${heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{heading}</a>)}</aside><div>{guide.sections.map(([heading, copy], index) => <section key={heading} id={heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}><span>0{index + 1}</span><h2>{heading}</h2><p>{copy}</p></section>)}<section><h2>The useful next step</h2><p>A guide can help you prepare, but the quote still needs the real service, Gold Coast suburb, property and timing. Use LAP’s short survey when you are ready to share those details.</p></section></div></div></article><PageCta title="Request a quote for the real property." /></main><SiteFooter /><MobileActionBar /></>;
}
