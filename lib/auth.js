const jwt = require('jsonwebtoken');
const { db } = require('./db');
const SECRET = process.env.JWT_SECRET || 'devsecret';

function sign(user) {
  const payload = { id: user.id, email: user.email, role: user.role, tenantSlug: user.tenantSlug };
  return jwt.sign(payload, SECRET, { expiresIn: '8h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    return null;
  }
}

function authMiddleware(handler) {
  return (req, res) => {
    const auth = req.headers.authorization || '';
    const match = auth.match(/^Bearer (.+)$/);
    if (!match) return res.status(401).json({ error: 'Missing token' });
    const payload = verifyToken(match[1]);
    if (!payload) return res.status(401).json({ error: 'Invalid token' });
    req.user = payload;
    return handler(req, res);
  };
}

module.exports = { sign, verifyToken, authMiddleware };