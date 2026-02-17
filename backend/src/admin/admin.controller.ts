import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ProviderReconciliationService } from './provider-reconciliation.service';
import { WebhookRetryService } from './webhook-retry.service';
import { DeadLetterQueueService } from './dead-letter-queue.service';
import { AlertsService } from './alerts.service';
import { AdminAccessLogger } from './admin-access.logger';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RateLimitAdminEmergency } from '../common/rate-limit/rate-limit.decorators';
import { AdminCreditDto } from './dtos/admin-credit.dto';

/**
 * Admin & Audit endpoints
 * Hard rules: JWT valid + Role.ADMIN + logged access
 * Every endpoint requires @Roles(Role.ADMIN) and logs to AdminAccessLog
 */
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(
    private adminService: AdminService,
    private providerReconciliationService: ProviderReconciliationService,
    private webhookRetryService: WebhookRetryService,
    private dlqService: DeadLetterQueueService,
    private alertsService: AlertsService,
    private accessLogger: AdminAccessLogger,
  ) {}

  /**
   * GET /admin/wallets
   * List all wallets with balances and activity summary
   * Pagination: ?limit=100&offset=0
   */
  @Get('wallets')
  async getAllWallets(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Req() req?,
  ) {
    const adminId = req.user?.userId;
    const parsedLimit = this.parseLimit(limit, 100, 500);
    const parsedOffset = this.parseOffset(offset);

    try {
      const result = await this.adminService.getAllWallets(
        parsedLimit,
        parsedOffset,
      );

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'list_wallets',
        resource: 'wallets',
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {
          limit: parsedLimit,
          offset: parsedOffset,
          returned: result.wallets.length,
        },
      });

      return {
        success: true,
        data: result.wallets,
        pagination: {
          limit: parsedLimit,
          offset: parsedOffset,
          total: result.total,
        },
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'list_wallets',
        resource: 'wallets',
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw error;
    }
  }

  /**
   * GET /admin/wallets/:id
   * Get specific wallet with full ledger history
   * Pagination: ?limit=50&offset=0
   */
  @Get('wallets/:id')
  async getWalletDetails(
    @Param('id') walletId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Req() req?,
  ) {
    const adminId = req.user?.userId;
    const parsedLimit = this.parseLimit(limit, 50, 500);
    const parsedOffset = this.parseOffset(offset);

    try {
      const result = await this.adminService.getWalletDetails(
        walletId,
        parsedLimit,
        parsedOffset,
      );

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'inspect_wallet',
        resource: 'wallets',
        resourceId: walletId,
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {
          walletUserId: result.wallet.userId,
          balance: result.wallet.balance,
        },
      });

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'inspect_wallet',
        resource: 'wallets',
        resourceId: walletId,
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw error;
    }
  }

  /**
   * GET /admin/wallets/user/:userId
   * List wallets by user ID (read-only)
   * Pagination: ?limit=100&offset=0
   */
  @Get('wallets/user/:userId')
  async getWalletsByUserId(
    @Param('userId') userId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Req() req?,
  ) {
    const adminId = req.user?.userId;
    const parsedLimit = this.parseLimit(limit, 100, 500);
    const parsedOffset = this.parseOffset(offset);

    try {
      const result = await this.adminService.getWalletsByUserId(
        userId,
        parsedLimit,
        parsedOffset,
      );

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'list_wallets_by_user',
        resource: 'wallets',
        resourceId: userId,
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {
          limit: parsedLimit,
          offset: parsedOffset,
          returned: result.wallets.length,
        },
      });

      return {
        success: true,
        data: result.wallets,
        pagination: {
          limit: parsedLimit,
          offset: parsedOffset,
          total: result.total,
        },
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'list_wallets_by_user',
        resource: 'wallets',
        resourceId: userId,
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw error;
    }
  }

  /**
   * GET /admin/ledger
   * Get all ledger entries (append-only audit trail)
   * Filters: ?walletId=xxx&source=xxx&startDate=xxx&endDate=xxx
   * Pagination: ?limit=100&offset=0
   * CRITICAL: Ledger is NEVER editable, NEVER deletable
   */
  @Get('ledger')
  async getAllLedgerEntries(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('walletId') walletId?: string,
    @Query('source') source?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Req() req?,
  ) {
    const adminId = req.user?.userId;
    const parsedLimit = this.parseLimit(limit, 100, 500);
    const parsedOffset = this.parseOffset(offset);

    const filters: any = {};
    if (walletId) filters.walletId = walletId;
    if (source) filters.source = source;
    if (startDate) filters.startDate = new Date(startDate);
    if (endDate) filters.endDate = new Date(endDate);

    try {
      const result = await this.adminService.getAllLedgerEntries(
        parsedLimit,
        parsedOffset,
        filters,
      );

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'audit_ledger_all',
        resource: 'ledger',
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {
          limit: parsedLimit,
          offset: parsedOffset,
          returned: result.entries.length,
          filters,
        },
      });

      return {
        success: true,
        data: result.entries,
        pagination: {
          limit: parsedLimit,
          offset: parsedOffset,
          total: result.total,
        },
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'audit_ledger_all',
        resource: 'ledger',
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw error;
    }
  }

  /**
   * GET /admin/ledger/wallet/:walletId
   * Get ledger entries for specific wallet
   * Pagination: ?limit=100&offset=0
   * CRITICAL: Ledger is NEVER editable, NEVER deletable
   */
  @Get('ledger/wallet/:walletId')
  async getLedgerByWallet(
    @Param('walletId') walletId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Req() req?,
  ) {
    const adminId = req.user?.userId;
    const parsedLimit = this.parseLimit(limit, 100, 500);
    const parsedOffset = this.parseOffset(offset);

    try {
      const result = await this.adminService.getLedgerEntriesByWallet(
        walletId,
        parsedLimit,
        parsedOffset,
      );

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'audit_ledger_by_wallet',
        resource: 'ledger',
        resourceId: walletId,
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {
          limit: parsedLimit,
          offset: parsedOffset,
          returned: result.entries.length,
        },
      });

      return {
        success: true,
        data: result.entries,
        pagination: {
          limit: parsedLimit,
          offset: parsedOffset,
          total: result.total,
        },
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'audit_ledger_by_wallet',
        resource: 'ledger',
        resourceId: walletId,
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw error;
    }
  }

  /**
   * GET /admin/ledger/tx/:txId
   * Get ledger entries for specific transaction
   * Pagination: ?limit=100&offset=0
   * CRITICAL: Ledger is NEVER editable, NEVER deletable
   */
  @Get('ledger/tx/:txId')
  async getLedgerByTransaction(
    @Param('txId') txId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Req() req?,
  ) {
    const adminId = req.user?.userId;
    const parsedLimit = this.parseLimit(limit, 100, 500);
    const parsedOffset = this.parseOffset(offset);

    try {
      const result = await this.adminService.getLedgerEntriesByTransaction(
        txId,
        parsedLimit,
        parsedOffset,
      );

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'audit_ledger_by_tx',
        resource: 'ledger',
        resourceId: txId,
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {
          limit: parsedLimit,
          offset: parsedOffset,
          returned: result.entries.length,
        },
      });

      return {
        success: true,
        data: result.entries,
        pagination: {
          limit: parsedLimit,
          offset: parsedOffset,
          total: result.total,
        },
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'audit_ledger_by_tx',
        resource: 'ledger',
        resourceId: txId,
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw error;
    }
  }

  /**
   * GET /admin/webhooks
   * List all webhook events (provider disputes, chargebacks, audits)
   * Shows: provider, eventId, status, linked transaction, receivedAt, payloadHash (NOT raw payload)
   * Filters: ?provider=xxx&status=xxx&startDate=xxx&endDate=xxx
   * Pagination: ?limit=100&offset=0
   */
  @Get('webhooks')
  async getAllWebhookEvents(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('provider') provider?: string,
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Req() req?,
  ) {
    const adminId = req.user?.userId;
    const parsedLimit = this.parseLimit(limit, 100, 500);
    const parsedOffset = this.parseOffset(offset);

    const filters: any = {};
    if (provider) filters.provider = provider;
    if (status) filters.status = status;
    if (startDate) filters.startDate = new Date(startDate);
    if (endDate) filters.endDate = new Date(endDate);

    try {
      const result = await this.adminService.getAllWebhookEvents(
        parsedLimit,
        parsedOffset,
        filters,
      );

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'inspect_webhooks',
        resource: 'webhooks',
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {
          limit: parsedLimit,
          offset: parsedOffset,
          returned: result.events.length,
          filters,
        },
      });

      return {
        success: true,
        data: result.events,
        pagination: {
          limit: parsedLimit,
          offset: parsedOffset,
          total: result.total,
        },
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'inspect_webhooks',
        resource: 'webhooks',
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw error;
    }
  }

  /**
   * GET /admin/webhooks/:eventId
   * Get specific webhook event details
   * Shows provider, eventId, status, linked transaction, receivedAt, payloadHash (NOT raw payload)
   * Does NOT show raw payload - only hash for tamper detection
   */
  @Get('webhooks/:eventId')
  async getWebhookEvent(@Param('eventId') eventId: string, @Req() req?) {
    const adminId = req.user?.userId;

    try {
      const result = await this.adminService.getWebhookEvent(eventId);

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'inspect_webhook',
        resource: 'webhooks',
        resourceId: eventId,
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {
          provider: result.provider,
          status: result.status,
        },
      });

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'inspect_webhook',
        resource: 'webhooks',
        resourceId: eventId,
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw error;
    }
  }

  /**
   * GET /admin/audit
   * View audit log of all admin actions (read-only)
   * Filters: ?adminUserId=xxx&action=xxx&resource=xxx&status=xxx&startDate=xxx&endDate=xxx
   * Pagination: ?limit=100&offset=0
   * Critical for forensic investigation and compliance
   */
  @Get('audit')
  async getAuditLog(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('adminUserId') adminUserId?: string,
    @Query('action') action?: string,
    @Query('resource') resource?: string,
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Req() req?,
  ) {
    const requesterAdminId = req.user?.userId;
    const parsedLimit = this.parseLimit(limit, 100, 500);
    const parsedOffset = this.parseOffset(offset);

    const filters: any = {};
    if (adminUserId) filters.adminUserId = adminUserId;
    if (action) filters.action = action;
    if (resource) filters.resource = resource;
    if (status) filters.status = status;
    if (startDate) filters.startDate = new Date(startDate);
    if (endDate) filters.endDate = new Date(endDate);

    try {
      const result = await this.accessLogger.getLogs(
        parsedLimit,
        parsedOffset,
        filters,
      );

      await this.accessLogger.logAccess({
        adminUserId: requesterAdminId,
        action: 'view_audit_log',
        resource: 'audit',
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {
          limit: parsedLimit,
          offset: parsedOffset,
          returned: result.logs.length,
          filters,
        },
      });

      return {
        success: true,
        data: result.logs,
        pagination: {
          limit: parsedLimit,
          offset: parsedOffset,
          total: result.total,
        },
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: requesterAdminId,
        action: 'view_audit_log',
        resource: 'audit',
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw error;
    }
  }

  /**
   * GET /admin/audit/ledger-integrity
   * Validate wallet balance against ledger totals (reconciliation)
   * Optional: ?walletId=xxx (single wallet)
   * Pagination: ?limit=100&offset=0 (when walletId not provided)
   */
  @Get('audit/ledger-integrity')
  async getLedgerIntegrity(
    @Query('walletId') walletId?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Req() req?,
  ) {
    const adminId = req.user?.userId;
    const parsedLimit = this.parseLimit(limit, 100, 500);
    const parsedOffset = this.parseOffset(offset);

    try {
      if (walletId) {
        const result = await this.adminService.getLedgerIntegrity(walletId);

        await this.accessLogger.logAccess({
          adminUserId: adminId,
          action: 'audit_ledger_integrity',
          resource: 'ledger_integrity',
          resourceId: walletId,
          status: 'success',
          ipAddress: req?.ip,
          userAgent: req?.get('user-agent'),
          metadata: { walletId, isConsistent: result.isConsistent },
        });

        return {
          success: true,
          data: result,
        };
      }

      const result = await this.adminService.getLedgerIntegrityAll(
        parsedLimit,
        parsedOffset,
      );

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'audit_ledger_integrity',
        resource: 'ledger_integrity',
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {
          limit: parsedLimit,
          offset: parsedOffset,
          returned: result.results.length,
          mismatches: result.mismatches,
        },
      });

      return {
        success: true,
        data: result.results,
        summary: { mismatches: result.mismatches },
        pagination: {
          limit: parsedLimit,
          offset: parsedOffset,
          total: result.total,
        },
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'audit_ledger_integrity',
        resource: 'ledger_integrity',
        resourceId: walletId,
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw error;
    }
  }

  /**
   * POST /admin/wallet/:walletId/credit
   * Manual credit (EMERGENCY ONLY)
   * Requires:
   * - amount >= 0.01
   * - reason >= 10 characters (audit trail)
   * - Admin role
   * Logged as source='admin' with adminId visible in ledger
   * Rate limited: 2 req/min (strictly controlled)
   *
   * ⚠️ WARNING: No debit allowed. Refunds = credits with reference.
   */
  @Post('wallet/:walletId/credit')
  @RateLimitAdminEmergency()
  async manualCredit(
    @Param('walletId') walletId: string,
    @Body() input: any,
    @Req() req?,
  ) {
    const adminId = req.user?.userId;

    if (!adminId) {
      throw new BadRequestException('Admin ID not found in request');
    }

    try {
      // Validate DTO
      const dto = new AdminCreditDto(input);

      const result = await this.adminService.manualCredit(
        walletId,
        dto.amount,
        dto.reason,
        adminId,
      );

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'manual_credit',
        resource: 'wallets',
        resourceId: walletId,
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {
          amount: dto.amount,
          reason: dto.reason,
          balanceBefore: result.balanceBefore,
          balanceAfter: result.balanceAfter,
          ledgerEntryId: result.ledgerEntryId,
        },
      });

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'manual_credit',
        resource: 'wallets',
        resourceId: walletId,
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {
          amount: input?.amount,
          error: error.message,
        },
      });
      throw new BadRequestException(
        error.message || 'Failed to process manual credit',
      );
    }
  }

  /**
   * GET /admin/audit/flagged-wallets
   * Get all wallets flagged for review due to reconciliation issues
   */
  @Get('audit/flagged-wallets')
  async getFlaggedWallets(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Req() req?,
  ) {
    const adminId = req.user?.userId;
    const parsedLimit = this.parseLimit(limit, 100, 500);
    const parsedOffset = this.parseOffset(offset);

    try {
      const result = await this.adminService.getFlaggedWallets(
        parsedLimit,
        parsedOffset,
      );

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'list_flagged_wallets',
        resource: 'audit',
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {
          limit: parsedLimit,
          offset: parsedOffset,
          returned: result.wallets.length,
        },
      });

      return {
        success: true,
        data: result.wallets,
        pagination: {
          limit: parsedLimit,
          offset: parsedOffset,
          total: result.total,
        },
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'list_flagged_wallets',
        resource: 'audit',
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw error;
    }
  }

  /**
   * POST /admin/wallet/:walletId/clear-flag
   * Clear the review flag from a wallet after manual verification
   */
  @Post('wallet/:walletId/clear-flag')
  async clearWalletFlag(@Param('walletId') walletId: string, @Req() req?) {
    const adminId = req.user?.userId;

    if (!adminId) {
      throw new BadRequestException('Admin ID not found in request');
    }

    try {
      await this.adminService.clearWalletFlag(walletId, adminId);

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'clear_wallet_flag',
        resource: 'wallets',
        resourceId: walletId,
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {},
      });

      return {
        success: true,
        message: 'Wallet flag cleared',
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'clear_wallet_flag',
        resource: 'wallets',
        resourceId: walletId,
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw error;
    }
  }

  /**
   * GET /admin/audit/missing-webhooks
   * Get all pending missing webhook alerts
   */
  @Get('audit/missing-webhooks')
  async getMissingWebhooks(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Req() req?,
  ) {
    const adminId = req.user?.userId;
    const parsedLimit = this.parseLimit(limit, 100, 500);
    const parsedOffset = this.parseOffset(offset);

    try {
      const result =
        await this.providerReconciliationService.getPendingMissingWebhooks(
          parsedLimit,
          parsedOffset,
        );

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'list_missing_webhooks',
        resource: 'audit',
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {
          limit: parsedLimit,
          offset: parsedOffset,
          returned: result.alerts.length,
        },
      });

      return {
        success: true,
        data: result.alerts,
        pagination: {
          limit: parsedLimit,
          offset: parsedOffset,
          total: result.total,
        },
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'list_missing_webhooks',
        resource: 'audit',
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw error;
    }
  }

  /**
   * POST /admin/webhook/:alertId/resolve
   * Mark a missing webhook alert as resolved with notes
   */
  @Post('webhook/:alertId/resolve')
  async resolveMissingWebhook(
    @Param('alertId') alertId: string,
    @Body('resolution') resolution: string,
    @Body('notes') notes?: string,
    @Req() req?,
  ) {
    const adminId = req.user?.userId;

    if (!adminId) {
      throw new BadRequestException('Admin ID not found in request');
    }

    const validResolutions = ['webhook_received', 'manual_credit', 'cancelled'];
    if (!validResolutions.includes(resolution)) {
      throw new BadRequestException(
        `Invalid resolution. Must be one of: ${validResolutions.join(', ')}`,
      );
    }

    try {
      await this.providerReconciliationService.resolveMissingWebhook(
        alertId,
        resolution as any,
        notes,
      );

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'resolve_missing_webhook',
        resource: 'audit',
        resourceId: alertId,
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { resolution, notes },
      });

      return {
        success: true,
        message: 'Missing webhook alert resolved',
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'resolve_missing_webhook',
        resource: 'audit',
        resourceId: alertId,
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw new BadRequestException(
        error.message || 'Failed to resolve missing webhook',
      );
    }
  }

  /**
   * POST /admin/webhook/:alertId/replay
   * Manually replay a missing webhook (credit wallet)
   * Rate limited to prevent abuse
   */
  @Post('webhook/:alertId/replay')
  @RateLimitAdminEmergency()
  async replayMissingWebhook(@Param('alertId') alertId: string, @Req() req?) {
    const adminId = req.user?.userId;

    if (!adminId) {
      throw new BadRequestException('Admin ID not found in request');
    }

    try {
      await this.providerReconciliationService.replayMissingWebhook(
        alertId,
        adminId,
      );

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'replay_missing_webhook',
        resource: 'audit',
        resourceId: alertId,
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {},
      });

      return {
        success: true,
        message: 'Missing webhook replayed and wallet credited',
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'replay_missing_webhook',
        resource: 'audit',
        resourceId: alertId,
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw new BadRequestException(
        error.message || 'Failed to replay missing webhook',
      );
    }
  }

  /**
   * GET /admin/audit/dead-letter-webhooks
   * Get all webhook events in dead-letter queue
   */
  @Get('audit/dead-letter-webhooks')
  async getDeadLetterWebhooks(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Req() req?,
  ) {
    const adminId = req.user?.userId;
    const parsedLimit = this.parseLimit(limit, 100, 500);
    const parsedOffset = this.parseOffset(offset);

    try {
      const result = await this.webhookRetryService.getDeadLetterWebhooks(
        parsedLimit,
        parsedOffset,
      );

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'list_dead_letter_webhooks',
        resource: 'audit',
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {
          limit: parsedLimit,
          offset: parsedOffset,
          returned: result.webhooks.length,
        },
      });

      return {
        success: true,
        data: result.webhooks,
        pagination: {
          limit: parsedLimit,
          offset: parsedOffset,
          total: result.total,
        },
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'list_dead_letter_webhooks',
        resource: 'audit',
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw error;
    }
  }

  /**
   * POST /admin/webhook/:webhookId/retry-dead-letter
   * Manually retry a dead-letter webhook
   * Resets retry count and attempts processing again
   * Rate limited
   */
  @Post('webhook/:webhookId/retry-dead-letter')
  @RateLimitAdminEmergency()
  async retryDeadLetterWebhook(
    @Param('webhookId') webhookId: string,
    @Req() req?,
  ) {
    const adminId = req.user?.userId;

    if (!adminId) {
      throw new BadRequestException('Admin ID not found in request');
    }

    try {
      await this.webhookRetryService.manuallyRetryDeadLetter(
        webhookId,
        adminId,
      );

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'retry_dead_letter_webhook',
        resource: 'audit',
        resourceId: webhookId,
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {},
      });

      return {
        success: true,
        message: 'Dead-letter webhook moved back to retry queue',
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'retry_dead_letter_webhook',
        resource: 'audit',
        resourceId: webhookId,
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw new BadRequestException(
        error.message || 'Failed to retry dead-letter webhook',
      );
    }
  }

  /**
   * GET /admin/dead-letter-queue
   * Get all pending dead-letter items (human review required)
   */
  @Get('dead-letter-queue')
  async getDeadLetterQueue(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('status') status?: string,
    @Query('provider') provider?: string,
    @Req() req?,
  ) {
    const adminId = req.user?.userId;
    const parsedLimit = this.parseLimit(limit, 100, 500);
    const parsedOffset = this.parseOffset(offset);

    try {
      let result;
      if (provider) {
        result = await this.dlqService.getByProvider(
          provider,
          parsedLimit,
          parsedOffset,
        );
      } else if (status) {
        result = await this.dlqService.getByStatus(
          status,
          parsedLimit,
          parsedOffset,
        );
      } else {
        result = await this.dlqService.getPending(parsedLimit, parsedOffset);
      }

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'list_dlq',
        resource: 'dead_letter_queue',
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {
          limit: parsedLimit,
          offset: parsedOffset,
          returned: result.items.length,
          status: status || 'pending',
          provider: provider || 'all',
        },
      });

      return {
        success: true,
        data: result.items,
        pagination: {
          limit: parsedLimit,
          offset: parsedOffset,
          total: result.total,
        },
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'list_dlq',
        resource: 'dead_letter_queue',
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw error;
    }
  }

  /**
   * GET /admin/dead-letter-queue/stats
   * Get DLQ summary statistics
   */
  @Get('dead-letter-queue/stats')
  async getDLQStats(@Req() req?) {
    const adminId = req.user?.userId;

    try {
      const stats = await this.dlqService.getStats();

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'get_dlq_stats',
        resource: 'dead_letter_queue',
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: stats,
      });

      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to get DLQ stats');
    }
  }

  /**
   * POST /admin/dead-letter-queue/:dlqId/resolve
   * Mark a DLQ item as resolved (requires human decision)
   */
  @Post('dead-letter-queue/:dlqId/resolve')
  async resolveDLQItem(
    @Param('dlqId') dlqId: string,
    @Body('resolution') resolution: string,
    @Body('notes') notes?: string,
    @Req() req?,
  ) {
    const adminId = req.user?.userId;

    if (!adminId) {
      throw new BadRequestException('Admin ID not found in request');
    }

    const validResolutions = ['manual_replay', 'manual_credit', 'cancelled'];
    if (!validResolutions.includes(resolution)) {
      throw new BadRequestException(
        `Invalid resolution. Must be one of: ${validResolutions.join(', ')}`,
      );
    }

    try {
      await this.dlqService.resolve(dlqId, resolution as any, notes, adminId);

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'resolve_dlq',
        resource: 'dead_letter_queue',
        resourceId: dlqId,
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { resolution, notes },
      });

      return {
        success: true,
        message: 'DLQ item resolved',
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'resolve_dlq',
        resource: 'dead_letter_queue',
        resourceId: dlqId,
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw new BadRequestException(
        error.message || 'Failed to resolve DLQ item',
      );
    }
  }

  /**
   * POST /admin/dead-letter-queue/:dlqId/archive
   * Archive resolved DLQ item (housekeeping)
   */
  @Post('dead-letter-queue/:dlqId/archive')
  async archiveDLQItem(@Param('dlqId') dlqId: string, @Req() req?) {
    const adminId = req.user?.userId;

    try {
      await this.dlqService.archive(dlqId);

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'archive_dlq',
        resource: 'dead_letter_queue',
        resourceId: dlqId,
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {},
      });

      return {
        success: true,
        message: 'DLQ item archived',
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'archive_dlq',
        resource: 'dead_letter_queue',
        resourceId: dlqId,
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw new BadRequestException(
        error.message || 'Failed to archive DLQ item',
      );
    }
  }

  /**
   * GET /admin/alerts
   * View unresolved alerts (critical system conditions)
   */
  @Get('alerts')
  async getAlerts(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('type') alertType?: string,
    @Req() req?,
  ) {
    const adminId = req.user?.userId;
    const parsedLimit = this.parseLimit(limit, 100, 500);
    const parsedOffset = this.parseOffset(offset);

    try {
      const result = await this.alertsService.getUnresolved(
        alertType,
        parsedLimit,
        parsedOffset,
      );

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'list_alerts',
        resource: 'alerts',
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {
          limit: parsedLimit,
          offset: parsedOffset,
          returned: result.alerts.length,
          alertType: alertType || 'all',
        },
      });

      return {
        success: true,
        data: result.alerts,
        pagination: {
          limit: parsedLimit,
          offset: parsedOffset,
          total: result.total,
        },
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'list_alerts',
        resource: 'alerts',
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw error;
    }
  }

  /**
   * GET /admin/alerts/stats
   * Alert statistics and summary
   */
  @Get('alerts/stats')
  async getAlertStats(@Req() req?) {
    const adminId = req.user?.userId;

    try {
      const stats = await this.alertsService.getStats();

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'get_alert_stats',
        resource: 'alerts',
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: stats,
      });

      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to get alert stats',
      );
    }
  }

  /**
   * POST /admin/alerts/:alertId/acknowledge
   * Mark alert as acknowledged (admin reviewed it)
   */
  @Post('alerts/:alertId/acknowledge')
  async acknowledgeAlert(@Param('alertId') alertId: string, @Req() req?) {
    const adminId = req.user?.userId;

    try {
      await this.alertsService.acknowledge(alertId);

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'acknowledge_alert',
        resource: 'alerts',
        resourceId: alertId,
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {},
      });

      return {
        success: true,
        message: 'Alert acknowledged',
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'acknowledge_alert',
        resource: 'alerts',
        resourceId: alertId,
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw new BadRequestException(
        error.message || 'Failed to acknowledge alert',
      );
    }
  }

  /**
   * POST /admin/alerts/:alertId/resolve
   * Mark alert as resolved (issue dealt with)
   */
  @Post('alerts/:alertId/resolve')
  async resolveAlert(@Param('alertId') alertId: string, @Req() req?) {
    const adminId = req.user?.userId;

    if (!adminId) {
      throw new BadRequestException('Admin ID not found in request');
    }

    try {
      await this.alertsService.resolve(alertId, adminId);

      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'resolve_alert',
        resource: 'alerts',
        resourceId: alertId,
        status: 'success',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: {},
      });

      return {
        success: true,
        message: 'Alert resolved',
      };
    } catch (error) {
      await this.accessLogger.logAccess({
        adminUserId: adminId,
        action: 'resolve_alert',
        resource: 'alerts',
        resourceId: alertId,
        status: 'error',
        ipAddress: req?.ip,
        userAgent: req?.get('user-agent'),
        metadata: { error: error.message },
      });
      throw new BadRequestException(error.message || 'Failed to resolve alert');
    }
  }

  private parseLimit(
    value: string | undefined,
    fallback: number,
    max: number,
  ): number {
    const parsed = Number.parseInt(value ?? '', 10);
    if (Number.isNaN(parsed)) return fallback;
    return Math.min(Math.max(parsed, 1), max);
  }

  private parseOffset(value: string | undefined): number {
    const parsed = Number.parseInt(value ?? '', 10);
    if (Number.isNaN(parsed)) return 0;
    return Math.max(parsed, 0);
  }
}
