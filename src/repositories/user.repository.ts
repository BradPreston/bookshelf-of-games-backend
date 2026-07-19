import db from '../lib/db';
import { InsertUser, users } from '../lib/db/schema';

export function userRepository() {
  async function create(data: InsertUser) {
    const newUser = await db.insert(users).values(data).returning();
    return newUser;
  }

  return {
    create,
  };
}
