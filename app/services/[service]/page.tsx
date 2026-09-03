import type { Metadata } from "next";
import Image from "next/image";
import Link from "../../components/SafeLink";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { FaqBlock } from "../../components/FaqBlock";
import { JsonLd } from "../../components/JsonLd";
import { PageCta } from "../../components/PageCta";
import { QuoteSurvey } from "../../components/QuoteSurvey";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { TrustBar } from "../../components/TrustBar";
import { services, serviceOptions, suburbs, type Service } from "../../../lib/site-data";
import { breadcrumbSchema, businessSchema, faqSchema, schemaGraph, serviceSchema } from "../../../lib/schema";

type Props = { params: Promise<{ service: string }> };

const serviceImages: Record<string, string> = {
  "home-cleaning-gold-coast": "/images/lap-cleaner-gold-coast-home.jpg",
  "office-cleaning-gold-coast": "/images/cleaning-detail-gold-coast.jpg",
  "bond-cleaning-gold-coast": "/images/cleaning-detail-gold-coast.jpg",
  "corporate-cleaning-gold-coast": "/images/office-cleaning-gold-coast.jpg",
  "airbnb-cleaning-gold-coast": "/images/airbnb-cleaning-gold-coast.jpg",
  "carpet-mattress-rugs-upholstery": "/images/cleaning-detail-gold-coast.jpg",
  "personal-organisation": "/images/lap-cleaner-gold-coast-home.jpg",
};

function optionAsService(slug: string): Service | undefined {
  const option = serviceOptions.find((item) => item.slug === slug && item.detailSlug === slug);
  if (!option) return undefined;
  const singular = option.name.toLowerCase();
  return {
    slug: option.slug, baseSlug: option.slug, name: `${option.name} Gold Coast`, shortName: option.name, singular,
    eyebrow: "A practical cleaning plan for your property", outcome: `${option.name} that fits your Gold Coast property`, summary: option.description,
    whoItsFor: `${option.name} is planned around your property, priorities, access and preferred timing. LAP starts with a short enquiry so the scope can be discussed clearly before anything is arranged.`,
    painPoints: ["You want the right tasks covered, not a generic checklist.", "Your property has its own access, timing and priority areas.", "You need a simple way to explain what should be done."],
    scope: ["Priority rooms, surfaces or items", "Areas needing extra attention", "Access and timing requirements", "Final scope confirmed in your quote"],
    quoteFactors: ["Property size and layout", "Current condition and priority areas", "Access, parking and timing", "One-off or ongoing support"],
    approach: ["Choose this service and your Gold Coast suburb.", "Tell LAP what matters most in the property.", "Receive a follow-up to clarify scope and quote."],
    faq: [
      { question: `What does ${singular} include?`, answer: `The scope is discussed around your property and priorities. Share the rooms, surfaces or items that matter most and LAP will confirm what can be included in the quote.` },
      { question: `Can I request ${singular} as a one-off service?`, answer: `Yes. Select the service in the quote survey and choose your preferred timing. LAP will confirm availability for your Gold Coast suburb and the requested scope.` },
      { question: `How much does ${singular} cost on the Gold Coast?`, answer: `Pricing depends on the property, condition, access, timing and requested tasks. LAP provides a tailored quote after reviewing those details rather than publishing a generic rate.` },
      { question: `How do I request ${singular}?`, answer: `Choose the service, enter your suburb, select timing and leave your name and phone number. Email is optional. LAP will follow up to clarify the enquiry.` },
    ],
  };
}

export function generateStaticParams() {
  return [...services.map((service) => ({ service: service.slug })), ...serviceOptions.filter((option) => option.detailSlug === option.slug).map((option) => ({ service: option.slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const service = services.find((item) => item.slug === resolvedParams.service) ?? optionAsService(resolvedParams.service);
  if (!service) return {};
  const description = `${service.shortName} across the Gold Coast, tailored to your property. Request a free quote from LAP Cleaning Services.`;
  return { title: service.name, description, alternates: { canonical: `/services/${service.slug}` }, openGraph: { title: `${service.name} | LAP Cleaning Services`, description, url: `/services/${service.slug}`, images: [{ url: serviceImages[service.slug], width: 960, height: 1200, alt: `${service.shortName} by LAP Cleaning Services on the Gold Coast` }] }, twitter: { card: "summary_large_image", title: service.name, description, images: [serviceImages[service.slug]] } };
}

export default async function ServicePage({ params }: Props) {
  const resolvedParams = await params;
  const service = services.find((item) => item.slug === resolvedParams.service) ?? optionAsService(resolvedParams.service);
  if (!service) notFound();
  const schema = schemaGraph(businessSchema(), serviceSchema(service), faqSchema(service.faq), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: service.shortName, path: `/services/${service.slug}` }]));

  return <>
    <JsonLd data={schema} /><SiteHeader /><main>
      <header className="service-page-hero content-shell">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.shortName }]} />
        <span className="section-kicker">{service.eyebrow}</span><h1>{service.name}</h1>
        <p><strong>{service.outcome}.</strong> {service.summary}</p>
      </header>

      <section className="service-first-section content-shell" id="service-quote" aria-label={`${service.shortName} quote and information`}>
        <div className="service-first-form">
          <div className="service-first-form-heading"><span className="section-kicker">Free Gold Coast quote</span><h2>Tell us about your {service.singular}.</h2><p>Choose your suburb and timing. Name and phone are required; email is optional.</p></div>
          <QuoteSurvey />
        </div>
        <aside className="service-first-info">
          <figure className="service-first-image"><Image src={serviceImages[service.slug]} alt={`LAP Cleaning Services ${service.shortName.toLowerCase()} on the Gold Coast`} fill priority sizes="(max-width: 900px) 100vw, 42vw" /></figure>
          <span className="section-kicker">A clear starting point</span><h2>{service.shortName} for your property.</h2><p>{service.whoItsFor}</p>
          <ul className="service-brief-list">{service.scope.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
          <FaqBlock items={service.faq.slice(0, 4)} title="Frequently asked questions." className="service-first-faq" />
        </aside>
      </section>

      <TrustBar compact />
      <section className="service-details-band" aria-label="Service details"><div className="content-shell service-details-grid">
        <article><span className="section-kicker">01</span><h3>What shapes your quote?</h3><p>{service.quoteFactors.slice(0, 2).join(" and ")} are discussed before LAP confirms the scope.</p></article>
        <article><span className="section-kicker">02</span><h3>How it works</h3><p>{service.approach[0]} {service.approach[1]}</p></article>
        <article><span className="section-kicker">03</span><h3>Gold Coast coverage</h3><p>LAP Cleaning Services serves the Gold Coast, Queensland only.</p></article>
      </div></section>
      <section className="service-area-copy content-shell" aria-labelledby="service-areas-title"><div><span className="section-kicker">Local service area</span><h2 id="service-areas-title">Request {service.shortName.toLowerCase()} across the Gold Coast.</h2><p>Choose a suburb for local property context and a direct quote path.</p></div><div className="area-chip-grid">{suburbs.map((suburb) => <Link key={suburb.slug} href={`/locations/${suburb.slug}`}>{suburb.name}</Link>)}</div></section>
      <PageCta title={`Ready to arrange ${service.shortName.toLowerCase()}?`} />
    </main><SiteFooter /><Link className="mobile-quote-bar" href="#service-quote">Get my free quote <span aria-hidden="true">→</span></Link>
  </>;
}
