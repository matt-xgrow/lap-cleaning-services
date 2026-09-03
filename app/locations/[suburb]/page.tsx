import type { Metadata } from "next";
import Link from "../../components/SafeLink";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { FaqBlock } from "../../components/FaqBlock";
import { JsonLd } from "../../components/JsonLd";
import { QuoteSurvey } from "../../components/QuoteSurvey";
import { ServiceCards } from "../../components/ServiceCards";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { comboPages, SITE_URL, suburbs } from "../../../lib/site-data";
import { breadcrumbSchema, businessSchema, faqSchema, schemaGraph } from "../../../lib/schema";

type Props = { params: Promise<{ suburb: string }> };
export function generateStaticParams() { return suburbs.map((suburb) => ({ suburb: suburb.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const suburb = suburbs.find((item) => item.slug === resolvedParams.suburb);
  if (!suburb) return {};
  const description = `Home, office, bond, corporate and Airbnb cleaning in ${suburb.name}, Gold Coast. Explore services and request a tailored quote from LAP.`;
  return { title: `Cleaning Services ${suburb.name}, Gold Coast`, description, alternates: { canonical: `/locations/${suburb.slug}` }, openGraph: { title: `Cleaning Services ${suburb.name} | LAP`, description, url: `/locations/${suburb.slug}`, images: [{ url: "/images/lap-cleaning-team-gold-coast.jpg", width: 900, height: 1125, alt: `LAP Cleaning Services team serving ${suburb.name}, Gold Coast` }] }, twitter: { card: "summary_large_image", title: `Cleaning Services ${suburb.name}`, description, images: ["/images/lap-cleaning-team-gold-coast.jpg"] } };
}

export default async function LocationPage({ params }: Props) {
  const resolvedParams = await params;
  const suburb = suburbs.find((item) => item.slug === resolvedParams.suburb);
  if (!suburb) notFound();
  const localCombos = comboPages.filter((item) => item.suburb.slug === suburb.slug);
  const faqs = [
    { question: `What cleaning services are available in ${suburb.name}?`, answer: `LAP Cleaning Services accepts enquiries in ${suburb.name} for home cleaning, office cleaning, bond cleaning, corporate cleaning and Airbnb cleaning. Availability and scope are confirmed for the individual property after you submit the suburb and service details.` },
    { question: `Does LAP serve all of ${suburb.name}?`, answer: `${suburb.name} is represented as part of LAP's Gold Coast service area. Enter the exact suburb in the quote form and discuss the property address during follow-up so the team can confirm whether the location and timing are available.` },
    { question: `What local details matter for a ${suburb.name} cleaning quote?`, answer: `${suburb.localNeed} Tell LAP about the property type, access, parking, building rules and the rooms or work zones that matter most.` },
    { question: `Can apartment residents in ${suburb.name} request cleaning?`, answer: `Yes. Apartment residents, tenants and hosts can request a quote. Lift bookings, keys, parking and reception or body corporate rules should be discussed because they can affect how the clean is organised.` },
    { question: `How much does cleaning cost in ${suburb.name}?`, answer: `The price depends on the chosen service, property size, condition, access, priorities and timing. LAP does not publish a suburb-wide flat rate because those details differ from one ${suburb.name} property to another.` },
    { question: `How do I request a cleaner in ${suburb.name}?`, answer: `Choose a service, enter ${suburb.name}, select your timing and leave your name and phone number. Email is optional. LAP then reviews the enquiry and follows up to clarify scope and availability.` },
  ];
  const schema = schemaGraph(businessSchema(), faqSchema(faqs), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Service areas", path: "/locations" }, { name: suburb.name, path: `/locations/${suburb.slug}` }]), { "@type": "CollectionPage", name: `Cleaning services ${suburb.name}`, url: `${SITE_URL}/locations/${suburb.slug}`, about: { "@type": "Place", name: `${suburb.name}, Gold Coast, Queensland` } });
  return <><JsonLd data={schema} /><SiteHeader /><main>
    <header className="location-hero-v2"><div className="content-shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Areas", href: "/locations" }, { label: suburb.name }]} /><span className="section-kicker">Cleaning services · {suburb.name}</span><h1>A cleaner {suburb.name} property starts with the right service.</h1><p><strong>LAP Cleaning Services provides seven cleaning quote paths for {suburb.name}, Gold Coast.</strong> {suburb.propertyContext} Choose the service that fits your situation and tell LAP what the property needs.</p><Link className="button button-primary" href="#location-quote">Get my free quote</Link></div></header>
    <section className="local-facts content-shell"><div><span className="section-kicker">Local context</span><h2>What shapes cleaning needs in {suburb.name}?</h2><p>{suburb.localNeed}</p></div><aside><strong>Nearby reference points</strong>{suburb.landmarks.map((landmark) => <span key={landmark}>{landmark}</span>)}<small>Landmarks are location context, not claimed job sites.</small></aside></section>
    <section className="location-services content-shell"><div className="section-heading"><span className="section-kicker">All services in one local page</span><h2>Choose cleaning for your {suburb.name} property.</h2><p>Every card leads to a full Gold Coast service page with a short explanation, scope, quote factors and a form.</p></div><ServiceCards /></section>
    {localCombos.length > 0 && <section className="combo-links content-shell"><span className="section-kicker">Detailed local service pages</span><h2>Popular cleaning combinations in {suburb.name}.</h2><div>{localCombos.map((combo) => <Link key={combo.slug} href={`/${combo.slug}`}><strong>{combo.service.shortName} in {suburb.name}</strong><span>Local property context and quote guide →</span></Link>)}</div></section>}
    <section className="location-scenarios"><div className="content-shell"><span className="section-kicker">Typical local situations</span><h2>Different properties need different conversations.</h2><div className="scenario-grid"><article><h3>Homes and apartments</h3><p>{suburb.propertyContext} Home cleaning and bond cleaning enquiries should name the layout, access and current priorities.</p></article><article><h3>Workplaces</h3><p>Office and corporate cleaning requests are clearer when reception, work zones, amenities and the preferred access window are identified.</p></article><article><h3>Short-stay properties</h3><p>Airbnb cleaning enquiries should include changeover timing, keys, parking, lifts and the presentation tasks expected between guests.</p></article></div></div></section>
    <FaqBlock items={faqs} title={`Cleaning in ${suburb.name}: common questions.`} />
    <section className="embedded-quote" id="location-quote"><div className="quote-intro"><span className="section-kicker">Check your {suburb.name} property</span><h2>Request a cleaning quote.</h2><p>Choose one service, confirm the suburb and leave the best phone number for LAP to respond.</p></div><QuoteSurvey /></section>
  </main><SiteFooter /><Link className="mobile-quote-bar" href="#location-quote">Get my free quote <span aria-hidden="true">→</span></Link></>;
}
