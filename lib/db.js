const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DB_PATH = process.env.SQLITE_PATH || path.join(process.cwd(), 'data.sqlite');

function initDb() {
  const exists = fs.existsSync(DB_PATH);
  const db = new Database(DB_PATH);

  if (!exists) {
    db.exec(`
      CREATE TABLE tenants (slug TEXT PRIMARY KEY, name TEXT, plan TEXT);
      CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT, role TEXT, tenantSlug TEXT);
      CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, tenantSlug TEXT, createdAt INTEGER);
    `);
  }

  return db;
}

const db = initDb();

module.exports = {
  db,
  DB_PATH
};