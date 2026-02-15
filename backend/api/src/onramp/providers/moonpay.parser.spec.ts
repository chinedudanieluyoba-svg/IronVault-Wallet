import { parseMoonPayWebhook } from './moonpay.parser';

describe('MoonPayParser', () => {
  describe('parseMoonPayWebhook', () => {
    it('should parse valid MoonPay webhook payload', () => {
      const payload = {
        id: 'mp_tx_123456',
        status: 'completed',
        quoteCurrencyAmount: '100.50',
        quoteCurrency: 'USD',
        metadata: {
          userId: 'user_abc123',
        },
      };

      const result = parseMoonPayWebhook(payload);

      expect(result).toEqual({
        provider: 'moonpay',
        externalId: 'mp_tx_123456',
        userId: 'user_abc123',
        amount: 100.5,
        currency: 'USD',
        status: 'completed',
        rawPayloadHash: expect.any(String),
      });
    });

    it('should normalize status to lowercase', () => {
      const payload = {
        id: 'mp_tx_789',
        status: 'COMPLETED',
        quoteCurrencyAmount: '50',
        quoteCurrency: 'EUR',
        metadata: {
          userId: 'user_xyz',
        },
      };

      const result = parseMoonPayWebhook(payload);

      expect(result.status).toBe('completed');
    });

    it('should handle different payment statuses', () => {
      const statuses = ['pending', 'failed', 'refunded', 'completed'];

      statuses.forEach((status) => {
        const payload = {
          id: `mp_tx_${status}`,
          status: status.toUpperCase(),
          quoteCurrencyAmount: '100',
          quoteCurrency: 'USD',
          metadata: {
            userId: 'user_test',
          },
        };

        const result = parseMoonPayWebhook(payload);

        expect(result.status).toBe(status);
      });
    });

    it('should convert amount string to number', () => {
      const payload = {
        id: 'mp_tx_amount_test',
        status: 'completed',
        quoteCurrencyAmount: '1234.56',
        quoteCurrency: 'USD',
        metadata: {
          userId: 'user_1',
        },
      };

      const result = parseMoonPayWebhook(payload);

      expect(result.amount).toBe(1234.56);
      expect(typeof result.amount).toBe('number');
    });

    it('should generate SHA256 hash of raw payload', () => {
      const payload = {
        id: 'mp_tx_hash',
        status: 'completed',
        quoteCurrencyAmount: '100',
        quoteCurrency: 'USD',
        metadata: {
          userId: 'user_1',
        },
      };

      const result = parseMoonPayWebhook(payload);

      // Hash should be 64 characters (256 bits in hex)
      expect(result.rawPayloadHash).toMatch(/^[a-f0-9]{64}$/);
    });

    it('should generate consistent hash for same payload', () => {
      const payload = {
        id: 'mp_tx_consistent',
        status: 'completed',
        quoteCurrencyAmount: '100',
        quoteCurrency: 'USD',
        metadata: {
          userId: 'user_1',
        },
      };

      const result1 = parseMoonPayWebhook(payload);
      const result2 = parseMoonPayWebhook(payload);

      expect(result1.rawPayloadHash).toBe(result2.rawPayloadHash);
    });

    it('should handle different currencies', () => {
      const currencies = ['USD', 'EUR', 'GBP', 'JPY'];

      currencies.forEach((currency) => {
        const payload = {
          id: `mp_tx_${currency}`,
          status: 'completed',
          quoteCurrencyAmount: '100',
          quoteCurrency: currency,
          metadata: {
            userId: 'user_1',
          },
        };

        const result = parseMoonPayWebhook(payload);

        expect(result.currency).toBe(currency);
      });
    });

    it('should always set provider to moonpay', () => {
      const payload = {
        id: 'mp_tx_provider_check',
        status: 'completed',
        quoteCurrencyAmount: '100',
        quoteCurrency: 'USD',
        metadata: {
          userId: 'user_1',
        },
      };

      const result = parseMoonPayWebhook(payload);

      expect(result.provider).toBe('moonpay');
    });
  });
});
