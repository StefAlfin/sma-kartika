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
        ]
      }));
    }

    if (!localStorage.getItem('news')) {
      localStorage.setItem('news', JSON.stringify([
        { id: 1, title: 'Prestasi Siswa', content: 'Siswa kita berhasil meraih medali emas.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 2, title: 'Pendaftaran 2026', content: 'Pendaftaran telah dibuka untuk jurusan MIPA dan IPS.', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop', createdAt: new Date().toISOString() }
      ]));
    }

    if (!localStorage.getItem('facilities')) {
      localStorage.setItem('facilities', JSON.stringify([
        { id: 1, name: 'Ruang Kelas', description: 'Ruang kelas yang nyaman ber-AC.', iconName: 'BookOpen', imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop', createdAt: new Date().toISOString() },
        { id: 2, name: 'Perpustakaan', description: 'Koleksi buku lengkap.', iconName: 'Library', imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2190&auto=format&fit=crop', createdAt: new Date().toISOString() }
      ]));
    }

    if (!localStorage.getItem('registrations')) {
      localStorage.setItem('registrations', JSON.stringify([]));
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

        // Registrations
        if (url === '/api/registrations') {
          if (method === 'GET') return jsonResponse(getTable('registrations').sort((a:any,b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
          if (method === 'POST') {
            const body = JSON.parse(config?.body as string);
            const items = getTable('registrations');
            const newItem = { id: Date.now(), ...body, status: 'Pending', createdAt: new Date().toISOString() };
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
