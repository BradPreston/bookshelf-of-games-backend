import express from 'express';
import env from './lib/env';
import { userRouter } from './routes/user.routes';

const app = express();
app.use(express.json());

const router = express.Router({ caseSensitive: true, strict: true });

userRouter(router);
app.use(router);

app.listen(env.PORT, () => {
  console.log(`running on port ${env.PORT}`);
});
