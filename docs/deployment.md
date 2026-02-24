# Deployment

Reference deployment topology for production.

## Deploy Frontend on Vercel

This repository is a monorepo with `backend` and `web`. Deploy the frontend from `web`.

- Import this GitHub repository into Vercel.
- Set **Root Directory** to `web`.
- Set **Framework Preset** to **Next.js**.
- Use **Install Command**: `npm install`.
- Use **Build Command**: `npm run build`.
- Add environment variable:
    - `NEXT_PUBLIC_API_URL=https://<your-backend-domain>`

After setting environment variables, trigger a redeploy.

Also ensure backend CORS includes your Vercel domain.

## Railway + Vercel + Neon Deployment Diagram

```mermaid
graph TB
    subgraph "Users"
        EndUsers[End Users]
        Ops[Ops / Admin Users]
    end

    subgraph "Frontend"
        Vercel[Vercel - Next.js Web App]
    end

    subgraph "Backend"
        Railway[Railway - NestJS API]
        Workers[Railway Background Workers]
        Cron[Railway Cron Jobs]
    end

    subgraph "Data Layer"
        Neon[(Neon PostgreSQL)]
        Redis[(Managed Redis)]
        ObjectStore[(S3/GCS Backups)]
    end

    subgraph "External Integrations"
        MoonPay[MoonPay]
        Transak[Transak]
        OtherProviders[Other Providers]
    end

    subgraph "Secrets & CI/CD"
        GH[GitHub Actions]
        SecretMgr[Secrets Manager]
    end

    EndUsers --> Vercel
    Ops --> Vercel
    Vercel --> Railway

    Railway --> Neon
    Railway --> Redis
    Workers --> Neon
    Cron --> Neon
    Neon --> ObjectStore

    MoonPay -. webhook .-> Railway
    Transak -. webhook .-> Railway
    OtherProviders -. webhook .-> Railway

    GH --> Vercel
    GH --> Railway
    SecretMgr --> Railway
    SecretMgr --> Vercel

    style Vercel fill:#4CAF50
    style Railway fill:#2196F3
    style Neon fill:#FF9800
```
