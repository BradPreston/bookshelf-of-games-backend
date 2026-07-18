import express from 'express';
import env from './lib/env';

const app = express();

app.listen(env.PORT, () => {
  console.log(`running on port ${env.PORT}`);
});
