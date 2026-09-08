import { useEffect, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

const apiBaseUrl = getApiBaseUrl()
const codespaceEndpointExample = '-8000.app.github.dev/api/leaderboard'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${apiBaseUrl}/api/leaderboard/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setEntries(Array.isArray(data) ? data : data.results || [])
        setError('')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load leaderboard')
        setEntries([])
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      <div className="list-group">
        {entries.map((entry) => (
          <div key={entry.id ?? entry._id ?? entry.user} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">{entry.user}</h5>
              <small className="text-muted">{entry.team}</small>
            </div>
            <span className="badge bg-primary rounded-pill">{entry.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Leaderboard
