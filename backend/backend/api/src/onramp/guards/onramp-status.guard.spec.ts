import { isCreditableEvent } from './onramp-status.guard';
import { OnRampEvent } from '../types/onramp-event';

describe('OnRampStatusGuard', () => {
  describe('isCreditableEvent', () => {
    it('should return true for completed status', () => {
      const event: OnRampEvent = {
        provider: 'moonpay',
        externalId: 'tx_123',
        userId: 'user_1',
        amount: 100,
        currency: 'USD',
        status: 'completed',
        rawPayloadHash: 'hash123',
      };

      expect(isCreditableEvent(event)).toBe(true);
    });

    it('should return false for pending status', () => {
      const event: OnRampEvent = {
        provider: 'moonpay',
        externalId: 'tx_123',
        userId: 'user_1',
        amount: 100,
        currency: 'USD',
        status: 'pending',
        rawPayloadHash: 'hash123',
      };

      expect(isCreditableEvent(event)).toBe(false);
    });

    it('should return false for failed status', () => {
      const event: OnRampEvent = {
        provider: 'transak',
        externalId: 'tx_456',
        userId: 'user_2',
        amount: 200,
        currency: 'EUR',
        status: 'failed',
        rawPayloadHash: 'hash456',
      };

      expect(isCreditableEvent(event)).toBe(false);
    });

    it('should return false for refunded status', () => {
      const event: OnRampEvent = {
        provider: 'moonpay',
        externalId: 'tx_789',
        userId: 'user_3',
        amount: 150,
        currency: 'GBP',
        status: 'refunded',
        rawPayloadHash: 'hash789',
      };

      expect(isCreditableEvent(event)).toBe(false);
    });

    it('should deny all non-completed statuses', () => {
      const statuses: Array<OnRampEvent['status']> = [
        'pending',
        'failed',
        'refunded',
      ];

      statuses.forEach((status) => {
        const event: OnRampEvent = {
          provider: 'moonpay',
          externalId: 'tx_test',
          userId: 'user_test',
          amount: 100,
          currency: 'USD',
          status,
          rawPayloadHash: 'hash_test',
        };

        expect(isCreditableEvent(event)).toBe(false);
      });
    });

    it('should only allow completed status', () => {
      const event: OnRampEvent = {
        provider: 'moonpay',
        externalId: 'tx_success',
        userId: 'user_success',
        amount: 500,
        currency: 'USD',
        status: 'completed',
        rawPayloadHash: 'hash_success',
      };

      expect(isCreditableEvent(event)).toBe(true);
    });
  });
});
