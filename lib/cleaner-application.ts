export const applicationFields = ["name", "email", "phone", "abn", "availability", "experience", "hasCar"] as const;

export type ApplicationField = (typeof applicationFields)[number];

export const applicationSteps = [
  { title: "Your details", description: "How should LAP reach you?", fields: ["name", "email", "phone"] },
  { title: "ABN and car", description: "ABN is checked as 11 digits. Spaces are fine.", fields: ["abn", "hasCar"] },
  { title: "Availability", description: "Tell LAP when you can work, and what cleaning you have done.", fields: ["availability", "experience"] },
] as const satisfies readonly { title: string; description: string; fields: readonly ApplicationField[] }[];

export type CleanerApplication = {
  name: string;
  email: string;
  phone: string;
  abn: string;
  availability: string;
  experience: string;
  hasCar: "yes" | "no";
};

export type ApplicationParseResult =
  | { ok: true; application: CleanerApplication }
  | { ok: false; error: string; field: ApplicationField };

const limits = { name: 120, email: 160, phone: 40, availability: 800, experience: 4000 };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (input: unknown) => (typeof input === "string" ? input.replace(/\u0000/g, "").trim() : "");

export const isEmailAddress = (value: string) => value.length <= limits.email && emailPattern.test(value) && !/[\r\n]/.test(value);

const formatAbn = (digits: string) => `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;

const singleLine = (value: string, max: number) => value.replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);

const asRecord = (input: unknown) => typeof input === "object" && input !== null && !Array.isArray(input) ? input as Record<string, unknown> : {};

function fieldError(field: ApplicationField, record: Record<string, unknown>) {
  if (field === "name") {
    const name = clean(record.name);
    if (!name) return "Please enter your name.";
    if (name.length > limits.name) return "Please enter a shorter name.";
  }
  if (field === "email" && !isEmailAddress(clean(record.email).toLowerCase())) return "Please enter a valid email address.";
  if (field === "phone") {
    const phone = clean(record.phone);
    const phoneDigits = phone.replace(/\D/g, "");
    if (phone.length > limits.phone || phoneDigits.length < 8 || phoneDigits.length > 15) return "Please enter a phone number with 8 to 15 digits.";
  }
  if (field === "abn") {
    const abnSource = clean(record.abn);
    if (abnSource.replace(/\D/g, "").length !== 11 || abnSource.length > 20) return "Please enter an 11-digit ABN. Spaces are fine.";
  }
  if (field === "availability") {
    const availability = clean(record.availability);
    if (!availability) return "Please tell us when you are available.";
    if (availability.length > limits.availability) return "Please shorten your availability so it fits in the email.";
  }
  if (field === "experience") {
    const experience = clean(record.experience);
    if (!experience) return "Please tell us about your cleaning experience.";
    if (experience.length > limits.experience) return "Please shorten your experience so it fits in the email.";
  }
  if (field === "hasCar" && clean(record.hasCar).toLowerCase() !== "yes" && clean(record.hasCar).toLowerCase() !== "no") return "Please tell us whether you have a car.";
  return "";
}

export function applicationStepForField(field: ApplicationField) {
  const index = applicationSteps.findIndex((step) => (step.fields as readonly ApplicationField[]).includes(field));
  return index === -1 ? 0 : index;
}

export function validateApplicationStep(input: unknown, step: number): { ok: true } | { ok: false; error: string; field: ApplicationField } {
  const record = asRecord(input);
  for (const field of applicationSteps[step]?.fields ?? []) {
    const error = fieldError(field, record);
    if (error) return { ok: false, error, field };
  }
  return { ok: true };
}

export function parseCleanerApplication(input: unknown): ApplicationParseResult {
  const record = asRecord(input);
  for (const field of applicationFields) {
    const error = fieldError(field, record);
    if (error) return { ok: false, error, field };
  }

  const hasCar = clean(record.hasCar).toLowerCase();
  return {
    ok: true,
    application: {
      name: clean(record.name),
      email: clean(record.email).toLowerCase(),
      phone: clean(record.phone),
      abn: clean(record.abn).replace(/\D/g, ""),
      availability: clean(record.availability),
      experience: clean(record.experience),
      hasCar: hasCar === "yes" ? "yes" : "no",
    },
  };
}

export function applicationMessage(application: CleanerApplication) {
  const subject = `New cleaner application - ${singleLine(application.name, 80)}`;
  const text = [
    "New cleaner application for LAP Cleaning Services",
    "",
    `Name: ${application.name}`,
    `Email: ${application.email}`,
    `Phone: ${application.phone}`,
    `ABN: ${formatAbn(application.abn)}`,
    `Do you have a car?: ${application.hasCar === "yes" ? "Yes" : "No"}`,
    "",
    "Availability:",
    application.availability,
    "",
    "Experience:",
    application.experience,
    "",
    "Sent from the Work with us form on the LAP Cleaning Services website.",
  ].join("\n");

  return { subject, text, replyTo: application.email };
}
