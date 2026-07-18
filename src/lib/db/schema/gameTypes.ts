import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const gameTypes = sqliteTable('game_types', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
});
