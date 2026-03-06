import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { ReadinessService } from './readiness.service';

@Controller()
export class HealthController {
  constructor(private readinessService: ReadinessService) {}

  @Get('health')
  getHealth() {
    return { status: 'ok' };
  }

  @Get('ready')
  async getReady() {
    const report = await this.readinessService.checkReady();

    if (!report.ok) {
      throw new ServiceUnavailableException({
        status: 'not_ready',
        checks: report.checks,
      });
    }

    return {
      status: 'ready',
      checks: report.checks,
    };
  }
}
