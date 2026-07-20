import { eq, getColumns } from 'drizzle-orm';
import db from '../lib/db';
import { InsertUser, users } from '../lib/db/schema';

export function userRepository() {
  async function create(data: InsertUser) {
    const [insertedUser] = await db.insert(users).values(data).returning();
    const { password, ...user } = insertedUser;
    return user;
  }

  async function update(data: Partial<InsertUser>, userId: number) {
    const { id, ...insertUser } = data;
    const [updatedUser] = await db.update(users).set(insertUser).where(eq(users.id, userId)).returning();
    const { password, ...user } = updatedUser;
    return user;
  }

  async function getOne(id: number) {
    const { password, ...userData } = getColumns(users);
    const user = await db.select(userData).from(users).where(eq(users.id, id));
    return user;
  }

  async function remove(id: number) {
    await db.delete(users).where(eq(users.id, id));
  }

  return {
    create,
    update,
    getOne,
    remove,
  };
}
