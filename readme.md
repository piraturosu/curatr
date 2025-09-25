# 🎨 Curatr

Curatr is a **Progressive Web App (PWA)** that allows users to search museum and university art collections, filter artworks, and curate their own virtual exhibitions.
It is designed to work seamlessly across devices, supports offline caching, and can be installed on mobile and desktop for a native app-like experience.

This project was created as part of a Digital Skills Bootcamp in Software Engineering.

---

## 🛠 Tech Stack

### **Frontend**
- `react` (v19)
- `react-router-dom` (v7)
- `vite`
- `vite-plugin-pwa`
- `tailwindcss` (v3)
- `@heroicons/react`
- `eslint` + `prettier`

### **Backend**
- `express`
- `pg`
- `pg-format`
- `jest` + `supertest`
- `husky` (Git hooks)
- `dotenv`

---

## ✨ Features (MVP)

- **PWA support**: installable on mobile/desktop, offline caching for exhibitions and search results.
- Search artworks by keyword or preset filters (powered by museum/university APIs).
- View artwork details (`image`, `title`, `artist`, `year`, `description`, `source link`).
- Create a temporary exhibition by adding selected artworks.
- Browse curated exhibitions in a gallery-style viewer.
- Session-based persistence for curated exhibitions.  

📂 Repository Structure
exhibition-curator/
│
├── frontend/ # React + Vite + Tailwind app
├── backend/ # Express + PSQL API
├── docs/ # Planning docs, wireframes, db schema
└── README.md # This file

📋 Minimum Requirements

Node.js v18+

npm v9+ (comes with Node)

PostgreSQL v14+

🚀 Getting Started

1. Clone the repo
   git clone https://github.com/YOUR_USERNAME/exhibition-curator.git
   cd exhibition-curator

2. Backend Setup
   cd backend
   npm install

Database setup

# Create test and development databases

npm run setup-dbs

# Seed the dev database

npm run seed-dev

# Run backend tests

npm test

Environment variables

Create .env.test and .env.development in /backend and add:

PGDATABASE=exhibition_curator_test # for testing
PGDATABASE=exhibition_curator # for development

Start backend server:

npm start

3. Frontend Setup
   cd ../frontend
   npm install

Start development server:

npm run dev
