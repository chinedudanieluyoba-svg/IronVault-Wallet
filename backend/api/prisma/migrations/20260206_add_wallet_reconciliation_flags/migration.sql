-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "flaggedForReview" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "flaggedReason" TEXT,
ADD COLUMN     "flaggedAt" TIMESTAMP(3),
ADD COLUMN     "flaggedDelta" DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "Wallet_flaggedForReview_idx" ON "Wallet"("flaggedForReview");
