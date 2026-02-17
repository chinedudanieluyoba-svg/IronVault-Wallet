# cryptowallet-platform

A secure cross-platform crypto wallet application for buying, selling, and managing digital assets using licensed on-ramp providers.

## 🚀 Quick Links

- **[Backend API Documentation](./backend/README.md)** - Complete API documentation
- **[Deployment Guide (Render)](./backend/docs/DEPLOYMENT_RENDER.md)** - Production deployment instructions
- **[Architecture Overview](./backend/docs/ARCHITECTURE.md)** - System design and data flows

## 📦 Repository Structure

```
cryptowallet-platform/
├── backend/              # NestJS backend API
│   ├── src/              # Source code
│   ├── prisma/           # Database schema & migrations
│   ├── docs/             # Documentation
│   └── test/             # Tests
├── web/                  # Next.js frontend (App Router)
│   ├── app/              # App Router entry
│   ├── public/           # Static assets
│   ├── components/       # UI components
│   └── next.config.js    # Next.js config
├── render.yaml           # Render deployment config
└── README.md             # This file
```

## 🚀 Getting Started

### For Development

See [Backend API README](./backend/README.md) for local development setup.

### For Production Deployment

See [Deployment Guide](./backend/docs/DEPLOYMENT_RENDER.md) for deploying to Render (or other platforms).

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

