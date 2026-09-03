import Link from "./components/SafeLink";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export default function NotFound() {
  return <><SiteHeader /><main className="not-found content-shell"><span className="section-kicker">404 · Page not found</span><h1>This page has moved out.</h1><p>The service or suburb URL may have changed. Start from the Gold Coast service directory or go straight to the quote survey.</p><div className="hero-actions"><Link className="button button-primary" href="/">Go to the home page</Link><Link className="button button-quiet" href="/locations">Browse service areas</Link></div></main><SiteFooter /></>;
}
