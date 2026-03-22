# Backend Deployment Guide

## Vercel Deployment Commands

```bash
# Deploy to production
cd /Users/hello/Work/My\ Work/ABRLab/edtech-backend
npx vercel deploy --prod --scope amitbiswas1992s-projects

# Force redeploy (clears cache)
npx vercel deploy --prod --scope amitbiswas1992s-projects --force
```

## Environment Variables (Vercel)

```bash
# Set env vars
npx vercel env add DATABASE_URL production --scope amitbiswas1992s-projects
npx vercel env add JWT_SECRET production --scope amitbiswas1992s-projects

# List env vars
npx vercel env ls --scope amitbiswas1992s-projects

# Remove env var
npx vercel env rm JWT_EXPIRES_IN production --scope amitbiswas1992s-projects --yes
```

### Required Environment Variables
| Variable | Value | Notes |
|----------|-------|-------|
| DATABASE_URL | `postgresql://neondb_owner:xxx@ep-xxx.aws.neon.tech/neondb?sslmode=require` | Neon PostgreSQL connection string |
| JWT_SECRET | `your-secret-key` | JWT signing secret |
| DB_HOST | (optional) | Only if not using DATABASE_URL |
| DB_USERNAME | (optional) | Only if not using DATABASE_URL |
| DB_PASSWORD | (optional) | Only if not using DATABASE_URL |
| DB_NAME | (optional) | Only if not using DATABASE_URL |
| DB_PORT | (optional) | Only if not using DATABASE_URL |

**Note:** Do NOT set `JWT_EXPIRES_IN` as an env var — the code defaults to `7d`.

## URLs
- **Production:** https://edtech-backend-five.vercel.app
- **Swagger Docs:** https://edtech-backend-five.vercel.app/api-docs
- **Health Check:** https://edtech-backend-five.vercel.app/health
- **GitHub:** https://github.com/amit-biswas-1992/edtech-backend
