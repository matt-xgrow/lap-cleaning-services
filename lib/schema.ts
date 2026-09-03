import { business, googleReviews, SITE_URL, type Service, type Suburb } from "./site-data";

export function businessSchema() {
  const sameAs = [business.instagram, business.facebook].filter(Boolean);
  return {
    "@type": ["Organization", "LocalBusiness", "CleaningService"],
    "@id": `${SITE_URL}/#business`,
    name: business.name,
    url: SITE_URL,
    logo: `${SITE_URL}/images/lap-cleaning-services-logo.jpg`,
    image: `${SITE_URL}/images/lap-cleaner-gold-coast-home.jpg`,
    description: business.description,
    address: { "@type": "PostalAddress", addressLocality: "Gold Coast", addressRegion: "QLD", addressCountry: "AU" },
    areaServed: { "@type": "City", name: "Gold Coast, Queensland" },
    priceRange: "Request a quote",
    review: googleReviews.map((review) => ({ "@type": "Review", author: { "@type": "Person", name: review.name }, reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 }, reviewBody: review.body })),
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(business.email ? { email: business.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${SITE_URL}${item.path}` })),
});

export const faqSchema = (items: readonly { question: string; answer: string }[]) => ({
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
});

export const serviceSchema = (service: Service, suburb?: Suburb) => ({
  "@type": "Service",
  name: suburb ? `${service.shortName} in ${suburb.name}` : service.name,
  serviceType: service.shortName,
  description: service.summary,
  provider: { "@id": `${SITE_URL}/#business` },
  areaServed: { "@type": "Place", name: suburb ? `${suburb.name}, Gold Coast, Queensland` : "Gold Coast, Queensland" },
  hasOfferCatalog: { "@type": "OfferCatalog", name: `${service.shortName} scope`, itemListElement: service.scope.map((item) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: item } })) },
});

export const schemaGraph = (...items: Record<string, unknown>[]) => ({ "@context": "https://schema.org", "@graph": items });
