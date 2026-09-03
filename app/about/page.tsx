import type { Metadata } from "next";
import Image from "next/image";
import Link from "../components/SafeLink";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { JsonLd } from "../components/JsonLd";
import { MobileActionBar } from "../components/MobileActionBar";
import { PageCta } from "../components/PageCta";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { SITE_URL } from "../../lib/site-data";
import { breadcrumbSchema, businessSchema, schemaGraph } from "../../lib/schema";

export const metadata: Metadata = { title: "About LAP Cleaning Services", description: "Meet LAP Cleaning Services, a local Gold Coast business for home, office, bond, corporate and Airbnb cleaning enquiries.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  const schema = schemaGraph(businessSchema(), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]), { "@type": "AboutPage", url: `${SITE_URL}/about`, mainEntity: { "@id": `${SITE_URL}/#business` } });
  return <><JsonLd data={schema} /><SiteHeader /><main>
    <header className="about-hero content-shell"><div><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} /><span className="section-kicker">Real people · Real brand photography · Gold Coast only</span><h1>A cleaning business designed to feel clear, calm and local.</h1><p><strong>LAP Cleaning Services is a Gold Coast cleaning business for homes, workplaces, rental handovers and short-stay properties.</strong> The team photography on this website was supplied for LAP and shows the warm beige uniform and professional presentation behind the brand.</p><Link className="button button-primary" href="/#quote">Get my free quote</Link></div><Image src="/images/lap-cleaning-team-gold-coast.jpg" alt="LAP Cleaning Services professional wearing the business's beige and brown uniform" width={900} height={1125} priority sizes="(max-width: 900px) 100vw, 44vw" /></header>
    <section className="about-story content-shell"><div><span className="section-kicker">The LAP story</span><h2>A newer cleaning business with a growing circle of happy clients.</h2></div><div><p>LAP Services started recently on the Gold Coast with a simple goal: make professional cleaning feel personal, clear and easy to organise.</p><p>Since opening, the team has already helped more than 100 happy clients across homes, workplaces, rental handovers and short-stay properties. Every enquiry still starts with the individual property, the preferred timing and the result you want.</p><p>The beige-and-brown LAP uniform and photography reflect the warm, careful presentation behind the service. Choose the closest cleaning option and the team can clarify the right scope for your Gold Coast property.</p></div></section>
    <section className="values-band"><div className="content-shell"><article><span>01</span><h3>Gold Coast focus</h3><p>Every service and location page is written for Gold Coast, Queensland. Other cities are not represented as service areas.</p></article><article><span>02</span><h3>Care for real spaces</h3><p>From a lived-in home to a guest-ready apartment, the scope starts with the rooms and surfaces that matter to you.</p></article><article><span>03</span><h3>100+ happy clients</h3><p>LAP Services has already helped more than 100 clients since starting on the Gold Coast.</p></article></div></section>
    <PageCta title="Tell LAP what your property needs." />
  </main><SiteFooter /><MobileActionBar /></>;
}
