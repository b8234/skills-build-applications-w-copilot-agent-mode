import { Router } from 'express';
import { apiBaseUrl } from '../config';
import { LeaderboardModel } from '../models';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response, next) => {
  try {
    const items = await LeaderboardModel.find()
      .populate('user', 'fullName username')
      .populate('team', 'name city')
      .sort({ rank: 1 })
      .lean();

    response.json({
      resource: 'leaderboard',
      apiBaseUrl,
      count: items.length,
      items,
    });
  } catch (error) {
    next(error);
  }
});