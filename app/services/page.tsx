import type { Metadata } from "next";
import Image from "next/image";
import Link from "../components/SafeLink";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { JsonLd } from "../components/JsonLd";
import { PageCta } from "../components/PageCta";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { business, services, SITE_URL } from "../../lib/site-data";
import { breadcrumbSchema, businessSchema, schemaGraph } from "../../lib/schema";

export const metadata: Metadata = {
  title: "Cleaning Services Gold Coast | LAP Services",
  description: "Explore LAP Services cleaning options across the Gold Coast, from housekeeping and bond cleaning to upholstery care and personal organisation.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const serviceImages: Record<string, string> = {
    "home-cleaning-gold-coast": "/images/lap-cleaner-gold-coast-home.jpg",
    "office-cleaning-gold-coast": "/images/office-cleaning-gold-coast.jpg",
    "bond-cleaning-gold-coast": "/images/bond-cleaning-gold-coast.webp",
    "corporate-cleaning-gold-coast": "/images/office-cleaning-gold-coast.jpg",
    "airbnb-cleaning-gold-coast": "/images/airbnb-turnover-gold-coast.webp",
    "carpet-mattress-rugs-upholstery": "/images/carpet-upholstery-cleaning-gold-coast.webp",
    "personal-organisation": "/images/personal-organisation-gold-coast.webp",
  };
  const serviceOverview = [
    ...services.map((service) => ({ ...service, description: service.summary })),
    { slug: "carpet-mattress-rugs-upholstery", name: "Carpet, mattress, rugs & upholstery", shortName: "Carpet, mattress, rugs & upholstery", description: "Specialist fabric and floor care planned around your property." },
    { slug: "personal-organisation", name: "Personal organisation", shortName: "Personal organisation", description: "Calm, practical support to make your home easier to use." },
  ];
  const schema = schemaGraph(
    businessSchema(),
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]),
    { "@type": "CollectionPage", name: "LAP Services cleaning services", url: `${SITE_URL}/services`, description: business.description },
  );
  return (
    <>
      <JsonLd data={schema} />
      <SiteHeader />
      <main>
        <header className="services-overview-hero content-shell">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <span className="section-kicker">Cleaning services · Gold Coast</span>
          <h1>Cleaning that fits the way you live and work.</h1>
          <p>LAP Services offers practical cleaning support across the Gold Coast, Queensland. Choose the closest fit below and request a tailored quote.</p>
        </header>
        <section className="services-overview-grid content-shell" aria-label="LAP Services cleaning options">
          {serviceOverview.map((service, index) => {
            const href = `/services/${service.slug}`;
            return <Link className="service-overview-card" href={href} key={service.slug} aria-label={`View ${service.name}`}>
              <div className="service-overview-image"><Image src={serviceImages[service.slug]} alt={`${service.name} by LAP Cleaning Services`} fill loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 25vw" /></div>
              <div className="service-overview-content">
                <span className="service-overview-number">0{index + 1}</span>
                <h2>{service.name}</h2>
                <p>{service.description}</p>
                <span className="service-overview-link">View service <span aria-hidden="true">↗</span></span>
              </div>
            </Link>;
          })}
        </section>
        <PageCta title="Not sure which service fits?" />
      </main>
      <SiteFooter />
      <Link className="mobile-quote-bar" href="/#quote">Get my free quote <span aria-hidden="true">→</span></Link>
    </>
  );
}
