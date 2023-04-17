import * as path from 'path';
import pg from 'pg';
import { promises as fs } from 'fs';
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from 'kysely';
import { Database } from '../database/models';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const { Pool } = pg;

async function migrateDown() {
  const db = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        host: 'localhost',
        user: 'postgres',
        database: 'portals',
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, '..', 'migrations'),
    }),
  });

  const { error, results } = await migrator.migrateDown();

  if (results && results[0]) {
    console.log(
      `migration "${results[0].migrationName}" was reverted successfully`
    );
  }

  if (error) {
    console.error('failed to revert migration');
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateDown();
