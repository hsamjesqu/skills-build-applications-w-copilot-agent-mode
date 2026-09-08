import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    minutes: { type: Number, required: true, min: 5 },
    focus: { type: String, required: true },
    equipment: { type: [String], default: [] }
  },
  {
    timestamps: true
  }
)

export type Workout = InferSchemaType<typeof workoutSchema>
export const Workout = mongoose.model('Workout', workoutSchema)
