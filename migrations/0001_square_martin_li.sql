CREATE TABLE `students` (
	`id` integer PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`second_name` text NOT NULL,
	`course_id` integer NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action
);
