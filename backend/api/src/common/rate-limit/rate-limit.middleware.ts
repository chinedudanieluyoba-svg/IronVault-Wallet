import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RateLimiterStore } from './rate-limiter.store';
import { RATE_LIMIT_KEY } from './rate-limit.decorator';
import { RateLimitConfig } from './rate-limit.config';

/**
 * Rate Limit Guard
 * Enforces per-endpoint rate limits based on @RateLimit decorator
 */
@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(
    private readonly store: RateLimiterStore,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // Get rate limit config from decorator
    const config = this.reflector.get<RateLimitConfig | null>(
      RATE_LIMIT_KEY,
      context.getHandler(),
    );

    // If no config, allow (no rate limit)
    if (config === undefined) {
      return true;
    }

    // If null, skip rate limiting (webhooks)
    if (config === null) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // Get client identifier
    const identifier = this.getClientIdentifier(request);

    // Check rate limit
    const allowed = this.store.isAllowed(
      identifier,
      config.windowMs,
      config.maxRequests,
    );

    // Get rate limit info
    const remaining = this.store.getRemaining(
      identifier,
      config.windowMs,
      config.maxRequests,
    );
    const resetTime = this.store.getResetTime(identifier, config.windowMs);

    // Set rate limit headers
    response.setHeader('X-RateLimit-Limit', config.maxRequests);
    response.setHeader('X-RateLimit-Remaining', remaining);
    response.setHeader('X-RateLimit-Reset', Math.ceil(resetTime / 1000));

    if (!allowed) {
      throw new HttpException(
        {
          statusCode: 429,
          message: 'Too many requests, please try again later',
          retryAfter: Math.ceil((resetTime - Date.now()) / 1000),
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }

  private getClientIdentifier(request: any): string {
    // Prefer authenticated user ID
    if (request.user?.userId) {
      return `user:${request.user.userId}`;
    }

    // Fallback to IP address
    const ip =
      (request.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      request.socket?.remoteAddress ||
      'unknown';

    return `ip:${ip}`;
  }
}
