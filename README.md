# SaaS Notes Application

This is a multi-tenant SaaS Notes Application built with Next.js and SQLite, deployable on Vercel.

## Features
- **Multi-tenancy**: Supports tenants with isolated data. (Approach: Shared schema with tenantSlug column.)
- **Authentication & Authorization**: JWT-based auth. Roles: Admin & Member.
- **Subscription Plans**:
  - Free: max 3 notes per tenant.
  - Pro: unlimited notes.
  - Upgrade endpoint: `POST /api/tenants/:slug/upgrade` (Admin only).
- **Notes API**: CRUD with tenant isolation and role enforcement.
- **Frontend**: Minimal React UI (Next.js) to login and manage notes.
- **Health Check**: `/api/health` returns `{ "status": "ok" }`.

## Predefined Test Accounts
(All passwords: `password`)
- `admin@acme.test` (Admin, tenant: Acme)
- `user@acme.test` (Member, tenant: Acme)
- `admin@globex.test` (Admin, tenant: Globex)
- `user@globex.test` (Member, tenant: Globex)

## Development
1. Install dependencies: `npm install`
2. Seed database: `npm run seed`
3. Start dev server: `npm run dev`

## Deployment
Deploy directly to **Vercel**. Ensure environment variables are set if customizing (`JWT_SECRET`, `SQLITE_PATH`).

## Tenant Isolation Approach
We chose **shared schema with tenantSlug column** for simplicity. Every table includes `tenantSlug` to ensure strict separation of tenant data.
