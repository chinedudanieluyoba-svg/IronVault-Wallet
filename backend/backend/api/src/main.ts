import 'dotenv/config'; // ⚡ Load .env file before any code reads process.env
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentValidator } from './config/env-validator';
import { ProductionConfigService } from './config/production.config';
import { ProductionExceptionFilter } from './common/filters/production-exception.filter';

async function bootstrap() {
  // ⚡ FAIL FAST: Validate required environment variables before app starts
  EnvironmentValidator.validate();

  // Load production config
  const prodConfig = ProductionConfigService.getConfig();

  // Create app with production-safe logging
  const app = await NestFactory.create(AppModule, {
    logger: prodConfig.isProduction
      ? ['error'] // Production: Only errors
      : prodConfig.isStaging
        ? ['error', 'warn'] // Staging: Errors + warnings
        : ['error', 'warn', 'log', 'debug', 'verbose'], // Development: Full logging
  });

  // 🔒 CORS: Lock down to known domains in production
  if (prodConfig.corsOrigins.length > 0) {
    app.enableCors({
      origin: prodConfig.corsOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
    console.log(`✅ CORS enabled for: ${prodConfig.corsOrigins.join(', ')}`);
  } else if (prodConfig.isProduction) {
    console.warn('⚠️  CORS disabled in production - no origins configured');
  } else {
    // Development: Allow all origins
    app.enableCors();
    console.log('⚠️  CORS enabled for all origins (development mode)');
  }

  // 🔒 Global exception filter: Hide stack traces in production
  app.useGlobalFilters(new ProductionExceptionFilter());

  // Log production config
  ProductionConfigService.logConfig();

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Application listening on port ${port}`);
}
bootstrap();
