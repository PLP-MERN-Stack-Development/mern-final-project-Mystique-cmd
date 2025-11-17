import React, { useEffect, useState } from 'react'
import { getTasks, createTask, updateTask, deleteTask } from '../api'
import { io } from 'socket.io-client'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    load()
    const url = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:5000'
    const socket = io(url, { autoConnect: true, transports: ['websocket'] })
    socket.on('task:created', ({ task }) => setTasks(prev => [task, ...prev]))
    socket.on('task:updated', ({ task }) => setTasks(prev => prev.map(t => t._id === task._id ? task : t)))
    socket.on('task:deleted', ({ id }) => setTasks(prev => prev.filter(t => t._id !== id)))
    return () => socket.disconnect()
  }, [])

  async function load() {
    try {
      const data = await getTasks()
      setTasks(data.tasks)
    } catch (e) {
      setError(e.message)
    }
  }

  async function addTask(e) {
    e.preventDefault()
    if (!title.trim()) return
    try {
      await createTask(title)
      setTitle('')
    } catch (e) {
      setError(e.message)
    }
  }

  async function toggleCompleted(task) {
    try {
      await updateTask(task._id, { completed: !task.completed })
    } catch (e) {
      setError(e.message)
    }
  }

  async function removeTask(id) {
    try {
      await deleteTask(id)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div>
      <h2>Your Tasks</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={addTask} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input placeholder="New task title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ flex: 1 }} />
        <button type="submit">Add</button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
        {tasks.map(t => (
          <li key={t._id} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 8, border: '1px solid #eee' }}>
            <input type="checkbox" checked={t.completed} onChange={() => toggleCompleted(t)} />
            <span style={{ textDecoration: t.completed ? 'line-through' : 'none', flex: 1 }}>{t.title}</span>
            <button onClick={() => removeTask(t._id)} aria-label={`Delete ${t.title}`}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
