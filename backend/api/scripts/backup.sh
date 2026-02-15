#!/bin/bash
# Database Backup Script
# 
# Usage: ./backup.sh [environment]
# Example: ./backup.sh production
#
# This script creates a PostgreSQL backup using pg_dump
# and uploads it to a secure backup storage location.

set -e  # Exit on error

ENVIRONMENT=${1:-development}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="${BACKUP_DIR:-./backups}"
BACKUP_FILE="cryptowallet_${ENVIRONMENT}_${TIMESTAMP}.sql"

echo "🗄️  Starting database backup for ${ENVIRONMENT}"

# Load environment variables
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Determine database URL based on environment
case $ENVIRONMENT in
  production)
    DB_URL="${DATABASE_URL_PROD}"
    ;;
  staging)
    DB_URL="${DATABASE_URL_STAGING}"
    ;;
  development)
    DB_URL="${DATABASE_URL_DEV}"
    ;;
  *)
    echo "❌ Invalid environment: ${ENVIRONMENT}"
    echo "Usage: ./backup.sh [production|staging|development]"
    exit 1
    ;;
esac

if [ -z "$DB_URL" ]; then
  echo "❌ Database URL not configured for ${ENVIRONMENT}"
  exit 1
fi

# Create backup directory
mkdir -p "$BACKUP_DIR"

echo "📦 Creating backup: ${BACKUP_FILE}"

# Run pg_dump (Neon uses standard PostgreSQL)
pg_dump "$DB_URL" \
  --format=plain \
  --no-owner \
  --no-privileges \
  --clean \
  --if-exists \
  > "${BACKUP_DIR}/${BACKUP_FILE}"

# Compress backup
echo "🗜️  Compressing backup..."
gzip "${BACKUP_DIR}/${BACKUP_FILE}"
BACKUP_FILE="${BACKUP_FILE}.gz"

# Get backup size
BACKUP_SIZE=$(du -h "${BACKUP_DIR}/${BACKUP_FILE}" | cut -f1)
echo "✅ Backup created: ${BACKUP_FILE} (${BACKUP_SIZE})"

# Upload to cloud storage (configure based on your provider)
if [ "${BACKUP_UPLOAD_ENABLED}" = "true" ]; then
  echo "☁️  Uploading backup to cloud storage..."
  
  # Example: AWS S3
  if [ -n "$AWS_S3_BACKUP_BUCKET" ]; then
    aws s3 cp "${BACKUP_DIR}/${BACKUP_FILE}" \
      "s3://${AWS_S3_BACKUP_BUCKET}/database-backups/${BACKUP_FILE}" \
      --storage-class STANDARD_IA
    echo "✅ Uploaded to S3: s3://${AWS_S3_BACKUP_BUCKET}/database-backups/${BACKUP_FILE}"
  fi
  
  # Example: Google Cloud Storage
  if [ -n "$GCS_BACKUP_BUCKET" ]; then
    gsutil cp "${BACKUP_DIR}/${BACKUP_FILE}" \
      "gs://${GCS_BACKUP_BUCKET}/database-backups/${BACKUP_FILE}"
    echo "✅ Uploaded to GCS: gs://${GCS_BACKUP_BUCKET}/database-backups/${BACKUP_FILE}"
  fi
else
  echo "ℹ️  Cloud upload disabled (set BACKUP_UPLOAD_ENABLED=true)"
fi

# Cleanup old backups (keep last N days)
RETENTION_DAYS=${BACKUP_RETENTION_DAYS:-7}
echo "🗑️  Cleaning up backups older than ${RETENTION_DAYS} days..."
find "$BACKUP_DIR" -name "cryptowallet_${ENVIRONMENT}_*.sql.gz" -mtime +${RETENTION_DAYS} -delete

echo "✅ Backup complete!"
echo ""
echo "To restore this backup, run:"
echo "  ./restore.sh ${ENVIRONMENT} ${BACKUP_FILE}"
