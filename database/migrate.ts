import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createDatabasePool } from '../src/database/database.connection';

const migrationsDir = path.resolve(process.cwd(), 'database/migrations');

async function main() {
  const pool = createDatabasePool();

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sql_migrations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    const entries = await fs.readdir(migrationsDir, { withFileTypes: true });
    const migrationFiles = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.sql'))
      .map((entry) => entry.name)
      .sort();

    const appliedResult = await pool.query<{ name: string }>(
      'SELECT name FROM sql_migrations',
    );
    const appliedMigrations = new Set(
      appliedResult.rows.map((row) => row.name),
    );

    for (const fileName of migrationFiles) {
      if (appliedMigrations.has(fileName)) {
        console.log(`Skipping ${fileName}; already applied.`);
        continue;
      }

      const filePath = path.join(migrationsDir, fileName);
      const sql = await fs.readFile(filePath, 'utf8');
      const client = await pool.connect();

      try {
        await client.query('BEGIN');
        await client.query(sql);
        await client.query(
          'INSERT INTO sql_migrations (name) VALUES ($1)',
          [fileName],
        );
        await client.query('COMMIT');
        console.log(`Applied ${fileName}.`);
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    }

    console.log('Raw SQL migrations finished.');
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error('Raw SQL migration failed.');
  console.error(error);
  process.exitCode = 1;
});
