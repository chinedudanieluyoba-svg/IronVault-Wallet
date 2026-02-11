import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

/**
 * Request-scoped storage for request ID and user context
 * Uses AsyncLocalStorage to maintain context across async operations
 */
interface RequestContext {
  requestId?: string;
  userId?: string;
}

@Injectable()
export class RequestIdStorage {
  private localStore = new AsyncLocalStorage<RequestContext>();

  /**
   * Set request ID for current request context
   */
  setRequestId(requestId: string) {
    const current = this.localStore.getStore() || {};
    // Create new context with updated requestId
    const context: RequestContext = {
      ...current,
      requestId,
    };
    this.localStore.enterWith(context);
  }

  /**
   * Set user ID for current request context
   */
  setUserId(userId: string) {
    const current = this.localStore.getStore() || {};
    const context: RequestContext = {
      ...current,
      userId,
    };
    this.localStore.enterWith(context);
  }

  /**
   * Get current request ID
   */
  getRequestId(): string | undefined {
    return this.localStore.getStore()?.requestId;
  }

  /**
   * Get current user ID
   */
  getUserId(): string | undefined {
    return this.localStore.getStore()?.userId;
  }

  /**
   * Get entire request context
   */
  getContext(): RequestContext | undefined {
    return this.localStore.getStore();
  }

  /**
   * Run callback with specific context (useful for testing)
   */
  run<T>(
    requestId: string,
    userId?: string,
    callback?: () => T,
  ): T | undefined {
    const context: RequestContext = { requestId, userId };
    return this.localStore.run(context, callback || (() => undefined));
  }
}
