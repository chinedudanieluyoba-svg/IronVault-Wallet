import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

/**
 * IP Allowlist Guard for Webhooks
 *
 * Restricts webhook endpoints to known provider IPs
 * Provides defense-in-depth alongside signature verification
 */
@Injectable()
export class WebhookIPGuard implements CanActivate {
  private readonly allowedIPs: Set<string>;
  private readonly enabled: boolean;

  constructor() {
    this.enabled = process.env.NODE_ENV === 'production';
    this.allowedIPs = this.parseAllowedIPs();
  }

  canActivate(context: ExecutionContext): boolean {
    // Skip in non-production environments
    if (!this.enabled) {
      return true;
    }

    // If no IPs configured, allow (rely on signature verification)
    if (this.allowedIPs.size === 0) {
      console.warn(
        '⚠️  WEBHOOK_ALLOWED_IPS not configured - relying on signature only',
      );
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const clientIP = this.getClientIP(request);

    if (!clientIP) {
      console.error('❌ Webhook rejected: Unable to determine client IP');
      throw new ForbiddenException('Unable to verify request source');
    }

    // Check if IP is allowed
    if (this.allowedIPs.has(clientIP)) {
      console.log(`✅ Webhook IP verified: ${clientIP}`);
      return true;
    }

    // Check if IP is in CIDR range (if configured)
    if (this.isIPInAllowedRanges(clientIP)) {
      console.log(`✅ Webhook IP verified (CIDR): ${clientIP}`);
      return true;
    }

    console.error(`❌ Webhook rejected: Unauthorized IP ${clientIP}`);
    throw new ForbiddenException('Request from unauthorized IP address');
  }

  private parseAllowedIPs(): Set<string> {
    const allowedIPsEnv = process.env.WEBHOOK_ALLOWED_IPS;

    if (!allowedIPsEnv) {
      return new Set();
    }

    return new Set(
      allowedIPsEnv
        .split(',')
        .map((ip) => ip.trim())
        .filter((ip) => ip.length > 0),
    );
  }

  private getClientIP(request: Request): string | null {
    // Check X-Forwarded-For (most common with load balancers)
    const forwardedFor = request.headers['x-forwarded-for'];
    if (forwardedFor) {
      const ips = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
      return ips.split(',')[0].trim();
    }

    // Check X-Real-IP (nginx)
    const realIP = request.headers['x-real-ip'];
    if (realIP) {
      return Array.isArray(realIP) ? realIP[0] : realIP;
    }

    // Fallback to socket IP
    return request.socket.remoteAddress || null;
  }

  private isIPInAllowedRanges(clientIP: string): boolean {
    // Simple CIDR check for IPv4 (can be enhanced for full CIDR support)
    for (const allowedIP of this.allowedIPs) {
      // Check for CIDR notation (e.g., 192.168.1.0/24)
      if (allowedIP.includes('/')) {
        if (this.isIPInCIDR(clientIP, allowedIP)) {
          return true;
        }
      }

      // Check for wildcard notation (e.g., 192.168.1.*)
      if (allowedIP.includes('*')) {
        const pattern = allowedIP.replace(/\*/g, '.*');
        const regex = new RegExp(`^${pattern}$`);
        if (regex.test(clientIP)) {
          return true;
        }
      }
    }

    return false;
  }

  private isIPInCIDR(ip: string, cidr: string): boolean {
    const [range, bits] = cidr.split('/');
    const mask = ~(2 ** (32 - parseInt(bits, 10)) - 1);

    const ipNum = this.ipToNumber(ip);
    const rangeNum = this.ipToNumber(range);

    return (ipNum & mask) === (rangeNum & mask);
  }

  private ipToNumber(ip: string): number {
    return ip
      .split('.')
      .reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
  }
}
