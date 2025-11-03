# Fintrix Backend

Fintech CRM platform for startups & investors: Lead matching, email/domain verification, blockchain-secured deals, & AI recommendations.

## Project Overview
Built with Node.js + Express + MongoDB. Modular structure for scalability. Phase 1 complete—ready for auth, CRM, and integrations.

## Phase 1 Status (Tasks 1-4: Done by [Your Name])
- ✅ **Task 1:** Node.js + Express project initialized (`npm start` / `npm run dev`).
- ✅ **Task 2:** /src structure: controllers, models, routes, middleware, config, utils.
- ✅ **Task 3:** .env setup (PORT, MONGO_URI, JWT_SECRET). Copy `.env.example` & fill MONGO_URI.
- ✅ **Task 4:** MongoDB connected via Mongoose (`src/config/db.js`). Verified locally (Compass/shell).
- Health route: `GET /api/health` → `{"status": "running"}`.

## Phase 1 Status (Tasks 5-7: Done by [Your Name])
- ✅ **Task 5:** Base health route (`GET /api/health`) created returning `{ status: "running" }`.
- ✅ **Task 6:** Middleware integrated: Helmet (security), Morgan (logging), CORS (frontend access), and `express.json()` (body parsing).
- ✅ **Task 7:** GitHub CI pipeline created (`.github/workflows/nodejs-ci.yml`) to automate lint/test/build.

## Quick Start
1. Clone: `git clone https://github.com/shakthishankar/fintrix-backend.git`
2. Install: `cd fintrix-backend && npm install`
3. Setup .env: Copy `.env.example` to `.env`, update `MONGO_URI` (local: `mongodb://localhost:27017/fintrix-db`).
4. Start MongoDB (local install/service).
5. Run: `npm run dev`
6. Test: `curl http://localhost:3000/api/health` or browser.

## Tech Stack
- Backend: Node.js, Express
- DB: MongoDB + Mongoose
- Env: dotenv
- Dev: nodemon

## Roadmap
- **Phase 2:** Auth (User model, JWT register/login).
- **Phase 3:** CRM APIs (Orgs, Leads, Deals CRUD).
- Full spec: See [BACKEND_AND_BLOCKCHAIN.pdf](link-to-pdf-if-uploaded).

## Contributing
Branch: `git checkout -b feature/phase-2-auth`  
Commit: `git commit -m "feat: add user model"`  
PR: Open to main.

Questions? Ping [your contact].