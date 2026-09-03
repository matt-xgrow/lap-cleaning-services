import type { Metadata } from "next";
import Link from "../components/SafeLink";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { JsonLd } from "../components/JsonLd";
import { QuoteSurvey } from "../components/QuoteSurvey";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { business, SITE_URL } from "../../lib/site-data";
import { breadcrumbSchema, businessSchema, schemaGraph } from "../../lib/schema";

export const metadata: Metadata = { title: "Contact LAP Cleaning Services", description: "Contact LAP Cleaning Services for home, office, bond, corporate or Airbnb cleaning across the Gold Coast, Queensland.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  const schema = schemaGraph(businessSchema(), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]), { "@type": "ContactPage", name: "Contact LAP Cleaning Services", url: `${SITE_URL}/contact` });
  return <><JsonLd data={schema} /><SiteHeader /><main>
    <header className="simple-hero content-shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} /><span className="section-kicker">Contact LAP Cleaning Services</span><h1>Tell us what needs cleaning on the Gold Coast.</h1><p>The fastest available contact path is the quote survey below. Choose the service, suburb and timing, then leave your name and phone number. Email is optional.</p></header>
    <section className="contact-layout content-shell"><aside><div><span>Service area</span><strong>Gold Coast, Queensland only</strong></div>{business.phone && <div><span>Phone</span><a href={`tel:${business.phone}`}>{business.phoneDisplay || business.phone}</a></div>}{business.email && <div><span>Email</span><a href={`mailto:${business.email}`}>{business.email}</a></div>}<div><span>Business hours</span><strong>{business.hours || "Confirm availability during quote follow-up"}</strong></div><p>Street address, ABN, phone, email and official social links are not displayed until verified business details are supplied.</p></aside><div className="contact-form-card" id="contact-quote"><QuoteSurvey /></div></section>
    <section className="map-section content-shell"><div><span className="section-kicker">Service area map</span><h2>Focused on the Gold Coast.</h2><p>This map represents the primary service region. It does not mark a shopfront or claim a street address for LAP Cleaning Services.</p></div><iframe title="Map of the Gold Coast, Queensland service area" src="https://www.google.com/maps?q=Gold+Coast%2C+Queensland&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></section>
  </main><SiteFooter /><Link className="mobile-quote-bar" href="#contact-quote">Get my free quote <span aria-hidden="true">→</span></Link></>;
}
