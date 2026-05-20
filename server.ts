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
    CREATE TABLE IF NOT EXISTS facilities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      iconName TEXT,
      imageUrl TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  // Insert sample config if empty
  const configCount = db.prepare('SELECT COUNT(*) as count FROM config').get() as { count: number };
  if (configCount.count === 0) {
    db.exec(`
      INSERT INTO config (key, value) VALUES
      ('vision', '"Menjadi institusi pendidikan menengah atas yang unggul dalam akademik, terdepan dalam inovasi, serta mencetak lulusan yang berkarakter, berbudaya, dan berwawasan global pada tahun 2030."'),
      ('missions', '["Menyelenggarakan proses pembelajaran yang inovatif, kreatif, dan berbasis teknologi.", "Meningkatkan kompetensi pendidik dan tenaga kependidikan secara berkelanjutan.", "Mengembangkan minat, bakat, dan potensi peserta didik melalui kegiatan ekstrakurikuler yang beragam.", "Menanamkan karakter disiplin, jujur, toleran, dan peduli lingkungan kepada seluruh warga sekolah.", "Membangun kemitraan yang kuat dengan orang tua, masyarakat, dan institusi terkait baik di dalam maupun luar negeri."]')
    `);
  }

  // Insert sample news if empty
  const newsCount = db.prepare('SELECT COUNT(*) as count FROM news').get() as { count: number };
  if (newsCount.count <= 2) {
    db.exec(`DELETE FROM news;`);
    db.exec(`
      INSERT INTO news (title, content, imageUrl) VALUES
      ('Prestasi Siswa SMA Kartika di Olimpiade Sains Nasional', 'Siswa kita berhasil meraih medali emas di ajang OSN tingkat nasional tahun ini. Prestasi ini sangat membanggakan sekolah kita dan diharapkan dapat memotivasi siswa lain untuk berprestasi di bidang akademik dan non-akademik sesuai bakat masing-masing.', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop'),
      ('Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027', 'Pendaftaran SMA Kartika Jakarta Selatan telah dibuka untuk semua jurusan: MIPA dan IPS. Silakan kunjungi halaman pendaftaran online. Kami menyambut putra-putri terbaik untuk bergabung dan berkembang bersama SMA Kartika.', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop'),
      ('Kegiatan PORSENI Antar Kelas Berjalan Meriah', 'Pekan Olahraga dan Seni (PORSENI) tahun ini berlangsung sukses dan meriah dengan berbagai lomba seperti basket, futsal, dan paduan suara. Acara ini berhasil mempererat tali persaudaraan antar siswa.', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop'),
      ('Semarak Peringatan Hari Pendidikan Nasional', 'Upacara bendera memperingati Hari Pendidikan Nasional diikuti oleh seluruh civitas akademika SMA Kartika dengan khidmat, dilanjutkan dengan penganugerahan siswa teladan dan guru berdedikasi.', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop'),
      ('Kunjungan Kampus ke Perguruan Tinggi Negeri Terkemuka', 'Siswa kelas XII mengadakan campus tour ke Universitas Indonesia dan Institut Teknologi Bandung. Kegiatan ini bertujuan memberikan gambaran kehidupan kampus dan memotivasi mereka untuk meraih mimpi besar.', 'https://images.unsplash.com/photo-1525926476834-3151480f0c05?q=80&w=2070&auto=format&fit=crop'),
      ('Pemilihan Ketua OSIS Masa Bakti 2026/2027', 'Pemilu Ketua dan Wakil Ketua OSIS berjalan dengan lancar mengusung asas demokrasi. Terpilihlah kandidat nomor 2 yang diharapkan membawa program-program inovatif bagi siswa.', 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=2070&auto=format&fit=crop'),
      ('Tim Basket SMA Kartika Sabet Juara 1 Tingkat Provinsi', 'Kerja keras dan latihan rutin membuahkan hasil. Tim Basket SMA Kartika berhasil mengalahkan belasan tim dari sekolah elit lainnya dalam ajang kejuaraan bergengsi ini.', 'https://images.unsplash.com/photo-1519861531473-920026eca493?q=80&w=2070&auto=format&fit=crop'),
      ('Pameran Karya Seni Rupa Siswa Tahunan Gemilang', 'Ratusan karya seni berupa lukisan, patung, dan instalasi hasil karya siswa dipamerkan. Ajang ini merupakan wadah apresiasi tertinggi terhadap kreativitas seni anak muda.', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop'),
      ('Pelatihan Jurnalistik dan Literasi Digital', 'Ekstrakurikuler Jurnalistik mengadakan pelatihan penulisan berita dan pemanfaatan literasi digital agar siswa lebih bijak dalam menyaring informasi di era modern.', 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=2070&auto=format&fit=crop'),
      ('Pelaksanaan Ujian Sekolah Berbasis Komputer Sukses', 'Evaluasi akhir kegiatan belajar berupa Ujian Sekolah Berbasis Komputer (USBK) telah dilaksanakan dengan tertib dan teknis yang lancar tanpa kendala server.', 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop'),
      ('Program Adiwiyata: Penanaman 1000 Pohon', 'Dalam rangka mendukung pelestarian lingkungan, sekolah kita melaksanakan program penanaman ribuan pohon peneduh dan tanaman hias di lingkungan sekolah.', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2213&auto=format&fit=crop')
    `);
  }

  // Insert sample facilities if empty
  const facilitiesCount = db.prepare('SELECT COUNT(*) as count FROM facilities').get() as { count: number };
  if (facilitiesCount.count === 0) {
    db.exec(`
      INSERT INTO facilities (name, description, iconName, imageUrl) VALUES
      ('Ruang Kelas Ber-AC', 'Ruang kelas yang nyaman, bersih, dan dilengkapi dengan pendingin ruangan, proyektor, serta akses Wi-Fi berkecepatan tinggi.', 'BookOpen', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop'),
      ('Perpustakaan Lengkap', 'Koleksi buku lengkap mulai dari buku pelajaran, fiksi, non-fiksi, ensiklopedi, hingga literatur digital dalam ruangan yang tenang.', 'Library', 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2190&auto=format&fit=crop'),
      ('Laboratorium Sains', 'Laboratorium Fisika, Kimia, dan Biologi dengan peralatan modern yang berstandar nasional.', 'FlaskConical', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop'),
      ('Lapangan Olahraga', 'Fasilitas lapangan basket, voli, futsal, dan bulu tangkis yang terintegrasi di ruang terbuka maupun tertutup.', 'Activity', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop')
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

  app.put('/api/news/:id', async (req, res) => {
    try {
      const { title, content, imageUrl } = req.body;
      db.prepare('UPDATE news SET title = ?, content = ?, imageUrl = ? WHERE id = ?').run([title, content, imageUrl, req.params.id]);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update news' });
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

  app.get('/api/facilities', async (req, res) => {
    try {
      const data = db.prepare('SELECT * FROM facilities ORDER BY createdAt DESC').all();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch facilities' });
    }
  });

  app.post('/api/facilities', async (req, res) => {
    try {
      const { name, description, iconName, imageUrl } = req.body;
      const result = db.prepare('INSERT INTO facilities (name, description, iconName, imageUrl) VALUES (?, ?, ?, ?)').run([name, description, iconName, imageUrl]);
      res.json({ id: result.lastInsertRowid, success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create facility' });
    }
  });

  app.put('/api/facilities/:id', async (req, res) => {
    try {
      const { name, description, iconName, imageUrl } = req.body;
      db.prepare('UPDATE facilities SET name = ?, description = ?, iconName = ?, imageUrl = ? WHERE id = ?').run([name, description, iconName, imageUrl, req.params.id]);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update facility' });
    }
  });

  app.delete('/api/facilities/:id', async (req, res) => {
    try {
      db.prepare('DELETE FROM facilities WHERE id = ?').run(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete facility' });
    }
  });

  app.get('/api/config', async (req, res) => {
    try {
      const data = db.prepare('SELECT * FROM config').all() as { key: string, value: string }[];
      const config: any = {};
      data.forEach(item => {
        try {
          config[item.key] = JSON.parse(item.value);
        } catch (e) {
          config[item.key] = item.value;
        }
      });
      res.json(config);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch config' });
    }
  });

  app.put('/api/config', async (req, res) => {
    try {
      const { vision, missions } = req.body;
      const stmt = db.prepare('INSERT INTO config (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value');
      
      const transaction = db.transaction(() => {
        if (vision !== undefined) stmt.run('vision', JSON.stringify(vision));
        if (missions !== undefined) stmt.run('missions', JSON.stringify(missions));
      });
      
      transaction();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update config' });
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
