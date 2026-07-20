import bcrypt from 'bcrypt';
import { InsertUser } from '../lib/db/schema';
import { DuplicateUserError } from '../lib/errors';
import { userRepository } from '../repositories/user.repository';

export function userService() {
  const repo = userRepository();

  async function register(data: InsertUser) {
    const hashed = await bcrypt.hash(data.password, 10);

    try {
      const user = await repo.create({ ...data, password: hashed });
      return user;
    }
    catch (err) {
      if (isUniqueConstraintError(err)) {
        throw new DuplicateUserError('username or email already in use', { cause: err });
      }
      throw err;
    }
  }

  async function update(data: Partial<InsertUser>, id: number) {
    if (!id) {
      throw new ReferenceError('ID must be present when updating a user');
    }

    const password = data.password && await bcrypt.hash(data.password, 10);

    try {
      const user = await repo.update({ ...data, ...(password && { password }) }, id);
      return user;
    }
    catch (err) {
      if (isUniqueConstraintError(err)) {
        throw new DuplicateUserError('username or email already in use', { cause: err });
      }
      throw err;
    }
  }

  async function getOne(id: number) {
    const [user] = await repo.getOne(id);
    return user;
  }

  async function remove(id: number) {
    await repo.remove(id);
  }

  return {
    register,
    update,
    getOne,
    remove,
  };
}

function isUniqueConstraintError(err: unknown): boolean {
  return err instanceof Error && err.message.includes('UNIQUE constraint failed');
}
