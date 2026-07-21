import { NextFunction, Request, Response, Router } from 'express';
import { userController } from '../controllers/user.controller';

export function userRouter(router: Router) {
  const controller = userController();

  // create a new user
  router.post('/v1/users', (req: Request, res: Response, next: NextFunction) => {
    controller.register(req, res, next);
  });

  // update a user
  router.put('/v1/users/:id', (req: Request, res: Response, next: NextFunction) => {
    controller.update(req, res, next);
  });

  // get a user by id
  router.get('/v1/users/:id', (req: Request, res: Response, next: NextFunction) => {
    controller.getOne(req, res, next);
  });

  // delete a user by id
  router.delete('/v1/users/:id', (req: Request, res: Response, next: NextFunction) => {
    controller.remove(req, res, next);
  });

  return router;
}
