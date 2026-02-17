import { ProductionExceptionFilter } from './production-exception.filter';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ProductionConfigService } from '../../config/production.config';

describe('ProductionExceptionFilter', () => {
  let filter: ProductionExceptionFilter;
  let mockResponse: any;
  let mockRequest: any;
  let mockHost: any;

  beforeEach(() => {
    filter = new ProductionExceptionFilter();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    mockRequest = {
      url: '/test-url',
      method: 'GET',
    };

    mockHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    };
  });

  describe('HttpException handling', () => {
    it('should return status and message from HttpException', () => {
      const exception = new HttpException('Test error', HttpStatus.BAD_REQUEST);

      filter.catch(exception, mockHost);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Test error',
          path: '/test-url',
        }),
      );
    });

    it('should handle HttpException with object response', () => {
      const exception = new HttpException(
        { message: 'Validation failed', error: 'Bad Request' },
        HttpStatus.BAD_REQUEST,
      );

      filter.catch(exception, mockHost);

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Validation failed',
          error: 'Bad Request',
        }),
      );
    });
  });

  describe('Stack trace handling', () => {
    it('should include stack trace in development', () => {
      // Mock development environment
      jest.spyOn(ProductionConfigService, 'getConfig').mockReturnValue({
        isProduction: false,
        isStaging: false,
        isDevelopment: true,
        corsOrigins: [],
        logLevel: 'debug',
        exposeStackTraces: true,
      });

      const exception = new Error('Test error');
      filter.catch(exception, mockHost);

      const jsonCall = mockResponse.json.mock.calls[0][0];
      expect(jsonCall.stack).toBeDefined();
    });

    it('should hide stack trace in production', () => {
      // Mock production environment
      jest.spyOn(ProductionConfigService, 'getConfig').mockReturnValue({
        isProduction: true,
        isStaging: false,
        isDevelopment: false,
        corsOrigins: ['https://app.example.com'],
        logLevel: 'error',
        exposeStackTraces: false,
      });

      const exception = new Error('Test error');
      filter.catch(exception, mockHost);

      const jsonCall = mockResponse.json.mock.calls[0][0];
      expect(jsonCall.stack).toBeUndefined();
    });
  });

  describe('Non-HTTP exceptions', () => {
    it('should return 500 for generic errors', () => {
      const exception = new Error('Generic error');
      filter.catch(exception, mockHost);

      expect(mockResponse.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        }),
      );
    });
  });

  describe('Response format', () => {
    it('should always include timestamp and path', () => {
      const exception = new HttpException('Test', HttpStatus.BAD_REQUEST);
      filter.catch(exception, mockHost);

      const jsonCall = mockResponse.json.mock.calls[0][0];
      expect(jsonCall.timestamp).toBeDefined();
      expect(jsonCall.path).toBe('/test-url');
    });
  });
});
