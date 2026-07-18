CREATE TABLE `games` (
	`id` integer PRIMARY KEY AUTOINCREMENT
);
--> statement-breakpoint
CREATE TABLE `rounds` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`game_id` integer,
	`round` integer NOT NULL,
	CONSTRAINT `fk_rounds_game_id_games_id_fk` FOREIGN KEY (`game_id`) REFERENCES `games`(`id`)
);
--> statement-breakpoint
CREATE TABLE `scores` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer,
	`round_id` integer,
	`score` integer NOT NULL,
	`phase` integer,
	`made_phase` integer,
	CONSTRAINT `fk_scores_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
	CONSTRAINT `fk_scores_round_id_rounds_id_fk` FOREIGN KEY (`round_id`) REFERENCES `rounds`(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`username` text NOT NULL UNIQUE,
	`email` text NOT NULL UNIQUE,
	`password` text NOT NULL,
	`last_logged_in` integer,
	`created_at` integer,
	`updated_at` integer
);
