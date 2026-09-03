import Image from "next/image";
import Link from "./SafeLink";
import { business, services } from "../../lib/site-data";
import { TrackedContactLink } from "./TrackedContactLink";

export function SiteHeader() {
  return (
    <header className="site-header" id="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="LAP Cleaning Services home">
          <Image src="/images/lap-cleaning-services-logo.jpg" alt="LAP Cleaning Services" width={220} height={120} priority />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <details className="nav-menu"><summary>Services</summary><div className="nav-panel">{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.shortName}<span aria-hidden="true">↗</span></Link>)}<Link href="/services"><strong>View all services</strong><span aria-hidden="true">↗</span></Link></div></details><Link href="/locations">Areas</Link><Link href="/about">About</Link><Link href="/guides">Guides</Link><Link href="/contact">Contact</Link>
        </nav>
        <div className="header-actions">
          {business.phone && <TrackedContactLink className="header-phone" href={`tel:${business.phone}`} eventName="phone_tap">{business.phoneDisplay || business.phone}</TrackedContactLink>}
          <Link className="button button-primary header-quote" href="/#quote">Get a free quote</Link>
          <details className="mobile-menu">
            <summary aria-label="Open navigation"><span></span><span></span><span></span></summary>
            <nav aria-label="Mobile navigation">
              <strong>Services</strong>{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.shortName}</Link>)}
              <Link href="/locations">Service areas</Link><Link href="/about">About LAP</Link><Link href="/contact">Contact</Link><Link href="/faq">FAQ</Link><Link href="/guides">Guides</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
