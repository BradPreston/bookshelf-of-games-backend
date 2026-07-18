import { int, sqliteTable } from 'drizzle-orm/sqlite-core';
import { rounds } from './rounds';
import { users } from './users';

export const scores = sqliteTable('scores', {
  id: int('id').primaryKey({ autoIncrement: true }),
  userId: int('user_id').references(() => users.id),
  roundId: int('round_id').references(() => rounds.id),
  score: int('score').notNull(),
  phase: int('phase'),
  madePhase: int('made_phase', { mode: 'boolean' }),
});
