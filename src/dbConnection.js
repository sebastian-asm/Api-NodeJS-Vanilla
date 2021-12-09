import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { LowSync, JSONFileSync } from 'lowdb';

export default async function dbConnection() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const adapter = new JSONFileSync(join(__dirname, 'db.json'));
  const db = new LowSync(adapter);

  db.read();
  db.data ||= { tasks: [] }; // db.data = db.data || { tasks: [] }

  return db;
}
