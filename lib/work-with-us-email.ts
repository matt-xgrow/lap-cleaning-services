import { applicationMessage, isEmailAddress, type CleanerApplication } from "./cleaner-application";

export type WorkWithUsEmailConfig = {
  to: string;
  from: string;
  apiKey: string;
};

const fromAddress = (value: string) => {
  const wrapped = value.match(/<([^<>]+)>\s*$/)?.[1] ?? value;
  return wrapped.trim();
};

export function readWorkWithUsEmailConfig(env: NodeJS.ProcessEnv = process.env): WorkWithUsEmailConfig | null {
  const to = env.WORK_WITH_US_TO_EMAIL?.trim() ?? "";
  const from = env.WORK_WITH_US_FROM_EMAIL?.trim() ?? "";
  const apiKey = env.RESEND_API_KEY?.trim() ?? "";
  if (!apiKey || /[\r\n]/.test(to) || /[\r\n]/.test(from) || !isEmailAddress(to) || !isEmailAddress(fromAddress(from))) return null;
  return { to, from, apiKey };
}

export async function sendCleanerApplicationEmail(config: WorkWithUsEmailConfig, application: CleanerApplication, fetchImpl: typeof fetch = fetch) {
  const message = applicationMessage(application);
  const response = await fetchImpl("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: message.replyTo,
      subject: message.subject,
      text: message.text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend rejected the application email (${response.status})`);
  }
}
