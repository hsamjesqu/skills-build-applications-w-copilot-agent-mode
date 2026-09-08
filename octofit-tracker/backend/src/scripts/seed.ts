import mongoose from 'mongoose'
import { User } from '../models/user.js'
import { Team } from '../models/team.js'
import { Activity } from '../models/activity.js'
import { Leaderboard } from '../models/leaderboard.js'
import { Workout } from '../models/workout.js'

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString)

    console.log('Connected to octofit_db')

    await User.deleteMany({})
    await Team.deleteMany({})
    await Activity.deleteMany({})
    await Leaderboard.deleteMany({})
    await Workout.deleteMany({})

    const users = await User.insertMany([
      {
        name: 'Ada Johnson',
        email: 'ada.johnson@example.com',
        role: 'admin',
        age: 17,
        fitnessLevel: 'advanced'
      },
      {
        name: 'Leo Martinez',
        email: 'leo.martinez@example.com',
        role: 'member',
        age: 16,
        fitnessLevel: 'intermediate'
      },
      {
        name: 'Priya Shah',
        email: 'priya.shah@example.com',
        role: 'coach',
        age: 18,
        fitnessLevel: 'advanced'
      },
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        role: 'member',
        age: 15,
        fitnessLevel: 'beginner'
      }
    ])

    const teams = await Team.insertMany([
      { name: 'Trailblazers', sport: 'Running', members: 4, color: '#22c55e' },
      { name: 'Power Squad', sport: 'Strength', members: 5, color: '#f59e0b' },
      { name: 'Aqua Flyers', sport: 'Swimming', members: 3, color: '#38bdf8' }
    ])

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Run',
        minutes: 35,
        distanceKm: 5.2,
        exercises: 0,
        notes: 'Tempo run with strong finish'
      },
      {
        userId: users[1]._id,
        type: 'Strength',
        minutes: 45,
        distanceKm: 0,
        exercises: 8,
        notes: 'Lower body focus'
      },
      {
        userId: users[3]._id,
        type: 'Swim',
        minutes: 30,
        distanceKm: 1.5,
        exercises: 0,
        notes: 'Technique drill session'
      }
    ])

    await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        user: users[0].name,
        team: teams[0].name,
        points: 1200,
        rank: 1
      },
      {
        userId: users[1]._id,
        user: users[1].name,
        team: teams[1].name,
        points: 1100,
        rank: 2
      },
      {
        userId: users[3]._id,
        user: users[3].name,
        team: teams[2].name,
        points: 980,
        rank: 3
      }
    ])

    await Workout.insertMany([
      {
        title: 'Morning Mobility',
        difficulty: 'beginner',
        minutes: 20,
        focus: 'Recovery',
        equipment: ['mat']
      },
      {
        title: 'Interval Sprint',
        difficulty: 'intermediate',
        minutes: 30,
        focus: 'Cardio',
        equipment: ['track shoes']
      },
      {
        title: 'Leg Day Burn',
        difficulty: 'advanced',
        minutes: 45,
        focus: 'Strength',
        equipment: ['barbell', 'bench']
      }
    ])

    console.log('Database seeding complete')
    await mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
