CREATE TABLE `game_types` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL UNIQUE
);
--> statement-breakpoint
ALTER TABLE `games` ADD `game_type_id` integer NOT NULL REFERENCES game_types(id);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_rounds` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`game_id` integer NOT NULL,
	`round` integer NOT NULL,
	CONSTRAINT `fk_rounds_game_id_games_id_fk` FOREIGN KEY (`game_id`) REFERENCES `games`(`id`)
);
--> statement-breakpoint
INSERT INTO `__new_rounds`(`id`, `game_id`, `round`) SELECT `id`, `game_id`, `round` FROM `rounds`;--> statement-breakpoint
DROP TABLE `rounds`;--> statement-breakpoint
ALTER TABLE `__new_rounds` RENAME TO `rounds`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_scores` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer NOT NULL,
	`round_id` integer NOT NULL,
	`score` integer NOT NULL,
	`phase` integer,
	`made_phase` integer,
	CONSTRAINT `fk_scores_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
	CONSTRAINT `fk_scores_round_id_rounds_id_fk` FOREIGN KEY (`round_id`) REFERENCES `rounds`(`id`)
);
--> statement-breakpoint
INSERT INTO `__new_scores`(`id`, `user_id`, `round_id`, `score`, `phase`, `made_phase`) SELECT `id`, `user_id`, `round_id`, `score`, `phase`, `made_phase` FROM `scores`;--> statement-breakpoint
DROP TABLE `scores`;--> statement-breakpoint
ALTER TABLE `__new_scores` RENAME TO `scores`;--> statement-breakpoint
PRAGMA foreign_keys=ON;