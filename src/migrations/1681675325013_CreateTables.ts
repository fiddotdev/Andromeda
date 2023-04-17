/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType('network')
    .asEnum(['Mainnet', 'Testnet'])
    .execute();

  await db.schema
    .createType('signer_status')
    .asEnum(['active', 'pending', 'expired'])
    .execute();

  await db.schema
    .createType('sign_event_status')
    .asEnum(['accepted', 'denied'])
    .execute();

  await db.schema
    .createTable('users')
    .addColumn('fid', 'serial', (col) => col.primaryKey())
    .addColumn('fname', 'varchar', (col) => col.notNull())
    .addColumn('pfpURL', 'varchar')
    .addColumn('signerId', 'varchar', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createTable('signers')
    .addColumn('id', 'varchar', (col) => col.primaryKey())
    .addColumn('fid', 'integer', (col) => col.notNull())
    .addColumn('pubkey', 'varchar', (col) => col.notNull())
    .addColumn('status', sql`signer_status`, (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createTable('sign_events')
    .addColumn('id', 'varchar', (col) => col.primaryKey())
    .addColumn('signer_id', 'varchar', (col) => col.notNull())
    .addColumn('content', 'varchar', (col) => col.notNull())
    .addColumn('status', sql`sign_event_status`, (col) => col.notNull())
    .addColumn('status_reason', 'varchar', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) => col.notNull())
    .addColumn('updated_at', 'timestamptz', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('keys')
    .addColumn('id', 'varchar', (col) => col.primaryKey())
    .addColumn('key', 'varchar', (col) => col.notNull())
    .addColumn('network', sql`network`, (col) => col.notNull()) // Use the 'network' custom type
    .addColumn('fid', 'integer', (col) => col.references('users.fid').notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('keys').execute();
  await db.schema.dropTable('signers').execute();
  await db.schema.dropTable('sign_events').execute();
  await db.schema.dropTable('users').execute();
  await db.schema.dropType('network').execute();
  await db.schema.dropType('signer_status').execute();
  await db.schema.dropType('sign_event_status').execute();
}
