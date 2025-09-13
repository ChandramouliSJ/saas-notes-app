const { db } = require('../../lib/db');
const { sign } = require('../../lib/auth');

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email+password required' });

  const user = db.prepare('SELECT id,email,password,role,tenantSlug FROM users WHERE email = ?').get(email);
  if (!user || user.password !== password) return res.status(401).json({ error: 'Invalid credentials' });

  const token = sign(user);
  res.json({ token });
}