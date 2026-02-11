import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { RequestIdStorage } from './request-id.storage';

/**
 * Middleware to add a unique request ID to each request
 * ID is stored in context storage for access throughout the request lifecycle
 */
@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  constructor(private requestIdStorage: RequestIdStorage) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Generate or extract request ID
    const requestId = (req.headers['x-request-id'] as string) || uuidv4();

    // Store in context storage
    this.requestIdStorage.setRequestId(requestId);

    // Add to response headers for client reference
    res.setHeader('X-Request-ID', requestId);

    // Call next middleware/handler
    next();
  }
}
