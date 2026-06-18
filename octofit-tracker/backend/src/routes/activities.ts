import { Router } from 'express';
import { apiBaseUrl } from '../config';
import { ActivityModel } from '../models';

export const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response, next) => {
  try {
    const items = await ActivityModel.find()
      .populate('user', 'fullName username')
      .sort({ completedAt: -1 })
      .lean();

    response.json({
      resource: 'activities',
      apiBaseUrl,
      count: items.length,
      items,
    });
  } catch (error) {
    next(error);
  }
});