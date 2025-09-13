const { db } = require('../../../lib/db');
const { authMiddleware } = require('../../../lib/auth');

function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const user = req.user;
  const { id } = req.query;
  const note = db.prepare('SELECT * FROM notes WHERE id = ? AND tenantSlug = ?').get(id, user.tenantSlug);
  if (!note) return res.status(404).json({ error: 'Not found' });

  if (req.method === 'GET') {
    return res.json(note);
  }
  if (req.method === 'PUT') {
    const { title, body } = req.body;
    db.prepare('UPDATE notes SET title=?, body=? WHERE id=? AND tenantSlug=?').run(title, body, id, user.tenantSlug);
    return res.json({ updated: true });
  }
  if (req.method === 'DELETE') {
    db.prepare('DELETE FROM notes WHERE id=? AND tenantSlug=?').run(id, user.tenantSlug);
    return res.json({ deleted: true });
  }
  res.status(405).end();
}

export default authMiddleware(handler);