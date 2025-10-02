# 🎨 Curatr

Curatr is a **Progressive Web App (PWA)** that allows users to search museum and university art collections, filter artworks, and curate their own virtual exhibitions.
It is designed to work seamlessly across devices, supports offline caching, and can be installed on mobile and desktop for a native app-like experience.

---

## 🛠 Tech Stack

### **Frontend**
- `react` — core UI library
- `javascript` — application logic
- `react-router-dom` — client-side routing/navigation
- `tailwindcss` — utility-first styling
- `shadcn/ui` — prebuilt accessible components
- `axios` — API calls to backend and museum/university APIs
- `vite-plugin-pwa` — PWA support (service worker, manifest)

### **Backend**
- `express.js` — server framework
- `postgresql` — relational database
- `pg` — PostgreSQL client for Node.js
- `pg-format` — safe SQL query formatting
- `jest` + `supertest` — testing framework + API testing
- `express-session` — session management for MVP persistence
- `dotenv` — environment variable management

### **Other**
- `vite` — frontend build tool and dev server
- `husky` — Git hooks for pre-commit/test enforcement

---

## ✨ Features (MVP)

- **PWA support**: installable on mobile/desktop, offline caching for exhibitions and search results.
- Search artworks by keyword or preset filters (powered by museum/university APIs).
- View artwork details (`image`, `title`, `artist`, `year`, `description`, `source link`).
- Create a temporary exhibition by adding selected artworks.
- Remove artworks from the exhibition.
- Browse curated exhibition in a gallery-style viewer.
- Exhibition persists during the session (via `localStorage`).

---

## 🚀 Extras (Future Features)

- Save exhibitions permanently in the database.
- User accounts with OAuth login (Google, ORCID, GitHub).
- Share exhibitions via unique links.
- Reorder artworks with drag-and-drop.
- Add personal notes or descriptions to exhibitions.
- Advanced filters (artist, medium, date range, location).
- Loading skeletons for smooth UX.
- Export exhibitions to PDF as a “virtual catalogue.”
- Social media integration for sharing exhibitions.

---

## 📂 Repository Structure

```plaintext
curatr/
│
├── frontend/       # React + Vite + Tailwind PWA
├── backend/        # Express + PSQL API
├── docs/           # Planning docs, wireframes, db schema
└── README.md       # This file


📋 Minimum Requirements

Node.js v18+

npm v9+ (comes with Node)

PostgreSQL v14+

🚀 Getting Started

1. Clone the repo
   git clone https://github.com/piraturosu/curatr.git
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

PGDATABASE=curatr_test # for testing
PGDATABASE=curatr # for development

Start backend server:

npm start

3. Frontend Setup
   cd ../frontend
   npm install

Start development server:

npm run dev
