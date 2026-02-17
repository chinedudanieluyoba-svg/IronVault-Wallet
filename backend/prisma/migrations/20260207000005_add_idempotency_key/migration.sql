-- Migration: Add idempotency key to WalletLedgerEntry
-- Purpose: Prevent duplicate credits/debits (critical for payments & webhooks)
-- Date: 2026-02-07

-- Add idempotencyKey column (nullable for backward compatibility)
ALTER TABLE "WalletLedgerEntry" ADD COLUMN "idempotencyKey" TEXT;

-- Create unique index on idempotencyKey
CREATE UNIQUE INDEX "WalletLedgerEntry_idempotencyKey_key" ON "WalletLedgerEntry"("idempotencyKey");

-- Create index for fast lookups
CREATE INDEX "WalletLedgerEntry_idempotencyKey_idx" ON "WalletLedgerEntry"("idempotencyKey");

-- Note: Existing entries will have NULL idempotencyKey (allowed)
-- New entries SHOULD provide idempotencyKey for critical operations
