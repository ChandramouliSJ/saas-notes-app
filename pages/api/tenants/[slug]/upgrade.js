const { db } = require('../../../../lib/db');
const { authMiddleware } = require('../../../../lib/auth');

function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const user = req.user;
  const { slug } = req.query;
  if (user.role !== 'Admin') return res.status(403).json({ error: 'Only Admin can upgrade' });
  if (user.tenantSlug !== slug) return res.status(403).json({ error: 'Cannot upgrade another tenant' });

  db.prepare('UPDATE tenants SET plan=? WHERE slug=?').run('pro', slug);
  return res.json({ upgraded: true });
}

export default authMiddleware(handler);