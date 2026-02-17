import { SetMetadata } from '@nestjs/common';
import { RateLimitConfig } from './rate-limit.config';

export const RATE_LIMIT_KEY = 'rate_limit';

/**
 * Decorator to set rate limit for an endpoint
 * Pass rate limit config or null to skip rate limiting
 */
export const RateLimit = (config: RateLimitConfig | null) =>
  SetMetadata(RATE_LIMIT_KEY, config);
