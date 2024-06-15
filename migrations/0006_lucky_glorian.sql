CREATE TABLE `ambito` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `indicador` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`is_active` integer
);
--> statement-breakpoint
CREATE TABLE `nucleo` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `objetivo` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`is_active` integer
);
--> statement-breakpoint
CREATE TABLE `grade` (
	`id` integer PRIMARY KEY NOT NULL,
	`period` integer NOT NULL,
	`grade` integer NOT NULL
);
