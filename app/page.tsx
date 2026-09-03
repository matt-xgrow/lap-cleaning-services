import Image from "next/image";
import Link from "./components/SafeLink";
import { FaqBlock } from "./components/FaqBlock";
import { JsonLd } from "./components/JsonLd";
import { MobileActionBar } from "./components/MobileActionBar";
import { QuoteSurvey } from "./components/QuoteSurvey";
import { ReviewCards } from "./components/ReviewCards";
import { ServiceCards } from "./components/ServiceCards";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { business, globalFaqs, SITE_URL, suburbs } from "../lib/site-data";
import { businessSchema, faqSchema, schemaGraph } from "../lib/schema";

const homeSchema = schemaGraph(
  businessSchema(),
  faqSchema(globalFaqs),
  {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "LAP Cleaning Services",
    publisher: { "@id": `${SITE_URL}/#business` },
    inLanguage: "en-AU",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
);

export default function Home() {
  return (
    <>
      <JsonLd data={homeSchema} />
      <SiteHeader />
      <main>
        <section className="home-hero-v2">
          <Image className="home-hero-photo" src="/images/lap-cleaner-gold-coast-home.jpg" alt="LAP Cleaning Services cleaner caring for a Gold Coast home" fill priority sizes="100vw" />
          <div className="home-hero-shade" />
          <div className="home-hero-content">
            <span className="section-kicker">Cleaning services · Gold Coast</span>
            <h1>Beautifully clean spaces, without losing your time.</h1>
            <p>LAP Cleaning Services provides tailored cleaning for Gold Coast homes, workplaces, rental handovers and guest stays.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="#quote">Get my free quote</Link>
              <Link className="button button-on-dark" href="/contact">Contact LAP</Link>
            </div>
            <div className="hero-trust" aria-label="Service facts">
              <span><strong>Gold Coast only</strong><small>Local service area</small></span>
              <span><strong>7 ways to help</strong><small>One tailored quote</small></span>
              <a href={business.googleReviews} target="_blank" rel="noopener noreferrer"><strong>Google Reviews</strong><small>Read verified feedback ↗</small></a>
            </div>
          </div>
        </section>

        <section className="home-reviews content-shell" aria-labelledby="reviews-title">
          <div className="section-heading home-reviews-heading"><div><span className="section-kicker">Customer feedback</span><h2 id="reviews-title">Loved by Gold Coast customers.</h2></div></div>
          <ReviewCards />
          <div className="home-reviews-action"><a className="button button-quiet" href={business.googleReviews} target="_blank" rel="noopener noreferrer">Read on Google ↗</a></div>
        </section>

        <section className="home-services-v2 content-shell" id="services" aria-labelledby="services-title">
          <div className="minimal-heading">
            <div><span className="section-kicker">Our services</span><h2 id="services-title">The right clean for your space.</h2></div>
            <div><p>Choose a service to see what it can cover and request a tailored Gold Coast quote.</p><Link className="text-link" href="/services">View all services <span aria-hidden="true">↗</span></Link></div>
          </div>
          <ServiceCards />
        </section>

        <section className="photo-feature-grid content-shell" aria-label="Cleaning services gallery">
          <figure className="photo-feature photo-feature-tall">
            <Image src="/images/office-cleaning-gold-coast.jpg" alt="Professional office cleaning in a warm Gold Coast workspace" fill loading="lazy" sizes="(max-width: 760px) 100vw, 42vw" />
            <figcaption><span>Workplaces</span><strong>Ready for the day</strong></figcaption>
          </figure>
          <figure className="photo-feature">
            <Image src="/images/cleaning-detail-gold-coast.jpg" alt="Detailed cleaning of a timber kitchen surface" fill loading="lazy" sizes="(max-width: 760px) 100vw, 27vw" />
            <figcaption><span>Detail</span><strong>Care where it counts</strong></figcaption>
          </figure>
          <figure className="photo-feature">
            <Image src="/images/airbnb-cleaning-gold-coast-optimised.jpg" alt="Freshly presented Gold Coast short-stay apartment after cleaning" fill loading="lazy" sizes="(max-width: 760px) 100vw, 27vw" />
            <figcaption><span>Guest stays</span><strong>Fresh for every arrival</strong></figcaption>
          </figure>
        </section>

        <section className="premium-process">
          <div className="content-shell premium-process-inner">
            <div className="premium-process-copy">
              <span className="section-kicker">Simple from the start</span>
              <h2>A clear quote in three easy steps.</h2>
              <Link className="button button-primary" href="#quote">Start my quote</Link>
            </div>
            <ol>
              <li><span>01</span><div><h3>Tell us what you need</h3><p>Choose your service, suburb and timing.</p></div></li>
              <li><span>02</span><div><h3>We review your space</h3><p>LAP clarifies the priorities and access.</p></div></li>
              <li><span>03</span><div><h3>You confirm the details</h3><p>Agree on the scope before anything is booked.</p></div></li>
            </ol>
          </div>
        </section>

        <section className="area-showcase content-shell" aria-labelledby="area-title">
          <div className="area-showcase-photo">
            <Image src="/images/airbnb-cleaning-gold-coast-optimised.jpg" alt="Clean and welcoming Gold Coast short-stay interior prepared for guests" fill loading="lazy" sizes="(max-width: 900px) 100vw, 46vw" />
          </div>
          <div className="area-showcase-copy">
            <span className="section-kicker">Gold Coast service area</span>
            <h2 id="area-title">Local cleaning, across the coast.</h2>
            <p>LAP serves the Gold Coast, Queensland only. Check your local page for available cleaning services.</p>
            <div className="area-chip-grid">{suburbs.map((suburb) => <Link key={suburb.slug} href={`/locations/${suburb.slug}`}>{suburb.name}</Link>)}</div>
            <Link className="text-link" href="/locations">View all areas <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <FaqBlock items={globalFaqs.slice(0, 6)} title="Common cleaning questions." />

        <section className="quote-section" id="quote" aria-labelledby="quote-title">
          <div className="quote-intro">
            <span className="section-kicker">One question at a time</span>
            <h2 id="quote-title">Get your free Gold Coast cleaning quote.</h2>
            <p>Choose your service and suburb, then leave the best number for LAP to contact you.</p>
          </div>
          <QuoteSurvey />
        </section>
      </main>
      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
