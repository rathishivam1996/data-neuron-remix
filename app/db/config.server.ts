// import Database from 'better-sqlite3';
// import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';
// import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
// import * as schema from './schema.server';

// if (!process.env.DATABASE_PATH) {
//   throw new Error('Missing environment variable: DATABASE_PATH');
// }
// const sqlite = new Database(process.env.DATABASE_PATH);

// export const db: BetterSQLite3Database<typeof schema> = drizzle(sqlite, {
//   schema
// });

// migrate(db, { migrationsFolder: './app/db/migrations' });
