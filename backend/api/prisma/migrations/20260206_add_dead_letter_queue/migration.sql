-- CreateTable
CREATE TABLE "DeadLetterQueue" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "lastError" TEXT,
    "retryCount" INTEGER NOT NULL,
    "maxRetries" INTEGER NOT NULL,
    "payload" JSONB,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "resolvedAt" TIMESTAMP(3),
    "resolution" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeadLetterQueue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DeadLetterQueue_status_idx" ON "DeadLetterQueue"("status");

-- CreateIndex
CREATE INDEX "DeadLetterQueue_provider_idx" ON "DeadLetterQueue"("provider");

-- CreateIndex
CREATE INDEX "DeadLetterQueue_createdAt_idx" ON "DeadLetterQueue"("createdAt");

-- CreateIndex
CREATE INDEX "DeadLetterQueue_reason_idx" ON "DeadLetterQueue"("reason");
