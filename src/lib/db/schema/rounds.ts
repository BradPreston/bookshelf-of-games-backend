import { int, sqliteTable } from 'drizzle-orm/sqlite-core';
import { games } from './games';

export const rounds = sqliteTable('rounds', {
  id: int('id').primaryKey({ autoIncrement: true }),
  gameId: int('game_id').references(() => games.id),
  round: int('round').notNull(),
});
