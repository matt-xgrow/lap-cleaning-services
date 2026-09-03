import type { Metadata } from "next";
import Link from "../components/SafeLink";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { business, services } from "../../lib/site-data";

export const metadata: Metadata = { title: "Quote Request Received", description: "Your LAP Cleaning Services quote request has been received.", robots: { index: false, follow: false }, alternates: { canonical: "/thank-you" } };

export default function ThankYouPage() {
  return <><SiteHeader /><main className="thank-you"><div className="thank-you-card"><span className="success-mark" aria-hidden="true">✓</span><span className="section-kicker">Request received</span><h1>Thank you. LAP has your cleaning enquiry.</h1><p>The team will review the service, Gold Coast suburb and timing you submitted, then follow up using the phone number you provided. No booking is confirmed until the scope and availability are discussed.</p>{business.phone && <a className="button button-primary" href={`tel:${business.phone}`}>Call {business.phoneDisplay || business.phone}</a>}<Link className="button button-quiet" href="/">Return to the home page</Link><div className="thank-you-links"><strong>While you wait</strong>{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>Read about {service.shortName.toLowerCase()}</Link>)}</div></div></main><SiteFooter /></>;
}
