import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt/jwt.service';

@Module({
  providers: [JwtStrategy],
})
export class StrategiesModule {}
