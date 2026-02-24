# Secrets & Access Control

## Overview

Production secrets are managed with strict controls:
✅ Secrets stored in platform secret manager (not in repo)
✅ No secrets committed to version control
✅ Admin accounts limited and audited
✅ Database credentials follow least-privilege
✅ Regular secret rotation enforced

---

## 1. Secret Storage

### ❌ NEVER Store Secrets In:
- Git repository
- `.env` file committed to repo
- Source code
- Log files
- Error messages
- Documentation
- Email or chat

### ✅ ALWAYS Store Secrets In:
- **AWS Secrets Manager** (recommended for AWS)
- **Google Cloud Secret Manager** (recommended for GCP)
- **Azure Key Vault** (recommended for Azure)
- **HashiCorp Vault** (for multi-cloud)
- **Platform environment variables** (Vercel, Netlify, etc.)

### Example: AWS Secrets Manager

```bash
# Store secret
aws secretsmanager create-secret \
  --name cryptowallet/prod/jwt-secret \
  --secret-string "$(openssl rand -base64 32)"

# Rotate secret
aws secretsmanager rotate-secret \
  --secret-id cryptowallet/prod/jwt-secret \
  --rotation-lambda-arn arn:aws:lambda:...

# Retrieve in application (Node.js)
const AWS = require('aws-sdk');
const client = new AWS.SecretsManager();

async function getSecret(name) {
  const data = await client.getSecretValue({ SecretId: name }).promise();
  return data.SecretString;
}
```

---

## 2. Secret Rotation

### Rotation Schedule

| Secret Type | Rotation Frequency | Enforcement |
|-------------|-------------------|-------------|
| JWT_SECRET | **90 days** | Hard (app fails readiness) |
| Database credentials | **90 days** | Hard (app fails readiness) |
| Webhook secrets | **90 days** | Hard (app fails readiness) |
| API keys | **180 days** | Soft (warning only) |

### Rotation Process

**1. Generate New Secret**
```bash
# Method 1: Use the built-in script (recommended)
cd backend
npm run generate:jwt-secret

# Method 2: Use Node.js crypto directly
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Method 3: Generate cryptographically secure random string with OpenSSL
openssl rand -base64 32
```

**2. Update Secret Manager**
```bash
# AWS example
aws secretsmanager update-secret \
  --secret-id cryptowallet/prod/jwt-secret \
  --secret-string "NEW_SECRET_HERE"
```

**3. Update Application**
```bash
# Deploy new version that reads updated secret
# Zero-downtime deployment ensures no disruption
```

**4. Update Rotation Date**
```bash
# Update in .env or secret manager
JWT_SECRET_ROTATION_DATE=2026-02-07
```

**5. Verify Readiness**
```bash
curl https://api.yourdomain.com/ready
# Should return 200 with no rotation warnings
```

### Automated Rotation (Recommended)

**AWS Secrets Manager with Lambda:**
```python
import boto3
import json
import secrets

def lambda_handler(event, context):
    """Automatic JWT secret rotation"""
    service_client = boto3.client('secretsmanager')
    arn = event['SecretId']
    token = event['ClientRequestToken']
    step = event['Step']
    
    # Generate new 32-byte secret
    new_secret = secrets.token_urlsafe(32)
    
    if step == 'createSecret':
        service_client.put_secret_value(
            SecretId=arn,
            ClientRequestToken=token,
            SecretString=new_secret,
            VersionStages=['AWSPENDING']
        )
    
    # ... (additional rotation logic)
    
    return {
        'statusCode': 200,
        'body': json.dumps('Secret rotated successfully')
    }
```

---

## 3. Admin Access Control

### Admin Roles

Only **3 types** of admin accounts allowed:

1. **SuperAdmin** - Full system access (max 2 people)
2. **FinanceAdmin** - View audits, resolve DLQ, no wallet mutations (max 3 people)
3. **SupportAdmin** - Read-only access to user data (max 5 people)

### Admin Account Creation

```typescript
// src/admin/admin.service.ts
async createAdmin(email: string, role: Role, createdBy: string) {
  // Require dual approval for SuperAdmin
  if (role === Role.SUPER_ADMIN) {
    await this.requireDualApproval(createdBy);
  }
  
  // Log admin creation
  await this.auditLogger.log(
    { adminUserId: createdBy },
    'admin_created',
    { newAdminEmail: email, role }
  );
  
  // Create admin user
  return this.prisma.user.create({
    data: {
      email,
      role,
      createdBy,
      requiresMFA: true, // Always require MFA for admins
    },
  });
}
```

### Admin Audit Trail

**All admin actions logged** in `AdminAccessLog` table:
- Who performed the action
- What action was performed
- When it happened
- From which IP address
- Result (success/failure)

**Example Queries:**
```sql
-- View all admin actions in last 24 hours
SELECT * FROM "AdminAccessLog"
WHERE "createdAt" > NOW() - INTERVAL '24 hours'
ORDER BY "createdAt" DESC;

-- View all emergency credit operations
SELECT * FROM "AdminAccessLog"
WHERE action = 'emergency_credit'
ORDER BY "createdAt" DESC;

-- View all failed admin access attempts
SELECT * FROM "AdminAccessLog"
WHERE status = 'error'
ORDER BY "createdAt" DESC;
```

**Access API:**
```bash
# Get admin audit logs (requires SuperAdmin)
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  https://api.yourdomain.com/admin/audit-logs?limit=100
```

---

## 4. Database Credentials (Least-Privilege)

### ❌ NEVER Use:
- `root` user
- `postgres` user
- `admin` user
- Superuser privileges
- `CREATE DATABASE` permissions
- `DROP TABLE` permissions

### ✅ ALWAYS Use:
- Dedicated application user
- Minimal required permissions
- Connection pooling
- SSL/TLS encryption

### Database User Setup

**PostgreSQL (Neon):**
```sql
-- Create dedicated app user
CREATE USER cryptowallet_app WITH PASSWORD 'secure_random_password';

-- Grant minimal permissions (SELECT, INSERT, UPDATE only)
GRANT CONNECT ON DATABASE cryptowallet_prod TO cryptowallet_app;
GRANT USAGE ON SCHEMA public TO cryptowallet_app;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO cryptowallet_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO cryptowallet_app;

-- NEVER grant DELETE (use soft deletes)
-- NEVER grant DROP, CREATE, ALTER
-- NEVER grant SUPERUSER
```

**Connection String:**
```bash
# ✅ CORRECT (dedicated app user)
DATABASE_URL=postgresql://cryptowallet_app:password@host.neon.tech/cryptowallet?sslmode=require

# ❌ WRONG (root/admin)
DATABASE_URL=postgresql://postgres:password@host.neon.tech/cryptowallet?sslmode=require
```

### Readiness Check

The `/ready` endpoint validates database privileges:
```json
{
  "checks": {
    "databaseSafety": {
      "ok": false,
      "details": "Database using privileged user 'postgres' - create dedicated app user with minimal privileges"
    }
  }
}
```

---

## 5. Webhook IP Allowlist

### Defense-in-Depth

Webhooks are protected by:
1. **Signature verification** (cryptographic proof)
2. **IP allowlist** (network-level filtering)
3. **Rate limiting** (abuse protection)

### Configuration

```bash
# .env
WEBHOOK_ALLOWED_IPS=52.18.0.0/16,34.248.0.0/16,172.31.45.10
```

**Supports:**
- Exact IPs: `192.168.1.100`
- CIDR notation: `10.0.0.0/8`
- Wildcards: `172.16.*`

### Provider IP Ranges

**MoonPay:**
```bash
# Get from MoonPay documentation (example IPs shown)
WEBHOOK_ALLOWED_IPS=52.18.0.0/16,34.248.0.0/16
```

**Stripe:**
```bash
# Stripe webhook IPs (verify from https://stripe.com/docs/ips)
WEBHOOK_ALLOWED_IPS=3.18.12.63,3.130.192.231,13.235.14.237
```

### Testing

```bash
# Test webhook with allowed IP
curl -X POST -H "X-Forwarded-For: 52.18.100.50" \
  https://api.yourdomain.com/onramp/webhook/moonpay \
  -d '{"transactionId": "test"}'
# Response: 200 OK

# Test webhook with blocked IP
curl -X POST -H "X-Forwarded-For: 1.2.3.4" \
  https://api.yourdomain.com/onramp/webhook/moonpay \
  -d '{"transactionId": "test"}'
# Response: 403 Forbidden
```

---

## 6. Rate Limiting

### Default Limits

| Endpoint Type | Limit | Enforcement |
|---------------|-------|-------------|
| **Auth** (login, register) | 5 req/min | Per IP |
| **Wallet read** (GET) | 30 req/min | Per user |
| **Wallet write** (POST/PUT) | 10 req/min | Per user |
| **Transactions** | 20 req/min | Per user |
| **On-ramp** | 15 req/min | Per user |
| **Admin emergency** | 2 req/min | Per admin (STRICTLY CONTROLLED) |
| **Webhooks** | No limit | IP + signature gated |

### Configuration

```typescript
// src/common/rate-limit/rate-limit.config.ts
export const RATE_LIMIT_CONFIG = {
  AUTH: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5,
  },
  WALLET_WRITE: {
    windowMs: 60 * 1000,
    maxRequests: 10,
  },
  ADMIN_EMERGENCY: {
    windowMs: 60 * 1000,
    maxRequests: 2, // VERY RESTRICTIVE
  },
};
```

### Custom Rate Limits

```typescript
import { RateLimit } from './common/rate-limit/rate-limit.decorator';

@Controller('sensitive')
export class SensitiveController {
  @Post('action')
  @RateLimit({ windowMs: 60000, maxRequests: 1 }) // 1 per minute
  async criticalAction() {
    // ...
  }
}
```

---

## 7. Readiness Checks

### Secret Validation

```bash
GET /ready
```

**Response (secrets OK):**
```json
{
  "status": "ready",
  "checks": {
    "secrets": {
      "ok": true,
      "details": "0 rotation warnings"
    }
  }
}
```

**Response (secrets need rotation):**
```json
{
  "status": "not_ready",
  "checks": {
    "secrets": {
      "ok": false,
      "details": "🔴 CRITICAL: JWT_SECRET is 120 days old - rotate immediately; ⚠️ WARNING: MOONPAY_WEBHOOK_SECRET is 75 days old - rotation recommended"
    }
  }
}
```

---

## 8. Production Checklist

### Before Deployment

- [ ] All secrets stored in secret manager (not in repo)
- [ ] No `.env` file in Git
- [ ] `.gitignore` excludes `.env`, `.env.*`
- [ ] Admin accounts created with MFA
- [ ] Database user follows least-privilege
- [ ] Webhook IP allowlist configured
- [ ] Rate limits tested
- [ ] Rotation dates tracked in secret manager

### After Deployment

- [ ] Verify `/ready` returns 200
- [ ] Test admin login with MFA
- [ ] Verify admin actions logged to `AdminAccessLog`
- [ ] Test webhook with allowed/blocked IPs
- [ ] Test rate limits (trigger 429 errors)
- [ ] Verify database user has minimal privileges

### Every 90 Days

- [ ] Rotate JWT_SECRET
- [ ] Rotate database credentials
- [ ] Rotate webhook secrets
- [ ] Review admin access logs for anomalies
- [ ] Audit active admin accounts (remove inactive)

---

## 9. Security Incident Response

### If Secret Leaked:

**1. Immediate Actions (within 1 hour):**
```bash
# Rotate compromised secret immediately
aws secretsmanager rotate-secret --secret-id cryptowallet/prod/jwt-secret

# Invalidate all sessions (if JWT leaked)
# Force re-authentication for all users

# Deploy updated secret to production
kubectl set env deployment/api JWT_SECRET=$(aws secretsmanager get-secret-value --secret-id cryptowallet/prod/jwt-secret --query SecretString --output text)
```

**2. Investigation (within 24 hours):**
- Review admin audit logs
- Check for unauthorized access
- Identify how secret was leaked
- Document findings

**3. Prevention (within 1 week):**
- Fix vulnerability that caused leak
- Implement additional controls
- Update security documentation
- Train team on secure secret handling

---

## 10. Documentation

- Implementation: [src/config/secrets.service.ts](../src/config/secrets.service.ts)
- IP Guard: [src/common/guards/webhook-ip.guard.ts](../src/common/guards/webhook-ip.guard.ts)
- Rate Limits: [src/common/rate-limit/rate-limit.config.ts](../src/common/rate-limit/rate-limit.config.ts)
- Admin Audit: [src/admin/admin-access.logger.ts](../src/admin/admin-access.logger.ts)
- Environment vars: [.env.example](../.env.example)

---

## Summary

✅ **Secrets:** Stored in platform secret manager, rotated every 90 days
✅ **Admin Access:** Limited accounts, comprehensive audit trail
✅ **Database:** Least-privilege credentials, no superuser
✅ **Webhooks:** IP allowlist + signature verification
✅ **Rate Limits:** Strict limits on sensitive endpoints
✅ **Monitoring:** `/ready` endpoint enforces all checks

**Remember:** *Security is not a feature—it's a continuous process.*
