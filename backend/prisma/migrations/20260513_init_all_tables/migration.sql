-- CreateTable User
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable Wallet
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "flaggedForReview" BOOLEAN NOT NULL DEFAULT false,
    "flaggedReason" TEXT,
    "flaggedAt" TIMESTAMP(3),
    "flaggedDelta" DOUBLE PRECISION,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable Transaction
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "idempotencyKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable WalletLedgerEntry
CREATE TABLE "WalletLedgerEntry" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "balanceBefore" DOUBLE PRECISION NOT NULL,
    "balanceAfter" DOUBLE PRECISION NOT NULL,
    "reference" TEXT,
    "description" TEXT,
    "source" TEXT,
    "providerEventId" TEXT,
    "idempotencyKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WalletLedgerEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable OnRamp
CREATE TABLE "OnRamp" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerTxId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "cryptoAmount" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "OnRamp_pkey" PRIMARY KEY ("id")
);

-- CreateTable WebhookEvent
CREATE TABLE "WebhookEvent" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "payloadHash" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "transactionId" TEXT,
    "errorMessage" TEXT,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "maxRetries" INTEGER NOT NULL DEFAULT 3,
    "lastRetryAt" TIMESTAMP(3),
    "deadLetterAt" TIMESTAMP(3),

    CONSTRAINT "WebhookEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable AdminAccessLog
CREATE TABLE "AdminAccessLog" (
    "id" TEXT NOT NULL,
    "adminUserId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "resourceId" TEXT,
    "status" TEXT NOT NULL,
    "requestId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "metadata" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminAccessLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable MissingWebhookAlert
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

-- CreateTable DeadLetterQueue
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

-- CreateTable AlertLog
CREATE TABLE "AlertLog" (
    "id" TEXT NOT NULL,
    "alertType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "metadata" JSONB,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "resolvedAt" TIMESTAMP(3),
    "resolvedBy" TEXT,
    "acknowledgedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AlertLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "Wallet"("userId");

-- CreateIndex
CREATE INDEX "Wallet_flaggedForReview_idx" ON "Wallet"("flaggedForReview");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_idempotencyKey_key" ON "Transaction"("idempotencyKey");

-- CreateIndex
CREATE INDEX "WalletLedgerEntry_walletId_idx" ON "WalletLedgerEntry"("walletId");

-- CreateIndex
CREATE INDEX "WalletLedgerEntry_createdAt_idx" ON "WalletLedgerEntry"("createdAt");

-- CreateIndex
CREATE INDEX "WalletLedgerEntry_source_idx" ON "WalletLedgerEntry"("source");

-- CreateIndex
CREATE UNIQUE INDEX "WalletLedgerEntry_idempotencyKey_key" ON "WalletLedgerEntry"("idempotencyKey");

-- CreateIndex
CREATE INDEX "OnRamp_walletId_idx" ON "OnRamp"("walletId");

-- CreateIndex
CREATE INDEX "OnRamp_providerTxId_idx" ON "OnRamp"("providerTxId");

-- CreateIndex
CREATE INDEX "OnRamp_status_idx" ON "OnRamp"("status");

-- CreateIndex
CREATE INDEX "WebhookEvent_provider_idx" ON "WebhookEvent"("provider");

-- CreateIndex
CREATE UNIQUE INDEX "WebhookEvent_externalId_key" ON "WebhookEvent"("externalId");

-- CreateIndex
CREATE INDEX "WebhookEvent_status_idx" ON "WebhookEvent"("status");

-- CreateIndex
CREATE INDEX "WebhookEvent_receivedAt_idx" ON "WebhookEvent"("receivedAt");

-- CreateIndex
CREATE INDEX "WebhookEvent_retryCount_idx" ON "WebhookEvent"("retryCount");

-- CreateIndex
CREATE INDEX "WebhookEvent_deadLetterAt_idx" ON "WebhookEvent"("deadLetterAt");

-- CreateIndex
CREATE INDEX "AdminAccessLog_adminUserId_idx" ON "AdminAccessLog"("adminUserId");

-- CreateIndex
CREATE INDEX "AdminAccessLog_action_idx" ON "AdminAccessLog"("action");

-- CreateIndex
CREATE INDEX "AdminAccessLog_resource_idx" ON "AdminAccessLog"("resource");

-- CreateIndex
CREATE INDEX "AdminAccessLog_requestId_idx" ON "AdminAccessLog"("requestId");

-- CreateIndex
CREATE INDEX "AdminAccessLog_timestamp_idx" ON "AdminAccessLog"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "MissingWebhookAlert_onRampId_key" ON "MissingWebhookAlert"("onRampId");

-- CreateIndex
CREATE INDEX "MissingWebhookAlert_provider_idx" ON "MissingWebhookAlert"("provider");

-- CreateIndex
CREATE INDEX "MissingWebhookAlert_status_idx" ON "MissingWebhookAlert"("status");

-- CreateIndex
CREATE INDEX "MissingWebhookAlert_detectedAt_idx" ON "MissingWebhookAlert"("detectedAt");

-- CreateIndex
CREATE INDEX "DeadLetterQueue_status_idx" ON "DeadLetterQueue"("status");

-- CreateIndex
CREATE INDEX "DeadLetterQueue_provider_idx" ON "DeadLetterQueue"("provider");

-- CreateIndex
CREATE INDEX "DeadLetterQueue_createdAt_idx" ON "DeadLetterQueue"("createdAt");

-- CreateIndex
CREATE INDEX "DeadLetterQueue_reason_idx" ON "DeadLetterQueue"("reason");

-- CreateIndex
CREATE INDEX "AlertLog_alertType_idx" ON "AlertLog"("alertType");

-- CreateIndex
CREATE INDEX "AlertLog_severity_idx" ON "AlertLog"("severity");

-- CreateIndex
CREATE INDEX "AlertLog_resolved_idx" ON "AlertLog"("resolved");

-- CreateIndex
CREATE INDEX "AlertLog_createdAt_idx" ON "AlertLog"("createdAt");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletLedgerEntry" ADD CONSTRAINT "WalletLedgerEntry_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnRamp" ADD CONSTRAINT "OnRamp_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebhookEvent" ADD CONSTRAINT "WebhookEvent_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissingWebhookAlert" ADD CONSTRAINT "MissingWebhookAlert_onRampId_fkey" FOREIGN KEY ("onRampId") REFERENCES "OnRamp"("id") ON DELETE CASCADE ON UPDATE CASCADE;
