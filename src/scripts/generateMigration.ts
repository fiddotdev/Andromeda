// generateMigration.ts
import * as path from 'path';
import { promises as fs } from 'fs';

async function generateMigration(migrationName: string) {
  const timestamp = Date.now();
  const fileName = `${timestamp}-${migrationName}.ts`;
  const migrationFolderPath = path.join(__dirname, '..', 'migrations');
  const filePath = path.join(migrationFolderPath, fileName);

  const content = `import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Write your migration code here
}

export async function down(db: Kysely<any>): Promise<void> {
  // Write your code to revert the migration here
}
`;

  await fs.writeFile(filePath, content, 'utf8');
  console.log(`Migration file "${fileName}" created.`);
}

// Get the migration name from the command line arguments
const args = process.argv.slice(2);
const nameArg = args.find((arg) => arg.startsWith('--name='));

if (nameArg) {
  const migrationName = nameArg.split('=')[1];
  generateMigration(migrationName);
} else {
  console.error(
    'Please provide a migration name using --name=YourMigrationName'
  );
  process.exit(1);
}
