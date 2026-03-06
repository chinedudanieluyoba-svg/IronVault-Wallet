# cryptowallet-platform

A secure cross-platform crypto wallet application for buying, selling, and managing digital assets using licensed on-ramp providers.

## Quick Links

- **[Local Testing Guide](./LOCAL_TESTING.md)** - Run backend and frontend locally
- **[License](./LICENSE)** - Project license details

## Documentation

- [Architecture](./docs/architecture.md)
- [Deployment](./docs/deployment.md)
- [Security](./docs/security.md)
- [Backend API](./backend/README.md)
- [Backend Railway Deployment](./backend/docs/DEPLOYMENT_RAILWAY.md)

## Repository Structure

```
cryptowallet-platform/
├── backend/              # NestJS backend API
│   ├── src/              # Source code
│   ├── prisma/           # Database schema & migrations
│   ├── docs/             # Documentation
│   └── test/             # Tests
├── docs/                 # Architecture, deployment, security docs
├── web/                  # Next.js frontend (App Router)
│   ├── app/              # App Router entry
│   ├── public/           # Static assets
│   ├── components/       # UI components
│   └── next.config.js    # Next.js config
├── railway.toml          # Railway deployment config
└── README.md             # This file
```

## Getting Started

### For Development

See [Backend API README](./backend/README.md) for local development setup.

### For Production Deployment

See [Deployment Guide](./docs/deployment.md) for deploying with Railway + Vercel + Neon.

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

## Architecture

See full architecture diagram in [docs/architecture.md](./docs/architecture.md)

## License

MIT License - see [LICENSE](./LICENSE) for details.

