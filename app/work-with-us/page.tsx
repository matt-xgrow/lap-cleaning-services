import type { Metadata } from "next";
import Link from "../components/SafeLink";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { CleanerApplicationForm } from "../components/CleanerApplicationForm";
import { JsonLd } from "../components/JsonLd";
import { MobileActionBar } from "../components/MobileActionBar";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { SITE_URL } from "../../lib/site-data";
import { breadcrumbSchema, businessSchema, schemaGraph } from "../../lib/schema";

export const metadata: Metadata = {
  title: "Work with us",
  description: "Apply to work as a cleaner with LAP Cleaning Services on the Gold Coast. Share your availability, experience, ABN and whether you have a car.",
  alternates: { canonical: "/work-with-us" },
};

export default function WorkWithUsPage() {
  const schema = schemaGraph(
    businessSchema(),
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Work with us", path: "/work-with-us" }]),
    { "@type": "WebPage", name: "Work with us", url: `${SITE_URL}/work-with-us`, description: "Application form for cleaners who want to work with LAP Cleaning Services on the Gold Coast." },
  );

  return <><JsonLd data={schema} /><SiteHeader /><main className="work-with-us-page">
    <header className="simple-hero content-shell">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Work with us" }]} />
      <span className="section-kicker">Work with us</span>
      <h1>Clean with LAP on the Gold Coast.</h1>
      <p>If you are a cleaner who wants to work with LAP Cleaning Services, read how the application works, then send your details at the bottom of this page. LAP reviews each application before getting in touch.</p>
      <Link className="button button-primary" href="#application">Start your application</Link>
    </header>
    <section className="work-with-us-benefits content-shell">
      <div className="section-heading"><span className="section-kicker">Before you apply</span><h2>A short application, reviewed by LAP.</h2><p>This page is for cleaners. It takes three steps, and nothing is confirmed until LAP contacts you.</p></div>
      <div className="work-with-us-points">
        <article><span>01</span><h3>Gold Coast work</h3><p>Applications are for cleaning work across the Gold Coast, Queensland.</p></article>
        <article><span>02</span><h3>What we ask</h3><p>Your name and contact details, your ABN, whether you have a car, and when you are available.</p></article>
        <article><span>03</span><h3>What happens next</h3><p>LAP reviews the application and gets in touch by email or phone. Sending it does not confirm a start date.</p></article>
      </div>
      <p className="work-with-us-note">If you need a home, office or bond clean instead, <Link href="/contact">request a quote</Link>.</p>
    </section>
    <section className="work-with-us-apply content-shell" id="application">
      <div className="section-heading"><span className="section-kicker">Apply</span><h2>Tell LAP about your cleaning work.</h2><p>Move through one card at a time. You can go back and change an answer before you send it.</p></div>
      <CleanerApplicationForm />
    </section>
  </main><SiteFooter /><MobileActionBar /></>;
}
