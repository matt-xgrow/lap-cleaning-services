CREATE TABLE IF NOT EXISTS `quote_requests_v2` (
	`id` text PRIMARY KEY NOT NULL,
	`client_id` text NOT NULL,
	`service` text NOT NULL,
	`suburb` text NOT NULL,
	`timing` text NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text DEFAULT '' NOT NULL,
	`page_url` text DEFAULT '' NOT NULL,
	`referrer` text DEFAULT '' NOT NULL,
	`utm_source` text DEFAULT '' NOT NULL,
	`utm_medium` text DEFAULT '' NOT NULL,
	`utm_campaign` text DEFAULT '' NOT NULL,
	`utm_term` text DEFAULT '' NOT NULL,
	`utm_content` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text NOT NULL
);
CREATE INDEX IF NOT EXISTS `idx_quote_requests_v2_status_created_at`
ON `quote_requests_v2` (`status`, `created_at`);
