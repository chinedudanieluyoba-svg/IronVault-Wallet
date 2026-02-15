import { Injectable } from '@nestjs/common';

interface RequestRecord {
  timestamp: number;
}

/**
 * In-memory Rate Limiter Store
 * Tracks requests per key (e.g., IP, user ID) in time windows
 * Cleans up old entries periodically
 */
@Injectable()
export class RateLimiterStore {
  private requests: Map<string, RequestRecord[]> = new Map();

  constructor() {
    // Cleanup expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  /**
   * Check if request is allowed within the rate limit window
   */
  isAllowed(key: string, windowMs: number, maxRequests: number): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;

    // Get or create request array for this key
    let records = this.requests.get(key) || [];

    // Filter out old requests outside the window
    records = records.filter((r) => r.timestamp > windowStart);

    // Check if limit exceeded
    if (records.length >= maxRequests) {
      return false;
    }

    // Add new request
    records.push({ timestamp: now });
    this.requests.set(key, records);

    return true;
  }

  /**
   * Get remaining requests for a key
   */
  getRemaining(key: string, windowMs: number, maxRequests: number): number {
    const now = Date.now();
    const windowStart = now - windowMs;

    const records = this.requests.get(key) || [];
    const validRecords = records.filter((r) => r.timestamp > windowStart);

    return Math.max(0, maxRequests - validRecords.length);
  }

  /**
   * Get reset time (when oldest request in window expires)
   */
  getResetTime(key: string, windowMs: number): number {
    const now = Date.now();
    const windowStart = now - windowMs;

    const records = this.requests.get(key) || [];
    const validRecords = records.filter((r) => r.timestamp > windowStart);

    if (validRecords.length === 0) {
      return now;
    }

    // Oldest request + window = reset time
    return validRecords[0].timestamp + windowMs;
  }

  /**
   * Cleanup old entries
   */
  private cleanup(): void {
    const now = Date.now();
    const maxAge = 60 * 60 * 1000; // 1 hour

    for (const [key, records] of this.requests.entries()) {
      const remaining = records.filter((r) => now - r.timestamp < maxAge);

      if (remaining.length === 0) {
        this.requests.delete(key);
      } else if (remaining.length !== records.length) {
        this.requests.set(key, remaining);
      }
    }
  }

  /**
   * Reset specific key
   */
  reset(key: string): void {
    this.requests.delete(key);
  }

  /**
   * Clear all stored requests
   */
  clear(): void {
    this.requests.clear();
  }
}
