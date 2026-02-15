# Database Operations Quick Reference

## Daily Operations

### Check Database Health
```bash
# Health check (just process running)
curl http://localhost:3000/health

# Readiness check (database + migrations + backups)
curl http://localhost:3000/ready
```

### Migration Commands
```bash
# Development: Create new migration
npm run migrate:dev -- --name descriptive_name

# Production: Deploy migrations
npm run migrate:deploy

# Check migration status
npm run migrate:status

# View database in browser
npm run prisma:studio
```

## Backup Operations

### Create Backup
```bash
# Development
npm run db:backup development

# Staging
npm run db:backup staging

# Production
npm run db:backup:prod
```

### Restore Backup
```bash
# Restore specific backup
npm run db:restore staging cryptowallet_staging_20260207_120000.sql.gz

# Production restore (requires extra confirmation)
npm run db:restore production cryptowallet_production_20260207_120000.sql.gz
```

### Test Backup Restore
```bash
# Test that backups can be restored (run every 90 days)
npm run db:test-backup

# After test completes, update .env:
# LAST_BACKUP_RESTORE_TEST_DATE=2026-02-07
```

## Production Checklist

### Before Deployment
- [ ] `npm run migrate:status` - Verify all migrations applied in staging
- [ ] `npm test` - All tests passing
- [ ] `npm run db:backup:prod` - Create pre-deployment backup
- [ ] Update `BACKUP_ENABLED=true` in production

### After Deployment
- [ ] `curl https://api.yourdomain.com/ready` - Verify readiness
- [ ] `npm run migrate:deploy` - Apply migrations to production
- [ ] `curl https://api.yourdomain.com/ready` - Verify migrations applied

### Every 90 Days
- [ ] `npm run db:test-backup` - Test backup restore
- [ ] Update `LAST_BACKUP_RESTORE_TEST_DATE` in `.env`

## Emergency Procedures

### Rollback Migration (Disaster Recovery)
```bash
# 1. BACKUP FIRST
npm run db:backup:prod

# 2. Restore from backup before bad migration
npm run db:restore production cryptowallet_production_TIMESTAMP.sql.gz

# 3. Verify
curl https://api.yourdomain.com/ready
```

### Database Connection Issues
```bash
# Check connection
psql $DATABASE_URL_PROD -c "SELECT 1"

# Check connection pool settings
echo $DATABASE_MAX_CONNECTIONS

# View active connections
psql $DATABASE_URL_PROD -c "SELECT count(*) FROM pg_stat_activity"
```

## Safety Rules

### ✅ SAFE Operations
- `npx prisma migrate deploy` - Apply migrations
- `npx prisma migrate status` - Check status
- `npx prisma studio` - Browse data (read-only recommended)
- `./scripts/backup.sh` - Create backups

### ❌ DANGEROUS Operations (NEVER in production)
- `npx prisma db push` - **FORBIDDEN** (bypasses migrations, causes data loss)
- `npx prisma migrate reset` - **FORBIDDEN** (destroys all data)
- `npx prisma migrate dev` - Development only

## Monitoring

### Database Stats
```bash
# Get size and table counts (requires admin auth)
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  https://api.yourdomain.com/admin/database/stats
```

### Alert Logs
```bash
# View critical alerts (requires admin auth)
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  https://api.yourdomain.com/admin/alerts
```

## Troubleshooting

### "/ready returns 503"
```bash
# Check specific failure
curl http://localhost:3000/ready | jq '.checks'

# Common issues:
# - migrations.ok=false → Run: npm run migrate:deploy
# - databaseSafety.ok=false → Check SSL and connection pool settings
# - backupConfig.ok=false → Set BACKUP_ENABLED=true, test backups
```

### "Migration conflicts"
```bash
# View migration history
npm run migrate:status

# If needed, manually resolve in database
psql $DATABASE_URL -c "SELECT * FROM _prisma_migrations ORDER BY started_at"
```

## Documentation

- Full guide: [docs/DATABASE_SAFETY.md](./DATABASE_SAFETY.md)
- Backup scripts: [scripts/backup.sh](../scripts/backup.sh)
- Environment vars: [.env.example](../.env.example)
