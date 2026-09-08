import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    user: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)

export type LeaderboardEntry = InferSchemaType<typeof leaderboardSchema>
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema)
