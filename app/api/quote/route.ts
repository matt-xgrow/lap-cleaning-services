type RuntimeEnv = { DB?: D1Database };

async function getRuntimeEnv(): Promise<RuntimeEnv> {
  try {
    // Keep the Cloudflare-only module out of the Vercel bundle while retaining
    // D1 support in the Sites/Workers deployment.
    const load = new Function("return import('cloudflare:workers')") as () => Promise<{ env?: RuntimeEnv }>;
    return (await load()).env ?? {};
  } catch {
    return {};
  }
}

type QuotePayload = Partial<Record<"clientId" | "service" | "suburb" | "timing" | "name" | "phone" | "email" | "website" | "pageUrl" | "referrer" | "timestamp" | "utmSource" | "utmMedium" | "utmCampaign" | "utmTerm" | "utmContent", string>>;

const createTableSql = `CREATE TABLE IF NOT EXISTS quote_requests_v2 (
  id TEXT PRIMARY KEY NOT NULL,
  client_id TEXT NOT NULL,
  service TEXT NOT NULL,
  suburb TEXT NOT NULL,
  timing TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT DEFAULT '' NOT NULL,
  page_url TEXT DEFAULT '' NOT NULL,
  referrer TEXT DEFAULT '' NOT NULL,
  utm_source TEXT DEFAULT '' NOT NULL,
  utm_medium TEXT DEFAULT '' NOT NULL,
  utm_campaign TEXT DEFAULT '' NOT NULL,
  utm_term TEXT DEFAULT '' NOT NULL,
  utm_content TEXT DEFAULT '' NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL,
  created_at TEXT NOT NULL
)`;

const createIndexSql = `CREATE INDEX IF NOT EXISTS idx_quote_requests_v2_status_created_at
ON quote_requests_v2 (status, created_at)`;

const value = (input: unknown, max = 300) => typeof input === "string" ? input.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let payload: QuotePayload;
  try { payload = await request.json(); }
  catch { return Response.json({ error: "Invalid request" }, { status: 400 }); }

  if (payload.website) return Response.json({ ok: true }, { status: 201 });

  const lead = {
    clientId: "lap-cleaning-services-gold-coast",
    service: value(payload.service, 100),
    suburb: value(payload.suburb, 100),
    timing: value(payload.timing, 100),
    name: value(payload.name, 120),
    phone: value(payload.phone, 40),
    email: value(payload.email, 160).toLowerCase(),
    pageUrl: value(payload.pageUrl, 600),
    referrer: value(payload.referrer, 600),
    utmSource: value(payload.utmSource, 180),
    utmMedium: value(payload.utmMedium, 180),
    utmCampaign: value(payload.utmCampaign, 180),
    utmTerm: value(payload.utmTerm, 180),
    utmContent: value(payload.utmContent, 180),
    createdAt: new Date().toISOString(),
  };

  const valid = lead.service && lead.suburb && lead.timing && lead.name && lead.phone.replace(/\D/g, "").length >= 8 && (!lead.email || /^\S+@\S+\.\S+$/.test(lead.email));
  if (!valid) return Response.json({ error: "Please check the required details" }, { status: 422 });

  const webhookUrl = process.env.QUOTE_WEBHOOK_URL?.trim();
  const database = (await getRuntimeEnv()).DB;
  if (database) {
    await database.batch([database.prepare(createTableSql), database.prepare(createIndexSql)]);
    await database.prepare(`INSERT INTO quote_requests_v2 (
      id, client_id, service, suburb, timing, name, phone, email, page_url, referrer,
      utm_source, utm_medium, utm_campaign, utm_term, utm_content, status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)`)
      .bind(crypto.randomUUID(), lead.clientId, lead.service, lead.suburb, lead.timing, lead.name, lead.phone, lead.email, lead.pageUrl, lead.referrer, lead.utmSource, lead.utmMedium, lead.utmCampaign, lead.utmTerm, lead.utmContent, lead.createdAt)
      .run();
  }

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...lead, clientIdentifier: lead.clientId }) });
    } catch (error) {
      console.error("Quote webhook delivery failed", error);
    }
  }

  if (!database && !webhookUrl) return Response.json({ error: "Quote storage is not configured" }, { status: 503 });

  return Response.json({ ok: true }, { status: 201 });
}
