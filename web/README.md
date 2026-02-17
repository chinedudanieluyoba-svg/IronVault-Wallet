# Frontend Application

This directory is reserved for the frontend application (React/Next.js/Vite).

## Deployment

The frontend should be deployed separately from the backend:
- Backend deploys to Railway (using railway.json in root)
- Frontend can deploy to:
  - Vercel (recommended for Next.js)
  - Netlify (for React/Vite)
  - Railway (separate service)

## Setup

When adding your frontend code:

1. Initialize your frontend framework:
   ```bash
   cd web/
   # For Next.js:
   npx create-next-app@latest .
   
   # For Vite + React:
   npm create vite@latest . -- --template react-ts
   ```

2. Configure API endpoint:
   - Set `VITE_API_URL` or `NEXT_PUBLIC_API_URL` to your Railway backend URL
   - Example: `https://your-backend.railway.app`

3. Deploy separately from backend

## Structure

```
web/
├── src/          # Your frontend source code
├── public/       # Static assets
├── package.json  # Frontend dependencies
└── ...
```
