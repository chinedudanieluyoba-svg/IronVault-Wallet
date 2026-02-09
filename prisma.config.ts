import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    provider: "postgresql",
    url:
      process.env.DATABASE_URL_PROD ||
      process.env.DATABASE_URL_STAGING ||
      process.env.DATABASE_URL_DEV ||
      process.env.DATABASE_URL,
  },
});
