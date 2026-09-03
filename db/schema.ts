import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const quoteRequests = sqliteTable("quote_requests", {
  id: text("id").primaryKey(),
  service: text("service").notNull(),
  suburb: text("suburb").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull(),
});

export const quoteRequestsV2 = sqliteTable("quote_requests_v2", {
  id: text("id").primaryKey(),
  clientId: text("client_id").notNull(),
  service: text("service").notNull(),
  suburb: text("suburb").notNull(),
  timing: text("timing").notNull(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull().default(""),
  pageUrl: text("page_url").notNull().default(""),
  referrer: text("referrer").notNull().default(""),
  utmSource: text("utm_source").notNull().default(""),
  utmMedium: text("utm_medium").notNull().default(""),
  utmCampaign: text("utm_campaign").notNull().default(""),
  utmTerm: text("utm_term").notNull().default(""),
  utmContent: text("utm_content").notNull().default(""),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull(),
});
