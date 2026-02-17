# Database Safety Guide

## Overview

Database safety is enforced through multiple layers:
1. ✅ Clean migration validation
2. ✅ Production operation guards
3. ✅ Daily backup automation
4. ✅ Backup restore testing (every 90 days)

**Philosophy:** *"If backups aren't tested, they don't exist."*

---

## 1. Migration Safety

### Validation on Startup

The `/ready` endpoint checks:
- All migrations applied cleanly
- No pending migrations
- No failed migrations
- No rolled-back migrations

```bash
GET /ready
```

**Response (healthy):**
```json
{
  "status": "ready",
  "checks": {
    "migrations": {
      "ok": true,
      "details": "4/4 migrations applied"
    }
  }
}
```

**Response (unhealthy):**
```json
{
  "status": "not_ready",
  "checks": {
    "migrations": {
      "ok": false,
      "details": "Migration issues: 1 pending, 1 failed"
    }
  }
}
```

### Production Rules

**✅ ALLOWED:**
- `npx prisma migrate deploy` - Apply migrations in production
- `npx prisma migrate status` - Check migration status

**❌ FORBIDDEN:**
- `npx prisma db push` - **NEVER use in production** (bypasses migrations, causes data loss)
- `npx prisma migrate dev` - Development only
- `npx prisma migrate reset` - Destroys all data

### Migration Workflow

**Development:**
```bash
# Create new migration
npx prisma migrate dev --name add_user_email

# Test migration
npm test
```

**Staging:**
```bash
# Deploy migrations
npx prisma migrate deploy

# Verify
curl http://localhost:3000/ready
```

**Production:**
```bash
# 1. BACKUP FIRST
./scripts/backup.sh production

# 2. Deploy migrations
npx prisma migrate deploy

# 3. Verify
curl https://api.yourdomain.com/ready
```

---

## 2. Backup Strategy

### Automated Daily Backups

**Setup cron job:**
```bash
# Add to crontab (run at 2 AM daily)
0 2 * * * cd /path/to/api && ./scripts/backup.sh production >> /var/log/backup.log 2>&1
```

**Manual backup:**
```bash
# Development
./scripts/backup.sh development

# Staging
./scripts/backup.sh staging

# Production
./scripts/backup.sh production
```

**What gets backed up:**
- Full database schema
- All table data
- Indexes and constraints
- Compressed with gzip
- Uploaded to cloud storage (if configured)

### Backup Retention

Default: 7 days (configurable via `BACKUP_RETENTION_DAYS`)

**Recommended retention policies:**
- Development: 3 days
- Staging: 7 days
- Production: 30 days (plus monthly archives)

### Cloud Storage

**AWS S3:**
```bash
export BACKUP_UPLOAD_ENABLED=true
export AWS_S3_BACKUP_BUCKET=cryptowallet-backups-prod
export AWS_ACCESS_KEY_ID=your_key
export AWS_SECRET_ACCESS_KEY=your_secret
```

**Google Cloud Storage:**
```bash
export BACKUP_UPLOAD_ENABLED=true
export GCS_BACKUP_BUCKET=cryptowallet-backups-prod
# Authenticate: gcloud auth login
```

---

## 3. Backup Restore Testing

### Why Test Backups?

> *"If backups aren't tested, they don't exist."*

**Common backup failures:**
- Incomplete data
- Missing permissions
- Corrupted files
- Schema drift
- Wrong database version

### Testing Frequency

**REQUIRED:** Every 90 days minimum

### Testing Process

**1. Create test database (Neon Console)**
```
Database: cryptowallet_test_restore
```

**2. Configure test database URL**
```bash
# Add to .env
TEST_DATABASE_URL=postgresql://user:pass@host.neon.tech/cryptowallet_test_restore?sslmode=require
```

**3. Run restore test**
```bash
./scripts/test-backup.sh staging
```

**4. Validate results**
The script automatically checks:
- All tables present
- Row counts match expected
- No orphaned foreign keys
- Data integrity constraints

**5. Update test date**
```bash
# In .env
LAST_BACKUP_RESTORE_TEST_DATE=2026-02-07
```

### Manual Restore (Disaster Recovery)

**Staging:**
```bash
./scripts/restore.sh staging cryptowallet_staging_20260207_120000.sql.gz
```

**Production (EXTREME CAUTION):**
```bash
# Requires typing "RESTORE_PRODUCTION" to confirm
./scripts/restore.sh production cryptowallet_production_20260207_120000.sql.gz
```

---

## 4. Production Safety Checks

### Enforced on `/ready` Endpoint

**Database Safety:**
- ✅ No `PRISMA_DB_PUSH_ALLOWED=true` in production
- ✅ SSL required for database connections
- ✅ Connection pooling configured (`DATABASE_MAX_CONNECTIONS ≤ 100`)

**Backup Configuration:**
- ✅ `BACKUP_ENABLED=true` in production
- ✅ `BACKUP_RETENTION_DAYS` set
- ✅ `LAST_BACKUP_RESTORE_TEST_DATE` within 90 days

### Example Failure

```json
{
  "status": "not_ready",
  "checks": {
    "databaseSafety": {
      "ok": false,
      "details": "Database connection must use SSL in production"
    },
    "backupConfig": {
      "ok": false,
      "details": "BACKUP_ENABLED must be set to 'true' in production; Backup restore test is 120 days old - test backups every 90 days"
    }
  }
}
```

---

## 5. Read Replicas (Optional)

For high-traffic production systems, configure read replicas:

### Prisma Configuration

```typescript
// src/prisma/prisma.service.ts
const pool = new Pool({
  connectionString: process.env.DATABASE_URL_PROD,
  ssl: { rejectUnauthorized: false },
});

// Read replica (optional)
const readPool = new Pool({
  connectionString: process.env.DATABASE_READ_REPLICA_URL,
  ssl: { rejectUnauthorized: false },
});

export class PrismaService extends PrismaClient {
  // Use read replica for read-only queries
  async findManyReadOnly(...) {
    // Implementation here
  }
}
```

### Neon Setup

1. Go to Neon Console → Project Settings
2. Enable "Read Replicas"
3. Copy read replica URL
4. Set `DATABASE_READ_REPLICA_URL` in `.env`

**When to use:**
- ✅ Dashboard analytics queries
- ✅ Report generation
- ✅ Historical data lookups

**When NOT to use:**
- ❌ Transaction creation
- ❌ Wallet balance updates
- ❌ Ledger writes
- ❌ Real-time balance checks (replication lag)

---

## 6. Database Stats Monitoring

Get database size and table counts:

```bash
# Via API (admin only)
GET /admin/database/stats

# Response
{
  "sizeBytes": 52428800,
  "sizeMB": 50,
  "tableCount": 9,
  "tables": [
    { "name": "public.WalletLedgerEntry", "rowCount": 15234 },
    { "name": "public.Transaction", "rowCount": 8456 },
    { "name": "public.User", "rowCount": 1243 }
  ]
}
```

---

## 7. Checklist for Production

### Before Deployment

- [ ] All migrations tested in staging
- [ ] Backup script configured and tested
- [ ] `BACKUP_ENABLED=true` in production `.env`
- [ ] `BACKUP_RETENTION_DAYS` set (recommend 30)
- [ ] Cloud storage configured (S3 or GCS)
- [ ] Cron job scheduled for daily backups
- [ ] SSL enabled in database connection string
- [ ] `DATABASE_MAX_CONNECTIONS` set appropriately

### After Deployment

- [ ] Verify `/ready` endpoint returns 200
- [ ] Check migration status: `npx prisma migrate status`
- [ ] Run first backup: `./scripts/backup.sh production`
- [ ] Verify backup file created
- [ ] Check backup uploaded to cloud storage

### Every 90 Days

- [ ] Run backup restore test: `./scripts/test-backup.sh staging`
- [ ] Update `LAST_BACKUP_RESTORE_TEST_DATE` in `.env`
- [ ] Document any issues found
- [ ] Verify `/ready` endpoint passes backup config check

---

## 8. Troubleshooting

### "Pending migrations" error

```bash
# Check status
npx prisma migrate status

# If safe, deploy
npx prisma migrate deploy
```

### Backup fails with "permission denied"

```bash
# Ensure scripts are executable
chmod +x scripts/*.sh

# Check database credentials
echo $DATABASE_URL_PROD
```

### Restore test fails

```bash
# Check test database exists
psql $TEST_DATABASE_URL -c "SELECT 1"

# Check backup file not corrupted
gunzip -t backups/cryptowallet_staging_*.sql.gz
```

### `/ready` fails on backup config

```bash
# Set required env vars
export BACKUP_ENABLED=true
export BACKUP_RETENTION_DAYS=7
export LAST_BACKUP_RESTORE_TEST_DATE=2026-02-07

# Restart app
npm run start:prod
```

---

## Summary

✅ **Migrations:** Validated on startup, no `db push` in production
✅ **Backups:** Daily automated backups with cloud upload
✅ **Testing:** Backup restores tested every 90 days
✅ **Monitoring:** `/ready` endpoint enforces all safety checks

**Remember:** *"If backups aren't tested, they don't exist."*
