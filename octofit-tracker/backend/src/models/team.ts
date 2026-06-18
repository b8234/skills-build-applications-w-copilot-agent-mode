import { InferSchemaType, Schema, Types, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    sportFocus: { type: String, required: true, trim: true },
    captain: { type: Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Types.ObjectId, ref: 'User', required: true }],
  },
  { timestamps: true },
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

export const TeamModel = model('Team', teamSchema);