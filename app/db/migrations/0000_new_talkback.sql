CREATE TABLE `contacts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`first_name` text,
	`last_name` text,
	`linkedin_profile` text,
	`avatar_url` text,
	`notes` text,
	`favorite` integer,
	`created_on` integer NOT NULL,
	`updated_on` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contacts_uuid_unique` ON `contacts` (`uuid`);