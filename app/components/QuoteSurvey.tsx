"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { business, services, serviceOptions, suburbs } from "../../lib/site-data";

type FormData = {
  service: string;
  suburb: string;
  timing: string;
  name: string;
  phone: string;
  email: string;
  website: string;
};

const emptyData: FormData = { service: "", suburb: "", timing: "", name: "", phone: "", email: "", website: "" };
const stepLabels = ["Service", "Suburb", "Timing", "Contact"];

function trackEvent(event: string, detail: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const eventData = { event, client_id: business.clientId, ...detail };
  const trackingWindow = window as typeof window & { dataLayer?: Record<string, unknown>[]; fbq?: (...args: unknown[]) => void };
  trackingWindow.dataLayer = trackingWindow.dataLayer || [];
  trackingWindow.dataLayer.push(eventData);
  if (event === "quote_form_submit") trackingWindow.fbq?.("track", "Lead", detail);
}

export function QuoteSurvey({ initialService = "" }: { initialService?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(initialService ? 1 : 0);
  const [data, setData] = useState<FormData>({ ...emptyData, service: initialService });
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [started, setStarted] = useState(false);
  const fieldRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const serviceName = useMemo(() => services.find((item) => item.slug === data.service)?.shortName ?? serviceOptions.find((item) => item.slug === data.service)?.name ?? "Cleaning service", [data.service]);
  const progress = ((step + 1) / stepLabels.length) * 100;

  useEffect(() => {
    if (step === 1 || step === 3) fieldRef.current?.focus();
  }, [step]);

  function startForm() {
    if (started) return;
    setStarted(true);
    trackEvent("quote_form_start", { page_url: window.location.href });
  }

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    startForm();
    setData((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function choose(key: "service" | "timing", value: string) {
    update(key, value);
    window.setTimeout(() => setStep((current) => Math.min(current + 1, stepLabels.length - 1)), 160);
  }

  function next() {
    if (step === 1 && data.suburb.trim().length < 2) {
      setError("Please enter the Gold Coast suburb where cleaning is needed.");
      fieldRef.current?.focus();
      return;
    }
    setError("");
    setStep((current) => Math.min(current + 1, stepLabels.length - 1));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!data.name.trim()) { setError("Please enter your name so LAP knows who to contact."); fieldRef.current?.focus(); return; }
    if (data.phone.replace(/\D/g, "").length < 8) { setError("Please enter a valid phone number with at least 8 digits."); phoneRef.current?.focus(); return; }
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) { setError("Please check the email address, or leave it blank."); emailRef.current?.focus(); return; }

    setStatus("submitting");
    setError("");
    const params = new URLSearchParams(window.location.search);
    const payload = {
      ...data,
      clientId: business.clientId,
      pageUrl: window.location.href,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
      utmTerm: params.get("utm_term") ?? "",
      utmContent: params.get("utm_content") ?? "",
    };

    try {
      const response = await fetch("/api/quote", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("request failed");
      trackEvent("quote_form_submit", { service: data.service, suburb: data.suburb });
      router.push(`/thank-you?service=${encodeURIComponent(serviceName)}&suburb=${encodeURIComponent(data.suburb)}`);
    } catch {
      setStatus("idle");
      setError("We could not send your request. Please try again in a moment.");
    }
  }

  return (
    <form className="quote-survey" onSubmit={submit} onFocus={startForm} noValidate>
      <div className="survey-topline">
        <span>Step {step + 1} of {stepLabels.length}</span><span>{stepLabels[step]}</span>
      </div>
      <div className="progress-track" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      <div className="survey-screen" aria-live="polite">
        {step === 0 && (
          <fieldset><legend>What do you need help with?</legend><p>Choose one service. The next question opens automatically.</p>
            <div className="choice-grid service-choice-grid">{serviceOptions.map((service) => <button type="button" key={service.slug} className={data.service === service.slug ? "selected" : ""} onClick={() => choose("service", service.slug)}><strong>{service.name}</strong><span>{service.description}</span></button>)}</div>
          </fieldset>
        )}
        {step === 1 && (
          <fieldset><legend>Where are you located?</legend><p>Start typing your Gold Coast suburb.</p>
            <label htmlFor="quote-suburb">Suburb</label><input ref={fieldRef} id="quote-suburb" name="suburb" value={data.suburb} onChange={(event) => update("suburb", event.target.value)} list="gold-coast-suburbs" autoComplete="address-level2" placeholder="e.g. Southport" aria-describedby={error ? "quote-error" : undefined} />
            <datalist id="gold-coast-suburbs">{suburbs.map((suburb) => <option key={suburb.slug} value={suburb.name} />)}</datalist>
            <button className="button button-primary survey-next" type="button" onClick={next}>Continue to timing <span aria-hidden="true">→</span></button>
          </fieldset>
        )}
        {step === 2 && (
          <fieldset><legend>When do you need it done?</legend><p>This helps LAP understand your timing. Availability is confirmed after enquiry.</p>
            <div className="choice-grid timing-grid">{["As soon as available", "This week", "Just getting a quote"].map((timing) => <button type="button" key={timing} className={data.timing === timing ? "selected" : ""} onClick={() => choose("timing", timing)}><strong>{timing}</strong></button>)}</div>
          </fieldset>
        )}
        {step === 3 && (
          <fieldset><legend>Where should we send your quote?</legend><p>Name and phone are required. Email is optional.</p>
            <div className="contact-fields">
              <label htmlFor="quote-name">Name <span>Required</span></label><input ref={fieldRef} id="quote-name" name="name" value={data.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" placeholder="Your name" />
              <label htmlFor="quote-phone">Phone <span>Required</span></label><input ref={phoneRef} id="quote-phone" name="phone" type="tel" inputMode="tel" value={data.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" placeholder="04xx xxx xxx" aria-describedby={error ? "quote-error" : undefined} />
              <label htmlFor="quote-email">Email <span>Optional</span></label><input ref={emailRef} id="quote-email" name="email" type="email" inputMode="email" value={data.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" placeholder="you@example.com" aria-describedby={error ? "quote-error" : undefined} />
              <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(event) => update("website", event.target.value)} /></label>
            </div>
            <button className="button button-primary survey-submit" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending your request…" : "Get my free quote"}</button>
            <small className="privacy-note">No payment details. Your information is used to respond to this enquiry.</small>
          </fieldset>
        )}
        {error && <p className="form-error" id="quote-error" role="alert">{error}</p>}
      </div>
      {step > 0 && <button className="survey-back" type="button" onClick={() => { setError(""); setStep((current) => current - 1); }}>← Back</button>}
    </form>
  );
}
