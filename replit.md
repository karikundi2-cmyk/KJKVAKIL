# VakilSetu — AI-Powered Legal Intelligence Platform

## Overview
VakilSetu is an AI-powered full-stack legal platform for the Indian legal system. It connects clients with lawyers, provides automated legal guidance, case analysis, document generation, and self-representation workflows.

## Architecture

### Stack
- **Backend**: Python 3.12 / FastAPI / Uvicorn — port 8000
- **Frontend**: React 19 / Tailwind CSS / Shadcn/Radix UI / craco — port 5000
- **Database**: MongoDB Atlas (cloud-hosted, connection string in `server.py`)
- **AI**: OpenAI GPT-4o-mini via `EMERGENT_LLM_KEY` env variable
- **Payments**: Stripe (`STRIPE_API_KEY`)

### Directory Structure
```
kjk-vakil-main/vakil-main/
├── backend/
│   ├── server.py              # All FastAPI routes and logic (3000+ lines)
│   ├── requirements.txt
│   ├── decision_trees.json    # Interactive Q&A decision tree
│   ├── comprehensive_ipc_laws.json
│   └── past_cases_data.json
└── frontend/
    ├── src/
    │   ├── App.js             # Routes
    │   ├── contexts/AuthContext.js
    │   ├── lib/api.js         # API_URL (empty string — uses craco proxy)
    │   ├── pages/             # All page components
    │   └── components/        # Reusable UI components
    └── craco.config.js        # Proxies /api → localhost:8000
```

## Key Features

### Modules
1. **Legal Intelligence Engine** (`/client/dashboard`) — 5-phase AI case analysis (Describe → Analyze → Questions → Results → NyayID)
2. **NyayID** — Unique legal case profile with PDF export
3. **Lawyer Matching** — TF-IDF based lawyer/law/case similarity search
4. **Affidavit Builder** (`/client/affidavit`) — AI-generated affidavits with translation
5. **Bookings & Consultations** — Schedule video/chat consultations with lawyers
6. **Legal Writer Drafts** — Crowdsourced legal document drafting
7. **IPC Browser** (`/ipc`) — Browse Indian Penal Code sections
8. **Party in Person** (`/client/pip`) — Self-representation guided workflows (see below)

### Party in Person (PIP) Module — Added
Self-representation system for Low-risk cases.

**Backend endpoints** (all under `/api/pip/`):
- `POST /pip/initiate` — Create PIP case (Low risk only); sets `isSelfRepresented=true`
- `GET /pip/workflow/{case_id}` — Return step-by-step workflow
- `POST /pip/next-step` — Advance workflow stage, trigger notifications
- `POST /pip/request-doc` — Switch to lawyer-assisted documentation
- `POST /pip/submit` — (pre-existing) Format party statements

**Workflow Engine** (in-memory, `PIP_WORKFLOWS` dict in `server.py`):
- Consumer Complaint (4 steps)
- Rental Dispute (4 steps)
- Affidavit Filing (4 steps)

**Case document fields added**:
- `isSelfRepresented`: Boolean
- `riskLevel`: Low | Medium | High
- `workflowType`: consumer_complaint | rental_dispute | affidavit_filing
- `workflowStage`: Number (0-indexed)
- `workflowSteps`: Array of step objects
- `documentationStatus`: Pending | Completed | Lawyer Assistance Requested

**Frontend**: `src/pages/PartyInPerson.js`  
**Route**: `/client/pip` (ProtectedRoute, client role)  
**Entry point**: "Handle Case Yourself" green CTA button in ClientHome results phase (only shown when `riskData.risk_level === 'Low'`)

## Workflows (Replit)
- **Backend API**: `cd kjk-vakil-main/vakil-main/backend && uvicorn server:app --host 0.0.0.0 --port 8000 --reload`
- **Start application**: `cd kjk-vakil-main/vakil-main/frontend && PORT=5000 npm start`

## Environment Variables Needed
- `EMERGENT_LLM_KEY` — OpenAI proxy key for AI features
- `STRIPE_API_KEY` — Stripe payments
- `JWT_SECRET` — JWT signing (defaults to dev key)

## Frontend Routes
| Path | Component | Access |
|------|-----------|--------|
| `/` | Home | Public |
| `/client/dashboard` | ClientHome (Intelligence Engine) | Client |
| `/client/cases` | MyCases | Client |
| `/client/pip` | PartyInPerson | Client |
| `/client/affidavit` | AffidavitBuilder | Client |
| `/client/lawyers` | FindLawyers | Client |
| `/lawyer/dashboard` | LawyerDashboard | Lawyer |
| `/ipc` | IPCBrowser | Public |
