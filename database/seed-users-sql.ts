import { createDatabasePool } from '../src/database/database.connection';

type SeedUser = {
  email: string;
  name: string;
  password: string;
  role: 'ADMIN' | 'USER';
};

const demoUsers: SeedUser[] = [
  {
    name: 'SQL Demo Admin',
    email: 'sql.admin@azulpadel.dev',
    password: 'admin123',
    role: 'ADMIN',
  },
  {
    name: 'SQL Demo Nadia',
    email: 'sql.nadia@azulpadel.dev',
    password: 'player123',
    role: 'USER',
  },
  {
    name: 'SQL Demo Rafi',
    email: 'sql.rafi@azulpadel.dev',
    password: 'player123',
    role: 'USER',
  },
];

async function main() {
  const pool = createDatabasePool();

  try {
    for (const user of demoUsers) {
      await pool.query(
        `
          INSERT INTO "User" ("name", "email", "password", "role")
          VALUES ($1, $2, $3, $4::"Role")
          ON CONFLICT ("email") DO UPDATE
          SET
            "name" = EXCLUDED."name",
            "password" = EXCLUDED."password",
            "role" = EXCLUDED."role"
        `,
        [user.name, user.email, user.password, user.role],
      );
    }

    console.log(`Seeded ${demoUsers.length} users for the SQL demo.`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error('Users SQL seed failed.');
  console.error(error);
  process.exitCode = 1;
});
