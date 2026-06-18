import { Router } from 'express';
import { apiBaseUrl } from '../config';
import { UserModel } from '../models';

export const usersRouter = Router();

usersRouter.get('/', async (_request, response, next) => {
  try {
    const items = await UserModel.find().sort({ createdAt: 1 }).lean();

    response.json({
      resource: 'users',
      apiBaseUrl,
      count: items.length,
      items,
    });
  } catch (error) {
    next(error);
  }
});