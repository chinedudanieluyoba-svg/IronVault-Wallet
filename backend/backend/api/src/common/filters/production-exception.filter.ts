import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductionConfigService } from '../../config/production.config';

/**
 * Global Exception Filter
 *
 * Handles all errors and ensures:
 * - Stack traces hidden in production
 * - Consistent error response format
 * - Security-first error messages
 */
@Catch()
export class ProductionExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const config = ProductionConfigService.getConfig();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';
    let details: any = undefined;

    // Extract status and message from HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const responseObj = exceptionResponse as any;
        message = responseObj.message || message;
        error = responseObj.error || error;
        details = responseObj.details;
      }
    }

    // Build error response
    const errorResponse: any = {
      statusCode: status,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Only include details in development
    if (config.exposeStackTraces && details) {
      errorResponse.details = details;
    }

    // Only include stack trace in development
    if (config.exposeStackTraces && exception instanceof Error) {
      errorResponse.stack = exception.stack;
    }

    // Log error (always log to server, even in production)
    if (status >= 500) {
      console.error('❌ Server Error:', {
        status,
        message,
        path: request.url,
        method: request.method,
        stack: exception instanceof Error ? exception.stack : undefined,
      });
    } else if (status >= 400) {
      console.warn('⚠️  Client Error:', {
        status,
        message,
        path: request.url,
        method: request.method,
      });
    }

    response.status(status).json(errorResponse);
  }
}
