import { games } from './games';
import { gameTypes } from './gameTypes';
import { rounds } from './rounds';
import { scores } from './scores';
import { users } from './users';

// Export schema types
export { games } from './games';
export { gameTypes } from './gameTypes';
export { relations } from './relations';
export { rounds } from './rounds';
export { scores } from './scores';
export { users } from './users';

// Export select schema
export type SelectGame = typeof games.$inferSelect;
export type SelectGameType = typeof gameTypes.$inferSelect;
export type SelectRound = typeof rounds.$inferSelect;
export type SelectScore = typeof scores.$inferSelect;
export type SelectUser = typeof users.$inferSelect;

// Export insert schema
export type InsertGame = typeof games.$inferInsert;
export type InsertGameType = typeof gameTypes.$inferInsert;
export type InsertRound = typeof rounds.$inferInsert;
export type InsertScore = typeof scores.$inferInsert;
export type InsertUser = typeof users.$inferInsert;
