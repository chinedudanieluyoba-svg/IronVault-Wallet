# Crypto Wallet Platform API

Production-grade cryptocurrency wallet platform with comprehensive reconciliation, audit trails, and human-in-the-loop financial controls.

[![NestJS](https://img.shields.io/badge/NestJS-10.x-E0234E?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)
[![Tests](https://img.shields.io/badge/Tests-84%20passed-success)](./docs/ARCHITECTURE.md)

## Core Philosophy

**Detect-First, Fix-Second**

This system is designed with the principle that **financial data should never be automatically corrected**. Instead:
- ✅ Detect discrepancies immediately
- ✅ Alert human operators
- ✅ Provide complete audit trail
- ✅ Require explicit admin approval for corrections
- ❌ NO automatic balance adjustments
- ❌ NO silent error recovery

> *"If something breaks, we'll know — and we can prove what happened."*

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+ (or Neon database)
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Generate a secure JWT secret
npm run generate:jwt-secret
# Copy the generated secret and add it to your .env file

# Edit .env with your database credentials and JWT secret

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run migrate:dev

# Start development server
npm run start:dev
```

### First Steps

```bash
# Create a user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","name":"Test User"}'

# Create a wallet
curl -X POST http://localhost:3000/wallet \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{"currency":"USD"}'

# Check wallet balance
curl http://localhost:3000/wallet/<wallet-id>/balance \
  -H "Authorization: Bearer <your-token>"
```

## Documentation

| Document | Description |
|----------|-------------|
| [Architecture](./docs/ARCHITECTURE.md) | System design, data flows, and deployment |
| [API Reference](./docs/API_REFERENCE.md) | Complete REST API documentation |
| [**Backend Deployment Guide (Railway)**](./docs/DEPLOYMENT_RAILWAY.md) | **Backend service deployment on Railway** |
| [Railway Troubleshooting](./docs/DEPLOYMENT_RAILWAY.md#troubleshooting) | Common Railway deployment failures and quick fixes |
| [Platform Deployment (Railway + Vercel + Neon)](../docs/deployment.md) | Monorepo topology and frontend/backend split |
| [Database Safety](./docs/DATABASE_SAFETY.md) | Migration procedures and backup strategy |
| [Secrets Management](./docs/SECRETS_AND_ACCESS_CONTROL.md) | Security controls and rotation procedures |
| [Rate Limiting](./docs/RATE_LIMITING.md) | Abuse protection and rate limit configuration |
| [Database Operations](./docs/DATABASE_OPERATIONS.md) | Daily operations and troubleshooting |

## Architecture Overview

```
┌─────────────────┐
│  Client Apps    │
│ (Web + Mobile)  │
└────────┬────────┘
         │
    ┌────┴────┐
    │   LB    │ ← Health checks (/health, /ready)
    └────┬────┘
         │
┌────────┴────────────────────────────┐
│         NestJS API Server           │
│                                     │
│  ┌──────────┐  ┌──────────┐       │
│  │  Wallet  │  │  OnRamp  │       │
│  │  Module  │  │  Module  │       │
│  └────┬─────┘  └────┬─────┘       │
│       │             │              │
│  ┌────┴─────────────┴──────────┐  │
│  │   Immutable Ledger          │  │
│  │   (WalletLedgerEntry)       │  │
│  └─────────────┬────────────────┘  │
└────────────────┼───────────────────┘
                 │
        ┌────────┴────────┐
        │   PostgreSQL    │
        │   (Neon DB)     │
        └─────────────────┘
            │
        ┌───┴───┐
        │ S3/GCS│ ← Daily backups
        └───────┘

Background Jobs:
• Wallet Reconciliation (15 min)
• Provider Reconciliation (1 hour)
• Webhook Retry (5 min)
```

## ✨ Key Features

### 1. **Immutable Ledger**
Every balance change recorded with:
- Amount
- Balance before/after
- Source (admin, webhook, user)
- Reference ID
- Timestamp
- Description

```typescript
// Example ledger entry
{
  walletId: "wallet_123",
  type: "deposit",
  amount: 100.00,
  balanceBefore: 900.50,
  balanceAfter: 1000.50,
  source: "webhook",
  providerEventId: "moonpay_tx_456",
  reference: "onramp_123",
  createdAt: "2026-02-07T10:00:00.000Z"
}
```

### 2. **Background Reconciliation**
Three automated jobs detect discrepancies:

**Wallet Reconciliation (Every 15 min)**
- Validates `Wallet.balance = SUM(WalletLedgerEntry.amount)`
- Flags mismatches for human review
- Never auto-corrects

**Provider Reconciliation (Every 1 hour)**
- Compares local records vs provider records
- Detects missing/duplicate webhooks
- Generates alerts

**Webhook Retry (Every 5 min)**
- Retries failed webhooks up to 5 times
- Exponential backoff
- Moves to Dead Letter Queue after 5 failures

### 3. **Alert System**
Four critical alert types:

| Alert Type | Severity | Trigger | Response |
|------------|----------|---------|----------|
| `BALANCE_MISMATCH` | Critical | Wallet.balance ≠ Ledger | Human investigation required |
| `WEBHOOK_FAILURE` | High | 5+ webhook failures | DLQ review + manual processing |
| `JOB_CRASH` | Critical | Reconciliation job crashed | Immediate investigation |
| `CREDIT_SPIKE` | Medium | Unusual credit volume | Fraud review |

### 4. **Dead Letter Queue**
Failed events requiring human review:
```typescript
{
  provider: "moonpay",
  externalId: "moonpay_tx_456",
  payload: { /* full event */ },
  failureReason: "Signature verification failed",
  attempts: 5,
  resolved: false,
  createdAt: "2026-02-07T10:00:00.000Z"
}
```

### 5. **Admin Audit Trail**
Every admin action logged:
```typescript
{
  adminId: "admin_123",
  action: "emergency_credit",
  targetUserId: "user_456",
  targetWalletId: "wallet_789",
  metadata: { amount: 100, reason: "Support case #12345" },
  ipAddress: "192.168.1.100",
  createdAt: "2026-02-07T10:00:00.000Z"
}
```

### 6. **Rate Limiting**
Tiered protection:
- **Auth:** 5 req/min (prevents brute-force)
- **Admin Emergency:** 2 req/min (prevents accidents)
- **Wallet Writes:** 10 req/min
- **Wallet Reads:** 30 req/min
- **Webhooks:** Unlimited (IP + signature gated)

### 7. **Production Safety**
- Environment variable validation (fail-fast on startup)
- Database migration checks
- Secret rotation enforcement (90-day policy)
- Health & readiness endpoints
- Stack trace hiding (production)
- CORS lockdown (production)

### 8. **Metrics & Monitoring**
Structured logs for:
- Wallet operations (credit, debit, balance checks)
- Webhook processing (success, failures, retries)
- Error rates
- Performance timings

```json
{
  "type": "METRIC",
  "metric": "wallet_operation",
  "operation": "credit",
  "success": true,
  "amount": 100.00,
  "currency": "USD",
  "durationMs": 45,
  "timestamp": "2026-02-07T10:00:00.000Z"
}
```

## Development

### Available Scripts

```bash
# Development
npm run start:dev          # Start with hot-reload
npm run start:debug        # Start with debugger

# Production
npm run build              # Compile TypeScript
npm run start:prod         # Start production server

# Database
npm run prisma:generate    # Generate Prisma client
npm run migrate:dev        # Run migrations (dev)
npm run migrate:deploy     # Run migrations (production)
npm run db:seed            # Seed test data
npm run db:backup:prod     # Create backup
npm run db:restore:prod    # Restore from backup

# Testing
npm test                   # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Generate coverage report
npm run test:e2e           # Run end-to-end tests

# Code Quality
npm run lint               # Run ESLint
npm run format             # Run Prettier

# Security & Secrets
npm run generate:jwt-secret # Generate secure JWT secret
```

### Generating JWT Secrets

To generate a secure JWT secret for your application:

```bash
# Method 1: Use the built-in script (recommended)
npm run generate:jwt-secret

# Method 2: Use Node.js crypto directly
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Method 3: Use OpenSSL
openssl rand -base64 32
```

The built-in script (`npm run generate:jwt-secret`) provides:
- 128-character cryptographically secure random string
- Step-by-step instructions for adding to `.env`
- Automatic rotation date calculation
- Security best practices reminders

**Important:**
- Never commit `.env` files to version control
- Use different secrets for development, staging, and production
- Rotate secrets every 90 days in production
- Store production secrets in a secure secret manager (AWS Secrets Manager, HashiCorp Vault, etc.)
```

### Environment Variables

**Required:**
```bash
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/wallet_db
JWT_SECRET=your-jwt-secret  # Generate with: npm run generate:jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
MOONPAY_WEBHOOK_SECRET=your-moonpay-secret
```

**Optional:**
```bash
PORT=3000
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://app.example.com
WEBHOOK_ALLOWED_IPS=52.18.100.50,52.18.100.51
JWT_SECRET_ROTATION_DATE=2026-02-07
DATABASE_PASSWORD_ROTATION_DATE=2026-02-07
```

See [.env.example](./.env.example) for complete list.

## 🧪 Testing

**Test Coverage:** 84/84 tests passing (100%)

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov
```

### Test Structure
```
src/
├── wallet/
│   ├── wallet.service.spec.ts
│   └── services/
│       └── wallet-ledger.service.spec.ts
├── onramp/
│   ├── onramp.service.spec.ts
│   └── providers/
│       └── moonpay.parser.spec.ts
└── admin/
    ├── alerts.service.spec.ts
    └── admin-access.logger.spec.ts
```

## Security

### Authentication
- JWT with 15-minute expiration
- Refresh tokens with 7-day expiration
- Role-based access control (USER, ADMIN)

### Webhook Protection
- IP allowlist (CIDR + wildcard support)
- HMAC signature verification
- Idempotency enforcement

### Database Security
- SSL required in production
- Connection pooling (max 100)
- Least-privilege access validation

### Secrets Management
- 90-day rotation policy enforced
- Rotation date tracking
- Production validation on startup

See [SECRETS_AND_ACCESS_CONTROL.md](./docs/SECRETS_AND_ACCESS_CONTROL.md) for details.

## API Endpoints

| Method | Endpoint | Description | Rate Limit |
|--------|----------|-------------|------------|
| `POST` | `/auth/register` | Register new user | 5/min |
| `POST` | `/auth/login` | Login | 5/min |
| `GET` | `/wallet` | List my wallets | 30/min |
| `POST` | `/wallet` | Create wallet | 10/min |
| `GET` | `/wallet/:id` | Get wallet details | 30/min |
| `GET` | `/wallet/:id/balance` | Get balance | 30/min |
| `GET` | `/wallet/:id/ledger` | Get ledger entries | 30/min |
| `POST` | `/onramp/initiate` | Start fiat deposit | 15/min |
| `POST` | `/onramp/webhook/:provider` | Provider callback | ∞ (gated) |
| `GET` | `/transaction` | List transactions | 20/min |
| `POST` | `/admin/emergency-credit` | Manual credit | 2/min ⚠️ |
| `GET` | `/admin/alerts/unresolved` | Get alerts | 100/min |
| `GET` | `/admin/dlq` | Get DLQ events | 100/min |
| `GET` | `/health` | Health check | ∞ |
| `GET` | `/ready` | Readiness check | ∞ |

See [API_REFERENCE.md](./docs/API_REFERENCE.md) for complete documentation.

## Deployment

### Deployment Guides

Choose your deployment platform:

- **[Railway + Vercel + Neon](../docs/deployment.md)** - Recommended monorepo setup
- **[Docker](./docs/ARCHITECTURE.md)** - Self-hosted, full control
- **[Kubernetes](./docs/ARCHITECTURE.md)** - Enterprise scale, complex setup

### Quick Deploy to Railway

1. **Project Setup**: Use Railway with `railway.toml` (in repository root)
   ```bash
  # Commit railway.toml to your repo (already included)
   git push origin main

  # Go to Railway Dashboard → New Project
  # Connect repository → select backend service
   ```

2. **Manual Setup**: Follow [Backend Deployment Guide](./docs/DEPLOYMENT_RAILWAY.md)

### Production Checklist

- [ ] Environment variables configured (see [Backend Deployment Guide](./docs/DEPLOYMENT_RAILWAY.md))
- [ ] Database migrations deployed (`npm run migrate:deploy`)
- [ ] SSL/TLS enabled (managed by Railway)
- [ ] CORS origins configured (`CORS_ALLOWED_ORIGINS`)
- [ ] Webhook IP allowlist set (optional: `WEBHOOK_ALLOWED_IPS`)
- [ ] Secrets rotation dates tracked
- [ ] Backup automation enabled
- [ ] Health check endpoints verified (`/health`, `/ready`)
- [ ] Alert notifications configured
- [ ] Admin accounts created

### Required Environment Variables

For production deployment, you **must** set these variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@host/db` |
| `JWT_SECRET` | JWT signing secret | Generate: `openssl rand -base64 32` |
| `MOONPAY_WEBHOOK_SECRET` | MoonPay webhook secret | From MoonPay dashboard |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend domains | `https://app.yourdomain.com` |

**See [Backend Deployment Guide](./docs/DEPLOYMENT_RAILWAY.md) for backend setup and [Platform Deployment Guide](../docs/deployment.md) for full architecture.**

### Docker Deployment

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci
COPY backend .
RUN npx prisma generate
RUN npm run build
CMD ["npm", "run", "start:prod"]
```

### Kubernetes Health Checks

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
```

See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for deployment architecture.

## Performance

**Target Metrics:**
- p50 latency: <50ms
- p95 latency: <200ms
- p99 latency: <500ms
- Wallet credit operation: <100ms
- Full reconciliation: <5 minutes

**Database Indexes:**
- `userId` on Wallet, Transaction
- `walletId` on WalletLedgerEntry, Transaction
- `externalId` on WebhookEvent (unique)
- `status` on WebhookEvent, AlertLog
- `createdAt` on all tables

## Troubleshooting

### Common Issues

**Database connection fails:**
```bash
# Check connection string
echo $DATABASE_URL

# Test connection
npm run prisma:studio
```

**Migrations pending:**
```bash
# Check migration status
npm run migrate:status

# Deploy migrations
npm run migrate:deploy
```

**Secrets rotation warning:**
```bash
# Update rotation dates in .env
JWT_SECRET_ROTATION_DATE=2026-02-07
DATABASE_PASSWORD_ROTATION_DATE=2026-02-07
```

See [DATABASE_OPERATIONS.md](./docs/DATABASE_OPERATIONS.md) for operations guide.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

**Development Guidelines:**
- Write tests for new features
- Update documentation
- Follow existing code style
- Add audit logging for sensitive operations

## License

MIT License - see [LICENSE](../../../LICENSE) for details.

## Acknowledgments

Built with:
- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [PostgreSQL](https://www.postgresql.org/) - Powerful open-source database
- [Neon](https://neon.tech/) - Serverless PostgreSQL

## Support

- Documentation: [docs/](./docs/)
- Issues: [GitHub Issues](https://github.com/yourusername/cryptowallet-platform/issues)
- Email: support@example.com

---

**Built with ❤️ for production-grade fintech applications**

