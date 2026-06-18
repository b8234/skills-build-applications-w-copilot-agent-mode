import { InferSchemaType, Schema, Types, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    period: { type: String, required: true, trim: true },
    rank: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    user: { type: Types.ObjectId, ref: 'User', required: true },
    team: { type: Types.ObjectId, ref: 'Team', required: true },
  },
  { timestamps: true },
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;

export const LeaderboardModel = model('Leaderboard', leaderboardSchema);