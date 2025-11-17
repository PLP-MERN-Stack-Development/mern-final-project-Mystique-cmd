# MERN Stack Capstone Project

This repository contains a complete, minimal MERN capstone application built by following the Week8-Assignment.md brief. It includes:
- Backend API with Express, MongoDB (Mongoose), JWT auth, validation, middleware, and Socket.io real‑time events.
- Frontend React app (Vite) with authentication, task CRUD UI, and real‑time updates via Socket.io.
- Tests for backend endpoints (Jest + Supertest + mongodb-memory-server).
- Dockerfiles and docker-compose for local development.
- GitHub Actions CI to run backend tests on every push/PR.

## Tech Stack
- MongoDB, Mongoose
- Express.js, Node.js, Socket.io
- React (Vite), React Router
- Jest, Supertest, mongodb-memory-server
- Docker, docker-compose, GitHub Actions

## Monorepo Structure
- backend/ — Express API, models, routes, controllers, tests
- frontend/ — React app
- .github/workflows/ci.yml — CI pipeline
- docker-compose.yml — Local dev orchestration

## Prerequisites
- Node.js 18+
- npm
- Docker (optional but recommended)

## Quick Start (Local without Docker)
1. Backend
   - cd backend
   - cp .env.example .env (optional; defaults will work for local Mongo on 27017)
   - npm install
   - Make sure MongoDB is running locally or use MONGO_URI in .env
   - npm run dev
   - API will be on http://localhost:5000
2. Frontend
   - Open a new terminal
   - cd frontend
   - npm install
   - npm run dev
   - App will be on http://localhost:5173

## Quick Start (Docker Compose)
1. docker compose up --build
2. Open http://localhost:5173

Services
- MongoDB: localhost:27017
- Backend API: http://localhost:5000
- Frontend: http://localhost:5173

## Testing
- cd backend && npm test

The backend test suite spins up an in-memory MongoDB and runs Supertest against the Express app. No external services required.

## API Overview
- POST /api/auth/register — create user, returns token
- POST /api/auth/login — login, returns token
- GET /api/auth/me — get current user (requires Bearer token)
- GET /api/tasks — list current user tasks
- POST /api/tasks — create task { title, dueDate? }
- PUT /api/tasks/:id — update task { title?, completed?, dueDate? }
- DELETE /api/tasks/:id — delete task

Socket.io events broadcast to clients:
- task:created { task }
- task:updated { task }
- task:deleted { id }

## Deployment
This repo includes Dockerfiles suitable for container deployment. You can deploy using any container platform. For a simple cloud deployment:
- Build and push images for backend and frontend.
- Provide environment variables:
  - Backend: PORT, MONGO_URI, JWT_SECRET
  - Frontend: VITE_API_URL pointing to your backend URL

## Project Presentation Checklist (per Week8-Assignment.md)
- [ ] Clear problem statement and feature list
- [ ] Architecture overview (include data model, API design, and real‑time flow)
- [ ] Screenshots of key features (add to README)
- [ ] Live demo link (add below)
- [ ] 5–10 minute video walkthrough (add link below)

Live App: <ADD_URL_HERE>
Demo Video: <ADD_URL_HERE>

## Resources
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Socket.io](https://socket.io/)
- [GitHub Actions](https://docs.github.com/actions) 