import { int, sqliteTable } from 'drizzle-orm/sqlite-core';

export const games = sqliteTable('games', {
  id: int('id').primaryKey({ autoIncrement: true }),
});
