import express from 'express'

const app = express()
const port = Number(process.env.PORT || 8000)
const host = '0.0.0.0'
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

type Item = Record<string, unknown>
type ResourceMap = {
  users: Item[]
  teams: Item[]
  activities: Item[]
  leaderboard: Item[]
  workouts: Item[]
}

app.use(express.json())

const resources: ResourceMap = {
  users: [
    { id: 1, name: 'Ada Johnson', email: 'ada@example.com', role: 'admin' },
    { id: 2, name: 'Leo Martinez', email: 'leo@example.com', role: 'member' },
    { id: 3, name: 'Priya Shah', email: 'priya@example.com', role: 'coach' }
  ],
  teams: [
    { id: 1, name: 'Trailblazers', members: 4, sport: 'Running' },
    { id: 2, name: 'Power Squad', members: 5, sport: 'Strength' },
    { id: 3, name: 'Aqua Flyers', members: 3, sport: 'Swimming' }
  ],
  activities: [
    { id: 1, userId: 1, type: 'Run', distanceKm: 5, minutes: 30 },
    { id: 2, userId: 2, type: 'Strength', minutes: 45, exercises: 7 },
    { id: 3, userId: 3, type: 'Cycle', distanceKm: 12, minutes: 40 }
  ],
  leaderboard: [
    { id: 1, user: 'Ada Johnson', points: 1200, team: 'Trailblazers' },
    { id: 2, user: 'Leo Martinez', points: 1100, team: 'Power Squad' },
    { id: 3, user: 'Priya Shah', points: 950, team: 'Aqua Flyers' }
  ],
  workouts: [
    { id: 1, title: 'Morning Mobility', difficulty: 'beginner', minutes: 20, focus: 'Recovery' },
    { id: 2, title: 'Interval Sprint', difficulty: 'intermediate', minutes: 30, focus: 'Cardio' },
    { id: 3, title: 'Leg Day Burn', difficulty: 'advanced', minutes: 45, focus: 'Strength' }
  ]
}

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    apiBaseUrl,
    port
  })
})

app.get('/api/config', (_request, response) => {
  response.json({
    apiBaseUrl,
    codespaceName: codespaceName || null,
    port,
    environment: process.env.NODE_ENV || 'development'
  })
})

const registerResourceRoutes = (resourceName: keyof ResourceMap) => {
  const path = `/api/${resourceName}`

  app.get(path, (_request, response) => {
    response.json(resources[resourceName])
  })

  app.get(`${path}/`, (_request, response) => {
    response.json(resources[resourceName])
  })

  app.post(path, (request, response) => {
    const item = (request.body ?? {}) as Item
    const collection = resources[resourceName]
    const nextId = collection.reduce((maxId, currentItem) => {
      const currentId = Number((currentItem as { id?: number }).id ?? 0)
      return Math.max(maxId, currentId)
    }, 0) + 1

    const createdItem = { ...item, id: nextId }
    collection.push(createdItem)
    response.status(201).json(createdItem)
  })

  app.post(`${path}/`, (request, response) => {
    const item = (request.body ?? {}) as Item
    const collection = resources[resourceName]
    const nextId = collection.reduce((maxId, currentItem) => {
      const currentId = Number((currentItem as { id?: number }).id ?? 0)
      return Math.max(maxId, currentId)
    }, 0) + 1

    const createdItem = { ...item, id: nextId }
    collection.push(createdItem)
    response.status(201).json(createdItem)
  })
}

registerResourceRoutes('users')
registerResourceRoutes('teams')
registerResourceRoutes('activities')
registerResourceRoutes('leaderboard')
registerResourceRoutes('workouts')

app.listen(port, host, () => {
  console.log(`OctoFit API listening on http://${host}:${port}`)
  console.log(`API base URL: ${apiBaseUrl}`)
})

export default app
