/**
 * Syncs root .env into backend/.env for Prisma CLI.
 * Run: npm run env:sync
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootEnv = path.resolve(__dirname, '../.env');
const backendEnv = path.resolve(__dirname, '../backend/.env');

if (!fs.existsSync(rootEnv)) {
  console.error('Missing root .env — run: cp .env.example .env');
  process.exit(1);
}

const content = fs.readFileSync(rootEnv, 'utf8');
const databaseUrl = content.match(/^DATABASE_URL=(.+)$/m)?.[1];

if (!databaseUrl) {
  console.error('DATABASE_URL not found in root .env');
  process.exit(1);
}

const backendContent = `# Auto-synced from root .env — do not edit manually\n# Run: npm run env:sync\n\nDATABASE_URL=${databaseUrl}\n`;
fs.writeFileSync(backendEnv, backendContent);
console.log('Synced DATABASE_URL to backend/.env');
