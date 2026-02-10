import { EnvironmentValidator } from './env-validator';

describe('EnvironmentValidator', () => {
  const originalEnv = process.env;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    // Create a fresh copy of env before each test
    process.env = { ...originalEnv };
    // Spy on console.log to capture warnings
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    // Restore console.log after each test
    consoleLogSpy.mockRestore();
  });

  afterAll(() => {
    // Restore original env
    process.env = originalEnv;
  });

  it('should pass validation with all required variables set', () => {
    process.env.NODE_ENV = 'development';
    process.env.DATABASE_URL_DEV = 'postgresql://user:pass@localhost:5432/db';
    process.env.JWT_SECRET = 'test-secret-key-min-32-characters-long';
    process.env.MOONPAY_WEBHOOK_SECRET = 'moonpay-secret';

    expect(() => EnvironmentValidator.validate()).not.toThrow();
  });

  it('should throw error when NODE_ENV is missing', () => {
    delete process.env.NODE_ENV;

    expect(() => EnvironmentValidator.validate()).toThrow('NODE_ENV');
  });

  it('should throw error when DATABASE_URL_DEV is missing (NODE_ENV=development)', () => {
    process.env.NODE_ENV = 'development';
    delete process.env.DATABASE_URL_DEV;
    process.env.JWT_SECRET = 'test-secret';
    process.env.MOONPAY_WEBHOOK_SECRET = 'moonpay-secret';

    expect(() => EnvironmentValidator.validate()).toThrow('DATABASE_URL_DEV');
  });

  it('should throw error when DATABASE_URL_PROD is missing (NODE_ENV=production)', () => {
    process.env.NODE_ENV = 'production';
    delete process.env.DATABASE_URL_PROD;
    process.env.JWT_SECRET = 'test-secret';
    process.env.MOONPAY_WEBHOOK_SECRET = 'moonpay-secret';

    expect(() => EnvironmentValidator.validate()).toThrow('DATABASE_URL_PROD');
  });

  it('should throw error when JWT_SECRET is missing', () => {
    process.env.NODE_ENV = 'development';
    process.env.DATABASE_URL_DEV = 'postgresql://user:pass@localhost:5432/db';
    delete process.env.JWT_SECRET;
    process.env.MOONPAY_WEBHOOK_SECRET = 'moonpay-secret';

    expect(() => EnvironmentValidator.validate()).toThrow('JWT_SECRET');
  });

  it('should throw error when MOONPAY_WEBHOOK_SECRET is missing', () => {
    process.env.NODE_ENV = 'development';
    process.env.DATABASE_URL_DEV = 'postgresql://user:pass@localhost:5432/db';
    process.env.JWT_SECRET = 'test-secret';
    delete process.env.MOONPAY_WEBHOOK_SECRET;

    expect(() => EnvironmentValidator.validate()).toThrow(
      'MOONPAY_WEBHOOK_SECRET',
    );
  });

  it('should throw error listing ALL missing required variables', () => {
    process.env.NODE_ENV = 'development';
    delete process.env.DATABASE_URL_DEV;
    delete process.env.JWT_SECRET;
    delete process.env.MOONPAY_WEBHOOK_SECRET;

    expect(() => EnvironmentValidator.validate()).toThrow('DATABASE_URL_DEV');
    expect(() => EnvironmentValidator.validate()).toThrow('JWT_SECRET');
    expect(() => EnvironmentValidator.validate()).toThrow(
      'MOONPAY_WEBHOOK_SECRET',
    );
  });

  it('should not throw for missing optional variables', () => {
    process.env.NODE_ENV = 'development';
    process.env.DATABASE_URL_DEV = 'postgresql://user:pass@localhost:5432/db';
    process.env.JWT_SECRET = 'test-secret';
    process.env.MOONPAY_WEBHOOK_SECRET = 'moonpay-secret';

    // Remove all optional vars
    delete process.env.PORT;
    delete process.env.LEDGER_INTEGRITY_INTERVAL_MS;
    delete process.env.PROVIDER_RECONCILIATION_INTERVAL_MS;
    delete process.env.WEBHOOK_RETRY_INTERVAL_MS;

    expect(() => EnvironmentValidator.validate()).not.toThrow();
  });

  it('should require CORS_ALLOWED_ORIGINS in production', () => {
    process.env.NODE_ENV = 'production';
    process.env.DATABASE_URL_PROD = 'postgresql://user:pass@localhost:5432/db';
    process.env.JWT_SECRET = 'test-secret';
    process.env.MOONPAY_WEBHOOK_SECRET = 'moonpay-secret';
    delete process.env.CORS_ALLOWED_ORIGINS;

    expect(() => EnvironmentValidator.validate()).toThrow(
      'CORS_ALLOWED_ORIGINS',
    );
  });

  it('should not require CORS_ALLOWED_ORIGINS in development', () => {
    process.env.NODE_ENV = 'development';
    process.env.DATABASE_URL_DEV = 'postgresql://user:pass@localhost:5432/db';
    process.env.JWT_SECRET = 'test-secret';
    process.env.MOONPAY_WEBHOOK_SECRET = 'moonpay-secret';
    delete process.env.CORS_ALLOWED_ORIGINS;

    expect(() => EnvironmentValidator.validate()).not.toThrow();
  });

  it('should accept placeholder values but log warnings for MOONPAY_WEBHOOK_SECRET', () => {
    process.env.NODE_ENV = 'development';
    process.env.DATABASE_URL_DEV = 'postgresql://user:pass@localhost:5432/db';
    process.env.JWT_SECRET = 'test-secret';
    process.env.MOONPAY_WEBHOOK_SECRET = 'PLACEHOLDER_UPDATE_IN_RENDER_DASHBOARD';

    expect(() => EnvironmentValidator.validate()).not.toThrow();
    
    // Verify warning is logged
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '\n⚠️  Optional environment variables not set (using defaults):',
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining(
      '🚨 CRITICAL WARNING: MOONPAY_WEBHOOK_SECRET is using a placeholder value',
    ));
  });

  it('should accept placeholder values but log warnings for CORS_ALLOWED_ORIGINS in production', () => {
    process.env.NODE_ENV = 'production';
    process.env.DATABASE_URL_PROD = 'postgresql://user:pass@localhost:5432/db';
    process.env.JWT_SECRET = 'test-secret';
    process.env.MOONPAY_WEBHOOK_SECRET = 'moonpay-secret';
    process.env.CORS_ALLOWED_ORIGINS = 'PLACEHOLDER_UPDATE_IN_RENDER_DASHBOARD';

    expect(() => EnvironmentValidator.validate()).not.toThrow();
    
    // Verify warning is logged
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '\n⚠️  Optional environment variables not set (using defaults):',
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining(
      '🚨 CRITICAL WARNING: CORS_ALLOWED_ORIGINS is using a placeholder value',
    ));
  });

  it('should accept placeholder values but log warnings for both secrets in production', () => {
    process.env.NODE_ENV = 'production';
    process.env.DATABASE_URL_PROD = 'postgresql://user:pass@localhost:5432/db';
    process.env.JWT_SECRET = 'test-secret';
    process.env.MOONPAY_WEBHOOK_SECRET = 'PLACEHOLDER_UPDATE_IN_RENDER_DASHBOARD';
    process.env.CORS_ALLOWED_ORIGINS = 'PLACEHOLDER_UPDATE_IN_RENDER_DASHBOARD';

    expect(() => EnvironmentValidator.validate()).not.toThrow();
    
    // Verify both warnings are logged
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '\n⚠️  Optional environment variables not set (using defaults):',
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining(
      '🚨 CRITICAL WARNING: MOONPAY_WEBHOOK_SECRET is using a placeholder value',
    ));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining(
      '🚨 CRITICAL WARNING: CORS_ALLOWED_ORIGINS is using a placeholder value',
    ));
  });
});
