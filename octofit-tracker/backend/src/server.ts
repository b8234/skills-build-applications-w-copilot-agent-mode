import express from 'express';
import mongoose from 'mongoose';
import { apiBaseUrl, port } from './config';
import { connectToDatabase as openDatabaseConnection, mongoUri } from './database';
import { activitiesRouter } from './routes/activities';
import { leaderboardRouter } from './routes/leaderboard';
import { teamsRouter } from './routes/teams';
import { usersRouter } from './routes/users';
import { workoutsRouter } from './routes/workouts';

const app = express();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    apiBaseUrl,
    port,
    database: mongoose.connection.name || 'octofit_db',
    mongoState: mongoose.connection.readyState,
  });
});

async function connectToDatabase() {
  try {
    await openDatabaseConnection();
    console.log(`MongoDB connected at ${mongoUri}`);
  } catch (error) {
    console.error('MongoDB connection failed', error);
  }
}

app.listen(port, () => {
  console.log(`OctoFit backend listening on http://localhost:${port}`);
});

void connectToDatabase();