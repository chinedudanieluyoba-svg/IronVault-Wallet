cd /path/to/cryptowallet-platform
git pull origin main
rm backend/backend/api/prisma.config.ts
git add backend/backend/api/prisma.config.ts
git commit -m "fix: remove invalid prisma.config.ts"
git push origin main
