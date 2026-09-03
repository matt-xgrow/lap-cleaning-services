export function TrustBar({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`trust-bar${compact ? " trust-bar-compact" : ""}`} aria-label="Verified website facts">
      <span><strong>Gold Coast only</strong><small>Local service area</small></span>
      <span><strong>7 cleaning options</strong><small>Dedicated quote paths</small></span>
      <span><strong>Free quote request</strong><small>No payment details</small></span>
      <span><strong>Real LAP photography</strong><small>Provided by the business</small></span>
    </div>
  );
}
