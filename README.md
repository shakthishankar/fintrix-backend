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


![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-blue?style=for-the-badge&logo=express)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2C6F9C?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14%2B-336791?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-Authenticated-success?style=for-the-badge)

Live at: http://localhost:3000  
Tested & working with Thunder Client / Postman
## Current Progress (as of 30 Nov 2025)

| Phase | Feature                         | Status           | Notes                              |
|-------|---------------------------------|------------------|------------------------------------|
| 1     | Setup + DB Connections          | Completed     | PostgreSQL (Prisma) + MongoDB      |
| 2     | Authentication & JWT            | Completed     | Register / Login / Protected routes|
| 3     | Core CRM (Org, Lead, Deal)      | Completed     | Full CRUD + filtering + pagination |
| 4     | Email & Domain Search APIs      | Completed     | Endpoints + models ready           |
| 5     | Blockchain Integration          | Pending       | Next in line                       |
| 6     | AI Recommendations              | Pending       |                                    |
| 7     | Security + Swagger + Tests      | Pending       |                                    |

## API Endpoints (Working Right Now)

### Auth
## Phase 3: CRM & Lead Management APIs (Orgs, Leads, Deals CRUD).
This phase adds the full CRM system including Organizations, Leads, and Deals.

✅ **Task 1: Organization Module**
- Organization model created (`name`, `type`, `website`, `region`, `contact`).
- CRUD routes added at **/api/organizations**.
- Filtering by `type` and `region` implemented.
- Pagination supported using `?page=&limit=`.

✅ **Task 2: User–Organization Relationship**
- Users linked to organizations via **PostgreSQL foreign key (organizationId)**.
- Relationship enforced in Prisma schema.
- User endpoints updated to include organization details.

✅ **Task 3: Leads Module**
- Lead model created (`name`, `email`, `domain`, `status`, `addedBy`).
- CRUD routes added at **/api/leads**.
- Filtering supported by:
  - `status`
  - `addedById`
  - `domain`
- Pagination integrated for lead listings.

✅ **Task 4: Deals Module**
- Complex many-to-many deal structure implemented:
  - Multiple startups per deal
  - Multiple investors per deal  
- Enum fields added:
  - Stage → `NEW`, `NEGOTIATING`, `DUE_DILIGENCE`, `CLOSED`
  - Status → `ACTIVE`, `LOST`, `WON`
- Full CRUD routes at **/api/deals**
- Filtering by:
  - Stage  
  - Startup IDs  
  - Investor IDs  
- Pagination supported.

✅ **Task 5: Database Integration**
- Prisma schema fully updated with:
  - Organizations
  - Users
  - Leads
  - Deals
  - Join tables: `DealStartup`, `DealInvestor`
- Migrations generated & applied to PostgreSQL.
- All foreign key constraints validated.


✅ Phase 3 fully completed — CRM APIs are ready for production and integration.

🛣️ Roadmap
Phase	Feature	Status
Phase 1	Setup & Infra	✅ Completed

Phase 2	Authentication + JWT	✅ Completed

Phase 3	CRM Core (Org, Leads, Deals)	✅ Completed

Phase 4	Email Search APIs	✅ Completed

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
  
