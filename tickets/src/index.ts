import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { randomBytes } from 'crypto';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined.');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined.');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 50000,
    });
    console.log('connected to mongoDB.');

    const clientId = randomBytes(4).toString('hex');
    await natsWrapper.connect('ticketing', clientId, 'http://nats-srv:4222');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Auth server listening on port 3000!!');
  });
};

start();
