import { NextFunction, Request, Response } from 'express';
import { DuplicateUserError } from '../lib/errors';
import { userService } from '../services/user.service';

export function userController() {
  const service = userService();

  async function register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await service.register(req.body);
      res.status(201).json(user);
    }
    catch (err) {
      if (err instanceof DuplicateUserError) {
        return res.status(409).json({ error: err.message });
      }
      next(err);
    }
  }

  return { register };
}
