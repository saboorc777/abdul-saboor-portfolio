import { Router } from 'express';
import db from '../db/database.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();
const PHOTO_KEY = 'profile_photo';

// Public: current profile photo URL (or null if none has been set yet)
router.get('/', (_req, res) => {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(PHOTO_KEY);
  res.json({ photoUrl: row?.value ?? null });
});

// Admin: upload a new profile photo, replacing any previous one
router.post('/photo', requireAuth, upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No image uploaded or invalid file type.' });
  const url = `/uploads/${req.file.filename}`;
  db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').run(
    PHOTO_KEY,
    url
  );
  res.json({ photoUrl: url });
});

export default router;
