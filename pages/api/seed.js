const { seed } = require('../../lib/seed-data');

export default function handler(req, res) {
  seed();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ seeded: true });
}