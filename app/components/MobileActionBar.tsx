import Link from "./SafeLink";
import { business } from "../../lib/site-data";
import { TrackedContactLink } from "./TrackedContactLink";

export function MobileActionBar({ quoteHref = "/#quote" }: { quoteHref?: string }) {
  return (
    <div className="mobile-action-bar" aria-label="Contact options">
      {business.phone ? (
        <TrackedContactLink className="mobile-call-action" href={`tel:${business.phone}`} eventName="phone_tap">Call us</TrackedContactLink>
      ) : (
        <Link className="mobile-call-action" href="/contact">Call us</Link>
      )}
      <Link className="mobile-quote-action" href={quoteHref}>Free quote <span aria-hidden="true">→</span></Link>
    </div>
  );
}
