import { Router } from 'express';
import { apiBaseUrl } from '../config';
import { TeamModel } from '../models';

export const teamsRouter = Router();

teamsRouter.get('/', async (_request, response, next) => {
  try {
    const items = await TeamModel.find()
      .populate('captain', 'fullName username')
      .populate('members', 'fullName username')
      .sort({ createdAt: 1 })
      .lean();

    response.json({
      resource: 'teams',
      apiBaseUrl,
      count: items.length,
      items,
    });
  } catch (error) {
    next(error);
  }
});