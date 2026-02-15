-- CreateTable
CREATE TABLE "MissingWebhookAlert" (
    "id" TEXT NOT NULL,
    "onRampId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    "resolution" TEXT,
    "notes" TEXT,

    CONSTRAINT "MissingWebhookAlert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MissingWebhookAlert_onRampId_key" ON "MissingWebhookAlert"("onRampId");

-- CreateIndex
CREATE INDEX "MissingWebhookAlert_provider_idx" ON "MissingWebhookAlert"("provider");

-- CreateIndex
CREATE INDEX "MissingWebhookAlert_status_idx" ON "MissingWebhookAlert"("status");

-- CreateIndex
CREATE INDEX "MissingWebhookAlert_detectedAt_idx" ON "MissingWebhookAlert"("detectedAt");

-- AddForeignKey
ALTER TABLE "MissingWebhookAlert" ADD CONSTRAINT "MissingWebhookAlert_onRampId_fkey" FOREIGN KEY ("onRampId") REFERENCES "OnRamp"("id") ON DELETE CASCADE ON UPDATE CASCADE;
