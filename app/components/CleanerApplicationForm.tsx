"use client";

import { FormEvent, KeyboardEvent, TouchEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { applicationStepForField, applicationSteps, parseCleanerApplication, validateApplicationStep, type ApplicationField } from "../../lib/cleaner-application";

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
const lastStep = applicationSteps.length - 1;

export function CleanerApplicationForm() {
  const [data, setData] = useState<FormData>(emptyData);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<ApplicationField | "">("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [panelHeight, setPanelHeight] = useState<number>();
  const successRef = useRef<HTMLDivElement>(null);
  const previousStep = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const headingRefs = useRef<Array<HTMLHeadingElement | null>>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const abnRef = useRef<HTMLInputElement>(null);
  const availabilityRef = useRef<HTMLTextAreaElement>(null);
  const experienceRef = useRef<HTMLTextAreaElement>(null);
  const carRef = useRef<HTMLInputElement>(null);

  function focusField(field: ApplicationField) {
    const target = { name: nameRef, email: emailRef, phone: phoneRef, abn: abnRef, availability: availabilityRef, experience: experienceRef, hasCar: carRef }[field];
    target.current?.focus({ preventScroll: true });
  }

  useLayoutEffect(() => {
    const panel = panelRefs.current[step];
    if (!panel || status === "success") return;
    const measure = () => setPanelHeight(panel.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    return () => observer.disconnect();
  }, [step, status, error]);

  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus({ preventScroll: true });
      return;
    }
    if (previousStep.current === step) return;
    previousStep.current = step;
    if (errorField) focusField(errorField);
    else headingRefs.current[step]?.focus({ preventScroll: true });
  }, [step, status, errorField]);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((current) => ({ ...current, [key]: value }));
    if (errorField === key) {
      setError("");
      setErrorField("");
    }
  }

  function goTo(nextStep: number) {
    setError("");
    setErrorField("");
    setStep(nextStep);
  }

  function advance() {
    const result = validateApplicationStep(data, step);
    if (!result.ok) {
      setError(result.error);
      setErrorField(result.field);
      focusField(result.field);
      return;
    }
    setError("");
    setErrorField("");
    setStep((current) => Math.min(current + 1, lastStep));
  }

  function showFieldError(field: ApplicationField, message: string) {
    const targetStep = applicationStepForField(field);
    setStatus("idle");
    setError(message);
    setErrorField(field);
    if (targetStep === step) focusField(field);
    else setStep(targetStep);
  }

  async function send() {
    const parsed = parseCleanerApplication(data);
    if (!parsed.ok) {
      showFieldError(parsed.field, parsed.error);
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
        if (body?.field) showFieldError(body.field, body.error || "Please check this step.");
        else {
          setStatus("idle");
          setError(response.status === 503 ? "We could not send your application yet because email delivery is not set up. Please try again later." : body?.error || "We could not send your application. Please try again in a moment.");
        }
        return;
      }
      setStatus("success");
    } catch {
      setStatus("idle");
      setError("We could not send your application. Please try again in a moment.");
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < lastStep) advance();
    else void send();
  }

  function onKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
    const target = event.target;
    if (!(target instanceof HTMLElement) || target.tagName === "TEXTAREA") return;
    if (step < lastStep) {
      event.preventDefault();
      advance();
    }
  }

  function onTouchStart(event: TouchEvent<HTMLDivElement>) {
    const target = event.target;
    if (target instanceof HTMLElement && target.closest("input, textarea, button, a, label")) return;
    const touch = event.changedTouches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  }

  function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || status === "submitting") return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) advance();
    else if (step > 0) goTo(step - 1);
  }

  if (status === "success") {
    return (
      <div className="application-success" role="status" tabIndex={-1} ref={successRef}>
        <span className="success-mark" aria-hidden="true">✓</span>
        <h3>Application sent.</h3>
        <p>Thank you, {data.name.trim()}. LAP will review your details and contact you using the email or phone number you provided. This form does not confirm a start date.</p>
      </div>
    );
  }

  const describedBy = (field: ApplicationField, hintId?: string) => [hintId, errorField === field ? "application-error" : ""].filter(Boolean).join(" ") || undefined;
  const current = applicationSteps[step];

  return (
    <form className="application-form" onSubmit={submit} onKeyDown={onKeyDown} noValidate>
      <div className="application-progress">
        <p className="application-step-count" aria-live="polite">Step {step + 1} of {applicationSteps.length}<span>{current.title}</span></p>
        <div className="application-dots" aria-hidden="true">
          {applicationSteps.map((item, index) => index < step ? (
            <button type="button" key={item.title} className="application-dot done" tabIndex={-1} onClick={() => goTo(index)}><span /></button>
          ) : (
            <span key={item.title} className={index === step ? "application-dot current" : "application-dot"}><span /></span>
          ))}
        </div>
      </div>
      <div className="application-window" style={panelHeight ? { height: panelHeight } : undefined} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="application-track" style={{ "--step": step, "--steps": applicationSteps.length } as React.CSSProperties}>
          <div className="application-step" ref={(node) => { panelRefs.current[0] = node; }} inert={step !== 0} aria-hidden={step !== 0}>
            <h3 tabIndex={-1} ref={(node) => { headingRefs.current[0] = node; }}>{applicationSteps[0].title}</h3>
            <p>{applicationSteps[0].description}</p>
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
            {step === 0 && error && <p className="form-error" id="application-error" role="alert">{error}</p>}
            <div className="application-actions"><button className="button button-primary" type="button" onClick={advance}>Next</button></div>
          </div>
          <div className="application-step" ref={(node) => { panelRefs.current[1] = node; }} inert={step !== 1} aria-hidden={step !== 1}>
            <h3 tabIndex={-1} ref={(node) => { headingRefs.current[1] = node; }}>{applicationSteps[1].title}</h3>
            <p>{applicationSteps[1].description}</p>
            <div className="field">
              <label htmlFor="application-abn">ABN <span>Required</span></label>
              <input ref={abnRef} id="application-abn" name="abn" inputMode="numeric" value={data.abn} onChange={(event) => update("abn", event.target.value)} autoComplete="off" placeholder="12 345 678 901" maxLength={20} required aria-invalid={errorField === "abn" || undefined} aria-describedby={describedBy("abn", "application-abn-hint")} />
              <p className="field-hint" id="application-abn-hint">11 digits. Spaces are optional.</p>
            </div>
            <fieldset aria-invalid={errorField === "hasCar" || undefined} aria-describedby={describedBy("hasCar")}>
              <legend>Do you have a car? <span>Required</span></legend>
              <div className="car-choices">
                <label htmlFor="application-car-yes"><input ref={carRef} id="application-car-yes" type="radio" name="hasCar" value="yes" checked={data.hasCar === "yes"} onChange={() => update("hasCar", "yes")} required /> Yes</label>
                <label htmlFor="application-car-no"><input id="application-car-no" type="radio" name="hasCar" value="no" checked={data.hasCar === "no"} onChange={() => update("hasCar", "no")} /> No</label>
              </div>
            </fieldset>
            {step === 1 && error && <p className="form-error" id="application-error" role="alert">{error}</p>}
            <div className="application-actions">
              <button className="button button-quiet" type="button" onClick={() => goTo(0)}>Back</button>
              <button className="button button-primary" type="button" onClick={advance}>Next</button>
            </div>
          </div>
          <div className="application-step" ref={(node) => { panelRefs.current[2] = node; }} inert={step !== 2} aria-hidden={step !== 2}>
            <h3 tabIndex={-1} ref={(node) => { headingRefs.current[2] = node; }}>{applicationSteps[2].title}</h3>
            <p>{applicationSteps[2].description}</p>
            <div className="field">
              <label htmlFor="application-availability">Availability <span>Required</span></label>
              <textarea ref={availabilityRef} id="application-availability" name="availability" value={data.availability} onChange={(event) => update("availability", event.target.value)} rows={4} required aria-invalid={errorField === "availability" || undefined} aria-describedby={describedBy("availability")} placeholder="Days, times and suburbs you can travel to" />
            </div>
            <div className="field">
              <label htmlFor="application-experience">Experience <span>Required</span></label>
              <textarea ref={experienceRef} id="application-experience" name="experience" value={data.experience} onChange={(event) => update("experience", event.target.value)} rows={5} required aria-invalid={errorField === "experience" || undefined} aria-describedby={describedBy("experience")} placeholder="Types of cleaning you have done, and for how long" />
            </div>
            {step === 2 && error && <p className="form-error" id="application-error" role="alert">{error}</p>}
            <div className="application-actions">
              <button className="button button-quiet" type="button" onClick={() => goTo(1)}>Back</button>
              <button className="button button-primary" type="submit" disabled={status === "submitting"} aria-busy={status === "submitting"}>{status === "submitting" ? "Sending your application…" : "Send application"}</button>
            </div>
          </div>
        </div>
      </div>
      <label className="honeypot" aria-hidden="true">Company website<input name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(event) => update("website", event.target.value)} /></label>
      <small className="privacy-note">Your details are emailed to LAP to review this application. No payment information is collected.</small>
    </form>
  );
}
