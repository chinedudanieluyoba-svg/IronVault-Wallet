import { RateLimit } from './rate-limit.decorator';
import { RATE_LIMIT_CONFIG } from './rate-limit.config';

/**
 * Pre-configured Rate Limit Decorators
 * Use these instead of manually passing configs
 */

// Auth endpoints: 5 req/min
export const RateLimitAuth = () => RateLimit(RATE_LIMIT_CONFIG.AUTH);

// Wallet read endpoints (GET): 30 req/min
export const RateLimitWalletRead = () =>
  RateLimit(RATE_LIMIT_CONFIG.WALLET_READ);

// Wallet write endpoints (POST/PUT/DELETE): 10 req/min
export const RateLimitWalletWrite = () =>
  RateLimit(RATE_LIMIT_CONFIG.WALLET_WRITE);

// Transaction endpoints: 20 req/min
export const RateLimitTransaction = () =>
  RateLimit(RATE_LIMIT_CONFIG.TRANSACTION);

// OnRamp endpoints: 15 req/min
export const RateLimitOnRamp = () => RateLimit(RATE_LIMIT_CONFIG.ONRAMP);

// Admin emergency actions (manual credit): 2 req/min (STRICTLY CONTROLLED)
export const RateLimitAdminEmergency = () =>
  RateLimit(RATE_LIMIT_CONFIG.ADMIN_EMERGENCY);

// Webhooks: No rate limiting (IP + signature gated)
export const RateLimitWebhook = () => RateLimit(null);
