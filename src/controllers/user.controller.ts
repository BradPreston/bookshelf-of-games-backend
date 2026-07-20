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

  async function update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await service.update(req.body, Number(req.params.id));
      res.status(200).json(user);
    }
    catch (err) {
      if (err instanceof DuplicateUserError) {
        return res.status(409).json({ error: err.message });
      }
      next(err);
    }
  }

  async function getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await service.getOne(Number(req.params.id));
      res.status(200).json(user);
    }
    catch (err) {
      next(err);
    }
  }

  async function remove(req: Request, res: Response, next: NextFunction) {
    try {
      await service.remove(Number(req.params.id));
      res.status(204).end();
    }
    catch (err) {
      next(err);
    }
  }

  return { register, update, getOne, remove };
}
