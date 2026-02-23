# Deploying Backend to Railway

This guide covers deploying the NestJS backend service on Railway for this monorepo.

## Prerequisites

- Railway account and project access
- Repository connected to Railway
- PostgreSQL database URL (Neon or Railway Postgres)

## Service Configuration

Railway can use either `railway.toml` or `railway.json` from repository root. Current repo configuration includes:

- Build builder: `DOCKERFILE`
- Dockerfile path: `backend/Dockerfile`
- Start command: `npm run start:prod`

## Deploy Steps

1. In Railway, create/select your project.
2. Add a service from your GitHub repository.
3. Ensure service uses root configs (`railway.toml` / `railway.json`).
4. Set required environment variables.
5. Deploy and verify health endpoints.

## Required Environment Variables

| Variable | Description |
|----------|-------------|
| `NODE_ENV` | Set to `production` |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | JWT signing secret |
| `MOONPAY_WEBHOOK_SECRET` | MoonPay webhook secret |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins |

## Post-Deploy Checklist

- Run migrations: `cd backend && npm run migrate:deploy`
- Verify `GET /health` returns `200`
- Verify `GET /ready` returns `200`
- Confirm CORS includes your Vercel frontend domain
- Validate webhook secret and webhook endpoint configuration

## Notes

- Frontend deployment remains on Vercel from the `web` directory.
- For full platform topology (Railway + Vercel + Neon), see [../../docs/deployment.md](../../docs/deployment.md).

## Troubleshooting

### Build fails on Railway

Common causes:

- Dependency install issues
- Prisma client not generated
- TypeScript compile errors

Quick checks:

```bash
cd backend
npm install
npx prisma generate
npm run build
```

If this fails locally, Railway build will also fail.

### Service starts but immediately crashes

Common causes:

- Missing required environment variables
- Invalid `DATABASE_URL`
- Database connectivity or SSL mismatch

Quick checks:

- Confirm `NODE_ENV=production`
- Confirm `DATABASE_URL`, `JWT_SECRET`, `MOONPAY_WEBHOOK_SECRET`, `CORS_ALLOWED_ORIGINS` are set
- Verify database URL is reachable from Railway

### `GET /ready` fails after deploy

Common causes:

- Migrations not applied
- Secrets/config validation failing

Quick fix:

```bash
cd backend && npm run migrate:deploy
```

Then re-check:

- `GET /health` should return `200`
- `GET /ready` should return `200`

### CORS errors from Vercel frontend

Common causes:

- Missing Vercel domain in `CORS_ALLOWED_ORIGINS`
- Wrong protocol/domain in environment value

Quick fix:

- Add your exact Vercel domain(s) to `CORS_ALLOWED_ORIGINS`
- Redeploy or restart backend service on Railway

### Webhooks not being accepted

Common causes:

- Missing/incorrect `MOONPAY_WEBHOOK_SECRET`
- Provider webhook URL points to wrong backend domain

Quick fix:

- Verify `MOONPAY_WEBHOOK_SECRET` matches provider dashboard value
- Confirm provider webhook target uses your Railway backend URL
