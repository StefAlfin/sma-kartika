export function setupMockApi() {
  const initializeData = () => {
    if (!localStorage.getItem('config')) {
      localStorage.setItem('config', JSON.stringify({
        vision: "Menjadi institusi pendidikan menengah atas yang unggul dalam akademik, terdepan dalam inovasi, serta mencetak lulusan yang berkarakter, berbudaya, dan berwawasan global.",
        missions: [
          "Menyelenggarakan proses pembelajaran yang inovatif dan kreatif.",
          "Meningkatkan kompetensi pendidik berkelanjutan.",
          "Mengembangkan minat bakat siswa lewat ekstrakurikuler.",
          "Menanamkan karakter disiplin, jujur, toleran.",
          "Membangun kemitraan dengan masyarakat."
        ],
        activeBatch: "Semester Ganjil 2026/2027",
        announcementBatch: "Semester Ganjil 2026/2027",
        isAnnouncementOpen: false
      }));
    }

    const existingNews = JSON.parse(localStorage.getItem('news') || '[]');
    if (existingNews.length < 10) {
      localStorage.setItem('news', JSON.stringify([
        { id: 1, title: 'Prestasi Siswa SMA Kartika di Olimpiade Sains Nasional', content: 'Siswa kita berhasil meraih medali emas di ajang OSN tingkat nasional tahun ini. Prestasi ini sangat membanggakan sekolah kita dan diharapkan dapat memotivasi siswa lain untuk berprestasi di bidang akademik dan non-akademik sesuai bakat masing-masing.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 2, title: 'Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027', content: 'Pendaftaran SMA Kartika Jakarta Selatan telah dibuka untuk semua jurusan: MIPA dan IPS. Silakan kunjungi halaman pendaftaran online.', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 3, title: 'Kegiatan PORSENI Antar Kelas Berjalan Meriah', content: 'Pekan Olahraga dan Seni (PORSENI) tahun ini berlangsung sukses dan meriah dengan berbagai lomba seperti basket, futsal, dan paduan suara.', imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 4, title: 'Semarak Peringatan Hari Pendidikan Nasional', content: 'Upacara bendera memperingati Hari Pendidikan Nasional diikuti oleh seluruh civitas akademika SMA Kartika dengan khidmat.', imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 5, title: 'Kunjungan Kampus ke Perguruan Tinggi', content: 'Siswa kelas XII mengadakan campus tour ke Universitas Indonesia dan Institut Teknologi Bandung. Kegiatan ini bertujuan memberikan gambaran kehidupan kampus.', imageUrl: 'https://images.unsplash.com/photo-1525926476834-3151480f0c05?q=80&w=2070&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 6, title: 'Pemilihan Ketua OSIS Masa Bakti 2026/2027', content: 'Pemilu Ketua dan Wakil Ketua OSIS berjalan dengan lancar mengusung asas demokrasi. Terpilihlah kandidat nomor 2 yang diharapkan membawa program inovatif.', imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=2070&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 7, title: 'Tim Basket SMA Kartika Sabet Juara 1', content: 'Kerja keras dan latihan rutin membuahkan hasil. Tim Basket SMA Kartika berhasil mengalahkan belasan tim dari sekolah elit lainnya.', imageUrl: 'https://images.unsplash.com/photo-1519861531473-920026eca493?q=80&w=2070&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 8, title: 'Pameran Karya Seni Rupa Siswa Tahunan', content: 'Ratusan karya seni berupa lukisan, patung, dan instalasi hasil karya siswa dipamerkan. Ajang ini merupakan apresiasi kreativitas anak muda.', imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 9, title: 'Pelatihan Jurnalistik dan Literasi Digital', content: 'Ekstrakurikuler Jurnalistik mengadakan pelatihan penulisan berita dan pemanfaatan literasi digital.', imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=2070&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 10, title: 'Pelaksanaan Ujian Sekolah Berbasis Komputer', content: 'Evaluasi akhir kegiatan belajar berupa Ujian Sekolah Berbasis Komputer (USBK) telah dilaksanakan dengan tertib dan teknis yang lancar.', imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 11, title: 'Program Adiwiyata: Penanaman 1000 Pohon', content: 'Dalam rangka mendukung pelestarian lingkungan, sekolah kita melaksanakan program penanaman ribuan pohon peneduh.', imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2213&auto=format&fit=crop', createdAt: new Date().toISOString() }
      ]));
    }

    const existingFacilities = JSON.parse(localStorage.getItem('facilities') || '[]');
    if (existingFacilities.length < 10) {
      localStorage.setItem('facilities', JSON.stringify([
        { id: 1, name: 'Ruang Kelas', description: 'Ruang kelas yang nyaman ber-AC, dilengkapi dengan proyektor dan smartboard interaktif untuk menunjang pembelajaran modern.', iconName: 'BookOpen', imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 2, name: 'Perpustakaan Digital', description: 'Koleksi buku cetak terlengkap dan e-book dengan fasilitas komputer dan akses internet cepat untuk riset siswa.', iconName: 'Library', imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2190&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 3, name: 'Laboratorium Sains', description: 'Laboratorium Fisika, Kimia, dan Biologi dengan alat praktikum berstandar nasional.', iconName: 'Microscope', imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 4, name: 'Laboratorium Komputer', description: 'Ruangan khusus dengan PC spesifikasi tinggi untuk pembelajaran IT, desain grafis, dan pemograman.', iconName: 'Monitor', imageUrl: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=2070&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 5, name: 'Lapangan Olahraga', description: 'Fasilitas lapangan basket, voli, dan futsal terpadu dengan tribun penonton standar.', iconName: 'Trophy', imageUrl: 'https://images.unsplash.com/photo-1518659739704-585ee5167b5e?q=80&w=2070&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 6, name: 'Ruang Seni dan Tari', description: 'Studio seni luas dengan dinding cermin dan peralatan musik untuk eksplorasi bakat siswa.', iconName: 'Music', imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 7, name: 'Masjid Sekolah', description: 'Masjid megah yang nyaman untuk ibadah dan kegiatan keagamaan berskala besar bagi siswa.', iconName: 'Building', imageUrl: 'https://images.unsplash.com/photo-1548048026-5a1a941d93d3?q=80&w=2070&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 8, name: 'Kantin Sehat', description: 'Area ruang makan luas dan bersih dengan berbagai tenant yang menjual makanan dan minuman bergizi.', iconName: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 9, name: 'Klinik Kesehatan (UKS)', description: 'Ruang rawat darurat yang nyaman dijaga oleh tenaga medis profesional siaga.', iconName: 'Heart', imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 10, name: 'Aula Serbaguna', description: 'Hall luas untuk seminar, kelulusan, dan berbagai acara besar dengan akustik ruangan terbaik.', iconName: 'Users', imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop', createdAt: new Date().toISOString() }
      ]));
    }

    const existingRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    if (existingRegistrations.length < 20) {
      const dummyRegs = [];
      const majors = ["IPA", "IPS", "Bahasa"];
      const statuses = ["Pending", "Lulus", "Ditolak"];
      const batches = ["Gelombang 1 - 2026/2027", "Gelombang 2 - 2026/2027"];
      for (let i = 1; i <= 20; i++) {
        dummyRegs.push({
          id: i,
          fullName: `Siswa Calon ${i}`,
          nisn: `00${12345000 + i}`,
          email: `siswa${i}@example.com`,
          phone: `0812345678${i.toString().padStart(2, '0')}`,
          previousSchool: `SMP Negeri ${Math.ceil(Math.random() * 10)} Jakarta`,
          major: majors[i % 3],
          status: statuses[i % 3],
          batch: batches[i % 2],
          createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
        });
      }
      localStorage.setItem('registrations', JSON.stringify(dummyRegs));
    }

    if (!localStorage.getItem('messages')) {
      localStorage.setItem('messages', JSON.stringify([]));
    }

    const existingEkskul = JSON.parse(localStorage.getItem('extracurriculars') || '[]');
    if (existingEkskul.length === 0) {
      localStorage.setItem('extracurriculars', JSON.stringify([
        { id: 1, name: "Pramuka", category: "Wajib", iconName: "Users", description: "Membentuk karakter disiplin, mandiri, saling peduli, dan berjiwa kepemimpinan melalui kegiatan baris-berbaris, tali-temali, dan penjelajahan.", createdAt: new Date().toISOString() },
        { id: 2, name: "Paskibra", category: "Baris-berbaris", iconName: "Users", description: "Melatih kedisiplinan, ketahanan fisik, kerja sama tim, dan memupuk rasa cinta tanah air melalui latihan formasi baris-berbaris tingkat lanjut.", createdAt: new Date().toISOString() },
        { id: 3, name: "Palang Merah Remaja (PMR)", category: "Kesehatan", iconName: "Users", description: "Membekali siswa dengan keterampilan pertolongan pertama, pemeliharaan kesehatan, serta menumbuhkan jiwa sosial dan kemanusiaan.", createdAt: new Date().toISOString() },
        { id: 4, name: "Basket", category: "Olahraga", iconName: "Dumbbell", description: "Mengembangkan bakat dan teknik bermain olahraga bola basket, membangun kerja sama tim, serta menjaga kebugaran fisik.", createdAt: new Date().toISOString() },
        { id: 5, name: "Futsal", category: "Olahraga", iconName: "Dumbbell", description: "Wadah bagi siswa yang menggemari olahraga sepak bola di lapangan tertutup, difokuskan pada latihan teknik, penyelesaian taktik, dan sportivitas.", createdAt: new Date().toISOString() },
        { id: 6, name: "Bulu Tangkis", category: "Olahraga", iconName: "Dumbbell", description: "Latihan rutin bulu tangkis yang bertujuan membina ketangkasan, kecepatan refleks, dan konsentrasi saat bertanding.", createdAt: new Date().toISOString() },
        { id: 7, name: "Paduan Suara", category: "Kesenian", iconName: "Music", description: "Melatih teknik olah vokal, pengenalan notasi balok, harmonisasi nada, dan kekompakan dalam menyanyikan berbagai genre paduan suara.", createdAt: new Date().toISOString() },
        { id: 8, name: "Teater", category: "Kesenian", iconName: "Palette", description: "Eksplorasi mendalam seni peran, tata panggung, olah tubuh, tata rias, dan ekspresi diri untuk melatih rasa percaya diri yang tinggi.", createdAt: new Date().toISOString() },
        { id: 9, name: "Modern Dance", category: "Kesenian", iconName: "Music", description: "Menyalurkan bakat tari modern dengan penyusunan koreografi yang enerjik sehingga dapat meningkatkan kreativitas dan fleksibilitas gerak.", createdAt: new Date().toISOString() },
        { id: 10, name: "Karya Ilmiah Remaja (KIR)", category: "Akademik", iconName: "Book", description: "Wadah bagi siswa untuk berpikir kritis, bereksperimen, dan berinovasi melalui penelitian dasar serta metode penulisan karya ilmiah.", createdAt: new Date().toISOString() },
        { id: 11, name: "English Club", category: "Bahasa", iconName: "Globe", description: "Meningkatkan kemampuan berbicara dan mendengar bahasa Inggris melalui metode debate, public speech, dan aktivitas santai interaktif lainnya.", createdAt: new Date().toISOString() },
        { id: 12, name: "Klub Komputer & Pemrograman", category: "Teknologi", iconName: "Code", description: "Belajar keterampilan coding tingkat dasar, perakitan robotika ringan, serta pemahaman akan literasi teknologi informasi yang terkini.", createdAt: new Date().toISOString() },
        { id: 13, name: "Jurnalistik & Fotografi", category: "Media", iconName: "PenTool", description: "Belajar kaidah peliputan berita sekolah, teknik reportase mendalam, penulisan artikel, dan teknik menangkap momen estetis melalui lensa fotografis.", createdAt: new Date().toISOString() }
      ]));
    }
  };

  initializeData();

  const originalFetch = window.fetch;

  Object.defineProperty(window, 'fetch', {
    configurable: true,
    writable: true,
    value: async (...args: any[]) => {
      const [resource, config] = args;
      const url = typeof resource === 'string' ? resource : resource?.url;
      if (!url) return originalFetch(...args);
      
      const method = config?.method || 'GET';

      const getTable = (key: string) => JSON.parse(localStorage.getItem(key) || '[]');
      const setTable = (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data));

      const jsonResponse = (data: any, status = 200) => {
        return new Response(JSON.stringify(data), {
          status,
          headers: { 'Content-Type': 'application/json' }
        });
      };

      if (url.startsWith('/api/')) {
        // News
        if (url === '/api/news') {
          if (method === 'GET') return jsonResponse(getTable('news').sort((a:any,b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
          if (method === 'POST') {
            const body = JSON.parse(config?.body as string);
            const news = getTable('news');
            const newItem = { id: Date.now(), ...body, createdAt: new Date().toISOString() };
            setTable('news', [...news, newItem]);
            return jsonResponse(newItem);
          }
        }
        if (url.match(/^\/api\/news\/\w+/)) {
          const id = parseInt(url.split('/').pop() || '0');
          if (method === 'PUT') {
            const body = JSON.parse(config?.body as string);
            const news = getTable('news');
            setTable('news', news.map((n: any) => n.id === id ? { ...n, ...body } : n));
            return jsonResponse({ success: true });
          }
          if (method === 'DELETE') {
            const news = getTable('news');
            setTable('news', news.filter((n: any) => n.id !== id));
            return jsonResponse({ success: true });
          }
        }

        // Facilities
        if (url === '/api/facilities') {
          if (method === 'GET') return jsonResponse(getTable('facilities').sort((a:any,b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
          if (method === 'POST') {
            const body = JSON.parse(config?.body as string);
            const items = getTable('facilities');
            const newItem = { id: Date.now(), ...body, createdAt: new Date().toISOString() };
            setTable('facilities', [...items, newItem]);
            return jsonResponse(newItem);
          }
        }
        if (url.match(/^\/api\/facilities\/\w+/)) {
          const id = parseInt(url.split('/').pop() || '0');
          if (method === 'PUT') {
            const body = JSON.parse(config?.body as string);
            const items = getTable('facilities');
            setTable('facilities', items.map((n: any) => n.id === id ? { ...n, ...body } : n));
            return jsonResponse({ success: true });
          }
          if (method === 'DELETE') {
            const items = getTable('facilities');
            setTable('facilities', items.filter((n: any) => n.id !== id));
            return jsonResponse({ success: true });
          }
        }

        // Extracurriculars
        if (url === '/api/extracurriculars') {
          if (method === 'GET') return jsonResponse(getTable('extracurriculars').sort((a:any,b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
          if (method === 'POST') {
            const body = JSON.parse(config?.body as string);
            const items = getTable('extracurriculars');
            const newItem = { id: Date.now(), ...body, createdAt: new Date().toISOString() };
            setTable('extracurriculars', [...items, newItem]);
            return jsonResponse(newItem);
          }
        }
        if (url.match(/^\/api\/extracurriculars\/\w+/)) {
          const id = parseInt(url.split('/').pop() || '0');
          if (method === 'PUT') {
            const body = JSON.parse(config?.body as string);
            const items = getTable('extracurriculars');
            setTable('extracurriculars', items.map((n: any) => n.id === id ? { ...n, ...body } : n));
            return jsonResponse({ success: true });
          }
          if (method === 'DELETE') {
            const items = getTable('extracurriculars');
            setTable('extracurriculars', items.filter((n: any) => n.id !== id));
            return jsonResponse({ success: true });
          }
        }

        // Registrations
        if (url === '/api/registrations') {
          if (method === 'GET') return jsonResponse(getTable('registrations').sort((a:any,b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
          if (method === 'POST') {
            const body = JSON.parse(config?.body as string);
            const items = getTable('registrations');
            const currentConfig = JSON.parse(localStorage.getItem('config') || '{}');
            const activeBatch = currentConfig.activeBatch || "Gelombang 1";
            const newItem = { id: Date.now(), ...body, status: 'Pending', batch: activeBatch, createdAt: new Date().toISOString() };
            setTable('registrations', [...items, newItem]);
            return jsonResponse(newItem);
          }
        }
        if (url.match(/^\/api\/registrations\/\w+/)) {
          const id = parseInt(url.split('/').pop() || '0');
          if (method === 'PUT') {
            const body = JSON.parse(config?.body as string);
            const items = getTable('registrations');
            setTable('registrations', items.map((n: any) => n.id === id ? { ...n, ...body } : n));
            return jsonResponse({ success: true });
          }
          if (method === 'DELETE') {
            const items = getTable('registrations');
            setTable('registrations', items.filter((n: any) => n.id !== id));
            return jsonResponse({ success: true });
          }
        }

        // Messages
        if (url === '/api/messages') {
          if (method === 'GET') return jsonResponse(getTable('messages').sort((a:any,b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
          if (method === 'POST') {
            const body = JSON.parse(config?.body as string);
            const items = getTable('messages');
            const newItem = { id: Date.now(), ...body, isRead: false, createdAt: new Date().toISOString() };
            setTable('messages', [...items, newItem]);
            return jsonResponse(newItem);
          }
        }
        if (url.match(/^\/api\/messages\/\w+/)) {
          const id = parseInt(url.split('/').pop() || '0');
          if (method === 'PUT') {
            const body = JSON.parse(config?.body as string);
            const items = getTable('messages');
            setTable('messages', items.map((n: any) => n.id === id ? { ...n, ...body } : n));
            return jsonResponse({ success: true });
          }
          if (method === 'DELETE') {
            const items = getTable('messages');
            setTable('messages', items.filter((n: any) => n.id !== id));
            return jsonResponse({ success: true });
          }
        }

        // Config
        if (url === '/api/config') {
          if (method === 'GET') return jsonResponse(JSON.parse(localStorage.getItem('config') || '{}'));
          if (method === 'PUT') {
            const body = JSON.parse(config?.body as string);
            const currentConfig = JSON.parse(localStorage.getItem('config') || '{}');
            setTable('config', { ...currentConfig, ...body });
            return jsonResponse({ success: true });
          }
        }

        return jsonResponse({ error: 'Not found in mock DB' }, 404);
      }

      return originalFetch(...args);
    }
  });
}
