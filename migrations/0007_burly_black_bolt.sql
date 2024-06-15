CREATE TABLE `niveles` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `ambito` RENAME TO `ambitos`;--> statement-breakpoint
ALTER TABLE `indicador` RENAME TO `indicadores`;--> statement-breakpoint
ALTER TABLE `nucleo` RENAME TO `nucleos`;--> statement-breakpoint
ALTER TABLE `objetivo` RENAME TO `objetivos`;--> statement-breakpoint
ALTER TABLE `indicadores` ADD `objetivo_id` integer NOT NULL REFERENCES objetivos(id);--> statement-breakpoint
ALTER TABLE `nucleos` ADD `ambito_id` integer NOT NULL REFERENCES ambitos(id);--> statement-breakpoint
ALTER TABLE `objetivos` ADD `nucleo_id` integer NOT NULL REFERENCES nucleos(id);--> statement-breakpoint
ALTER TABLE `objetivos` ADD `niveles_id` integer NOT NULL REFERENCES niveles(id);--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/