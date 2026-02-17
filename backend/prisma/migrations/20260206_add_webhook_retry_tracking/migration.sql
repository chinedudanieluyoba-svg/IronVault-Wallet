-- AlterTable
ALTER TABLE "WebhookEvent" ADD COLUMN     "retryCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxRetries" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "lastRetryAt" TIMESTAMP(3),
ADD COLUMN     "deadLetterAt" TIMESTAMP(3);

-- Update status enum comment to include 'dead_letter'
COMMENT ON COLUMN "WebhookEvent"."status" IS '''pending'' | ''processed'' | ''ignored'' | ''failed'' | ''error'' | ''dead_letter''';

-- CreateIndex
CREATE INDEX "WebhookEvent_retryCount_idx" ON "WebhookEvent"("retryCount");

-- CreateIndex
CREATE INDEX "WebhookEvent_deadLetterAt_idx" ON "WebhookEvent"("deadLetterAt");
