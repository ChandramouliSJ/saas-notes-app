const { db } = require('./db');

function seed() {
  const t1 = db.prepare('INSERT OR REPLACE INTO tenants (slug, name, plan) VALUES (?,?,?)');
  t1.run('acme', 'Acme Corp', 'free');
  t1.run('globex', 'Globex Inc', 'free');

  const u = db.prepare('INSERT OR REPLACE INTO users (email, password, role, tenantSlug) VALUES (?,?,?,?)');
  u.run('admin@acme.test', 'password', 'Admin', 'acme');
  u.run('user@acme.test', 'password', 'Member', 'acme');
  u.run('admin@globex.test', 'password', 'Admin', 'globex');
  u.run('user@globex.test', 'password', 'Member', 'globex');

  db.prepare('DELETE FROM notes').run();

  const n = db.prepare('INSERT INTO notes (title, body, tenantSlug, createdAt) VALUES (?,?,?,?)');
  n.run('Welcome to Acme', 'First note', 'acme', Date.now());
}

if (require.main === module) {
  seed();
  console.log('Seeded DB');
}

module.exports = { seed };