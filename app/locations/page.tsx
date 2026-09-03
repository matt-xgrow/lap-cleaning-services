import type { Metadata } from "next";
import Link from "../components/SafeLink";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { JsonLd } from "../components/JsonLd";
import { PageCta } from "../components/PageCta";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { suburbs, SITE_URL } from "../../lib/site-data";
import { breadcrumbSchema, businessSchema, schemaGraph } from "../../lib/schema";

export const metadata: Metadata = { title: "Gold Coast Cleaning Service Areas", description: "Explore Gold Coast suburbs served by LAP Cleaning Services. Find home, office, bond, corporate and Airbnb cleaning pages near you.", alternates: { canonical: "/locations" } };

export default function LocationsPage() {
  const schema = schemaGraph(businessSchema(), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Service areas", path: "/locations" }]), { "@type": "CollectionPage", name: "Gold Coast cleaning service areas", url: `${SITE_URL}/locations`, mainEntity: { "@type": "ItemList", itemListElement: suburbs.map((suburb, index) => ({ "@type": "ListItem", position: index + 1, name: suburb.name, url: `${SITE_URL}/locations/${suburb.slug}` })) } });
  return <><JsonLd data={schema} /><SiteHeader /><main>
    <header className="directory-hero content-shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service areas" }]} /><span className="section-kicker">Gold Coast only</span><h1>Cleaning services across the Gold Coast.</h1><p><strong>LAP Cleaning Services serves the Gold Coast, Queensland.</strong> Choose a suburb to view local property context, cleaning options and a direct quote path.</p><Link className="button button-primary" href="/#quote">Check my suburb</Link></header>
    <section className="location-directory content-shell" aria-label="Gold Coast suburb pages">{suburbs.map((suburb, index) => <Link href={`/locations/${suburb.slug}`} key={suburb.slug}><span>0{index + 1}</span><div><h2>{suburb.name}</h2><p>{suburb.region}</p></div><b aria-hidden="true">↗</b></Link>)}</section>
    <section className="answer-panel content-shell"><span className="section-kicker">Your suburb is not listed?</span><h2>Still on the Gold Coast? Send the suburb in your quote request.</h2><p>The directory focuses on major suburbs for useful local information. It is not presented as the complete coverage list. LAP can confirm availability for the exact Gold Coast address after receiving your enquiry.</p></section>
    <PageCta title="Find the right cleaning service for your suburb." />
  </main><SiteFooter /><Link className="mobile-quote-bar" href="/#quote">Check my suburb <span aria-hidden="true">→</span></Link></>;
}
