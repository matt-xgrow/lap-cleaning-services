"use client";

import type { ReactNode } from "react";

type Props = { href: string; eventName: "phone_tap" | "email_tap"; className?: string; children: ReactNode };

export function TrackedContactLink({ href, eventName, className, children }: Props) {
  function track() {
    const trackedWindow = window as typeof window & { dataLayer?: Record<string, unknown>[]; fbq?: (...args: unknown[]) => void };
    trackedWindow.dataLayer = trackedWindow.dataLayer || [];
    trackedWindow.dataLayer.push({ event: eventName, destination: href, page_url: window.location.href });
    trackedWindow.fbq?.("trackCustom", eventName === "phone_tap" ? "PhoneTap" : "EmailTap", { destination: href });
  }
  return <a className={className} href={href} onClick={track}>{children}</a>;
}
