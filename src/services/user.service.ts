import bcrypt from 'bcrypt';
import { InsertUser } from '../lib/db/schema';
import { DuplicateUserError } from '../lib/errors';
import { userRepository } from '../repositories/user.repository';

export function userService() {
  const repo = userRepository();

  async function register(data: Omit<InsertUser, 'password'> & { password: string }) {
    const hashed = await bcrypt.hash(data.password, 10);

    try {
      const [user] = await repo.create({ ...data, password: hashed });
      return user;
    }
    catch (err) {
      if (isUniqueConstraintError(err)) {
        throw new DuplicateUserError('username or email already in use', { cause: err });
      }
      throw err;
    }
  }

  return {
    register,
  };
}

function isUniqueConstraintError(err: unknown): boolean {
  return err instanceof Error && err.message.includes('UNIQUE constraint failed');
}
