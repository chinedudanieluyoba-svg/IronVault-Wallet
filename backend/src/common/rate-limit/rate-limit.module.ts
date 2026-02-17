import { Global, Module } from '@nestjs/common';
import { RateLimiterStore } from './rate-limiter.store';
import { RateLimitGuard } from './rate-limit.middleware';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
  providers: [
    RateLimiterStore,
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
  exports: [RateLimiterStore],
})
export class RateLimitModule {}
