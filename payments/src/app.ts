import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { createChargeRouter } from './routes/new';

import { errorHandler, NotFoundError, currentUser } from '@karidx/common';

const app = express();
app.set('trust proxy', true); // there was a typo!
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser); // deal with cookie session first, then get the current user

app.use(createChargeRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
