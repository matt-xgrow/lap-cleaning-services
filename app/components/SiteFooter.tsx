import Image from "next/image";
import Link from "./SafeLink";
import { business, services, suburbs } from "../../lib/site-data";
import { TrackedContactLink } from "./TrackedContactLink";

export function SiteFooter() {
  const socials = [business.instagram && ["Instagram", business.instagram], business.facebook && ["Facebook", business.facebook]].filter(Boolean) as string[][];
  return (
    <footer className="site-footer">
      <div className="footer-main content-shell">
        <div className="footer-brand">
          <Image src="/images/lap-cleaning-services-logo.jpg" alt="LAP Cleaning Services" width={260} height={142} />
          <p>{business.description}</p>
          <strong>Gold Coast, Queensland, Australia</strong>
        </div>
        <div className="footer-column"><strong>Services</strong><Link href="/services">All cleaning services</Link>{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.shortName}</Link>)}</div>
        <div className="footer-column"><strong>Company</strong><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/faq">FAQ</Link><Link href="/guides">Guides</Link></div>
        <div className="footer-column"><strong>Popular areas</strong>{suburbs.slice(0, 6).map((suburb) => <Link key={suburb.slug} href={`/locations/${suburb.slug}`}>{suburb.name}</Link>)}</div>
      </div>
      <div className="footer-contact content-shell">
        <span><b>Service area</b> Gold Coast only</span>
        {business.phone && <TrackedContactLink href={`tel:${business.phone}`} eventName="phone_tap"><b>Phone</b> {business.phoneDisplay || business.phone}</TrackedContactLink>}
        {business.email && <TrackedContactLink href={`mailto:${business.email}`} eventName="email_tap"><b>Email</b> {business.email}</TrackedContactLink>}
        {business.hours && <span><b>Hours</b> {business.hours}</span>}
        {socials.map(([label, href]) => <a key={label} href={href} rel="me noopener" target="_blank">{label}</a>)}
      </div>
      <div className="footer-bottom content-shell">
        <span>© {new Date().getFullYear()} LAP Cleaning Services</span>
        <span><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms</Link></span>
      </div>
    </footer>
  );
}
