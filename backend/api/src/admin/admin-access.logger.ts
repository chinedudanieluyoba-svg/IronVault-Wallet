import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogger } from '../common/logging/audit.logger';
import { RequestIdStorage } from '../common/logging/request-id.storage';

export interface AdminAccessEntry {
  adminUserId: string;
  action: string;
  resource: string;
  resourceId?: string;
  status: 'success' | 'denied' | 'error';
  requestId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

/**
 * Logs all admin access for forensic audit trail
 * Every admin action is recorded with timestamp, resource, and outcome
 */
@Injectable()
export class AdminAccessLogger {
  constructor(
    private prisma: PrismaService,
    private auditLogger: AuditLogger,
    private requestIdStorage: RequestIdStorage,
  ) {}

  /**
   * Log admin access attempt
   * Used for forensic audit trail and compliance reporting
   */
  async logAccess(entry: AdminAccessEntry): Promise<void> {
    try {
      const requestId = entry.requestId || this.requestIdStorage.getRequestId();
      await this.prisma.adminAccessLog.create({
        data: {
          adminUserId: entry.adminUserId,
          action: entry.action,
          resource: entry.resource,
          resourceId: entry.resourceId,
          status: entry.status,
          requestId,
          ipAddress: entry.ipAddress,
          userAgent: entry.userAgent,
          metadata: entry.metadata,
          timestamp: new Date(),
        },
      });

      // Also log to audit trail
      this.auditLogger.audit(
        { userId: entry.adminUserId },
        `Admin action: ${entry.action}`,
        {
          requestId,
          resource: entry.resource,
          resourceId: entry.resourceId,
          status: entry.status,
          ipAddress: entry.ipAddress,
        },
      );
    } catch (error) {
      console.error('Failed to log admin access:', error);
    }
  }

  /**
   * Get admin access logs (admin only)
   * Paginated with filters
   */
  async getLogs(
    limit: number = 100,
    offset: number = 0,
    filters?: {
      adminUserId?: string;
      action?: string;
      resource?: string;
      status?: string;
      startDate?: Date;
      endDate?: Date;
    },
  ) {
    const where: any = {};

    if (filters?.adminUserId) where.adminUserId = filters.adminUserId;
    if (filters?.action) where.action = filters.action;
    if (filters?.resource) where.resource = filters.resource;
    if (filters?.status) where.status = filters.status;

    if (filters?.startDate || filters?.endDate) {
      where.timestamp = {};
      if (filters.startDate) where.timestamp.gte = filters.startDate;
      if (filters.endDate) where.timestamp.lte = filters.endDate;
    }

    const [logs, total] = await Promise.all([
      this.prisma.adminAccessLog.findMany({
        where,
        orderBy: { timestamp: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.adminAccessLog.count({ where }),
    ]);

    return { logs, total };
  }
}
