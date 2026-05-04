import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Database setup
  const dbPath = path.join(process.cwd(), 'database.sqlite');
  const db = new Database(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      imageUrl TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      nisn TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      major TEXT NOT NULL,
      status TEXT DEFAULT 'Pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Insert sample news if empty
  const newsCount = db.prepare('SELECT COUNT(*) as count FROM news').get() as { count: number };
  if (newsCount.count === 0) {
    db.exec(`
      INSERT INTO news (title, content, imageUrl) VALUES
      ('Prestasi Siswa SMA Kartika di Olimpiade Sains Nasional', 'Siswa kita berhasil meraih medali emas di ajang OSN tingkat nasional tahun ini. Prestasi ini sangat membanggakan sekolah kita.', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop'),
      ('Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027', 'Pendaftaran SMA Kartika Jakarta Selatan telah dibuka untuk semua jurusan: MIPA dan IPS. Silakan kunjungi halaman pendaftaran online.', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop')
    `);
  }

  // API Routes
  app.get('/api/news', async (req, res) => {
    try {
      const news = db.prepare('SELECT * FROM news ORDER BY createdAt DESC').all();
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch news' });
    }
  });

  app.post('/api/news', async (req, res) => {
    try {
      const { title, content, imageUrl } = req.body;
      const result = db.prepare('INSERT INTO news (title, content, imageUrl) VALUES (?, ?, ?)').run([title, content, imageUrl]);
      res.json({ id: result.lastInsertRowid, title, content, imageUrl });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create news' });
    }
  });

  app.delete('/api/news/:id', async (req, res) => {
    try {
      db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete news' });
    }
  });

  app.get('/api/registrations', async (req, res) => {
    try {
      const regs = db.prepare('SELECT * FROM registrations ORDER BY createdAt DESC').all();
      res.json(regs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch registrations' });
    }
  });

  app.post('/api/registrations', async (req, res) => {
    try {
      const { fullName, nisn, email, phone, address, major } = req.body;
      const result = db.prepare(
        'INSERT INTO registrations (fullName, nisn, email, phone, address, major) VALUES (?, ?, ?, ?, ?, ?)'
      ).run([fullName, nisn, email, phone, address, major]);
      res.json({ id: result.lastInsertRowid, success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register' });
    }
  });

  app.put('/api/registrations/:id', async (req, res) => {
    try {
      const { status } = req.body;
      db.prepare('UPDATE registrations SET status = ? WHERE id = ?').run([status, req.params.id]);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update registration' });
    }
  });

  app.delete('/api/registrations/:id', async (req, res) => {
    try {
      db.prepare('DELETE FROM registrations WHERE id = ?').run(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete registration' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
