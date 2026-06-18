import mongoose from 'mongoose';
import { mongoUri } from './config';

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  return mongoose.connect(mongoUri);
}