# Quick Fix: Render Deployment Error

## Error Message (OLD - Pre-Fix)

```
❌ CRITICAL: Missing required environment variables

The following environment variables MUST be set:

  ❌ DATABASE_URL_PROD
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

**As of the latest update**, all required variables (`DATABASE_URL_PROD`, `JWT_SECRET`, `MOONPAY_WEBHOOK_SECRET`, and `CORS_ALLOWED_ORIGINS`) are now configured with **placeholder values** in the `render.yaml` Blueprint.

This means:
- The app will start and deploy successfully on first deployment with placeholders
- You'll see **critical warnings** in the logs for all placeholder values
- You should update all placeholders immediately after deployment for full functionality
- The app will work but with limited functionality until placeholders are replaced with real values

## Quick Fix (5 minutes)

### Step 1: Go to Render Dashboard

1. Visit [Render Dashboard](https://dashboard.render.com)
2. Select your web service (`cryptowallet-api`)
3. Click **"Environment"** tab

### Step 2: Update Required Variables

All required variables are initially set with placeholder values. Update them with real values:

#### 1. `DATABASE_URL_PROD` (REQUIRED)

- **Current Value**: `PLACEHOLDER_UPDATE_IN_RENDER_DASHBOARD`
- **New Value**: Copy from your PostgreSQL database service
- **Where to find**: Render Dashboard → PostgreSQL service → "Internal Database URL"
- **Example**: `postgresql://user:password@dpg-abc123.oregon-postgres.render.com/cryptowallet?sslmode=require`

#### 2. `JWT_SECRET` (REQUIRED)

- **Current Value**: `PLACEHOLDER_UPDATE_IN_RENDER_DASHBOARD`
- **New Value**: Generate a secure random string
- **How to generate**:
  ```bash
  openssl rand -base64 32
  ```
- **Alternative**: Use Render's "Generate" button when editing the environment variable
- **Example**: `K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol/pe/Unols=`

### Step 3: Update Optional Variables (Recommended)

These are initially set with placeholders but should be updated for full functionality:

#### 3. `MOONPAY_WEBHOOK_SECRET` (OPTIONAL - Recommended)

- **Current Value**: `PLACEHOLDER_UPDATE_IN_RENDER_DASHBOARD`
- **Status**: App will run with placeholder, but webhook validation will fail
- **New Value**: Get from MoonPay Dashboard
- **Where to find**: [MoonPay Dashboard](https://www.moonpay.com/dashboard) → Settings → Webhooks
- **If you don't have MoonPay**: Leave placeholder for now - the app will start with a critical warning

#### 4. `CORS_ALLOWED_ORIGINS` (OPTIONAL - Required for frontend)

- **Current Value**: `PLACEHOLDER_UPDATE_IN_RENDER_DASHBOARD`
- **Status**: App will run with placeholder, but CORS will be disabled (frontend API requests will fail)
- **New Value**: Your frontend domain(s)
- **Format**: Comma-separated list (no spaces)
- **Examples**:
  - Single domain: `https://app.yourdomain.com`
  - Multiple domains: `https://app.yourdomain.com,https://yourdomain.com`
  - For testing: `http://localhost:3000,http://localhost:3001`

### Step 4: Deploy

1. Click **"Save Changes"**
2. Render will automatically redeploy
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

1. Render Dashboard → **"New +"** → **"PostgreSQL"**
2. Name: `cryptowallet-db-prod`
3. Region: Same as your web service
4. Plan: Starter (free)
5. Copy **"Internal Database URL"**
6. Use for `DATABASE_URL_PROD`

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

The Blueprint sets `MOONPAY_WEBHOOK_SECRET=PLACEHOLDER_UPDATE_IN_RENDER_DASHBOARD` by default.

⚠️ **Warning**: Webhook processing will fail until you provide real credentials from your MoonPay account.

## Full Documentation

For complete setup instructions, see:
- [Deployment Guide](./DEPLOYMENT_RENDER.md)
- [Environment Variables Reference](../.env.example)

## Need Help?

1. Check [Render Status](https://status.render.com)
2. Review deployment logs in Render Dashboard
3. Open [GitHub Issue](https://github.com/yourusername/cryptowallet-platform/issues)
