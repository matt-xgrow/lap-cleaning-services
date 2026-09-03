import type { Metadata } from "next";
import Link from "../components/SafeLink";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { FaqBlock } from "../components/FaqBlock";
import { JsonLd } from "../components/JsonLd";
import { QuoteSurvey } from "../components/QuoteSurvey";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { TrustBar } from "../components/TrustBar";
import { business, comboPages } from "../../lib/site-data";
import { breadcrumbSchema, businessSchema, faqSchema, schemaGraph, serviceSchema } from "../../lib/schema";

type Props = { params: Promise<{ landing: string }> };
export function generateStaticParams() { return comboPages.map((page) => ({ landing: page.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const page = comboPages.find((item) => item.slug === resolvedParams.landing);
  if (!page) return {};
  const description = `${page.service.shortName} for ${page.suburb.name} homes, workplaces, rentals or guest properties. Get a tailored Gold Coast quote from LAP.`;
  return { title: `${page.service.shortName} ${page.suburb.name}`, description, alternates: { canonical: `/${page.slug}` }, openGraph: { title: `${page.service.shortName} ${page.suburb.name} | LAP`, description, url: `/${page.slug}`, images: [{ url: "/images/lap-cleaner-gold-coast-home.jpg", width: 960, height: 1200, alt: `${page.service.shortName} in ${page.suburb.name} by LAP Cleaning Services` }] }, twitter: { card: "summary_large_image", title: `${page.service.shortName} ${page.suburb.name}`, description, images: ["/images/lap-cleaner-gold-coast-home.jpg"] } };
}

function scenarioCopy(serviceBase: string, suburbName: string) {
  if (serviceBase === "home-cleaning") return `${suburbName} households may be balancing work, family and the steady return of kitchen, bathroom and floor cleaning. A useful enquiry identifies the rooms that affect how the whole home feels.`;
  if (serviceBase === "office-cleaning") return `${suburbName} offices can range from compact professional suites to larger team spaces. Reception, staff kitchens, amenities, work zones and access timing should be separated in the scope.`;
  if (serviceBase === "bond-cleaning") return `${suburbName} renters may be leaving an apartment, townhouse or house. Handover dates, empty-room condition, keys, lifts and parking are practical details to settle before the clean.`;
  if (serviceBase === "corporate-cleaning") return `${suburbName} corporate sites may involve reception, meeting rooms, work zones and shared amenities with different presentation needs. The quote should be easy for decision-makers to review.`;
  return `${suburbName} short-stay properties may have tight guest windows and building-specific access. Hosts should clarify bedrooms, bathrooms, kitchens, key collection, lifts and the expected arrival presentation.`;
}

export default async function ServiceLocationPage({ params }: Props) {
  const resolvedParams = await params;
  const page = comboPages.find((item) => item.slug === resolvedParams.landing);
  if (!page) notFound();
  const { service, suburb } = page;
  const faqs = [
    { question: `Can I request ${service.shortName.toLowerCase()} in ${suburb.name}?`, answer: `Yes. LAP Cleaning Services accepts ${service.shortName.toLowerCase()} enquiries for ${suburb.name} as part of its Gold Coast service area. Submit the property suburb, timing and contact details so availability and scope can be confirmed.` },
    { question: `What does ${service.shortName.toLowerCase()} in ${suburb.name} include?`, answer: `${service.scope.slice(0, 3).join(", ")} can be discussed. The final scope depends on the property, condition, access and priorities, so this page does not present every task as automatically included.` },
    { question: `What local details should I share for a ${suburb.name} quote?`, answer: `${suburb.localNeed} Mention the property type, rooms or work zones, parking, lifts, keys and any preferred service window when LAP follows up.` },
    { question: `How much does ${service.shortName.toLowerCase()} cost in ${suburb.name}?`, answer: `LAP prepares a tailored quote because property size, condition, access, scope and timing vary. The website does not publish an invented local price range that could misrepresent the actual ${suburb.name} property.` },
    { question: `How quickly can LAP attend ${suburb.name}?`, answer: `Response and service times are confirmed after the enquiry is reviewed. LAP does not publish an unverified same-day or fixed travel-time promise. Select your preferred timing in the form so the team understands the urgency.` },
    { question: `How do I start a ${service.shortName.toLowerCase()} quote?`, answer: `The service is already selected on this page. Add ${suburb.name}, choose your timing and provide your name and phone number. Email is optional and no payment details are requested.` },
  ];
  const schema = schemaGraph(businessSchema(), serviceSchema(service, suburb), faqSchema(faqs), breadcrumbSchema([{ name: "Home", path: "/" }, { name: suburb.name, path: `/locations/${suburb.slug}` }, { name: service.shortName, path: `/${page.slug}` }]));
  return <><JsonLd data={schema} /><SiteHeader /><main>
    <header className="combo-hero"><div className="content-shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: suburb.name, href: `/locations/${suburb.slug}` }, { label: service.shortName }]} /><span className="section-kicker">{service.shortName} · {suburb.name}, Gold Coast</span><h1>{service.shortName} in {suburb.name}, shaped around the property.</h1><p><strong>{business.name} accepts {service.shortName.toLowerCase()} enquiries in {suburb.name}.</strong> {suburb.propertyContext} This page connects that local context with the scope and quote factors specific to {service.shortName.toLowerCase()}.</p><div className="hero-actions"><Link className="button button-primary" href="#combo-quote">Get my free quote</Link><Link className="button button-quiet" href={`/services/${service.slug}`}>View the full service</Link></div></div></header>
    <TrustBar compact />
    <section className="local-answer content-shell"><div><span className="section-kicker">Answer first</span><h2>Is {service.shortName.toLowerCase()} available in {suburb.name}?</h2><p><strong>Yes, you can request a quote for {service.shortName.toLowerCase()} in {suburb.name}.</strong> LAP serves the Gold Coast and reviews availability for the individual address, service scope and preferred timing after receiving the enquiry.</p></div><aside><span>Service</span><strong>{service.shortName}</strong><span>Location</span><strong>{suburb.name}, Gold Coast</strong><span>Pricing</span><strong>Tailored quote</strong></aside></section>
    <section className="local-detail content-shell"><article><span className="section-kicker">Why local context matters</span><h2>{suburb.name} properties are not all the same.</h2><p>{suburb.propertyContext}</p><p>{suburb.localNeed}</p><p>{scenarioCopy(service.baseSlug, suburb.name)}</p></article><aside><strong>Nearby landmarks</strong>{suburb.landmarks.map((landmark) => <span key={landmark}>{landmark}</span>)}<small>These identify the local area. They are not presented as completed LAP job sites.</small></aside></section>
    <section className="combo-scope"><div className="content-shell"><div className="section-heading"><span className="section-kicker">What to discuss</span><h2>A practical {service.shortName.toLowerCase()} scope for {suburb.name}.</h2><p>The items below create a useful starting point. The agreed quote still needs to reflect the individual property.</p></div><div className="factor-grid">{service.scope.slice(0,4).map((item,index) => <article key={item}><span>0{index+1}</span><h3>{item}</h3><p>Describe the current condition and priority so LAP can understand how this area fits the wider clean.</p></article>)}</div></div></section>
    <section className="example-panel content-shell"><span className="section-kicker">Example enquiry — not a claimed completed job</span><h2>What a useful local request might say.</h2><blockquote>“I need {service.shortName.toLowerCase()} for a property in {suburb.name}. The main priorities are {service.scope[0].toLowerCase()} and {service.scope[1].toLowerCase()}. Please contact me to discuss access, timing and a tailored quote.”</blockquote><p>This example shows the level of information that helps. It does not represent a specific customer, review or completed LAP job.</p></section>
    <section className="quote-factors-band"><div className="content-shell"><span className="section-kicker">Pricing without guesswork</span><h2>Four details that shape the quote.</h2><ol>{service.quoteFactors.map((factor,index) => <li key={factor}><span>0{index+1}</span><strong>{factor}</strong></li>)}</ol></div></section>
    <FaqBlock items={faqs} title={`${service.shortName} in ${suburb.name}: questions answered.`} />
    <section className="embedded-quote" id="combo-quote"><div className="quote-intro"><span className="section-kicker">Local quote request</span><h2>Tell LAP about the {suburb.name} property.</h2><p>{service.shortName} is preselected. Confirm the suburb, timing and your preferred contact details.</p></div><QuoteSurvey initialService={service.slug} /></section>
  </main><SiteFooter /><Link className="mobile-quote-bar" href="#combo-quote">Get my free quote <span aria-hidden="true">→</span></Link></>;
}
