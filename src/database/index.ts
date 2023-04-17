import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { Database } from './models';
import envProvider from '../providers/EnvProvider';

const { Pool } = pg;

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: envProvider.POSTGRES_HOST,
      user: envProvider.POSTGRES_USERNAME,
      password: envProvider.POSTGRES_PASSWORD,
      database: envProvider.POSTGRES_DB,
      port: envProvider.POSTGRES_PORT,
    }),
  }),
});

export default db;
