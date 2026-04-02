import 'dotenv/config';
import { Pool } from 'pg';

export function getDatabaseConnectionString(): string {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set.');
  }

  return connectionString;
}

export function createDatabasePool(): Pool {
  return new Pool({
    connectionString: getDatabaseConnectionString(),
  });
}
