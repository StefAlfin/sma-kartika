import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Plus, Trash2, Edit, Save, X, RefreshCcw, LogOut, Search } from "lucide-react";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"news" | "registrations" | "facilities" | "visimisi" | "messages" | "extracurriculars" | "settings">("registrations");

  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Password salah! (Hint: admin123)");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-sm w-full border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Masukkan password admin"
              />
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors">
              Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-64 bg-gray-900 text-white p-6 flex flex-col h-auto md:h-screen sticky top-0">
        <h2 className="text-xl font-bold mb-8">Admin Dashboard</h2>
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab("registrations")}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === "registrations" ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
          >
            Registrasi Siswa
          </button>
          <button 
            onClick={() => setActiveTab("news")}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === "news" ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
          >
            Kelola Berita
          </button>
          <button 
            onClick={() => setActiveTab("facilities")}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === "facilities" ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
          >
            Kelola Fasilitas
          </button>
          <button 
            onClick={() => setActiveTab("visimisi")}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === "visimisi" ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
          >
            Visi & Misi
          </button>
          <button 
            onClick={() => setActiveTab("extracurriculars")}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === "extracurriculars" ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
          >
            Ekstrakurikuler
          </button>
          <button 
            onClick={() => setActiveTab("messages")}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === "messages" ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
          >
            Pesan & Pertanyaan
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === "settings" ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
          >
            Pengaturan PPDB
          </button>
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-800">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 text-red-400 hover:text-red-300 px-4 py-2"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === "registrations" && <RegistrationsManager />}
          {activeTab === "news" && <NewsManager />}
          {activeTab === "facilities" && <FacilitiesManager />}
          {activeTab === "visimisi" && <VisiMisiManager />}
          {activeTab === "extracurriculars" && <ExtracurricularsManager />}
          {activeTab === "messages" && <MessagesManager />}
          {activeTab === "settings" && <SettingsManager />}
        </div>
      </div>
    </div>
  );
}

function RegistrationsManager() {
  const [regs, setRegs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [majorFilter, setMajorFilter] = useState("Semua");
  const [batchFilter, setBatchFilter] = useState("Semua");

  const fetchRegs = () => {
    setLoading(true);
    fetch("/api/registrations")
      .then(async r => {
         if (!r.ok) throw new Error(await r.text());
         const contentType = r.headers.get("content-type");
         if (!contentType || !contentType.includes("application/json")) {
           throw new TypeError("Oops, API tidak merespon JSON, tapi HTML (kemungkinan di Vercel)");
         }
         return r.json();
      })
      .then(data => {
        setRegs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setRegs([]);
        setLoading(false);
      });
  };

  useEffect(() => { fetchRegs(); }, []);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/registrations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    fetchRegs();
  };

  const deleteReg = async (id: number) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      await fetch(`/api/registrations/${id}`, { method: "DELETE" });
      fetchRegs();
    }
  };

  const filteredRegs = regs.filter(reg => {
    const matchSearch = reg.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       reg.nisn.includes(searchQuery) || 
                       reg.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "Semua" || reg.status === statusFilter;
    const matchMajor = majorFilter === "Semua" || reg.major === majorFilter;
    const matchBatch = batchFilter === "Semua" || reg.batch === batchFilter;
    
    return matchSearch && matchStatus && matchMajor && matchBatch;
  });

  const uniqueBatches = Array.from(new Set(regs.map(r => r.batch).filter(Boolean)));

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Data Pendaftaran Siswa</h2>
        <button onClick={fetchRegs} className="flex items-center gap-2 text-green-600 hover:text-green-700 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
          <RefreshCcw size={18} /> Refresh
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 w-full relative">
          <input 
            type="text" 
            placeholder="Cari nama, NISN, atau email..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <div className="w-full sm:w-auto flex flex-wrap gap-4">
          <select 
            value={batchFilter} 
            onChange={e => setBatchFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white"
          >
            <option value="Semua">Semua Gelombang</option>
            {uniqueBatches.map(b => (
              <option key={b as string} value={b as string}>{b as string}</option>
            ))}
          </select>
          <select 
            value={majorFilter} 
            onChange={e => setMajorFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white"
          >
            <option value="Semua">Semua Jurusan</option>
            <option value="IPA">IPA</option>
            <option value="IPS">IPS</option>
            <option value="Bahasa">Bahasa</option>
          </select>
          <select 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white"
          >
            <option value="Semua">Semua Status</option>
            <option value="Pending">Pending</option>
            <option value="Lulus">Lulus</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
                <th className="py-4 px-6">Tanggal</th>
                <th className="py-4 px-6">Nama / NISN</th>
                <th className="py-4 px-6">Kontak</th>
                <th className="py-4 px-6">Jurusan & Gelombang</th>
                <th className="py-4 px-6">Berkas</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm p-4">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">Memuat data...</td>
                </tr>
              ) : filteredRegs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                     {regs.length === 0 ? "Belum ada data pendaftar." : "Tidak ada pendaftar yang cocok dengan filter."}
                  </td>
                </tr>
              ) : filteredRegs.map(reg => (
                <tr key={reg.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 whitespace-nowrap text-gray-500">{format(new Date(reg.createdAt), "dd MMM yyyy", { locale: id })}</td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-900">{reg.fullName}</div>
                    <div className="text-xs text-gray-500">{reg.nisn}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div>{reg.phone}</div>
                    <div className="text-xs text-gray-500">{reg.email}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{reg.major}</div>
                    <div className="text-xs text-gray-400 mt-1">{reg.batch || "Belum ada"}</div>
                  </td>
                  <td className="py-4 px-6">
                    {reg.documents && reg.documents.length > 0 ? (
                      <div className="text-xs text-gray-600">
                        {reg.documents.map((doc: any, i: number) => (
                          <div key={i} className="truncate max-w-[120px] mb-1 opacity-80" title={doc.name}>
                            📄 {doc.name}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Kosong</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <select
                      value={reg.status}
                      onChange={(e) => updateStatus(reg.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-bold outline-none cursor-pointer ${
                        reg.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        reg.status === 'Lulus' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Lulus">Lulus</option>
                      <option value="Ditolak">Ditolak</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button onClick={() => deleteReg(reg.id)} className="text-red-500 hover:text-red-700 p-2">
                       <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function NewsManager() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "", imageUrl: "" });

  const fetchNews = () => {
    setLoading(true);
    fetch("/api/news")
      .then(async r => {
         if (!r.ok) throw new Error(await r.text());
         const contentType = r.headers.get("content-type");
         if (!contentType || !contentType.includes("application/json")) {
           throw new TypeError("Oops, API tidak merespon JSON, tapi HTML (kemungkinan di Vercel API belum ada)");
         }
         return r.json();
      })
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error API:", err);
        setNews([]);
        setLoading(false);
        alert("Gagal memuat berita. Error: " + err.message);
      });
  };

  useEffect(() => { fetchNews(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/news/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
    } else {
      await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
    }
    setFormData({ title: "", content: "", imageUrl: "" });
    setEditingId(null);
    setShowForm(false);
    fetchNews();
  };

  const handleEdit = (item: any) => {
    setFormData({
      title: item.title,
      content: item.content,
      imageUrl: item.imageUrl || ""
    });
    setEditingId(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteNews = async (id: number) => {
    if (confirm("Yakin ingin menghapus berita ini?")) {
      await fetch(`/api/news/${id}`, { method: "DELETE" });
      fetchNews();
    }
  };

  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Kelola Berita</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Cari berita..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-shadow"
          />
          <button 
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) {
                setEditingId(null);
                setFormData({ title: "", content: "", imageUrl: "" });
              }
            }} 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm whitespace-nowrap"
          >
            {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah Berita</>}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="font-bold text-lg mb-4">{editingId ? "Edit Berita" : "Buat Berita Baru"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Judul Berita</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:border-green-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">URL Gambar (Opsional)</label>
              <input value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:border-green-500" placeholder="https://..." />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Konten Berita</label>
              <textarea required rows={5} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:border-green-500"></textarea>
            </div>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">Simpan Berita</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm sticky top-0 z-10">
              <tr>
                <th className="p-4 font-semibold w-1/5 whitespace-nowrap">Tanggal</th>
                <th className="p-4 font-semibold w-1/3">Judul Berita</th>
                <th className="p-4 font-semibold w-2/5">Ringkasan Konten</th>
                <th className="p-4 font-semibold text-center w-auto">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 relative">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">Memuat berita...</td>
                </tr>
              ) : filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    {searchQuery ? "Berita tidak ditemukan." : "Belum ada berita."}
                  </td>
                </tr>
              ) : (
                filteredNews.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                      {format(new Date(item.createdAt), "dd MMM yyyy", { locale: id })}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-900 line-clamp-2">{item.title}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-600 line-clamp-2">{item.content}</div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="text-green-500 hover:text-green-700 p-2 hover:bg-green-50 rounded-lg transition-colors border border-transparent"
                          title="Edit"
                        >
                          <Edit size={20} />
                        </button>
                        <button 
                          onClick={() => deleteNews(item.id)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors border border-transparent"
                          title="Hapus"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FacilitiesManager() {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "", iconName: "", imageUrl: "" });

  const fetchFacilities = () => {
    setLoading(true);
    fetch("/api/facilities")
      .then(async r => {
         if (!r.ok) throw new Error(await r.text());
         const contentType = r.headers.get("content-type");
         if (!contentType || !contentType.includes("application/json")) {
           throw new TypeError("Oops, API tidak merespon JSON, tapi HTML");
         }
         return r.json();
      })
      .then(data => {
        setFacilities(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setFacilities([]);
        setLoading(false);
      });
  };

  useEffect(() => { fetchFacilities(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/facilities/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
    } else {
      await fetch("/api/facilities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
    }
    setFormData({ name: "", description: "", iconName: "", imageUrl: "" });
    setEditingId(null);
    setShowForm(false);
    fetchFacilities();
  };

  const handleEdit = (item: any) => {
    setFormData({
      name: item.name,
      description: item.description,
      iconName: item.iconName || "",
      imageUrl: item.imageUrl || ""
    });
    setEditingId(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteFacility = async (id: number) => {
    if (confirm("Yakin ingin menghapus fasilitas ini?")) {
      await fetch(`/api/facilities/${id}`, { method: "DELETE" });
      fetchFacilities();
    }
  };

  const filteredFacilities = facilities.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Kelola Fasilitas</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Cari fasilitas..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-shadow"
          />
          <button 
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) {
                setEditingId(null);
                setFormData({ name: "", description: "", iconName: "", imageUrl: "" });
              }
            }} 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm whitespace-nowrap"
          >
            {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah Fasilitas</>}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="font-bold text-lg mb-4">{editingId ? "Edit Fasilitas" : "Buat Fasilitas Baru"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Nama Fasilitas</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:border-green-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Ikon (Opsional, dari Lucide: BookOpen, Library, Monitor, Dll)</label>
              <input value={formData.iconName} onChange={e => setFormData({...formData, iconName: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:border-green-500" placeholder="Contoh: BookOpen" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">URL Gambar (Opsional)</label>
              <input value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:border-green-500" placeholder="https://..." />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Deskripsi Fasilitas</label>
              <textarea required rows={5} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:border-green-500"></textarea>
            </div>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">Simpan Fasilitas</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm sticky top-0 z-10">
              <tr>
                <th className="p-4 font-semibold w-1/4">Nama Fasilitas</th>
                <th className="p-4 font-semibold w-1/2">Deskripsi</th>
                <th className="p-4 font-semibold text-center w-1/4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 relative">
              {loading ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-500">Memuat fasilitas...</td>
                </tr>
              ) : filteredFacilities.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-500">
                    {searchQuery ? "Fasilitas tidak ditemukan." : "Belum ada fasilitas."}
                  </td>
                </tr>
              ) : (
                filteredFacilities.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {item.imageUrl && (
                          <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                        )}
                        <div className="font-semibold text-gray-900">{item.name}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-600 line-clamp-2">{item.description}</div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="text-green-500 hover:text-green-700 p-2 hover:bg-green-50 rounded-lg transition-colors border border-transparent"
                          title="Edit"
                        >
                          <Edit size={20} />
                        </button>
                        <button 
                          onClick={() => deleteFacility(item.id)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors border border-transparent"
                          title="Hapus"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function VisiMisiManager() {
  const [vision, setVision] = useState("");
  const [missions, setMissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/config')
      .then(async r => {
         if (!r.ok) throw new Error(await r.text());
         const contentType = r.headers.get("content-type");
         if (!contentType || !contentType.includes("application/json")) {
           throw new TypeError("Oops, API tidak merespon JSON, tapi HTML");
         }
         return r.json();
      })
      .then(data => {
        if (data.vision) setVision(data.vision);
        if (data.missions) setMissions(data.missions);
        setLoading(false);
      })
      .catch(err => {
        console.error("Config fetch error", err);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch('/api/config', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vision, missions: missions.filter(m => m.trim() !== '') })
    });
    setSaving(false);
    alert("Visi & Misi berhasil disimpan!");
  };

  const handleMissionChange = (index: number, value: string) => {
    const newMissions = [...missions];
    newMissions[index] = value;
    setMissions(newMissions);
  };

  const addMission = () => {
    setMissions([...missions, ""]);
  };

  const removeMission = (index: number) => {
    const newMissions = missions.filter((_, i) => i !== index);
    setMissions(newMissions);
  };

  if (loading) return <div className="py-8 text-center text-gray-500">Memuat konfigurasi...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Kelola Visi & Misi</h2>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
        <form onSubmit={handleSave} className="space-y-8">
          <div>
            <label className="text-lg font-bold text-gray-900 block mb-4">Visi Sekolah</label>
            <textarea
              required
              rows={4}
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-gray-700"
              placeholder="Masukkan visi..."
            ></textarea>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-lg font-bold text-gray-900 block">Misi Sekolah</label>
              <button
                type="button"
                onClick={addMission}
                className="flex items-center gap-1 text-sm bg-green-50 text-green-600 hover:bg-green-100 px-3 py-1.5 rounded-lg font-medium transition-colors"
              >
                <Plus size={16} /> Tambah Misi
              </button>
            </div>
            
            <div className="space-y-3">
              {missions.map((mission, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm mt-1">
                    {index + 1}
                  </div>
                  <textarea
                    required
                    rows={2}
                    value={mission}
                    onChange={(e) => handleMissionChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-gray-700"
                    placeholder="Masukkan misi..."
                  ></textarea>
                  <button
                    type="button"
                    onClick={() => removeMission(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors mt-1"
                    title="Hapus Misi"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-70"
            >
              <Save size={20} /> {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MessagesManager() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = () => {
    setLoading(true);
    fetch("/api/messages")
      .then(async r => {
         if (!r.ok) throw new Error(await r.text());
         const contentType = r.headers.get("content-type");
         if (!contentType || !contentType.includes("application/json")) {
           throw new TypeError("Oops, API tidak merespon JSON, tapi HTML");
         }
         return r.json();
      })
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMessages([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pesan ini?")) return;
    
    fetch(`/api/messages/${id}`, { method: 'DELETE' })
      .then(() => fetchMessages());
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Kelola Pesan & Pertanyaan</h2>
        <button 
          onClick={fetchMessages}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors border border-gray-200"
        >
          <RefreshCcw size={18} /> Refresh
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
                <th className="p-4 font-semibold w-1/4">Pengirim</th>
                <th className="p-4 font-semibold w-1/4">Email</th>
                <th className="p-4 font-semibold w-1/3">Pesan</th>
                <th className="p-4 font-semibold w-1/12">Tanggal</th>
                <th className="p-4 font-semibold text-center w-1/12">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">Memuat data...</td>
                </tr>
              ) : messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">Belum ada pesan/pertanyaan.</td>
                </tr>
              ) : (
                messages.map(msg => (
                  <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{msg.name}</div>
                    </td>
                    <td className="p-4">
                      <a href={`mailto:${msg.email}`} className="text-green-600 hover:underline">{msg.email}</a>
                    </td>
                    <td className="p-4 text-gray-700 whitespace-pre-line">
                      {msg.message}
                    </td>
                    <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                      {format(new Date(msg.createdAt), "dd MMM yyyy HH:mm", { locale: id })}
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleDelete(msg.id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors border border-transparent"
                        title="Hapus"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ExtracurricularsManager() {
  const [extracurriculars, setExtracurriculars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", category: "", description: "", iconName: "" });

  const fetchExtracurriculars = () => {
    setLoading(true);
    fetch("/api/extracurriculars")
      .then(async r => {
         if (!r.ok) throw new Error(await r.text());
         const contentType = r.headers.get("content-type");
         if (!contentType || !contentType.includes("application/json")) {
           throw new TypeError("Oops, API tidak merespon JSON");
         }
         return r.json();
      })
      .then(data => {
        setExtracurriculars(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setExtracurriculars([]);
        setLoading(false);
      });
  };

  useEffect(() => { fetchExtracurriculars(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/extracurriculars/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
    } else {
      await fetch("/api/extracurriculars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
    }
    setFormData({ name: "", category: "", description: "", iconName: "" });
    setEditingId(null);
    setShowForm(false);
    fetchExtracurriculars();
  };

  const handleEdit = (item: any) => {
    setFormData({
      name: item.name,
      category: item.category,
      description: item.description,
      iconName: item.iconName || ""
    });
    setEditingId(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteExtracurricular = async (id: number) => {
    if (confirm("Yakin ingin menghapus ekstrakurikuler ini?")) {
      await fetch(`/api/extracurriculars/${id}`, { method: "DELETE" });
      fetchExtracurriculars();
    }
  };

  const filteredExtracurriculars = extracurriculars.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Kelola Ekstrakurikuler</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Cari ekskul..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-shadow"
          />
          <button 
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) {
                setEditingId(null);
                setFormData({ name: "", category: "", description: "", iconName: "" });
              }
            }} 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm whitespace-nowrap"
          >
            {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah Ekskul</>}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="font-bold text-lg mb-4">{editingId ? "Edit Ekstrakurikuler" : "Buat Ekstrakurikuler Baru"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Nama Ekskul</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:border-green-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Kategori (Contoh: Olahraga, Kesenian, Wajib)</label>
              <input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:border-green-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Ikon (Opsional, dari Lucide: Users, Dumbbell, Music, Dll)</label>
              <input value={formData.iconName} onChange={e => setFormData({...formData, iconName: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:border-green-500" placeholder="Contoh: Users" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Deskripsi Ekskul</label>
              <textarea required rows={5} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:border-green-500"></textarea>
            </div>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">Simpan Ekskul</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm sticky top-0 z-10">
              <tr>
                <th className="p-4 font-semibold w-1/4">Nama Ekskul</th>
                <th className="p-4 font-semibold w-1/2">Deskripsi</th>
                <th className="p-4 font-semibold text-center w-1/4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 relative">
              {loading ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-500">Memuat data...</td>
                </tr>
              ) : filteredExtracurriculars.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-500">
                    {searchQuery ? "Ekskul tidak ditemukan." : "Belum ada ekskul."}
                  </td>
                </tr>
              ) : (
                filteredExtracurriculars.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="font-semibold text-gray-900">{item.name}</div>
                      </div>
                      <div className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded inline-block mt-1">{item.category}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-600 line-clamp-2">{item.description}</div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="text-green-500 hover:text-green-700 p-2 hover:bg-green-50 rounded-lg transition-colors border border-transparent"
                          title="Edit"
                        >
                          <Edit size={20} />
                        </button>
                        <button 
                          onClick={() => deleteExtracurricular(item.id)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors border border-transparent"
                          title="Hapus"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SettingsManager() {
  const [config, setConfig] = useState<any>({
    activeBatch: "",
    announcementBatch: "",
    isAnnouncementOpen: false
  });
  const [loading, setLoading] = useState(true);

  const fetchConfig = () => {
    setLoading(true);
    fetch('/api/config')
      .then(async r => {
         if (!r.ok) throw new Error(await r.text());
         return r.json();
      })
      .then(data => {
        setConfig(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => { fetchConfig(); }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    await fetch('/api/config', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config)
    });
    alert("Pengaturan berhasil disimpan.");
  };

  if (loading) return <div className="text-gray-500 py-10 text-center">Memuat pengaturan...</div>;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Pengaturan PPDB & Pengumuman</h2>
        <p className="text-gray-600">Atur gelombang pendaftaran dan pengumuman hasil kelulusan siswa.</p>
      </div>
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-bold text-lg mb-2">Pendaftaran Siswa Baru</h3>
              <p className="text-sm text-gray-600 mb-4">Siswa yang mendaftar akan otomatis masuk ke gelombang ini.</p>
              <label className="text-sm font-medium text-gray-700 block mb-2">Gelombang Aktif Saat Ini</label>
              <input 
                required 
                value={config.activeBatch || ""} 
                onChange={e => setConfig({...config, activeBatch: e.target.value})} 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" 
                placeholder="Contoh: Gelombang 1 - 2026/2027"
              />
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-bold text-lg mb-2">Pengumuman Kelulusan</h3>
              <p className="text-sm text-gray-600 mb-4">Pilih gelombang mana yang hasil kelulusannya sedang diumumkan ke publik.</p>
              
              <label className="text-sm font-medium text-gray-700 block mb-2">Gelombang Pengumuman</label>
              <input 
                required 
                value={config.announcementBatch || ""} 
                onChange={e => setConfig({...config, announcementBatch: e.target.value})} 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 mb-4" 
                placeholder="Contoh: Gelombang 1 - 2026/2027"
              />

              <label className="flex items-start gap-3 cursor-pointer mt-4 group">
                <div className="relative flex items-center justify-center w-6 h-6 mt-0.5">
                  <input
                    type="checkbox"
                    checked={config.isAnnouncementOpen || false}
                    onChange={(e) => setConfig({...config, isAnnouncementOpen: e.target.checked})}
                    className="peer sr-only"
                  />
                  <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded peer-checked:bg-green-600 peer-checked:border-green-600 transition-colors"></div>
                  <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-green-700 transition-colors">Buka Pengumuman ke Publik</div>
                  <div className="text-sm text-gray-500 mt-0.5">Jika dicentang, siswa dapat melihat hasil kelulusan di halaman pendaftaran.</div>
                </div>
              </label>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg shadow-sm font-medium transition-all group">
              <Save size={20} className="group-hover:scale-110 transition-transform" />
              Simpan Pengaturan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
