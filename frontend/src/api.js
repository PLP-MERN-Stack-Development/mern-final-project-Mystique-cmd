const API_BASE = import.meta.env.VITE_API_URL || ''

export async function apiRequest(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  const token = localStorage.getItem('token')
  if (auth && token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(error.message || 'Request failed')
  }
  return res.json()
}

export async function login(email, password) {
  const data = await apiRequest('/api/auth/login', { method: 'POST', body: { email, password }, auth: false })
  localStorage.setItem('token', data.token)
  return data.user
}

export async function registerUser(name, email, password) {
  const data = await apiRequest('/api/auth/register', { method: 'POST', body: { name, email, password }, auth: false })
  localStorage.setItem('token', data.token)
  return data.user
}

export async function getTasks() {
  return apiRequest('/api/tasks')
}

export async function createTask(title, dueDate) {
  return apiRequest('/api/tasks', { method: 'POST', body: { title, dueDate } })
}

export async function updateTask(id, updates) {
  return apiRequest(`/api/tasks/${id}`, { method: 'PUT', body: updates })
}

export async function deleteTask(id) {
  return apiRequest(`/api/tasks/${id}`, { method: 'DELETE' })
}
