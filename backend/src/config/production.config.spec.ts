import { ProductionConfigService } from './production.config';

describe('ProductionConfigService', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('Production Environment', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
      process.env.CORS_ALLOWED_ORIGINS =
        'https://app.example.com,https://admin.example.com';
      // Reset cached config
      (ProductionConfigService as any).config = undefined;
    });

    it('should set isProduction to true', () => {
      const config = ProductionConfigService.getConfig();
      expect(config.isProduction).toBe(true);
      expect(config.isStaging).toBe(false);
      expect(config.isDevelopment).toBe(false);
    });

    it('should use error log level', () => {
      const config = ProductionConfigService.getConfig();
      expect(config.logLevel).toBe('error');
    });

    it('should hide stack traces', () => {
      const config = ProductionConfigService.getConfig();
      expect(config.exposeStackTraces).toBe(false);
    });

    it('should use configured CORS origins', () => {
      const config = ProductionConfigService.getConfig();
      expect(config.corsOrigins).toEqual([
        'https://app.example.com',
        'https://admin.example.com',
      ]);
    });

    it('should return empty array if CORS_ALLOWED_ORIGINS not set', () => {
      delete process.env.CORS_ALLOWED_ORIGINS;
      (ProductionConfigService as any).config = undefined;

      const config = ProductionConfigService.getConfig();
      expect(config.corsOrigins).toEqual([]);
    });
  });

  describe('Staging Environment', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'staging';
      process.env.CORS_ALLOWED_ORIGINS = 'https://staging.example.com';
      (ProductionConfigService as any).config = undefined;
    });

    it('should set isStaging to true', () => {
      const config = ProductionConfigService.getConfig();
      expect(config.isProduction).toBe(false);
      expect(config.isStaging).toBe(true);
      expect(config.isDevelopment).toBe(false);
    });

    it('should use warn log level', () => {
      const config = ProductionConfigService.getConfig();
      expect(config.logLevel).toBe('warn');
    });

    it('should hide stack traces', () => {
      const config = ProductionConfigService.getConfig();
      expect(config.exposeStackTraces).toBe(false);
    });

    it('should allow localhost if CORS_ALLOWED_ORIGINS not set', () => {
      delete process.env.CORS_ALLOWED_ORIGINS;
      (ProductionConfigService as any).config = undefined;

      const config = ProductionConfigService.getConfig();
      expect(config.corsOrigins).toContain('http://localhost:3000');
    });
  });

  describe('Development Environment', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
      (ProductionConfigService as any).config = undefined;
    });

    it('should set isDevelopment to true', () => {
      const config = ProductionConfigService.getConfig();
      expect(config.isProduction).toBe(false);
      expect(config.isStaging).toBe(false);
      expect(config.isDevelopment).toBe(true);
    });

    it('should use debug log level', () => {
      const config = ProductionConfigService.getConfig();
      expect(config.logLevel).toBe('debug');
    });

    it('should expose stack traces', () => {
      const config = ProductionConfigService.getConfig();
      expect(config.exposeStackTraces).toBe(true);
    });

    it('should allow localhost origins', () => {
      const config = ProductionConfigService.getConfig();
      expect(config.corsOrigins).toContain('http://localhost:3000');
      expect(config.corsOrigins).toContain('http://localhost:3001');
      expect(config.corsOrigins).toContain('http://localhost:8080');
    });
  });
});
