# Abdul Saboor — Portfolio

A premium, animated, fully responsive developer portfolio with a React + Vite frontend
and an Express + JWT + SQL backend powering an admin CMS for projects and certificates.

Content (name, education, projects, links) was pulled from your real GitHub, LinkedIn
and old portfolio where available. Anything marked `TODO` in
`src/data/portfolioData.js` is a placeholder worth reviewing.

## Stack

- **Frontend:** React 19, Vite, SCSS (7-1 architecture), Framer Motion, GSAP-ready,
  React Three Fiber + Drei (3D skill spheres), Lenis smooth scroll, React Router, Axios.
- **Backend:** Node.js, Express, JWT auth, bcrypt, Multer (image uploads), SQLite via
  `better-sqlite3` (swap for MySQL/Postgres using `backend/db/schema.sql` as a guide).

## Project structure

```
portfolio/
├── src/
│   ├── components/     # Navbar, background, loader, shared UI
│   ├── sections/       # Hero, About, Skills, Experience, Education, Projects, Certificates, Contact, Footer
│   ├── pages/           # Home + admin pages (login, dashboard, managers)
│   ├── contexts/        # Theme context
│   ├── hooks/            # Lenis smooth scroll, active-section tracking
│   ├── data/              # portfolioData.js — all site content lives here
│   ├── services/          # Axios API client
│   └── styles/            # SCSS 7-1: abstracts, base, layout, components
└── backend/
    ├── db/                # SQLite connection, schema.sql, seed script
    ├── routes/            # auth, projects, certificates
    ├── middleware/        # JWT auth guard
    └── server.js
```

## Getting started

### 1. Frontend

```bash
cd portfolio
npm install
cp .env.example .env
npm run dev
```

Runs at `http://localhost:5173`. API calls to `/api/*` are proxied to the backend
(`vite.config.js`) during development.

### 2. Backend

```bash
cd portfolio/backend
npm install
cp .env.example .env
# edit .env — set a real JWT_SECRET and your own ADMIN_PASSWORD
npm run seed   # creates the admin user + example projects/certificates
npm run dev
```

Runs at `http://localhost:5000`. Visit `http://localhost:5173/admin/login` and sign in
with the `ADMIN_USERNAME` / `ADMIN_PASSWORD` you set in `backend/.env`.

**Change the default admin password before deploying anywhere public** — re-run
`npm run seed` after editing `.env` only works for a fresh database; to change the
password on an existing DB, delete `backend/db/portfolio.db` and re-seed, or update the
row directly.

### 3. Contact form (EmailJS)

Create a free account at [emailjs.com](https://www.emailjs.com), set up an email
service + template, and add the three IDs to the frontend `.env`
(`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`).
Without them, the form simulates sending in development so you can still test the UI.

### 4. Resume & images

- Drop your CV at `public/resume/Abdul-Saboor-CV.pdf` (matches `personalInfo.resumeUrl`
  in `src/data/portfolioData.js`).
- Certificate/project images can be uploaded through the admin panel (stored in
  `backend/uploads/`) or linked externally.

## What's fully built vs. scaffolded

**Fully built:** all public sections (Hero, About, 3D Skills, Experience, Education,
Projects with search/filter/pagination, Certificates, Contact with validation, Footer),
theme toggle, mobile menu, scroll progress, aurora background, admin login + JWT-gated
dashboard + Projects/Certificates CRUD with image upload.

**Scaffolded, worth expanding before production:**
- GSAP is installed but only Framer Motion animations are wired up — layer in GSAP
  ScrollTrigger for parallax/pin effects if you want that extra layer of polish.
- The admin dashboard has no analytics view yet (overview page is a placeholder).
- No automated tests.
- For a real deployment, swap SQLite for MySQL/Postgres if you expect concurrent
  writes at scale, and put the backend behind HTTPS with a proper JWT secret + rate
  limiting on `/api/auth/login`.

## Deployment notes

- Frontend: `npm run build` → deploy the `dist/` folder to Vercel/Netlify/etc.
- Backend: deploy `backend/` to any Node host (Railway, Render, a VPS). Set real env
  vars there — never commit `.env`.
- Point `VITE_API_URL` in the frontend `.env` at your deployed backend URL before
  building for production.
