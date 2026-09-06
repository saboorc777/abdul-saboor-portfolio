import { Router } from 'express';
import db from '../db/database.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

function serialize(row) {
  const { file_url, ...rest } = row;
  return { ...rest, fileUrl: file_url };
}

router.get('/', (_req, res) => {
  const rows = db.prepare('SELECT * FROM certificates ORDER BY created_at DESC').all();
  res.json(rows.map(serialize));
});

// Admin: upload a certificate image, returns a usable URL
router.post('/upload', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No image uploaded or invalid file type.' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

router.post('/', requireAuth, (req, res) => {
  const { title, issuer, image, fileUrl } = req.body;
  if (!title || !issuer) {
    return res.status(400).json({ message: 'title and issuer are required.' });
  }

  const info = db
    .prepare('INSERT INTO certificates (title, issuer, image, file_url) VALUES (?, ?, ?, ?)')
    .run(title, issuer, image || null, fileUrl || null);

  const row = db.prepare('SELECT * FROM certificates WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(serialize(row));
});

router.put('/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM certificates WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ message: 'Certificate not found.' });

  const { title, issuer, image, fileUrl } = req.body;
  db.prepare('UPDATE certificates SET title = ?, issuer = ?, image = ?, file_url = ? WHERE id = ?').run(
    title ?? existing.title,
    issuer ?? existing.issuer,
    image ?? existing.image,
    fileUrl ?? existing.file_url,
    req.params.id
  );

  const row = db.prepare('SELECT * FROM certificates WHERE id = ?').get(req.params.id);
  res.json(serialize(row));
});

router.delete('/:id', requireAuth, (req, res) => {
  const info = db.prepare('DELETE FROM certificates WHERE id = ?').run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ message: 'Certificate not found.' });
  res.status(204).end();
});

export default router;
