CREATE TABLE `courses` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cores` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`scope_id` integer NOT NULL,
	FOREIGN KEY (`scope_id`) REFERENCES `scopes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `indicators` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`is_active` integer,
	`objective_id` integer NOT NULL,
	FOREIGN KEY (`objective_id`) REFERENCES `objectives`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `levels` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `objectives` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`is_active` integer,
	`core_id` integer NOT NULL,
	`level_id` integer NOT NULL,
	FOREIGN KEY (`core_id`) REFERENCES `cores`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`level_id`) REFERENCES `levels`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `scopes` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `grades` (
	`id` integer PRIMARY KEY NOT NULL,
	`grade` integer NOT NULL,
	`period_id` integer NOT NULL,
	`student_id` integer NOT NULL,
	`indicator_id` integer NOT NULL,
	FOREIGN KEY (`period_id`) REFERENCES `periods`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`indicator_id`) REFERENCES `indicators`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `periods` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `schools` (
	`id` integer PRIMARY KEY NOT NULL,
	`school_name` text NOT NULL,
	`school_address` text NOT NULL,
	`admin_name` text NOT NULL,
	`admin_email` text NOT NULL,
	`domain` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `students` (
	`id` integer PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`age` integer NOT NULL,
	`course_id` integer NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action
);
