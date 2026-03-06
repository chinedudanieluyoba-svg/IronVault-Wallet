import 'dotenv/config'; // ⚡ Load .env file before any code reads process.env
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentValidator } from './config/env-validator';
import { ProductionExceptionFilter } from './common/filters/production-exception.filter';

async function bootstrap() {
  // ⚡ FAIL FAST: Validate required environment variables before app starts
  EnvironmentValidator.validate();

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: [
      'https://iron-vault-wallet.com',
      'https://www.iron-vault-wallet.com'
    ],
    credentials: true,
  });

  // 🔒 Global exception filter: Hide stack traces in production
  app.useGlobalFilters(new ProductionExceptionFilter());

  const port = process.env.PORT || 3000;
  // Enable NestJS built-in shutdown hooks so SIGTERM/SIGINT trigger
  // OnModuleDestroy lifecycle hooks (e.g. PrismaService.$disconnect)
  app.enableShutdownHooks();
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Application listening on port ${port}`);
}
bootstrap();
