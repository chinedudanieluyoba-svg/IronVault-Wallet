# 🚀 Deploying to Render

This guide walks you through deploying the Crypto Wallet Platform API to [Render](https://render.com).

## Prerequisites

- [Render account](https://dashboard.render.com/register) (free tier available)
- PostgreSQL database (Render provides this, or use [Neon](https://neon.tech))
- GitHub repository access

## Quick Start

### 1. Create PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `cryptowallet-db-prod`
   - **Database**: `cryptowallet`
   - **User**: `cryptowallet_user`
   - **Region**: Choose closest to your users
   - **Plan**: Starter (free) or higher for production
4. Click **"Create Database"**
5. **Copy the Internal Database URL** (starts with `postgresql://`)
   - ⚠️ Use **Internal Database URL** for better performance
   - Save this - you'll need it for `DATABASE_URL_PROD`

### 2. Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `cryptowallet-api`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `backend/backend/api` (if monorepo)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run prisma:generate && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Plan**: Starter (free) or higher for production

### 3. Set Environment Variables (Optional)

**Note:** If you're using the `render.yaml` Blueprint deployment, all required environment variables are automatically configured with placeholder values. The app will start successfully with warnings, allowing you to update the secrets after the initial deployment completes.

**For Manual Deployment:** Click **"Environment"** tab and add these variables:

#### Required Variables

| Variable | Value | How to Get |
|----------|-------|------------|
| `NODE_ENV` | `production` | Fixed value (auto-set in Blueprint) |
| `DATABASE_URL_PROD` | `postgresql://user:pass@host/db` | From Step 1. Blueprint sets placeholder - update after first deploy |
| `JWT_SECRET` | Generate secure secret | Blueprint sets placeholder. Update with: `openssl rand -base64 32` or use Render's Generate button |
| `MOONPAY_WEBHOOK_SECRET` | Your MoonPay secret | From [MoonPay Dashboard](https://www.moonpay.com/dashboard). Placeholder set in Blueprint - update after first deploy |
| `CORS_ALLOWED_ORIGINS` | `https://yourdomain.com` | Your frontend domain(s), comma-separated. Placeholder set in Blueprint - update after first deploy |

#### Optional Variables (with sensible defaults)

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port (Render auto-configures) |
| `LEDGER_INTEGRITY_INTERVAL_MS` | `900000` | Wallet balance check interval (15 min) |
| `PROVIDER_RECONCILIATION_INTERVAL_MS` | `3600000` | Provider reconciliation interval (1 hour) |
| `WEBHOOK_RETRY_INTERVAL_MS` | `300000` | Failed webhook retry interval (5 min) |
| `WEBHOOK_MAX_RETRIES` | `3` | Max webhook retry attempts |
| `ALERT_BALANCE_MISMATCH_THRESHOLD` | `0.01` | Balance mismatch threshold ($0.01) |
| `ALERT_WEBHOOK_FAILURE_THRESHOLD` | `5` | Webhook failure alert threshold |
| `ALERT_WEBHOOK_FAILURE_WINDOW_MINUTES` | `60` | Webhook failure time window (minutes) |
| `ALERT_CREDIT_SPIKE_THRESHOLD` | `1000` | Credit spike alert threshold ($/min) |

### 4. Deploy

1. Click **"Create Web Service"**
2. Render will:
   - Build your application
   - Run Prisma migrations
   - Start the server (with placeholder values for secrets if using Blueprint)
3. Monitor logs for:
   ```
   ✅ Environment variables validated
   ⚠️  Optional environment variables not set (using defaults):
      🚨 CRITICAL WARNING: DATABASE_URL_PROD is using a placeholder value.
      🚨 CRITICAL WARNING: JWT_SECRET is using a placeholder value.
      🚨 CRITICAL WARNING: MOONPAY_WEBHOOK_SECRET is using a placeholder value.
      🚨 CRITICAL WARNING: CORS_ALLOWED_ORIGINS is using a placeholder value.
   📦 NODE_ENV: production
   🗄️  DATABASE: PLACEHOLDER_UPDATE_IN_RENDER_DASHBOARD (masked)
   🔐 JWT_SECRET: PLAC...HBOARD (masked)
   🚀 Application listening on port 10000
   ```
4. **Important:** Update all placeholder values immediately after first deployment:
   - Go to **Environment** tab in Render Dashboard
   - Update `DATABASE_URL_PROD` with the Internal Database URL from your PostgreSQL service
   - Update `JWT_SECRET` with a secure random value (`openssl rand -base64 32` or use Render's Generate button)
   - Update `MOONPAY_WEBHOOK_SECRET` with your actual MoonPay webhook secret
   - Update `CORS_ALLOWED_ORIGINS` with your actual frontend domain(s)
   - Click "Save Changes" - Render will automatically restart the service

### 5. Run Database Migrations

After first deployment:

1. Go to your web service → **"Shell"** tab
2. Run migrations:
   ```bash
   cd /opt/render/project/src/backend/backend/api
   npx prisma migrate deploy
   ```

Or add a **Deploy Hook** to run migrations automatically (see below).

## Configuration Details

### Generating Secrets

```bash
# JWT_SECRET (minimum 32 characters)
openssl rand -base64 32

# Or use a longer secret
openssl rand -base64 64
```

### CORS Configuration

**Single Origin:**
```
CORS_ALLOWED_ORIGINS=https://app.yourdomain.com
```

**Multiple Origins (comma-separated):**
```
CORS_ALLOWED_ORIGINS=https://app.yourdomain.com,https://admin.yourdomain.com,https://yourdomain.com
```

### Database URL Format

```
postgresql://[user]:[password]@[host]:[port]/[database]?sslmode=require
```

**Example:**
```
postgresql://cryptowallet_user:abc123xyz@dpg-abc123xyz-a.oregon-postgres.render.com/cryptowallet?sslmode=require
```

## Advanced Configuration

### Automatic Migrations on Deploy

Create a `render.yaml` in your repository root:

```yaml
services:
  - type: web
    name: cryptowallet-api
    runtime: node
    region: oregon
    plan: starter
    buildCommand: npm install && npm run prisma:generate && npm run build
    startCommand: npm run migrate:deploy && npm run start:prod
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL_PROD
        fromDatabase:
          name: cryptowallet-db-prod
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
      - key: MOONPAY_WEBHOOK_SECRET
        sync: false
      - key: CORS_ALLOWED_ORIGINS
        sync: false

databases:
  - name: cryptowallet-db-prod
    plan: starter
    region: oregon
```

### Health Checks

Render automatically monitors:
- **Liveness**: `GET /health` (returns 200 if app is running)
- **Readiness**: `GET /ready` (returns 200 if database is connected)

Configure in Render Dashboard → **Health Check Path**: `/health`

### Custom Domain

1. Go to **Settings** → **Custom Domain**
2. Add your domain: `api.yourdomain.com`
3. Update DNS:
   ```
   CNAME api yourdomain.onrender.com
   ```
4. Update `CORS_ALLOWED_ORIGINS` to include your frontend domain

### Scaling

**Vertical Scaling (Render Plans):**
- **Starter**: 0.5 GB RAM, 0.5 CPU
- **Standard**: 2 GB RAM, 1 CPU
- **Pro**: 4 GB RAM, 2 CPU

**Horizontal Scaling:**
- Render doesn't support multiple instances on free tier
- Use Standard+ plan for horizontal scaling

## Security Best Practices

### 1. Rotate Secrets Regularly

Set rotation reminders (every 90 days):
```bash
JWT_SECRET_ROTATION_DATE=2026-02-07
DB_CREDENTIALS_ROTATION_DATE=2026-02-07
MOONPAY_SECRET_ROTATION_DATE=2026-02-07
```

### 2. Lock Down CORS

**❌ Don't:**
```
CORS_ALLOWED_ORIGINS=*
```

**✅ Do:**
```
CORS_ALLOWED_ORIGINS=https://app.yourdomain.com,https://admin.yourdomain.com
```

### 3. Use Internal Database URL

Render provides two database URLs:
- **External**: For connecting from outside Render (slower)
- **Internal**: For connecting from Render services (faster, more secure)

Always use **Internal Database URL** for `DATABASE_URL_PROD`.

### 4. Enable Webhook IP Filtering (Optional)

If you know provider IPs, add them:
```
WEBHOOK_ALLOWED_IPS=52.18.0.0/16,34.248.0.0/16
```

## Monitoring

### Logs

View real-time logs in Render Dashboard → **Logs** tab:
```
✅ Environment variables validated
📦 NODE_ENV: production
🗄️  DATABASE: postgresql://user:***@...
✅ CORS enabled for: https://yourdomain.com
🚀 Application listening on port 10000
```

### Metrics

Monitor in Render Dashboard → **Metrics**:
- CPU usage
- Memory usage
- Request count
- Response time
- Error rate

### Alerts

Set up email alerts:
1. **Settings** → **Notifications**
2. Enable:
   - Deploy failures
   - Health check failures
   - High memory usage
   - High CPU usage

## Troubleshooting

### Warning: "Placeholder values detected"

**Symptom:**
```
⚠️  Optional environment variables not set (using defaults):
   🚨 CRITICAL WARNING: MOONPAY_WEBHOOK_SECRET is using a placeholder value.
   🚨 CRITICAL WARNING: CORS_ALLOWED_ORIGINS is using a placeholder value.
```

**Solution:**
This is expected on first deployment. The app will start successfully but you should update these immediately:

1. Go to **Environment** tab in Render Dashboard
2. Update `MOONPAY_WEBHOOK_SECRET` with your actual MoonPay webhook secret (from [MoonPay Dashboard](https://www.moonpay.com/dashboard))
3. Update `CORS_ALLOWED_ORIGINS` with your actual frontend domain(s) (e.g., `https://app.yourdomain.com`)
4. Click **"Save Changes"** - Render will automatically restart with the new values

**Note:** The placeholder values allow initial deployment to succeed, but the app will not function properly without real values.

### Error: "Missing required environment variables"

**Symptom:**
```
❌ CRITICAL: Missing required environment variables

  ❌ DATABASE_URL_PROD
  ❌ JWT_SECRET
```

**Note:** As of the latest update, `MOONPAY_WEBHOOK_SECRET` and `CORS_ALLOWED_ORIGINS` are **optional** and will only generate warnings if missing. The application will start successfully without them, but:
- Webhook validation will fail without `MOONPAY_WEBHOOK_SECRET`
- CORS will be disabled without `CORS_ALLOWED_ORIGINS` (frontend requests will fail)

**Solution:**
1. Go to **Environment** tab in Render Dashboard
2. Verify `DATABASE_URL_PROD` and `JWT_SECRET` are set
3. Click **"Manual Deploy"** → **"Deploy latest commit"**
4. After successful deployment, add `MOONPAY_WEBHOOK_SECRET` and `CORS_ALLOWED_ORIGINS` for full functionality

### Error: "Database connection failed"

**Symptom:**
```
Error: connect ETIMEDOUT
```

**Solutions:**
1. Verify `DATABASE_URL_PROD` is correct
2. Use **Internal Database URL** (not External)
3. Check database is in same region as web service
4. Verify database plan supports SSL (all Render plans do)

### Error: "CORS blocked"

**Symptom:**
```
Access to fetch at 'https://api.yourdomain.com/wallet' from origin 'https://app.yourdomain.com' 
has been blocked by CORS policy
```

**Solutions:**
1. Add frontend domain to `CORS_ALLOWED_ORIGINS`
2. Include protocol (`https://`) and no trailing slash
3. Restart service after updating

### Migrations Failed

**Symptom:**
```
Error: Migration failed to apply
```

**Solutions:**
1. Go to **Shell** tab
2. Check migration status:
   ```bash
   cd /opt/render/project/src/backend/backend/api
   npx prisma migrate status
   ```
3. Apply manually:
   ```bash
   npx prisma migrate deploy
   ```

## Cost Estimation

### Free Tier

| Service | Cost | Limits |
|---------|------|--------|
| Web Service | Free | 750 hours/month, sleeps after 15 min inactivity |
| PostgreSQL | Free | 256 MB storage, 1 GB bandwidth |

**Total: $0/month** (suitable for testing/hobby projects)

### Production Setup

| Service | Plan | Cost |
|---------|------|------|
| Web Service | Starter | $7/month |
| PostgreSQL | Starter | $7/month |

**Total: $14/month** (suitable for small production apps)

### High-Traffic Setup

| Service | Plan | Cost |
|---------|------|------|
| Web Service | Standard+ | $25/month |
| PostgreSQL | Standard | $20/month |

**Total: $45/month** (suitable for high-traffic production)

## Additional Resources

- [Render Node.js Docs](https://render.com/docs/deploy-node-express-app)
- [Render Database Docs](https://render.com/docs/databases)
- [Render Environment Variables](https://render.com/docs/environment-variables)
- [Render Custom Domains](https://render.com/docs/custom-domains)

## Support

**Issues with deployment?**
1. Check [Render Status](https://status.render.com)
2. Review [Render Community](https://community.render.com)
3. Open [GitHub Issue](https://github.com/yourusername/cryptowallet-platform/issues)

---

**Next Steps:**
- [Database Operations Guide](./DATABASE_OPERATIONS.md)
- [Production Readiness Checklist](./PRODUCTION_READINESS.md)
- [API Reference](./API_REFERENCE.md)
