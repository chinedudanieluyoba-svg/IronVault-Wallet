import { Module, MiddlewareConsumer, NestModule, Global } from '@nestjs/common';
import { AuditLogger } from './audit.logger';
import { RequestIdStorage } from './request-id.storage';
import { RequestIdMiddleware } from './request-id.middleware';

@Global()
@Module({
  providers: [AuditLogger, RequestIdStorage],
  exports: [AuditLogger, RequestIdStorage],
})
export class LoggingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
