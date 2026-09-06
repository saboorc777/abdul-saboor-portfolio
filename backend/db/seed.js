import bcrypt from 'bcryptjs';
import 'dotenv/config';
import db from './database.js';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme123';

const existing = db.prepare('SELECT id FROM admins WHERE username = ?').get(ADMIN_USERNAME);

if (!existing) {
  const hash = bcrypt.hashSync(ADMIN_PASSWORD, 10);
  db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run(ADMIN_USERNAME, hash);
  console.log(`Admin user "${ADMIN_USERNAME}" created.`);
  console.log('IMPORTANT: change ADMIN_PASSWORD in your .env and re-seed for production use.');
} else {
  console.log(`Admin user "${ADMIN_USERNAME}" already exists — skipping.`);
}

const projectCount = db.prepare('SELECT COUNT(*) AS count FROM projects').get().count;

if (projectCount === 0) {
  const insert = db.prepare(`
    INSERT INTO projects (title, description, category, tech, github, live, image, featured)
    VALUES (@title, @description, @category, @tech, @github, @live, @image, @featured)
  `);

  const seedProjects = [
    {
      title: 'General Store Management System',
      description:
        'Desktop-based inventory management system for retail stores, built with C#, SQL Server and the .NET Framework.',
      category: 'Desktop Application',
      tech: JSON.stringify(['C#', 'SQL Server', '.NET']),
      github: 'https://github.com/saboorc777/General-Store-Management',
      live: null,
      image: null,
      featured: 1,
    },
    {
      title: 'Car Showroom Management',
      description: 'A luxury, fully responsive car showroom website built with HTML, CSS and JavaScript.',
      category: 'Frontend',
      tech: JSON.stringify(['HTML', 'CSS', 'JavaScript']),
      github: 'https://github.com/saboorc777/Web-Development-Projects',
      live: null,
      image: null,
      featured: 1,
    },
    {
      title: 'AI Resume Analyzer',
      description:
        'Extracts resume content, identifies strengths and weaknesses, and generates personalized recommendations.',
      category: 'AI Application',
      tech: JSON.stringify(['Python', 'CSS', 'PDF Parsing']),
      github: 'https://github.com/saboorc777/Ai-Projects',
      live: null,
      image: null,
      featured: 1,
    },
  ];

  const insertMany = db.transaction((rows) => rows.forEach((row) => insert.run(row)));
  insertMany(seedProjects);
  console.log(`Seeded ${seedProjects.length} projects.`);
}

const certCount = db.prepare('SELECT COUNT(*) AS count FROM certificates').get().count;

if (certCount === 0) {
  const insertCert = db.prepare(`
    INSERT INTO certificates (title, issuer, image, file_url) VALUES (@title, @issuer, @image, @file_url)
  `);
  const seedCerts = [
    { title: 'Frontend Development Internship', issuer: 'Core Tech Innovation', image: null, file_url: null },
    { title: 'Web Development Competition', issuer: 'QUEST Nawabshah', image: null, file_url: null },
    { title: 'CSET 2025', issuer: 'Department of Computer Science, QUEST Nawabshah', image: null, file_url: null },
  ];
  const insertMany = db.transaction((rows) => rows.forEach((row) => insertCert.run(row)));
  insertMany(seedCerts);
  console.log(`Seeded ${seedCerts.length} certificates.`);
}

console.log('Seeding complete.');
