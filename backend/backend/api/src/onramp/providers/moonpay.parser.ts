import { createHash } from 'crypto';
import { OnRampEvent } from '../types/onramp-event';

export function parseMoonPayWebhook(payload: any): OnRampEvent {
  const status = payload.status?.toLowerCase();

  return {
    provider: 'moonpay',
    externalId: payload.id,
    userId: payload.metadata?.userId,
    amount: Number(payload.quoteCurrencyAmount),
    currency: payload.quoteCurrency,
    status,
    rawPayloadHash: createHash('sha256')
      .update(JSON.stringify(payload))
      .digest('hex'),
  };
}
