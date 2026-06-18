import { InferSchemaType, Schema, Types, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    assignedTo: { type: Types.ObjectId, ref: 'User', required: true },
    focusAreas: { type: [String], default: [] },
  },
  { timestamps: true },
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

export const WorkoutModel = model('Workout', workoutSchema);