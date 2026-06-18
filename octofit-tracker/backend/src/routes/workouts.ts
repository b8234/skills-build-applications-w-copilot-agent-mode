import { Router } from 'express';
import { apiBaseUrl } from '../config';
import { WorkoutModel } from '../models';

export const workoutsRouter = Router();

workoutsRouter.get('/', async (_request, response, next) => {
  try {
    const items = await WorkoutModel.find()
      .populate('assignedTo', 'fullName username')
      .sort({ createdAt: 1 })
      .lean();

    response.json({
      resource: 'workouts',
      apiBaseUrl,
      count: items.length,
      items,
    });
  } catch (error) {
    next(error);
  }
});