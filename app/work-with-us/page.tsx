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
      <p>If you are a cleaner who wants to work with LAP Cleaning Services, send a short application. Tell us when you are available, what experience you have, and whether you have a car. LAP reviews each application before getting in touch.</p>
    </header>
    <section className="contact-layout work-with-us-layout content-shell">
      <aside>
        <div><span>Who this is for</span><strong>Cleaners wanting to work with LAP</strong></div>
        <div><span>Service area</span><strong>Gold Coast, Queensland</strong></div>
        <div><span>What happens next</span><strong>LAP reviews your application and contacts you</strong></div>
        <p>Sending this form does not confirm work or a start date. If you need a home, office or bond clean instead, <Link href="/contact">request a quote</Link>.</p>
      </aside>
      <div className="contact-form-card" id="application"><CleanerApplicationForm /></div>
    </section>
  </main><SiteFooter /><MobileActionBar /></>;
}
