# Raw SQL Demo

This folder shows one way to handle migrations and seeding without Prisma.

## Commands

```bash
npm run db:sql:migrate
npm run db:sql:seed:users
```

## What It Does

- `migrate.ts` reads `.sql` files from `database/migrations`
- applied migrations are tracked in the `sql_migrations` table
- `seed-users-sql.ts` inserts or updates demo records in the `"User"` table

The example migration mirrors the minimum schema expected by `UsersSqlRepository`.
