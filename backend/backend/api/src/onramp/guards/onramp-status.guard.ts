import { OnRampEvent } from '../types/onramp-event';

export function isCreditableEvent(event: OnRampEvent): boolean {
  return event.status === 'completed';
}
