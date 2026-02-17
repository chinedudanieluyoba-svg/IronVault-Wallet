#!/bin/bash
# Database Restore Script
# 
# Usage: ./restore.sh [environment] [backup_file]
# Example: ./restore.sh staging cryptowallet_staging_20260207_120000.sql.gz
#
# ⚠️  WARNING: This will DROP and recreate the database!
# Only use on non-production environments or during disaster recovery.

set -e  # Exit on error

ENVIRONMENT=${1}
BACKUP_FILE=${2}

if [ -z "$ENVIRONMENT" ] || [ -z "$BACKUP_FILE" ]; then
  echo "❌ Usage: ./restore.sh [environment] [backup_file]"
  echo "Example: ./restore.sh staging cryptowallet_staging_20260207_120000.sql.gz"
  exit 1
fi

echo "⚠️  WARNING: Database restore will DROP all existing data"
echo "Environment: ${ENVIRONMENT}"
echo "Backup file: ${BACKUP_FILE}"
echo ""
read -p "Type 'yes' to confirm: " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
  echo "❌ Restore cancelled"
  exit 0
fi

# Load environment variables
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Determine database URL
case $ENVIRONMENT in
  production)
    DB_URL="${DATABASE_URL_PROD}"
    echo "⚠️  PRODUCTION RESTORE - Extra confirmation required"
    read -p "Type 'RESTORE_PRODUCTION' to confirm: " PROD_CONFIRM
    if [ "$PROD_CONFIRM" != "RESTORE_PRODUCTION" ]; then
      echo "❌ Production restore cancelled"
      exit 0
    fi
    ;;
  staging)
    DB_URL="${DATABASE_URL_STAGING}"
    ;;
  development)
    DB_URL="${DATABASE_URL_DEV}"
    ;;
  *)
    echo "❌ Invalid environment: ${ENVIRONMENT}"
    exit 1
    ;;
esac

if [ -z "$DB_URL" ]; then
  echo "❌ Database URL not configured for ${ENVIRONMENT}"
  exit 1
fi

BACKUP_DIR="${BACKUP_DIR:-./backups}"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_FILE}"

# Check if backup file exists
if [ ! -f "$BACKUP_PATH" ]; then
  echo "❌ Backup file not found: ${BACKUP_PATH}"
  exit 1
fi

echo "📦 Extracting backup..."
if [[ "$BACKUP_FILE" == *.gz ]]; then
  gunzip -c "$BACKUP_PATH" > "/tmp/restore_temp.sql"
  RESTORE_FILE="/tmp/restore_temp.sql"
else
  RESTORE_FILE="$BACKUP_PATH"
fi

echo "🗄️  Restoring database..."

# Restore using psql
psql "$DB_URL" < "$RESTORE_FILE"

# Cleanup temp file
if [ -f "/tmp/restore_temp.sql" ]; then
  rm "/tmp/restore_temp.sql"
fi

echo "✅ Database restored successfully!"
echo ""
echo "⚠️  IMPORTANT: Update LAST_BACKUP_RESTORE_TEST_DATE in .env:"
echo "  LAST_BACKUP_RESTORE_TEST_DATE=$(date +%Y-%m-%d)"
echo ""
echo "Verify the restore:"
echo "  1. Check database connection: npm run prisma:studio"
echo "  2. Run migrations: npm run migrate:deploy"
echo "  3. Test API endpoints"
