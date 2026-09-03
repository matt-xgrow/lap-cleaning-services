"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "./SafeLink";
import { business, services } from "../../lib/site-data";
import { TrackedContactLink } from "./TrackedContactLink";

export function SiteHeader() {
  const closeMenu = (event: MouseEvent<HTMLAnchorElement>) => {
    const details = event.currentTarget.closest("details");
    if (details) details.open = false;
  };

  return (
    <header className="site-header" id="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="LAP Cleaning Services home">
          <Image src="/images/lap-cleaning-services-logo.jpg" alt="LAP Cleaning Services" width={220} height={120} priority />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <details className="nav-menu"><summary>Services</summary><div className="nav-panel">{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} onClick={closeMenu}>{service.shortName}<span aria-hidden="true">↗</span></Link>)}<Link href="https://lap-cleaning-services-gold-coast.vercel.app/services" onClick={closeMenu}><strong>View all cleaning services</strong><span aria-hidden="true">↗</span></Link></div></details><Link href="/locations" onClick={closeMenu}>Areas</Link><Link href="/about" onClick={closeMenu}>About</Link><Link href="/guides" onClick={closeMenu}>Guides</Link><Link href="/contact" onClick={closeMenu}>Contact</Link>
        </nav>
        <div className="header-actions">
          {business.phone && <TrackedContactLink className="header-phone" href={`tel:${business.phone}`} eventName="phone_tap">{business.phoneDisplay || business.phone}</TrackedContactLink>}
          <Link className="button button-primary header-quote" href="/#quote">Get a free quote</Link>
          <details className="mobile-menu">
            <summary aria-label="Open navigation"><span></span><span></span><span></span></summary>
            <nav aria-label="Mobile navigation">
              <strong>Services</strong>{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} onClick={closeMenu}>{service.shortName}</Link>)}
              <Link href="https://lap-cleaning-services-gold-coast.vercel.app/services" onClick={closeMenu}>View all services</Link><Link href="/locations" onClick={closeMenu}>Service areas</Link><Link href="/about" onClick={closeMenu}>About LAP</Link><Link href="/contact" onClick={closeMenu}>Contact</Link><Link href="/faq" onClick={closeMenu}>FAQ</Link><Link href="/guides" onClick={closeMenu}>Guides</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
