export type OnRampProvider = 'moonpay' | 'transak';

export type OnRampStatus = 'completed' | 'pending' | 'failed' | 'refunded';

export interface OnRampEvent {
  provider: OnRampProvider;
  externalId: string;
  userId: string;
  amount: number;
  currency: string;
  status: OnRampStatus;
  rawPayloadHash: string;
}
