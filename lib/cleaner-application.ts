export const applicationFields = ["name", "email", "phone", "abn", "availability", "experience", "hasCar"] as const;

export type ApplicationField = (typeof applicationFields)[number];

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

export function parseCleanerApplication(input: unknown): ApplicationParseResult {
  const record = typeof input === "object" && input !== null && !Array.isArray(input) ? input as Record<string, unknown> : {};
  const name = clean(record.name);
  const email = clean(record.email).toLowerCase();
  const phone = clean(record.phone);
  const abnSource = clean(record.abn);
  const abnDigits = abnSource.replace(/\D/g, "");
  const availability = clean(record.availability);
  const experience = clean(record.experience);
  const hasCar = clean(record.hasCar).toLowerCase();

  if (!name) return { ok: false, field: "name", error: "Please enter your name." };
  if (name.length > limits.name) return { ok: false, field: "name", error: "Please enter a shorter name." };
  if (!isEmailAddress(email)) return { ok: false, field: "email", error: "Please enter a valid email address." };
  const phoneDigits = phone.replace(/\D/g, "");
  if (phone.length > limits.phone || phoneDigits.length < 8 || phoneDigits.length > 15) return { ok: false, field: "phone", error: "Please enter a phone number with 8 to 15 digits." };
  if (abnDigits.length !== 11 || abnSource.length > 20) return { ok: false, field: "abn", error: "Please enter an 11-digit ABN. Spaces are fine." };
  if (!availability) return { ok: false, field: "availability", error: "Please tell us when you are available." };
  if (availability.length > limits.availability) return { ok: false, field: "availability", error: "Please shorten your availability so it fits in the email." };
  if (!experience) return { ok: false, field: "experience", error: "Please tell us about your cleaning experience." };
  if (experience.length > limits.experience) return { ok: false, field: "experience", error: "Please shorten your experience so it fits in the email." };
  if (hasCar !== "yes" && hasCar !== "no") return { ok: false, field: "hasCar", error: "Please tell us whether you have a car." };

  return { ok: true, application: { name, email, phone, abn: abnDigits, availability, experience, hasCar } };
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
