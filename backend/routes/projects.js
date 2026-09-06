import { Router } from 'express';
import db from '../db/database.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

function serialize(row) {
  return {
    ...row,
    tech: JSON.parse(row.tech || '[]'),
    featured: Boolean(row.featured),
  };
}

// Public: list all projects
router.get('/', (_req, res) => {
  const rows = db.prepare('SELECT * FROM projects ORDER BY featured DESC, created_at DESC').all();
  res.json(rows.map(serialize));
});

// Admin: upload a project image, returns a usable URL
router.post('/upload', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No image uploaded or invalid file type.' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

// Admin: create project
router.post('/', requireAuth, (req, res) => {
  const { title, description, category, tech, github, live, image, featured } = req.body;
  if (!title || !description || !category) {
    return res.status(400).json({ message: 'title, description and category are required.' });
  }

  const info = db
    .prepare(
      `INSERT INTO projects (title, description, category, tech, github, live, image, featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      title,
      description,
      category,
      JSON.stringify(tech || []),
      github || null,
      live || null,
      image || null,
      featured ? 1 : 0
    );

  const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(serialize(row));
});

// Admin: update project
router.put('/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ message: 'Project not found.' });

  const { title, description, category, tech, github, live, image, featured } = req.body;

  db.prepare(
    `UPDATE projects SET title = ?, description = ?, category = ?, tech = ?, github = ?, live = ?, image = ?, featured = ?
     WHERE id = ?`
  ).run(
    title ?? existing.title,
    description ?? existing.description,
    category ?? existing.category,
    JSON.stringify(tech ?? JSON.parse(existing.tech)),
    github ?? existing.github,
    live ?? existing.live,
    image ?? existing.image,
    featured === undefined ? existing.featured : featured ? 1 : 0,
    req.params.id
  );

  const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  res.json(serialize(row));
});

// Admin: delete project
router.delete('/:id', requireAuth, (req, res) => {
  const info = db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ message: 'Project not found.' });
  res.status(204).end();
});

export default router;
