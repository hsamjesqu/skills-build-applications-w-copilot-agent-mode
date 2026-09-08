import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import logo from './assets/hero.png'
import './App.css'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' }
]

function Home() {
  return (
    <div className="container py-5 text-center">
      <img src={logo} alt="Octofit Tracker" className="mb-4" style={{ width: '120px' }} />
      <h1>Octofit Tracker</h1>
      <p className="lead text-muted">
        Track workouts, review leaders, and stay connected with your team.
      </p>
      <div className="alert alert-info mt-4">
        VITE_CODESPACE_NAME must be defined in .env.local for Codespaces. If it is unset,
        the app falls back to localhost.
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <span className="navbar-brand">Octofit</span>
        <div className="navbar-nav ms-auto flex-row gap-3 flex-wrap">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
