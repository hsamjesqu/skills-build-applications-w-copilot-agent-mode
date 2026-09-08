import { useEffect, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

const apiBaseUrl = getApiBaseUrl()
const codespaceEndpointExample = '-8000.app.github.dev/api/activities'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${apiBaseUrl}/api/activities/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setActivities(Array.isArray(data) ? data : data.results || [])
        setError('')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load activities')
        setActivities([])
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) return <div className="alert alert-info">Loading activities...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="container py-4">
      <h2>Activities</h2>
      <div className="list-group">
        {activities.map((activity) => (
          <div key={activity.id ?? activity._id ?? activity.type} className="list-group-item">
            <h5>{activity.type}</h5>
            <p className="mb-1">{activity.minutes} minutes</p>
            <small className="text-muted">
              {activity.distanceKm ? `${activity.distanceKm} km` : `${activity.exercises ?? 0} exercises`}
            </small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Activities
