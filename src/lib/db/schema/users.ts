import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: int('id').primaryKey({ autoIncrement: true }),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  lastLoggedIn: int('last_logged_in', { mode: 'timestamp' }),
  createdAt: int('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: int('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
