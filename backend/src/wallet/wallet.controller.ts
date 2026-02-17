import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Req,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletLedgerService } from './services/wallet-ledger.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/roles.enum';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { CreditWalletDto } from './dto/credit-wallet.dto';
import { DebitWalletDto } from './dto/debit-wallet.dto';
import {
  RateLimitWalletRead,
  RateLimitWalletWrite,
} from '../common/rate-limit/rate-limit.decorators';
import {
  CreateWalletInput,
  WalletResponse,
  CreditWalletInput,
  DebitWalletInput,
  LedgerEntryResponse,
} from './types/wallet.types';

@Controller('wallets')
@UseGuards(RolesGuard)
export class WalletController {
  constructor(
    private walletService: WalletService,
    private ledgerService: WalletLedgerService,
  ) {}

  /**
   * Create wallet for authenticated user
   * POST /wallets/create
   * Validates: userId match, currency enum only
   * Rate limit: 10 req/min
   */
  @RateLimitWalletWrite()
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createWallet(@Req() req, @Body() input: any): Promise<WalletResponse> {
    try {
      // Validate DTO
      const dto = new CreateWalletDto(input);

      // Ensure user can only create wallet for themselves
      if (dto.userId !== req.user.userId) {
        throw new ForbiddenException(
          'You can only create a wallet for yourself',
        );
      }

      return this.walletService.createWallet(dto as any);
    } catch (error: any) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException(error.message || 'Invalid wallet data');
    }
  }

  /**
   * Get authenticated user's wallet
   * GET /wallets/me
   * Rate limit: 30 req/min
   */
  @RateLimitWalletRead()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyWallet(@Req() req): Promise<WalletResponse> {
    return this.walletService.getWalletByUserId(req.user.userId);
  }

  /**
   * Get wallet by ID
   * GET /wallets/:id
   * Users can only access their own wallet
   * Rate limit: 30 req/min
   */
  @RateLimitWalletRead()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getWallet(
    @Param('id') walletId: string,
    @Req() req,
  ): Promise<WalletResponse> {
    const wallet = await this.walletService.getWallet(walletId);

    // Regular users can only access their own wallet
    if (req.user.role !== Role.ADMIN && wallet.userId !== req.user.userId) {
      throw new ForbiddenException('You can only access your own wallet');
    }

    return wallet;
  }

  /**
   * Get wallet balance by ID
   * GET /wallets/:id/balance
   * Users can only access their own wallet balance
   * Rate limit: 30 req/min
   */
  @RateLimitWalletRead()
  @UseGuards(JwtAuthGuard)
  @Get(':id/balance')
  async getBalance(
    @Param('id') walletId: string,
    @Req() req,
  ): Promise<{ balance: number }> {
    const wallet = await this.walletService.getWallet(walletId);

    // Regular users can only access their own wallet
    if (req.user.role !== Role.ADMIN && wallet.userId !== req.user.userId) {
      throw new ForbiddenException('You can only access your own wallet');
    }

    const balance = await this.walletService.getBalance(walletId);
    return { balance };
  }

  /**
   * Get wallet ledger entries
   * GET /wallets/:id/ledger
   * ADMIN ONLY - Inspect wallet transaction ledger
   * Query params:
   * - limit: number (default 50)
   * - offset: number (default 0)
   * Rate limit: 30 req/min
   */
  @RateLimitWalletRead()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get(':id/ledger')
  async getLedger(
    @Param('id') walletId: string,
    @Req() req,
  ): Promise<{ entries: LedgerEntryResponse[]; total: number }> {
    const limit = Math.min(parseInt(req.query.limit || '50'), 100);
    const offset = parseInt(req.query.offset || '0');

    const entries = await this.ledgerService.getEntries(
      walletId,
      limit,
      offset,
    );
    const total = await this.ledgerService.getEntryCount(walletId);

    return {
      entries: entries.map(this.mapLedgerEntry),
      total,
    };
  }

  /**
   * Credit wallet (internal only)
   * POST /wallets/credit
   * Internal endpoint - from on-ramp, transfers, etc.
   * Validates: walletId, amount > 0, amount decimals <= 2, type enum
   * Rate limit: 10 req/min (CRITICAL - must be limited)
   */
  @RateLimitWalletWrite()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Post('credit')
  async creditWallet(@Body() input: any, @Req() req): Promise<WalletResponse> {
    try {
      // Validate DTO
      const dto = new CreditWalletDto(input);
      return this.walletService.creditWallet({
        ...(dto as CreditWalletInput),
        source: 'admin',
        actorRole: req.user.role,
        actorUserId: req.user.userId,
      });
    } catch (error: any) {
      throw new BadRequestException(
        error.message || 'Invalid credit wallet data',
      );
    }
  }

  /**
   * Debit wallet (internal only)
   * POST /wallets/debit
   * Internal endpoint - for withdrawals, trading, etc.
   * Validates: walletId, amount > 0, amount decimals <= 2, type enum
   * Rate limit: 10 req/min (CRITICAL - must be limited)
   */
  @RateLimitWalletWrite()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard)
  @Post('debit')
  async debitWallet(@Body() input: any, @Req() req): Promise<WalletResponse> {
    try {
      // Validate DTO
      const dto = new DebitWalletDto(input);
      return this.walletService.debitWallet({
        ...(dto as DebitWalletInput),
        source: 'user',
        userId: req.user.userId,
      });
    } catch (error: any) {
      throw new BadRequestException(
        error.message || 'Invalid debit wallet data',
      );
    }
  }

  private mapLedgerEntry(entry: any): LedgerEntryResponse {
    return {
      id: entry.id,
      walletId: entry.walletId,
      type: entry.type,
      amount: entry.amount,
      balanceBefore: entry.balanceBefore,
      balanceAfter: entry.balanceAfter,
      reference: entry.reference,
      description: entry.description,
      createdAt: entry.createdAt,
    };
  }
}
