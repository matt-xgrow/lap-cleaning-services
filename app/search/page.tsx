import type { Metadata } from "next";
import Link from "../components/SafeLink";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { guides, services, suburbs } from "../../lib/site-data";

export const metadata: Metadata = { title: "Search LAP Cleaning Services", description: "Search LAP cleaning services, Gold Coast locations and practical cleaning guides.", robots: { index: false, follow: true } };

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const query = (resolvedSearchParams.q || "").trim().toLowerCase();
  const results = [
    ...services.map((item) => ({ title: item.name, description: item.summary, href: `/services/${item.slug}`, search: `${item.name} ${item.summary} ${item.scope.join(" ")}` })),
    ...suburbs.map((item) => ({ title: `Cleaning services ${item.name}`, description: item.propertyContext, href: `/locations/${item.slug}`, search: `${item.name} Gold Coast ${item.propertyContext} ${item.localNeed}` })),
    ...guides.map((item) => ({ title: item.title, description: item.description, href: `/guides/${item.slug}`, search: `${item.title} ${item.description}` })),
  ].filter((item) => query && item.search.toLowerCase().includes(query));

  return <><SiteHeader /><main><header className="simple-hero content-shell"><span className="section-kicker">Site search</span><h1>Find a service, suburb or guide.</h1><form className="site-search" action="/search"><label htmlFor="site-search">What are you looking for?</label><div><input id="site-search" name="q" defaultValue={resolvedSearchParams.q || ""} placeholder="Try ‘bond cleaning’ or ‘Robina’" /><button className="button button-primary" type="submit">Search LAP</button></div></form></header><section className="search-results content-shell" aria-live="polite"><h2>{query ? `${results.length} result${results.length === 1 ? "" : "s"} for “${resolvedSearchParams.q}”` : "Enter a service or Gold Coast suburb"}</h2>{results.map((result) => <article key={result.href}><h3><Link href={result.href}>{result.title}</Link></h3><p>{result.description}</p><Link className="text-link" href={result.href}>Open page <span aria-hidden="true">→</span></Link></article>)}{query && results.length === 0 && <p>No exact result was found. Browse <Link className="text-link" href="/locations">service areas</Link> or <Link className="text-link" href="/#quote">start a quote</Link>.</p>}</section></main><SiteFooter /></>;
}
