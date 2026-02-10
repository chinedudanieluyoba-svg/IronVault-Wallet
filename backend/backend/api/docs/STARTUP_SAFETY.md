# Startup Safety Checks

## Overview

The application validates all required environment variables **before starting**. If any critical configuration is missing, the app **fails fast** with a clear error message.

## Philosophy

> **Silent failure = dangerous**

In production, missing secrets should cause immediate failure, not runtime errors after deployment.

## Required Environment Variables

The following variables **MUST** be set based on `NODE_ENV`:

### Always Required
- `NODE_ENV` - Environment: `development`, `staging`, or `production`
- `JWT_SECRET` - Secret for signing JWT tokens (min 32 chars)
- `MOONPAY_WEBHOOK_SECRET` - MoonPay webhook signature verification

### Database (Based on NODE_ENV)
- `DATABASE_URL_DEV` - If `NODE_ENV=development`
- `DATABASE_URL_STAGING` - If `NODE_ENV=staging`
- `DATABASE_URL_PROD` - If `NODE_ENV=production`

## Behavior

### ✅ Success Case
```
✅ Environment variables validated

📦 NODE_ENV: production
🗄️  DATABASE: postgresql://user:***@db.neon.tech/cryptowallet
🔐 JWT_SECRET: a3f2...k8j9 (64 chars)

[Nest] 12345  - 02/07/2026, 3:45:23 PM   LOG [NestFactory] Starting Nest application...
```

### ❌ Failure Case
```
❌ CRITICAL: Missing required environment variables

The following environment variables MUST be set:

  ❌ DATABASE_URL_PROD
     → Production PostgreSQL connection string (NODE_ENV=production)

  ❌ JWT_SECRET
     → Secret for signing JWT tokens

  ❌ MOONPAY_WEBHOOK_SECRET
     → MoonPay webhook signature verification secret

Application cannot start without these variables.
Set them in your .env file or environment.

Error: Missing required environment variables: DATABASE_URL_PROD, JWT_SECRET, MOONPAY_WEBHOOK_SECRET
    at EnvironmentValidator.validate
    at bootstrap
```

**App does NOT start** - process exits immediately.

## Optional Variables (with defaults)

These variables are optional. If not set, sensible defaults are used:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `LEDGER_INTEGRITY_INTERVAL_MS` | `900000` (15 min) | Wallet balance check interval |
| `PROVIDER_RECONCILIATION_INTERVAL_MS` | `3600000` (1 hour) | Webhook reconciliation interval |
| `WEBHOOK_RETRY_INTERVAL_MS` | `300000` (5 min) | Failed webhook retry interval |
| `WEBHOOK_MAX_RETRIES` | `3` | Max retry attempts before DLQ |
| `ALERT_BALANCE_MISMATCH_THRESHOLD` | `0.01` | Balance mismatch alert threshold (USD) |
| `ALERT_WEBHOOK_FAILURE_THRESHOLD` | `5` | Webhook failures before alert |
| `ALERT_WEBHOOK_FAILURE_WINDOW_MINUTES` | `60` | Time window for failure count |
| `ALERT_CREDIT_SPIKE_THRESHOLD` | `1000` | Credit spike threshold (USD/min) |

## Testing

Run validation tests:
```bash
npm test -- env-validator.spec.ts
```

## Implementation

See:
- [src/config/env-validator.ts](../src/config/env-validator.ts) - Validation logic
- [src/main.ts](../src/main.ts) - Bootstrap integration
- [.env.example](../.env.example) - Complete variable reference

## Security Notes

✅ **DO:**
- Load secrets from environment variables only
- Use strong, randomly generated secrets (min 32 chars)
- Rotate secrets regularly
- Use different secrets per environment

❌ **DON'T:**
- Hardcode secrets in source code
- Log secrets to console
- Commit `.env` to Git
- Share `.env` files via chat/email

## Production Deployment

For production deployment on Render (or other platforms), see:
- [**Deployment Guide (Render)**](./DEPLOYMENT_RENDER.md) - Complete setup instructions
- [**Quick Fix Guide**](./DEPLOYMENT_QUICKFIX.md) - Troubleshoot deployment errors

These guides explain how to set environment variables on deployment platforms.
