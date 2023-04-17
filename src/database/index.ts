import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { Database } from './models';

const { Pool } = pg;

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: 'localhost',
      database: 'portals',
      user: 'postgres',
    }),
  }),
});

export default db;
