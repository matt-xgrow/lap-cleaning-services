import type { Metadata } from "next";
import Link from "../components/SafeLink";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { FaqBlock } from "../components/FaqBlock";
import { JsonLd } from "../components/JsonLd";
import { MobileActionBar } from "../components/MobileActionBar";
import { PageCta } from "../components/PageCta";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { globalFaqs, services, SITE_URL } from "../../lib/site-data";
import { breadcrumbSchema, businessSchema, faqSchema, schemaGraph } from "../../lib/schema";

export const metadata: Metadata = { title: "Cleaning Services Gold Coast FAQ", description: "Get direct answers about LAP cleaning services, Gold Coast coverage, quote requests, pricing factors and required contact details.", alternates: { canonical: "/faq" } };

export default function FaqPage() {
  const schema = schemaGraph(businessSchema(), faqSchema(globalFaqs), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]), { "@type": "WebPage", name: "LAP Cleaning Services FAQ", url: `${SITE_URL}/faq` });
  return <><JsonLd data={schema} /><SiteHeader /><main><header className="simple-hero content-shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} /><span className="section-kicker">Straight answers before you enquire</span><h1>Cleaning services Gold Coast: frequently asked questions.</h1><p>These answers explain the service area, quote process and information available on this website. Every service page also includes questions specific to that type of cleaning.</p></header><FaqBlock items={globalFaqs} title="What customers often want to know." /><section className="faq-service-links content-shell"><span className="section-kicker">Service-specific answers</span><h2>Questions about a particular clean?</h2><div>{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}><strong>{service.shortName}</strong><span>Read {service.faq.length} service questions →</span></Link>)}</div></section><PageCta /></main><SiteFooter /><MobileActionBar /></>;
}
