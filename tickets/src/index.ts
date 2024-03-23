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
    // mongoose
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 50000,
    });
    console.log('connected to mongoDB.');

    // nats
    const clientId = randomBytes(4).toString('hex');
    await natsWrapper.connect('ticketing', clientId, 'http://nats-srv:4222');
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Auth server listening on port 3000!!');
  });
};

start();
