/**
 * Rate Limiter Configuration
 * Defines request limits per endpoint type
 */

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
}

export const RATE_LIMIT_CONFIG = {
  // Auth endpoints: 5 req/min
  AUTH: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5,
  },

  // Wallet reads (GET): 30 req/min
  WALLET_READ: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30,
  },

  // Wallet mutations (POST/PUT/DELETE): 10 req/min
  WALLET_WRITE: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
  },

  // Transaction endpoints: 20 req/min
  TRANSACTION: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 20,
  },

  // OnRamp endpoints: 15 req/min
  ONRAMP: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 15,
  },

  // Admin emergency actions (manual credit): 2 req/min (STRICTLY CONTROLLED)
  ADMIN_EMERGENCY: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 2,
  },

  // Default: 100 req/min (other endpoints)
  DEFAULT: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
  },

  // Webhooks: Not rate limited (IP + signature gated)
  WEBHOOK: null,
};
