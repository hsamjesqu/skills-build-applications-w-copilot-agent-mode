import { useEffect, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

const apiBaseUrl = getApiBaseUrl()
const codespaceEndpointExample = '-8000.app.github.dev/api/users'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${apiBaseUrl}/api/users/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setUsers(Array.isArray(data) ? data : data.results || [])
        setError('')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load users')
        setUsers([])
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div className="alert alert-info">Loading users...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="container py-4">
      <h2>Users</h2>
      <div className="list-group">
        {users.map((user) => (
          <div key={user.id ?? user._id ?? user.email} className="list-group-item">
            <h5>{user.name}</h5>
            <p className="mb-1">{user.email}</p>
            <small className="text-muted">{user.role}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Users
