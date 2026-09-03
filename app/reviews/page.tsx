import type { Metadata } from "next";
import Image from "next/image";
import Link from "../components/SafeLink";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { JsonLd } from "../components/JsonLd";
import { ReviewCards } from "../components/ReviewCards";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { business, SITE_URL } from "../../lib/site-data";
import { breadcrumbSchema, businessSchema, schemaGraph } from "../../lib/schema";

export const metadata: Metadata = {
  title: "LAP Cleaning Services Reviews",
  description: "Read customer feedback for LAP Cleaning Services on the official Google profile, then request a tailored cleaning quote on the Gold Coast.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const schema = schemaGraph(
    businessSchema(),
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }]),
    { "@type": "WebPage", name: "LAP Cleaning Services reviews", url: `${SITE_URL}/reviews` },
  );
  return (
    <>
      <JsonLd data={schema} />
      <SiteHeader />
      <main>
        <header className="review-hero content-shell">
          <div className="review-hero-copy">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reviews" }]} />
            <span className="section-kicker">Customer feedback</span>
            <h1>Real experiences. Shared on Google.</h1>
            <p>See customer feedback for LAP Cleaning Services directly on its official Google profile.</p>
            <a className="button button-primary" href={business.googleReviews} target="_blank" rel="noopener noreferrer">Read Google reviews</a>
          </div>
          <figure><Image src="/images/cleaning-detail-gold-coast.jpg" alt="Careful surface cleaning by LAP Cleaning Services" width={1600} height={900} priority sizes="(max-width: 900px) 100vw, 48vw" /></figure>
        </header>
        <section className="reviews-page-list content-shell" aria-labelledby="reviews-list-title">
          <div className="section-heading"><span className="section-kicker">Google Reviews</span><h2 id="reviews-list-title">What customers say about LAP Services.</h2><p>These reviews were supplied from the LAP Services Google profile.</p></div>
          <ReviewCards />
          <a className="button button-primary" href={business.googleReviews} target="_blank" rel="noopener noreferrer">Open Google profile ↗</a>
        </section>
        <section className="review-cta content-shell">
          <span className="section-kicker">Need a cleaner?</span><h2>Tell LAP what your space needs.</h2><p>Choose from practical cleaning options available across the Gold Coast.</p>
          <Link className="button button-primary" href="/#quote">Get my free quote</Link>
        </section>
      </main>
      <SiteFooter />
      <Link className="mobile-quote-bar" href="/#quote">Get my free quote <span aria-hidden="true">→</span></Link>
    </>
  );
}
