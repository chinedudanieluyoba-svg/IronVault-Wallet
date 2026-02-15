import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogger } from '../common/logging/audit.logger';

export interface DeadLetterItem {
  id: string;
  eventId: string;
  eventType: string;
  provider: string;
  reason: string;
  lastError: string | null;
  retryCount: number;
  maxRetries: number;
  status: string;
  createdAt: Date;
  resolvedAt: Date | null;
  resolution: string | null;
  notes: string | null;
  payload: any;
}

/**
 * Dead-Letter Queue service
 * Stores events that failed after max retries
 * Requires human review and manual action
 */
@Injectable()
export class DeadLetterQueueService {
  constructor(
    private prisma: PrismaService,
    private auditLogger: AuditLogger,
  ) {}

  /**
   * Add event to dead-letter queue
   */
  async addToQueue(
    eventId: string,
    eventType: 'webhook' | 'transaction' | 'payment',
    provider: string,
    reason: string,
    retryCount: number,
    maxRetries: number,
    lastError?: string,
    payload?: any,
  ): Promise<string> {
    const item = await this.prisma.deadLetterQueue.create({
      data: {
        eventId,
        eventType,
        provider,
        reason,
        retryCount,
        maxRetries,
        lastError,
        payload,
        status: 'pending',
      },
    });

    this.auditLogger.error(
      { eventId, eventType },
      'Event added to dead-letter queue',
      undefined,
      {
        provider,
        reason,
        retries: retryCount,
        error: lastError,
      },
    );

    return item.id;
  }

  /**
   * Get all pending dead-letter items
   */
  async getPending(
    limit: number = 100,
    offset: number = 0,
  ): Promise<{ items: DeadLetterItem[]; total: number }> {
    const [items, total] = await Promise.all([
      this.prisma.deadLetterQueue.findMany({
        where: { status: 'pending' },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.deadLetterQueue.count({ where: { status: 'pending' } }),
    ]);

    return { items, total };
  }

  /**
   * Get dead-letter items by status
   */
  async getByStatus(
    status: string,
    limit: number = 100,
    offset: number = 0,
  ): Promise<{ items: DeadLetterItem[]; total: number }> {
    const [items, total] = await Promise.all([
      this.prisma.deadLetterQueue.findMany({
        where: { status },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.deadLetterQueue.count({ where: { status } }),
    ]);

    return { items, total };
  }

  /**
   * Get dead-letter items by provider
   */
  async getByProvider(
    provider: string,
    limit: number = 100,
    offset: number = 0,
  ): Promise<{ items: DeadLetterItem[]; total: number }> {
    const [items, total] = await Promise.all([
      this.prisma.deadLetterQueue.findMany({
        where: { provider, status: 'pending' },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.deadLetterQueue.count({
        where: { provider, status: 'pending' },
      }),
    ]);

    return { items, total };
  }

  /**
   * Resolve a dead-letter item
   */
  async resolve(
    dlqId: string,
    resolution: 'manual_replay' | 'manual_credit' | 'cancelled',
    notes?: string,
    adminId?: string,
  ): Promise<void> {
    const item = await this.prisma.deadLetterQueue.findUnique({
      where: { id: dlqId },
    });

    if (!item) {
      throw new Error('Dead-letter item not found');
    }

    await this.prisma.deadLetterQueue.update({
      where: { id: dlqId },
      data: {
        status: 'manual_reviewed',
        resolution,
        resolvedAt: new Date(),
        notes: notes || `Resolved by ${adminId}`,
      },
    });

    this.auditLogger.audit({ adminId, dlqId }, 'Dead-letter item resolved', {
      eventId: item.eventId,
      resolution,
    });
  }

  /**
   * Archive resolved items (housekeeping)
   */
  async archive(dlqId: string): Promise<void> {
    await this.prisma.deadLetterQueue.update({
      where: { id: dlqId },
      data: {
        status: 'archived',
      },
    });
  }

  /**
   * Get summary stats
   */
  async getStats(): Promise<{
    pending: number;
    resolved: number;
    archived: number;
    byProvider: { [key: string]: number };
  }> {
    const [pending, resolved, archived, byProvider] = await Promise.all([
      this.prisma.deadLetterQueue.count({ where: { status: 'pending' } }),
      this.prisma.deadLetterQueue.count({
        where: { status: 'manual_reviewed' },
      }),
      this.prisma.deadLetterQueue.count({ where: { status: 'archived' } }),
      this.prisma.deadLetterQueue.groupBy({
        by: ['provider'],
        where: { status: 'pending' },
        _count: true,
      }),
    ]);

    const providerMap = byProvider.reduce(
      (acc, item) => {
        acc[item.provider] = item._count;
        return acc;
      },
      {} as { [key: string]: number },
    );

    return {
      pending,
      resolved,
      archived,
      byProvider: providerMap,
    };
  }
}
