import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    minutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, default: 0 },
    exercises: { type: Number, default: 0 },
    notes: { type: String, default: '' }
  },
  {
    timestamps: true
  }
)

export type Activity = InferSchemaType<typeof activitySchema>
export const Activity = mongoose.model('Activity', activitySchema)
