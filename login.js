import bcrypt from 'bcryptjs';
import { getDb } from '../lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ ok: false, error: 'ID and password are required.' });
  }

  const db = await getDb();
  const students = db.collection('students');

  const student = await students.findOne({ id });

  if (!student || !bcrypt.compareSync(password, student.passwordHash)) {
    return res.status(401).json({ ok: false, error: "That ID and password don't match." });
  }

  // Only ever send back non-sensitive fields — never the password hash.
  res.status(200).json({ ok: true, name: student.name || null, id: student.id });
}
