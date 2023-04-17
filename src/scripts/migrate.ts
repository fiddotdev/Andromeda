import * as path from 'path';
import { promises as fs } from 'fs';
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from 'kysely';
import { Database } from '../database/models';
import envProvider from '../providers/EnvProvider';
import pg from 'pg';
const { Pool } = pg;
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export async function migrateToLatest() {
  const db = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        host: envProvider.POSTGRES_HOST,
        user: envProvider.POSTGRES_USERNAME,
        password: envProvider.POSTGRES_PASSWORD,
        port: envProvider.POSTGRES_PORT,
        database: envProvider.POSTGRES_DB,
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

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateToLatest().then((_) => {
  console.log('Migrated to latest');
});
