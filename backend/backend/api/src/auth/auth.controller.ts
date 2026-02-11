import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RateLimitAuth } from '../common/rate-limit/rate-limit.decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @RateLimitAuth()
  @Post('signup')
  signup(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.signup(email, password);
  }
}
