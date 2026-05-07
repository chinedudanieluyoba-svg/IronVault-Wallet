-- Recovery migration: resolve failed migration 20260206_add_missing_webhook_tracking
--
-- Background: The migration 20260206_add_missing_webhook_tracking was recorded as
-- failed in _prisma_migrations (Prisma error P3009), blocking all subsequent
-- migrations from running.
--
-- Strategy:
--   1. Mark the failed migration as rolled back in _prisma_migrations so Prisma
--      stops treating it as a blocker. This replicates what
--      `prisma migrate resolve --rolled-back 20260206_add_missing_webhook_tracking`
--      does at the SQL level, making the fix idempotent and self-contained.
--   2. Drop the MissingWebhookAlert table if it was partially created during the
--      failed run (safe to run even if the table does not exist).
--   3. Re-create the table, indexes, and foreign key constraint cleanly so the
--      schema reaches the intended final state.

-- Step 1: Mark the failed migration as rolled back.
-- Setting rolled_back_at clears the "failed" state without deleting the history
-- record, which is the approach Prisma itself uses for `prisma migrate resolve --rolled-back`.
UPDATE "_prisma_migrations"
SET    "rolled_back_at" = NOW()
WHERE  "migration_name" = '20260206_add_missing_webhook_tracking'
  AND  "rolled_back_at" IS NULL
  AND  "finished_at"    IS NULL;

-- Step 2: Drop the table if it was partially created during the failed migration.
-- Using IF EXISTS makes this safe regardless of how far the original migration got.
DROP TABLE IF EXISTS "MissingWebhookAlert";

-- Step 3: Re-create the MissingWebhookAlert table cleanly.
CREATE TABLE "MissingWebhookAlert" (
    "id"          TEXT         NOT NULL,
    "onRampId"    TEXT         NOT NULL,
    "provider"    TEXT         NOT NULL,
    "status"      TEXT         NOT NULL DEFAULT 'pending',
    "detectedAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt"  TIMESTAMP(3),
    "resolution"  TEXT,
    "notes"       TEXT,

    CONSTRAINT "MissingWebhookAlert_pkey" PRIMARY KEY ("id")
);

-- Unique constraint: one alert per OnRamp
CREATE UNIQUE INDEX "MissingWebhookAlert_onRampId_key" ON "MissingWebhookAlert"("onRampId");

-- Supporting indexes
CREATE INDEX "MissingWebhookAlert_provider_idx"   ON "MissingWebhookAlert"("provider");
CREATE INDEX "MissingWebhookAlert_status_idx"     ON "MissingWebhookAlert"("status");
CREATE INDEX "MissingWebhookAlert_detectedAt_idx" ON "MissingWebhookAlert"("detectedAt");

-- Foreign key to OnRamp (cascade delete so alerts are cleaned up with their parent)
ALTER TABLE "MissingWebhookAlert"
    ADD CONSTRAINT "MissingWebhookAlert_onRampId_fkey"
    FOREIGN KEY ("onRampId")
    REFERENCES "OnRamp"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE;
