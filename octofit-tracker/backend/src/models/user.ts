import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'coach', 'member'], default: 'member' },
    age: { type: Number, min: 0 },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' }
  },
  {
    timestamps: true
  }
)

export type User = InferSchemaType<typeof userSchema>
export const User = mongoose.model('User', userSchema)
