import Link from "./SafeLink";
import { business } from "../../lib/site-data";
import { TrackedContactLink } from "./TrackedContactLink";

export function PageCta({ title = "Tell us what needs cleaning." }: { title?: string }) {
  return (
    <section className="page-cta">
      <div>
        <span className="section-kicker">A quick first step</span>
        <h2>{title}</h2>
        <p>Choose the service, add your Gold Coast suburb and leave the best number for LAP to contact you.</p>
      </div>
      <div className="page-cta-actions">
        <Link className="button button-primary" href="/#quote">Get my free quote</Link>
        {business.phone && <TrackedContactLink className="button button-quiet" href={`tel:${business.phone}`} eventName="phone_tap">Call {business.phoneDisplay || business.phone}</TrackedContactLink>}
      </div>
    </section>
  );
}
