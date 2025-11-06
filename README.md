# Fintrix Backend
*AI-powered FinTech CRM for Startups, Investors & Deal Flow Automation*
![Fintrix Banner](https://img.shields.io/badge/Fintrix-Fintech%20CRM-5E5DF0?style=for-the-badge&logo=vercel&logoColor=white)

## Project Overview
Built with Node.js + Express + MongoDB. Modular structure for scalability. Phase 1 complete—ready for auth, CRM, and integrations.
<div align="center">
---

## 🛡️ Status & Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-%23000000.svg?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue?style=for-the-badge&logo=postgresql)
![MongoDB](https://img.shields.io/badge/MongoDB-6+-brightgreen?style=for-the-badge&logo=mongodb)
![GitHub](https://img.shields.io/badge/GitHub-Actions-black?style=for-the-badge&logo=github)

</div>

## Phase 1: Setup & Architecture 
- ✅ **Task 1:** Node.js + Express project initialized (`npm start` / `npm run dev`).
- ✅ **Task 2:** /src structure: controllers, models, routes, middleware, config, utils.
- ✅ **Task 3:** .env setup (PORT, MONGO_URI, JWT_SECRET). Copy `.env.example` & fill MONGO_URI.
- ✅ **Task 4:** MongoDB connected via Mongoose (`src/config/db.js`). Verified locally (Compass/shell).
- Health route: `GET /api/health` → `{"status": "running"}`.
- ✅ **Task 5:** Base health route (`GET /api/health`) created returning `{ status: "running" }`.
- ✅ **Task 6:** Middleware integrated: Helmet (security), Morgan (logging), CORS (frontend access), and `express.json()` (body parsing).
- ✅ **Task 7:** GitHub CI pipeline created (`.github/workflows/nodejs-ci.yml`) to automate lint/test/build.

 **Phase 2:** Auth (User model, JWT register/login).
## Phase 3: CRM APIs (Orgs, Leads, Deals CRUD).
This phase adds the full CRM system including Organizations, Leads, and Deals.

✅ **Task 1: Organizations** Create, update, delete organizations, Filter by type (startup/investor) and region, Pagination support
✅ **Task 2: Users**  Organization Relationship, Every user belongs to an organization, Enforced using foreign keys in PostgreSQL
✅ **Task 3: Leads** Create and update leads, Fields: name, email, domain, status, addedBy, Filter by status, addedBy, domain, Pagination support
✅ **Task 4: Deals** Complex model: multiple startups + multiple investors, Stages (enum): NEW, NEGOTIATING, CLOSED, 
Status: ACTIVE / INACTIVE, Full CRUD, filtering, pagination
✅ **Task 5: Database Integration** Prisma schema updated, PostgreSQL migrations generated, All relations and join tables created

✅ Phase 3 fully completed — CRM APIs are ready for production and integration.

🛣️ Roadmap
Phase	Feature	Status
Phase 1	Setup & Infra	✅ Completed

Phase 2	Authentication + JWT	⏳ Next

Phase 3	CRM Core (Org, Leads, Deals)	✅ Completed

Phase 4	Email Search APIs	🔜

Phase 5	Domain Intelligence	🔜

Phase 6	AI Deal Recommender	🔜

Phase 7	Blockchain-secured Deals	🔜

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
  
## Contributing
Branch: `git checkout -b feature/phase-2-auth`  
Commit: `git commit -m "feat: add user model"`  
PR: Open to main.
