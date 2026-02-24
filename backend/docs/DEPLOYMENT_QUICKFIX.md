# Quick Fix: Railway Backend Deployment

## Error Message (OLD - Pre-Fix)

```
❌ CRITICAL: Missing required environment variables

The following environment variables MUST be set:

   ❌ DATABASE_URL
     → Production PostgreSQL connection string (NODE_ENV=production)

  ❌ JWT_SECRET
     → Secret for signing JWT tokens

  ❌ MOONPAY_WEBHOOK_SECRET
     → MoonPay webhook signature verification secret

  ❌ CORS_ALLOWED_ORIGINS
     → Comma-separated list of allowed CORS origins (REQUIRED in production)

Application cannot start without these variables.
```

## ✅ UPDATED: New Behavior (After Fix)

**As of the latest update**, backend deployment is standardized on Railway with these required variables: `DATABASE_URL`, `JWT_SECRET`, `MOONPAY_WEBHOOK_SECRET`, and `CORS_ALLOWED_ORIGINS`.

This means:
- Railway deploy should succeed when required variables are set
- You may see **critical warnings** for missing optional secrets
- Update all variables immediately after deployment for full functionality

## Quick Fix (5 minutes)

### Step 1: Go to Railway Dashboard

1. Visit Railway dashboard
2. Select your backend service
3. Open **Variables**

### Step 2: Update Required Variables

Set all required variables with real values:

#### 1. `DATABASE_URL` (REQUIRED)

- **New Value**: Copy from your Neon/Railway Postgres connection string
- **Example**: `postgresql://user:password@host.neon.tech/cryptowallet?sslmode=require`

#### 2. `JWT_SECRET` (REQUIRED)

- **New Value**: Generate a secure random string
- **How to generate**:
  ```bash
  openssl rand -base64 32
  ```
- **Example**: `K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol/pe/Unols=`

### Step 3: Update Optional Variables (Recommended)

These should be set for full functionality:

#### 3. `MOONPAY_WEBHOOK_SECRET` (OPTIONAL - Recommended)

- **Status**: App will run without it, but webhook validation will fail
- **New Value**: Get from MoonPay Dashboard
- **Where to find**: [MoonPay Dashboard](https://www.moonpay.com/dashboard) → Settings → Webhooks
- **If you don't have MoonPay**: Leave placeholder for now - the app will start with a critical warning

#### 4. `CORS_ALLOWED_ORIGINS` (OPTIONAL - Required for frontend)

- **Status**: App will run without it, but CORS will be disabled (frontend API requests will fail)
- **New Value**: Your frontend domain(s)
- **Format**: Comma-separated list (no spaces)
- **Examples**:
  - Single domain: `https://app.yourdomain.com`
  - Multiple domains: `https://app.yourdomain.com,https://yourdomain.com`
  - For testing: `http://localhost:3000,http://localhost:3001`

### Step 4: Deploy

1. Click **"Save Changes"**
2. Trigger a Railway redeploy (or Deploy Latest)
3. Monitor logs for success (all placeholders updated):
   ```
   ✅ Environment variables validated
   📦 NODE_ENV: production
   🗄️  DATABASE: postgresql://user:***@...
   🔐 JWT_SECRET: K7gN...nols (44 chars)
   🚀 Application listening on port 10000
   ```
4. If you still see warnings about placeholders, update those variables as well

## Still Having Issues?

### Problem: Don't have a database yet?

**Solution**: Create PostgreSQL database first

1. Create a Neon or Railway PostgreSQL database
2. Copy its connection URL
6. Use for `DATABASE_URL`

### Problem: Don't know your frontend domain?

**Solution**: Use localhost for testing

```
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:8080
```

Later, update with your actual domain:
```
CORS_ALLOWED_ORIGINS=https://app.yourdomain.com
```

### Problem: Don't have MoonPay account?

**Solution**: Leave placeholder for now

⚠️ **Warning**: Webhook processing will fail until you provide real credentials from your MoonPay account.

## Full Documentation

For complete setup instructions, see:
- [Backend Deployment Guide](./DEPLOYMENT_RAILWAY.md)
- [Platform Deployment Guide](../../docs/deployment.md)
- [Environment Variables Reference](../.env.example)

## Need Help?

1. Review deployment logs in Railway Dashboard
2. Confirm frontend `NEXT_PUBLIC_API_URL` points to your Railway backend
3. Open [GitHub Issue](https://github.com/yourusername/cryptowallet-platform/issues)
