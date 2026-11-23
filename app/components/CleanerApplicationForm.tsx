"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { parseCleanerApplication, type ApplicationField } from "../../lib/cleaner-application";

type FormData = {
  name: string;
  email: string;
  phone: string;
  abn: string;
  availability: string;
  experience: string;
  hasCar: "" | "yes" | "no";
  website: string;
};

const emptyData: FormData = { name: "", email: "", phone: "", abn: "", availability: "", experience: "", hasCar: "", website: "" };

export function CleanerApplicationForm() {
  const [data, setData] = useState<FormData>(emptyData);
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<ApplicationField | "">("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const successRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const abnRef = useRef<HTMLInputElement>(null);
  const availabilityRef = useRef<HTMLTextAreaElement>(null);
  const experienceRef = useRef<HTMLTextAreaElement>(null);
  const carRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((current) => ({ ...current, [key]: value }));
    if (errorField === key) {
      setError("");
      setErrorField("");
    }
  }

  function focusField(field: ApplicationField) {
    const target = { name: nameRef, email: emailRef, phone: phoneRef, abn: abnRef, availability: availabilityRef, experience: experienceRef, hasCar: carRef }[field];
    target.current?.focus();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = parseCleanerApplication(data);
    if (!parsed.ok) {
      setStatus("idle");
      setError(parsed.error);
      setErrorField(parsed.field);
      focusField(parsed.field);
      return;
    }

    setStatus("submitting");
    setError("");
    setErrorField("");

    try {
      const response = await fetch("/api/work-with-us", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await response.json().catch(() => null) as { error?: string; field?: ApplicationField } | null;
      if (!response.ok) {
        const field = body?.field;
        setStatus("idle");
        setError(response.status === 503 ? "We could not send your application yet because email delivery is not set up. Please try again later." : body?.error || "We could not send your application. Please try again in a moment.");
        setErrorField(field ?? "");
        if (field) focusField(field);
        return;
      }
      setStatus("success");
    } catch {
      setStatus("idle");
      setError("We could not send your application. Please try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <div className="application-success" role="status" tabIndex={-1} ref={successRef}>
        <span className="success-mark" aria-hidden="true">✓</span>
        <h2>Application sent.</h2>
        <p>Thank you, {data.name.trim()}. LAP will review your details and contact you using the email or phone number you provided. This form does not confirm a start date.</p>
      </div>
    );
  }

  const describedBy = (field: ApplicationField, hintId?: string) => [hintId, errorField === field ? "application-error" : ""].filter(Boolean).join(" ") || undefined;

  return (
    <form className="application-form" onSubmit={submit} noValidate>
      <h2>Tell LAP about your cleaning work.</h2>
      <p>All fields are required. ABN is checked as 11 digits only.</p>
      <div className="field">
        <label htmlFor="application-name">Name <span>Required</span></label>
        <input ref={nameRef} id="application-name" name="name" value={data.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" required aria-invalid={errorField === "name" || undefined} aria-describedby={describedBy("name")} />
      </div>
      <div className="field">
        <label htmlFor="application-email">Email <span>Required</span></label>
        <input ref={emailRef} id="application-email" name="email" type="email" inputMode="email" value={data.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" required aria-invalid={errorField === "email" || undefined} aria-describedby={describedBy("email")} />
      </div>
      <div className="field">
        <label htmlFor="application-phone">Phone <span>Required</span></label>
        <input ref={phoneRef} id="application-phone" name="phone" type="tel" inputMode="tel" value={data.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" placeholder="04xx xxx xxx" required aria-invalid={errorField === "phone" || undefined} aria-describedby={describedBy("phone")} />
      </div>
      <div className="field">
        <label htmlFor="application-abn">ABN <span>Required</span></label>
        <input ref={abnRef} id="application-abn" name="abn" inputMode="numeric" value={data.abn} onChange={(event) => update("abn", event.target.value)} autoComplete="off" placeholder="12 345 678 901" maxLength={20} required aria-invalid={errorField === "abn" || undefined} aria-describedby={describedBy("abn", "application-abn-hint")} />
        <p className="field-hint" id="application-abn-hint">11 digits. Spaces are optional.</p>
      </div>
      <div className="field">
        <label htmlFor="application-availability">Availability <span>Required</span></label>
        <textarea ref={availabilityRef} id="application-availability" name="availability" value={data.availability} onChange={(event) => update("availability", event.target.value)} rows={4} required aria-invalid={errorField === "availability" || undefined} aria-describedby={describedBy("availability")} placeholder="Days, times and suburbs you can travel to" />
      </div>
      <div className="field">
        <label htmlFor="application-experience">Experience <span>Required</span></label>
        <textarea ref={experienceRef} id="application-experience" name="experience" value={data.experience} onChange={(event) => update("experience", event.target.value)} rows={5} required aria-invalid={errorField === "experience" || undefined} aria-describedby={describedBy("experience")} placeholder="Types of cleaning you have done, and for how long" />
      </div>
      <fieldset aria-invalid={errorField === "hasCar" || undefined} aria-describedby={describedBy("hasCar")}>
        <legend>Do you have a car? <span>Required</span></legend>
        <div className="car-choices">
          <label htmlFor="application-car-yes"><input ref={carRef} id="application-car-yes" type="radio" name="hasCar" value="yes" checked={data.hasCar === "yes"} onChange={() => update("hasCar", "yes")} required /> Yes</label>
          <label htmlFor="application-car-no"><input id="application-car-no" type="radio" name="hasCar" value="no" checked={data.hasCar === "no"} onChange={() => update("hasCar", "no")} /> No</label>
        </div>
      </fieldset>
      <label className="honeypot" aria-hidden="true">Company website<input name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(event) => update("website", event.target.value)} /></label>
      {error && <p className="form-error" id="application-error" role="alert">{error}</p>}
      <button className="button button-primary survey-submit" type="submit" disabled={status === "submitting"} aria-busy={status === "submitting"}>{status === "submitting" ? "Sending your application…" : "Send application"}</button>
      <small className="privacy-note">Your details are emailed to LAP to review this application. No payment information is collected.</small>
    </form>
  );
}
