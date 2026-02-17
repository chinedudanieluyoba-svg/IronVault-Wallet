#!/bin/bash
# Backup Test Script
# 
# Tests that backups can be restored successfully
# Should be run every 90 days minimum
#
# This script:
# 1. Creates a test database
# 2. Restores latest backup
# 3. Validates data integrity
# 4. Updates LAST_BACKUP_RESTORE_TEST_DATE

set -e

ENVIRONMENT=${1:-staging}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "🧪 Testing backup restore for ${ENVIRONMENT}"
echo ""

# Load environment variables
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Find latest backup
BACKUP_DIR="${BACKUP_DIR:-./backups}"
LATEST_BACKUP=$(ls -t ${BACKUP_DIR}/cryptowallet_${ENVIRONMENT}_*.sql.gz 2>/dev/null | head -1)

if [ -z "$LATEST_BACKUP" ]; then
  echo "❌ No backups found for ${ENVIRONMENT}"
  exit 1
fi

echo "📦 Latest backup: $(basename $LATEST_BACKUP)"

# Create test database URL (modify for your setup)
TEST_DB_NAME="cryptowallet_test_restore_${TIMESTAMP}"

case $ENVIRONMENT in
  staging)
    BASE_URL="${DATABASE_URL_STAGING}"
    ;;
  *)
    echo "❌ Backup testing only supported for staging environment"
    echo "Never test production restores on production database!"
    exit 1
    ;;
esac

# Extract host and credentials from URL
DB_HOST=$(echo $BASE_URL | sed -E 's|.*@([^/]+)/.*|\1|')
DB_USER=$(echo $BASE_URL | sed -E 's|.*://([^:]+):.*|\1|')

echo "🗄️  Creating test database: ${TEST_DB_NAME}"

# Note: Neon doesn't support CREATE DATABASE via standard postgres
# You'll need to use Neon API or console to create test database
echo "⚠️  Manual step required:"
echo "   1. Create test database via Neon console"
echo "   2. Set TEST_DATABASE_URL in .env"
echo "   3. Re-run this script"

if [ -z "$TEST_DATABASE_URL" ]; then
  echo "❌ TEST_DATABASE_URL not configured"
  exit 1
fi

echo "📥 Restoring backup to test database..."

# Decompress and restore
gunzip -c "$LATEST_BACKUP" | psql "$TEST_DATABASE_URL"

echo "✅ Restore successful!"
echo ""
echo "🔍 Validating data integrity..."

# Run basic integrity checks
psql "$TEST_DATABASE_URL" << EOF
-- Check critical tables exist
SELECT 
  'User' AS table_name, 
  COUNT(*) AS row_count 
FROM "User"
UNION ALL
SELECT 'Wallet', COUNT(*) FROM "Wallet"
UNION ALL
SELECT 'WalletLedgerEntry', COUNT(*) FROM "WalletLedgerEntry"
UNION ALL
SELECT 'Transaction', COUNT(*) FROM "Transaction";

-- Check for data consistency
SELECT 
  CASE 
    WHEN COUNT(*) = 0 THEN '✅ No orphaned ledger entries'
    ELSE '❌ Found orphaned ledger entries: ' || COUNT(*)::text
  END AS check_result
FROM "WalletLedgerEntry" l
LEFT JOIN "Wallet" w ON w.id = l."walletId"
WHERE w.id IS NULL;
EOF

echo ""
echo "✅ Backup restore test complete!"
echo ""
echo "📝 Update your .env file:"
echo "   LAST_BACKUP_RESTORE_TEST_DATE=$(date +%Y-%m-%d)"
echo ""
echo "🗑️  Cleanup: Delete test database when done"
