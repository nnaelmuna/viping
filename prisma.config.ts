import 'dotenv/config';
import { defineConfig, env } from '@prisma/client';

export default defineConfig({
  schema: 'apps/backend/prisma/schema.prisma',
  migrations: {
    path: 'apps/backend/prisma/migrations',
  },
  datasource: {
    db: {
      url: env('DATABASE_URL'),
    },
  },
});