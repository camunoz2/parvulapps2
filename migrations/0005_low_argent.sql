ALTER TABLE `schools` RENAME COLUMN `email_domain` TO `school_address`;--> statement-breakpoint
ALTER TABLE `schools` ADD `admin_name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `schools` ADD `admin_email` text NOT NULL;--> statement-breakpoint
ALTER TABLE `schools` ADD `domain` text NOT NULL;