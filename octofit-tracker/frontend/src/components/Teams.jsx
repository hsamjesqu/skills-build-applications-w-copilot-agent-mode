import { useEffect, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

const apiBaseUrl = getApiBaseUrl()

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${apiBaseUrl}/api/teams/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setTeams(Array.isArray(data) ? data : data.results || [])
        setError('')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load teams')
        setTeams([])
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  if (loading) return <div className="alert alert-info">Loading teams...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="container py-4">
      <h2>Teams</h2>
      <div className="list-group">
        {teams.map((team) => (
          <div key={team.id ?? team._id ?? team.name} className="list-group-item">
            <h5>{team.name}</h5>
            <p className="mb-1">{team.sport}</p>
            <small className="text-muted">{team.members} members</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Teams
