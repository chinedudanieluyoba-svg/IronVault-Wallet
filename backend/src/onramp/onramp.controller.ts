import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Req,
  Headers,
  ForbiddenException,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { OnRampService } from './onramp.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogger } from '../common/logging/audit.logger';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/roles.enum';
import { InitiateOnRampDto as InitiateOnRampDtoClass } from './dto/initiate-onramp.dto';
import {
  RateLimitOnRamp,
  RateLimitWebhook,
} from '../common/rate-limit/rate-limit.decorators';
import { parseMoonPayWebhook } from './providers/moonpay.parser';
import { WebhookIPGuard } from '../common/guards/webhook-ip.guard';

interface InitiateOnRampDto {
  amount: number;
  currency: string;
  provider: 'moonpay' | 'transak' | 'paystack' | 'stripe';
}

interface WebhookDto {
  providerTxId: string;
  status: string;
  amount: number;
  provider?: string;
  [key: string]: any;
}

@Controller('onramp')
@UseGuards(RolesGuard)
export class OnRampController {
  constructor(
    private readonly onRampService: OnRampService,
    private readonly prisma: PrismaService,
    private readonly auditLogger: AuditLogger,
  ) {}

  /**
   * Initiate on-ramp transaction
   * User selects provider and amount, gets payment link
   * Requires authentication to link to user's wallet
   * Validates: amount > 0, amount decimals <= 2, currency enum, provider enum
   * Rate limit: 15 req/min
   */
  @RateLimitOnRamp()
  @UseGuards(JwtAuthGuard)
  @Post('initiate')
  async initiateOnRamp(@Body() input: any, @Req() req) {
    try {
      // Validate DTO
      const dto = new InitiateOnRampDtoClass(input);

      // Get user's wallet
      const wallet = await this.prisma.wallet.findUnique({
        where: { userId: req.user.userId },
      });

      if (!wallet) {
        throw new Error('Wallet not found');
      }

      return this.onRampService.initiateOnRamp({
        walletId: wallet.id,
        amount: dto.amount,
        currency: dto.currency,
        provider: dto.provider,
      });
    } catch (error: any) {
      if (
        error instanceof BadRequestException ||
        error.message === 'Wallet not found'
      ) {
        throw error instanceof BadRequestException
          ? error
          : new BadRequestException(error.message);
      }
      throw new BadRequestException(error.message || 'Invalid on-ramp data');
    }
  }

  /**
   * Get on-ramp transaction status
   * Requires authentication and ownership verification
   * Rate limit: 15 req/min
   */
  @RateLimitOnRamp()
  @UseGuards(JwtAuthGuard)
  @Get(':onRampId/status')
  async getStatus(@Param('onRampId') onRampId: string, @Req() req) {
    const onRamp = await this.prisma.onRamp.findUnique({
      where: { id: onRampId },
      include: { wallet: true },
    });

    if (!onRamp) {
      throw new Error('OnRamp transaction not found');
    }

    // Verify user owns this on-ramp's wallet
    if (
      req.user.role !== Role.ADMIN &&
      onRamp.wallet.userId !== req.user.userId
    ) {
      throw new ForbiddenException(
        'You can only access your own on-ramp transactions',
      );
    }

    return this.onRampService.getStatus(onRampId);
  }

  /**
   * Get webhook event logs
   * GET /onramp/webhook-logs
   * ADMIN ONLY - Inspect webhook event history
   * Rate limit: 15 req/min
   */
  @RateLimitOnRamp()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get('webhook-logs')
  async getWebhookLogs(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const limitNum = Math.min(parseInt(limit || '50'), 100);
    const offsetNum = parseInt(offset || '0');

    const events = await this.prisma.webhookEvent.findMany({
      take: limitNum,
      skip: offsetNum,
      orderBy: { receivedAt: 'desc' },
    });

    const total = await this.prisma.webhookEvent.count();

    return {
      events,
      total,
      limit: limitNum,
      offset: offsetNum,
    };
  }

  /**
   * MoonPay webhook endpoint
   * Receives payment completion events from MoonPay
   * Signature already verified by MoonPay middleware
   * NO RATE LIMIT - IP + signature gated
   *
   * Flow:
   * 1. MoonPay calls this endpoint with payment data
   * 2. Parse payload into normalized OnRampEvent
   * 3. Process event (applies status gate, credits wallet if completed)
   * 4. Return receipt
   */
  @UseGuards(WebhookIPGuard)
  @RateLimitWebhook()
  @Post('webhook/moonpay')
  async handleMoonPayWebhook(@Req() req, @Headers() headers) {
    if (!this.verifyWebhookSecret('moonpay', headers)) {
      this.auditLogger.warn({}, 'Webhook rejected: invalid MoonPay signature', {
        provider: 'moonpay',
      });
      throw new ForbiddenException('Webhook signature verification failed');
    }

    const event = parseMoonPayWebhook(req.body);
    await this.onRampService.processEvent(event, true);

    return { received: true };
  }

  /**
   * Webhook endpoint for payment providers
   * MUST be public (no auth guard)
   * Providers POST payment confirmation here
   * Verifies signature and atomically credits wallet
   * NO RATE LIMIT - IP + signature gated
   *
   * Flow:
   * 1. User completes payment on provider
   * 2. Provider calls this webhook
   * 3. Signature verified
   * 4. Wallet atomically credited
   * 5. Transaction record created for audit
   */
  @UseGuards(WebhookIPGuard)
  @RateLimitWebhook()
  @Post('webhook/:provider')
  async handleWebhook(
    @Param('provider') provider: string,
    @Body() payload: WebhookDto,
    @Headers() headers,
  ) {
    if (!this.verifyWebhookSecret(provider, headers)) {
      this.auditLogger.warn(
        {},
        'Webhook rejected: invalid provider signature',
        { provider },
      );
      throw new ForbiddenException('Webhook signature verification failed');
    }

    return this.onRampService.handleProviderWebhook({
      ...payload,
      provider: provider as 'moonpay' | 'transak' | 'paystack' | 'stripe',
    });
  }

  private verifyWebhookSecret(
    provider: string,
    headers: Record<string, any>,
  ): boolean {
    const providerKey = provider.toLowerCase();
    const secretMap: Record<string, string | undefined> = {
      moonpay: process.env.MOONPAY_WEBHOOK_SECRET,
      transak: process.env.TRANSAK_WEBHOOK_SECRET,
      paystack: process.env.PAYSTACK_WEBHOOK_SECRET,
      stripe: process.env.STRIPE_WEBHOOK_SECRET,
    };

    const expected = secretMap[providerKey];
    if (!expected) {
      return false;
    }

    const provided =
      (headers['x-webhook-secret'] as string) ||
      (headers['x-provider-webhook-secret'] as string);

    return typeof provided === 'string' && provided === expected;
  }
}
