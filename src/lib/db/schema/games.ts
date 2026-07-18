import { int, sqliteTable } from 'drizzle-orm/sqlite-core';
import { gameTypes } from './gameTypes';

export const games = sqliteTable('games', {
  id: int('id').primaryKey({ autoIncrement: true }),
  gameTypeId: int('game_type_id').notNull().references(() => gameTypes.id),
});
