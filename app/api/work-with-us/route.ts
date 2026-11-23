import { parseCleanerApplication } from "../../../lib/cleaner-application";
import { readWorkWithUsEmailConfig, sendCleanerApplicationEmail } from "../../../lib/work-with-us-email";

// The public quote form stores leads (Cloudflare D1) and can POST them to
// QUOTE_WEBHOOK_URL. It does not send email, so cleaner applications use Resend.
// Recipient and sender come from the environment — do not hardcode an inbox.

const textValue = (input: unknown) => typeof input === "string" ? input.trim() : "";

export async function POST(request: Request) {
  let payload: unknown;
  try { payload = await request.json(); }
  catch { return Response.json({ error: "Invalid request" }, { status: 400 }); }

  const record = typeof payload === "object" && payload !== null ? payload as Record<string, unknown> : {};
  if (textValue(record.website)) return Response.json({ ok: true }, { status: 201 });

  const parsed = parseCleanerApplication(payload);
  if (!parsed.ok) return Response.json({ error: parsed.error, field: parsed.field }, { status: 422 });

  const config = readWorkWithUsEmailConfig();
  if (!config) {
    console.error("Work with us email is not configured. Set WORK_WITH_US_TO_EMAIL, WORK_WITH_US_FROM_EMAIL and RESEND_API_KEY.");
    return Response.json({ error: "Application email is not configured" }, { status: 503 });
  }

  try {
    await sendCleanerApplicationEmail(config, parsed.application);
  } catch (error) {
    console.error("Work with us email delivery failed", error instanceof Error ? error.message : "unknown error");
    return Response.json({ error: "We could not send your application. Please try again in a moment." }, { status: 502 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
