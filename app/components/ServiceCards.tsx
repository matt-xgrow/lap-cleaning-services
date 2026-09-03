import Link from "./SafeLink";
import { services } from "../../lib/site-data";

export function ServiceCards({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="service-card-grid">
      {services.map((service, index) => (
        <article className="service-card" key={service.slug}>
          <Link href={`/services/${service.slug}`} aria-label={`View ${service.shortName.toLowerCase()} services`}>
            <span className="service-card-number" aria-hidden="true">0{index + 1}</span>
            <Heading>{service.shortName}</Heading>
            <span className="service-card-arrow" aria-hidden="true">↗</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
