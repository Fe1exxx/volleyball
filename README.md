# TITAN — Volleyball Club Management System

> A fullstack web application for managing memberships, schedules, and user accounts for a volleyball club.

**Live demo:** [volleyball-sepia.vercel.app](https://volleyball-gdwpv9he9-fexds-projects.vercel.app)

---

## Overview

TITAN is a fullstack application built to handle the day-to-day digital needs of a volleyball club — from user registration and login to membership management and admin controls. The project covers the full stack: a React frontend, a REST API backend, a PostgreSQL database, and a containerized local environment via Docker.

This is an independent project, not affiliated with or commissioned by any organization.

---

## Stack

**Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS
- Zustand (global state)
- React Router v6
- Vitest (unit tests)

**Backend**
- Node.js + Express
- PostgreSQL (`pg`, parameterized queries)
- JWT-based authentication
- Role-based access control (admin / user)

**Infrastructure**
- Docker + Docker Compose
- pnpm workspaces
- GitHub Pages (frontend deploy)
- Vercel (full app deploy)

---

## Features

- User registration and login with JWT
- Role-based access: separate views and permissions for admins and regular users
- Membership (abonnement) system with visit history
- Admin panel for managing users and content
- Responsive layout with mobile navigation
- REST API with input validation and error handling
- Parameterized SQL queries (protection against SQL injection)
- Unit and integration tests for auth routes

---

## Getting Started

### Prerequisites

- Node.js 20+
- Docker + Docker Compose
- pnpm

### Local setup

```bash
git clone https://github.com/Fe1exxx/volleyball.git
cd volleyball
cp .env.example .env
# Fill in your database credentials in .env
docker-compose up --build
```

Frontend will be available at `http://localhost:5173`  
Backend API at `http://localhost:3001`

### Run without Docker

```bash
# Backend
cd backend
pnpm install
pnpm dev

# Frontend
cd frontend
pnpm install
pnpm dev
```

### Run tests

```bash
cd backend
pnpm test
```

---

## Project Structure

```
volleyball/
├── frontend/
│   ├── src/
│   │   ├── components/     # Feature-based component structure
│   │   ├── GlobalSetZustand/  # Zustand stores
│   │   ├── styles/
│   │   └── test/
│   └── vite.config.ts
├── backend/
│   ├── src/
│   │   └── routes/         # auth.ts, users.ts, db.ts, server.ts
│   └── Dockerfile
├── docker-compose.yml
└── .env.example
```

---

## Environment Variables

Copy `.env.example` to `.env` and configure:

```
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
BACKEND_PORT=3001
```

---

## Roadmap

- [ ] News section (admin-published)
- [ ] Merch mini-shop
- [ ] Payment integration (ЮKassa / Sber)
- [ ] Telegram bot for notifications
- [ ] Automatic membership renewal

---

## Contact

- **Telegram:** [@fex_d](https://t.me/fex_d)
- **Email:** turchin2003@outlook.com
- **GitHub:** [@Fe1exxx](https://github.com/Fe1exxx)
- **Portfolio:** [fe1exxx.github.io/Portfolio](https://fe1exxx.github.io/Portfolio)
