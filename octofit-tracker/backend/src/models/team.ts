import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    sport: { type: String, required: true },
    members: { type: Number, default: 0 },
    color: { type: String, default: '#4f46e5' }
  },
  {
    timestamps: true
  }
)

export type Team = InferSchemaType<typeof teamSchema>
export const Team = mongoose.model('Team', teamSchema)
