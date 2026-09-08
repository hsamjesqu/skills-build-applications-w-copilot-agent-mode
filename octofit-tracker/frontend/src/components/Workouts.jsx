import { useEffect, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

const apiBaseUrl = getApiBaseUrl()

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${apiBaseUrl}/api/workouts/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setWorkouts(Array.isArray(data) ? data : data.results || [])
        setError('')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load workouts')
        setWorkouts([])
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  if (loading) return <div className="alert alert-info">Loading workouts...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="container py-4">
      <h2>Workouts</h2>
      <div className="list-group">
        {workouts.map((workout) => (
          <div key={workout.id ?? workout._id ?? workout.title} className="list-group-item">
            <h5>{workout.title}</h5>
            <p className="mb-1">{workout.difficulty} • {workout.minutes} minutes</p>
            <small className="text-muted">Focus: {workout.focus}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Workouts
