const { db } = require('../../../lib/db');
const { authMiddleware } = require('../../../lib/auth');

function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const user = req.user;
  if (req.method === 'GET') {
    const notes = db.prepare('SELECT * FROM notes WHERE tenantSlug = ?').all(user.tenantSlug);
    return res.json({ notes });
  }
  if (req.method === 'POST') {
    // enforce subscription limits
    const tenant = db.prepare('SELECT * FROM tenants WHERE slug = ?').get(user.tenantSlug);
    const count = db.prepare('SELECT COUNT(*) as c FROM notes WHERE tenantSlug = ?').get(user.tenantSlug).c;
    if (tenant.plan === 'free' && count >= 3) {
      return res.status(403).json({ error: 'Free plan limit reached. Upgrade to Pro.' });
    }
    const { title, body } = req.body;
    const result = db.prepare('INSERT INTO notes (title, body, tenantSlug, createdAt) VALUES (?,?,?,?)').run(title, body, user.tenantSlug, Date.now());
    return res.json({ id: result.lastInsertRowid });
  }
  res.status(405).end();
}

export default authMiddleware(handler);