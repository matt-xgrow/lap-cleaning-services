CREATE TABLE IF NOT EXISTS `quote_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`service` text NOT NULL,
	`suburb` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text NOT NULL
);
