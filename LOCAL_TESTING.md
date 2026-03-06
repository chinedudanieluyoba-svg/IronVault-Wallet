# Local Testing Guide

## Product Direction (Non-Custodial)

- IronVault acts as interface + intelligence.
- Blockchain is the settlement layer.
- Binance is used only as a fiat on-ramp redirect.
- Dashboard source of truth should be on-chain balances (RPC), token portfolio (indexer), and swap history (transaction hashes), not exchange account balances.

## Documentation Map

See [Architecture](./docs/architecture.md), [Deployment](./docs/deployment.md), [Security](./docs/security.md), and [Backend API](./backend/README.md).

## Backend Structure Verification

The backend contains all required files:
```
backend/
├── src/
│   ├── main.ts (entry point)
│   ├── app.controller.ts (routes)
│   ├── app.service.ts
│   └── ... (NestJS modules)
├── prisma/
│   ├── schema.prisma (database schema)
│   └── migrations/
├── package.json ✓
├── tsconfig.json ✓
├── nest-cli.json ✓
├── dist/ (compiled output)
└── node_modules/
```

## Backend Build Verification

✅ **Build Status: SUCCESS**
```bash
cd backend
npm install        # 1037 packages installed
npm run build      # Compilation successful → dist/ folder created
```

### Backend Endpoints
- `GET /` → Returns "Hello World!"
- `GET /health` → Returns `{ status: "ok", timestamp: "2024-02-17T..." }`

## Frontend Structure Verification

The frontend is built with Next.js 16.1.6 using App Router:
```
web/
├── app/
│   ├── layout.tsx (root layout)
│   ├── page.tsx (landing page)
│   └── globals.css
├── components/
│   ├── Header.tsx (navigation)
│   └── HealthCheck.tsx ← Connects to backend/health
├── lib/
│   └── api.ts (API client)
├── public/
├── .env.local (environment variables)
├── next.config.js ✓
├── tsconfig.json ✓
├── package.json ✓
└── node_modules/
```

## Local Testing Instructions

### Option 1: Run Backend & Frontend Sequentially

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run start:dev    # Runs on http://localhost:3000
# Output: "🚀 Application listening on port 3000"
```

**Terminal 2 - Frontend Server (different port):**
```bash
cd web
npm run dev          # Runs on http://localhost:3001
# Output: "▲ Next.js 16.1.6 ... ready in XXXms"
# Then open http://localhost:3001
```

### Option 2: Run Backend on Custom Port

**Terminal 1 - Backend on Port 3001:**
```bash
cd backend
PORT=3001 npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd web
npm run dev          # Runs on http://localhost:3000
# Open http://localhost:3000
```

Note: The `web/.env.local` file is configured for `NEXT_PUBLIC_API_URL=http://localhost:3001`

## Frontend-to-Backend Connection

### Health Check Component
The frontend HealthCheck component (`web/components/HealthCheck.tsx`):
1. ✨ Fetches `/health` from backend automatically on page load
2. 🟢 Shows **green status** when backend is reachable
3. 🔴 Shows **red error** when backend is down
4. 🔄 Refreshes every 10 seconds
5. ⏱️ Displays last successful connection timestamp

### API Integration Layer
All API calls go through `web/lib/api.ts`:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchBackendHealth() {
  // Handles CORS, error handling, and JSON parsing
}
```

## Testing the Connection

### Manual Test via curl

**Check Backend Health:**
```bash
curl http://localhost:3000/health
# Response: {"status":"ok","timestamp":"2024-02-17T..."}
```

**Check Root Endpoint:**
```bash
curl http://localhost:3000/
# Response: Hello World!
```

### Browser Test
1. Open Frontend: http://localhost:3000 (or 3001 if using Option 1)
2. Look for **green "Backend Connected"** badge at top
3. Timestamp should update every 10 seconds
4. Stop backend server → Badge turns **red with error message**
5. Restart backend → Badge turns green again

## Environment Variables

### Backend Default Port
- Port: `3000` (set via `PORT` environment variable)
- Use `PORT=3001 npm run start:dev` to change

### Frontend Configuration
**web/.env.local** (already created):
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

For production (when deploying):
```
NEXT_PUBLIC_API_URL=https://your-railway-backend.railway.app
```

## Build Verification

Both applications build successfully:

**Backend:**
```
✅ npm run build → dist/ folder generated
✅ Ready for: node dist/src/main.js
```

**Frontend:**
```
✅ npm run build → .next/ folder generated
✅ Ready for: npm start (production server)
```

## Docker Build Flow (Backend)

Backend Docker build uses this layer order for dependency caching:

```dockerfile
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci
COPY backend .
RUN npx prisma generate
RUN npm run build
```

Build and run:

```bash
cd /workspaces/cryptowallet-platform
docker build -f backend/Dockerfile -t cryptowallet-api .
docker run --rm -p 3000:3000 --env-file .env cryptowallet-api
```

## Development Workflow

**Continuous Development:**
```bash
# Terminal 1 - Backend with watch mode
cd backend && npm run start:dev

# Terminal 2 - Frontend with hot reload
cd web && npm run dev

# Any changes auto-compile in both terminals
```

**Building for Production:**
```bash
# Backend
cd backend && npm run build && npm run start:prod

# Frontend
cd web && npm run build && npm start
```

## Troubleshooting

### Backend won't start
```bash
# Ensure Prisma client is generated
cd backend && npx prisma generate && npm run build
```

### Frontend shows "Backend Error: ...undefined"
1. Verify backend is running on correct port
2. Check `NEXT_PUBLIC_API_URL` in `web/.env.local`
3. Ensure backend responds to `GET /health`
4. Check browser console for CORS errors

### Port already in use
```bash
# Find process using port
lsof -i :3000
# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm run start:dev  # Backend
# Frontend auto-adjusts if .env.local points to 3001
```

### Install issues
```bash
# Clean reinstall
cd backend && rm -rf node_modules package-lock.json && npm install
cd ../web && rm -rf node_modules package-lock.json && npm install
```

## Status Summary

| Component | Status | Location | Port |
|-----------|--------|----------|------|
| Backend (NestJS) | ✅ Tested | `backend/` | 3000 |
| Frontend (Next.js) | ✅ Tested | `web/` | 3000/3001 |
| Health Check | ✅ Connected | `GET /health` | Automatic |
| Prisma ORM | ✅ Generated | `node_modules/@prisma/client` | N/A |
| Build Output | ✅ Ready | `backend/dist` + `web/.next` | N/A |

