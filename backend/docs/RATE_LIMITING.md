# Rate Limiting & Abuse Protection

## Overview

The API implements comprehensive rate limiting to prevent abuse:
✅ Global rate limits on all endpoints
✅ Stricter limits on wallet mutations
✅ Stricter limits on auth endpoints  
✅ Stricter limits on admin routes
✅ IP allowlist for webhooks

---

## Rate Limit Tiers

### Tier 1: Authentication (STRICTEST)
**5 requests/minute per IP**

Endpoints:
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`

Rationale: Prevents brute-force attacks, credential stuffing

```typescript
@RateLimitAuth()
@Post('login')
async login() { /* ... */ }
```

Response when exceeded:
```json
{
  "statusCode": 429,
  "message": "Too many requests",
  "error": "Rate limit exceeded",
  "retryAfter": 45
}
```

### Tier 2: Admin Emergency (CRITICAL)
**2 requests/minute per admin**

Endpoints:
- `POST /admin/emergency-credit` - Manual wallet credit
- `POST /admin/emergency-debit` - Manual wallet debit

Rationale: Prevents accidental mass operations, requires deliberate action

```typescript
@RateLimitAdminEmergency()
@Post('emergency-credit')
async emergencyCredit() { /* ... */ }
```

### Tier 3: Wallet Writes (RESTRICTIVE)
**10 requests/minute per user**

Endpoints:
- `POST /wallet` - Create wallet
- `PUT /wallet/:id` - Update wallet
- `DELETE /wallet/:id` - Delete wallet
- `POST /wallet/:id/withdraw` - Initiate withdrawal

Rationale: Financial operations require throttling to prevent mistakes

```typescript
@RateLimitWalletWrite()
@Post('withdraw')
async withdraw() { /* ... */ }
```

### Tier 4: On-Ramp Operations
**15 requests/minute per user**

Endpoints:
- `POST /onramp/initiate` - Start payment flow
- `GET /onramp/:id/status` - Check payment status

Rationale: Prevents spam of payment provider APIs

```typescript
@RateLimitOnRamp()
@Post('initiate')
async initiate() { /* ... */ }
```

### Tier 5: Transactions
**20 requests/minute per user**

Endpoints:
- `GET /transaction` - List transactions
- `GET /transaction/:id` - Get transaction details

Rationale: Read-heavy operation, allow more frequent access

```typescript
@RateLimitTransaction()
@Get()
async getTransactions() { /* ... */ }
```

### Tier 6: Wallet Reads
**30 requests/minute per user**

Endpoints:
- `GET /wallet` - List wallets
- `GET /wallet/:id` - Get wallet details
- `GET /wallet/:id/balance` - Check balance

Rationale: Most common operation, higher limit for good UX

```typescript
@RateLimitWalletRead()
@Get(':id')
async getWallet() { /* ... */ }
```

### Tier 7: Global Default
**100 requests/minute per user**

All other endpoints use this default.

### Tier 8: Webhooks (NO LIMIT)
**Unlimited**

Endpoints:
- `POST /onramp/webhook/:provider` - Payment provider callbacks

Rationale: Providers control their own rate limits. Protected by:
- IP allowlist
- Signature verification
- Idempotency checks

```typescript
@RateLimitWebhook() // Returns null (no limit)
@Post('webhook/:provider')
async handleWebhook() { /* ... */ }
```

---

## Rate Limit Headers

Every response includes rate limit info:

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1625097600
```

When limit exceeded:
```http
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1625097600
Retry-After: 45

{
  "statusCode": 429,
  "message": "Too many requests",
  "error": "Rate limit exceeded"
}
```

---

## Implementation

### 1. Decorator Usage

```typescript
import { RateLimitWalletWrite } from './common/rate-limit/rate-limit.decorators';

@Controller('wallet')
export class WalletController {
  @Post()
  @RateLimitWalletWrite() // 10 req/min
  async createWallet() {
    // ...
  }
}
```

### 2. Custom Rate Limits

```typescript
import { RateLimit } from './common/rate-limit/rate-limit.decorator';

@Controller('custom')
export class CustomController {
  @Post('action')
  @RateLimit({ windowMs: 60000, maxRequests: 3 }) // 3 per minute
  async customAction() {
    // ...
  }
}
```

### 3. Configuration

```typescript
// src/common/rate-limit/rate-limit.config.ts
export const RATE_LIMIT_CONFIG = {
  AUTH: {
    windowMs: 60 * 1000,
    maxRequests: 5,
  },
  WALLET_WRITE: {
    windowMs: 60 * 1000,
    maxRequests: 10,
  },
  // ... more configs
};
```

---

## Abuse Protection

### Layered Defense

**Layer 1: Rate Limiting**
- Per-IP or per-user limits
- Sliding window algorithm
- Automatic 429 responses

**Layer 2: IP Allowlist (Webhooks)**
- Restricts to known provider IPs
- Supports CIDR and wildcards
- Logs all rejected requests

**Layer 3: Signature Verification**
- Cryptographic proof of authenticity  
- Prevents replay attacks
- Provider-specific secrets

**Layer 4: Request Validation**
- DTO validation
- Type checking
- Input sanitization

**Layer 5: Business Logic Guards**
- Status gates (onramp-status.guard.ts)
- Idempotency checks
- Duplicate prevention

### Example: OnRamp Webhook

```typescript
@UseGuards(WebhookIPGuard) // Layer 2: IP check
@RateLimitWebhook() // Layer 1: No rate limit
@Post('webhook/:provider')
async handleWebhook(@Body() payload, @Headers() headers) {
  // Layer 3: Signature verification
  if (!this.verifySignature(headers)) {
    throw new ForbiddenException();
  }
  
  // Layer 5: Idempotency check
  const exists = await this.checkDuplicate(payload.id);
  if (exists) {
    return { received: true }; // Already processed
  }
  
  // Process webhook
  return this.processWebhook(payload);
}
```

---

## Testing

### Test Rate Limits

```bash
# Test auth rate limit (should succeed 5 times, then fail)
for i in {1..6}; do
  curl -X POST http://localhost:3000/auth/login \
    -d '{"email":"test@example.com","password":"test"}' \
    -H "Content-Type: application/json"
  echo ""
done

# 6th request returns 429
```

### Test IP Allowlist

```bash
# Test with allowed IP
curl -X POST http://localhost:3000/onramp/webhook/moonpay \
  -H "X-Forwarded-For: 52.18.100.50" \
  -d '{"transactionId":"test"}'
# Response: 200 OK

# Test with blocked IP
curl -X POST http://localhost:3000/onramp/webhook/moonpay \
  -H "X-Forwarded-For: 1.2.3.4" \
  -d '{"transactionId":"test"}'
# Response: 403 Forbidden
```

### Test Custom Rate Limit

```typescript
describe('WalletController', () => {
  it('should enforce rate limit', async () => {
    // Make 10 requests (should succeed)
    for (let i = 0; i < 10; i++) {
      const res = await request(app.getHttpServer())
        .post('/wallet')
        .send({ currency: 'USD' })
        .expect(201);
    }
    
    // 11th request should fail
    await request(app.getHttpServer())
      .post('/wallet')
      .send({ currency: 'USD' })
      .expect(429);
  });
});
```

---

## Monitoring

### Rate Limit Violations

```bash
# View rate limit errors in logs
grep "Rate limit exceeded" /var/log/api.log | tail -50

# Count violations by endpoint
grep "Rate limit exceeded" /var/log/api.log | \
  awk '{print $5}' | sort | uniq -c | sort -rn
```

### Top Offenders

```sql
-- Query error logs for frequent 429 responses
SELECT 
  ip_address,
  COUNT(*) as violation_count,
  MAX(created_at) as last_violation
FROM error_logs
WHERE status_code = 429
  AND created_at > NOW() - INTERVAL '24 hours'
GROUP BY ip_address
ORDER BY violation_count DESC
LIMIT 10;
```

---

## Configuration Guide

### Adjusting Limits

**Option 1: Environment Variables**
```bash
# .env
RATE_LIMIT_AUTH_MAX=5
RATE_LIMIT_AUTH_WINDOW_MS=60000
RATE_LIMIT_WALLET_WRITE_MAX=10
```

**Option 2: Code Updates**
```typescript
// src/common/rate-limit/rate-limit.config.ts
export const RATE_LIMIT_CONFIG = {
  AUTH: {
    windowMs: parseInt(process.env.RATE_LIMIT_AUTH_WINDOW_MS || '60000'),
    maxRequests: parseInt(process.env.RATE_LIMIT_AUTH_MAX || '5'),
  },
};
```

### Disabling Rate Limits (Development Only)

```typescript
// src/common/rate-limit/rate-limit.middleware.ts
canActivate(context: ExecutionContext): boolean {
  // Skip rate limiting in development
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  
  // Normal rate limit logic
  // ...
}
```

---

## Best Practices

### Do's ✅
- Use pre-configured decorators (`@RateLimitAuth()`, etc.)
- Test rate limits in staging before production
- Monitor 429 responses for abuse patterns
- Set alerts for spike in rate limit violations
- Document any custom rate limits

### Don'ts ❌
- Don't disable rate limits in production
- Don't use same limit for all endpoints
- Don't ignore 429 responses in monitoring
- Don't hardcode rate limit values
- Don't rate limit webhooks (use IP + signature instead)

---

## Troubleshooting

### "Too many 429 errors for legitimate users"

**Diagnosis:**
```bash
# Check if limit is too low
grep "Rate limit exceeded" /var/log/api.log | \
  awk '{print $5}' | sort | uniq -c
```

**Solution:**
- Increase limit for affected endpoint
- Consider per-user vs per-IP limiting
- Review legitimate use patterns

### "Webhook failing with 429"

**Problem:** Webhooks should never be rate limited

**Solution:**
```typescript
// Ensure @RateLimitWebhook() is used
@RateLimitWebhook() // Returns null (no limit)
@Post('webhook/:provider')
async handleWebhook() { /* ... */ }
```

### "Rate limit not working"

**Diagnosis:**
1. Check if rate limit guard is registered globally
2. Verify decorator is applied to route
3. Check logs for rate limit store errors

**Solution:**
```typescript
// app.module.ts - ensure RateLimitModule imported
@Module({
  imports: [
    RateLimitModule, // Must be imported
    // ...
  ],
})
export class AppModule {}
```

---

## Summary

**Rate Limits Enforced:**
- Auth: 5 req/min (strictest)
- Admin emergency: 2 req/min (critical)
- Wallet writes: 10 req/min
- On-ramp: 15 req/min
- Transactions: 20 req/min
- Wallet reads: 30 req/min
- Default: 100 req/min
- Webhooks: Unlimited (IP + signature protected)

**Abuse Protection:**
- IP allowlist for webhooks
- Signature verification
- Idempotency checks
- Comprehensive audit logging

**Documentation:**
- Rate limit config: [src/common/rate-limit/rate-limit.config.ts](../src/common/rate-limit/rate-limit.config.ts)
- Decorators: [src/common/rate-limit/rate-limit.decorators.ts](../src/common/rate-limit/rate-limit.decorators.ts)
- IP guard: [src/common/guards/webhook-ip.guard.ts](../src/common/guards/webhook-ip.guard.ts)
