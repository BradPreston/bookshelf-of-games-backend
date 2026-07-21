import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import * as z from 'zod';
import { insertUserSchema, updateUserSchema } from '../lib/db/schema';
import { DuplicateUserError } from '../lib/errors';
import { userService } from '../services/user.service';

export function userController() {
  const service = userService();

  async function register(req: Request<ParamsDictionary, unknown, unknown>, res: Response, next: NextFunction) {
    const parsed = insertUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: z.flattenError(parsed.error) });
    }

    try {
      const user = await service.register(parsed.data);
      res.status(201).json(user);
    }
    catch (err) {
      if (err instanceof DuplicateUserError) {
        return res.status(409).json({ error: err.message });
      }
      next(err);
    }
  }

  async function update(req: Request<ParamsDictionary, unknown, unknown>, res: Response, next: NextFunction) {
    const parsed = updateUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: z.flattenError(parsed.error) });
    }

    try {
      const user = await service.getOne(Number(req.params.id));

      if (!user) {
        res.status(404).json({ error: `No user found with id "${req.params.id}"` });
        return;
      }

      const updatedUser = await service.update({ ...parsed.data, updatedAt: new Date() }, Number(req.params.id));
      res.status(200).json(updatedUser);
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

      if (!user) {
        res.status(404).json({ error: `No user found with id "${req.params.id}"` });
        return;
      }

      res.status(200).json(user);
    }
    catch (err) {
      next(err);
    }
  }

  async function remove(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await service.getOne(Number(req.params.id));

      if (!user) {
        res.status(404).json({ error: `No user found with id "${req.params.id}"` });
        return;
      }

      await service.remove(Number(req.params.id));
      res.status(204).end();
    }
    catch (err) {
      next(err);
    }
  }

  return { register, update, getOne, remove };
}
