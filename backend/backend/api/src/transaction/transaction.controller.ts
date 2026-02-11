import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Param,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { TransactionService, TransactionType } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/roles.enum';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { RateLimitTransaction } from '../common/rate-limit/rate-limit.decorators';
import { PrismaService } from '../prisma/prisma.service';

@Controller('transaction')
@UseGuards(RolesGuard)
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Create a new transaction (deposit, withdraw, buy, sell)
   * Uses atomic Prisma $transaction() for safety
   * Supports idempotency keys to prevent duplicate charges
   * Validates: walletId, type enum, amount > 0, amount decimals <= 2
   * Rate limit: 20 req/min
   */
  @RateLimitTransaction()
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createTransaction(@Body() input: any, @Req() req) {
    try {
      // Validate DTO
      const dto = new CreateTransactionDto(input);
      return this.transactionService.createTransaction({
        walletId: dto.walletId,
        type: dto.type,
        amount: dto.amount,
        idempotencyKey: dto.idempotencyKey,
        source: 'user',
        userId: req.user.userId,
      });
    } catch (error: any) {
      throw new BadRequestException(
        error.message || 'Invalid transaction data',
      );
    }
  }

  /**
   * Get all transactions for a specific wallet, ordered by most recent first
   * Rate limit: 20 req/min
   */
  @RateLimitTransaction()
  @UseGuards(JwtAuthGuard)
  @Get(':walletId/history')
  async getTransactionHistory(@Param('walletId') walletId: string, @Req() req) {
    return this.transactionService.getTransactionsByWallet(
      walletId,
      req.user.userId,
      req.user.role,
    );
  }

  /**
   * Get wallet summary with balance and transaction statistics
   * Rate limit: 20 req/min
   */
  @RateLimitTransaction()
  @UseGuards(JwtAuthGuard)
  @Get(':walletId/summary')
  async getWalletSummary(@Param('walletId') walletId: string, @Req() req) {
    return this.transactionService.getWalletSummary(
      walletId,
      req.user.userId,
      req.user.role,
    );
  }
}
