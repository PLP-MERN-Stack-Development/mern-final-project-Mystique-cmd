import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>MERN Capstone: Tasks</h1>
        <nav>
          {token ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: 8 }}>Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main style={{ marginTop: 24 }}>
        <Outlet />
      </main>
      <footer style={{ marginTop: 32, color: '#666' }}>Demo app for the Week 8 capstone</footer>
    </div>
  )
}
