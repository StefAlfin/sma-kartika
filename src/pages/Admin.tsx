import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Plus, Trash2, Edit, Save, X, RefreshCcw, LogOut } from "lucide-react";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"news" | "registrations">("registrations");

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
                className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan password admin"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors">
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
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === "registrations" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
          >
            Registrasi Siswa
          </button>
          <button 
            onClick={() => setActiveTab("news")}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === "news" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
          >
            Kelola Berita
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
          {activeTab === "registrations" ? <RegistrationsManager /> : <NewsManager />}
        </div>
      </div>
    </div>
  );
}

function RegistrationsManager() {
  const [regs, setRegs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRegs = () => {
    setLoading(true);
    fetch("/api/registrations")
      .then(r => r.json())
      .then(data => {
        setRegs(data);
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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Data Pendaftaran Siswa</h2>
        <button onClick={fetchRegs} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 bg-white px-4 py-2 rounded-lg shadow-sm">
          <RefreshCcw size={18} /> Refresh
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
                <th className="py-4 px-6">Tanggal</th>
                <th className="py-4 px-6">Nama / NISN</th>
                <th className="py-4 px-6">Kontak</th>
                <th className="py-4 px-6">Jurusan</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm p-4">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">Memuat data...</td>
                </tr>
              ) : regs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">Belum ada data pendaftar.</td>
                </tr>
              ) : regs.map(reg => (
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
                  <td className="py-4 px-6 font-medium">{reg.major}</td>
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
  
  const [formData, setFormData] = useState({ title: "", content: "", imageUrl: "" });

  const fetchNews = () => {
    setLoading(true);
    fetch("/api/news")
      .then(r => r.json())
      .then(data => {
        setNews(data);
        setLoading(false);
      });
  };

  useEffect(() => { fetchNews(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    setFormData({ title: "", content: "", imageUrl: "" });
    setShowForm(false);
    fetchNews();
  };

  const deleteNews = async (id: number) => {
    if (confirm("Yakin ingin menghapus berita ini?")) {
      await fetch(`/api/news/${id}`, { method: "DELETE" });
      fetchNews();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Kelola Berita</h2>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm"
        >
          {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah Berita</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="font-bold text-lg mb-4">Buat Berita Baru</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Judul Berita</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">URL Gambar (Opsional)</label>
              <input value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-500" placeholder="https://..." />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Konten Berita</label>
              <textarea required rows={5} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-500"></textarea>
            </div>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">Simpan Berita</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
           <div className="text-gray-500 col-span-full text-center py-8">Memuat berita...</div>
        ) : news.length === 0 ? (
          <div className="text-gray-500 col-span-full text-center py-8 bg-white rounded-2xl border border-gray-200">Belum ada berita.</div>
        ) : news.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 flex flex-col">
            {item.imageUrl && (
              <div className="h-40 overflow-hidden">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-5 flex flex-col flex-grow">
              <div className="text-xs text-blue-600 font-medium mb-1">{format(new Date(item.createdAt), "dd MMM yyyy", { locale: id })}</div>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">{item.content}</p>
              
              <div className="mt-auto pt-4 border-t border-gray-100 flex justify-end">
                <button onClick={() => deleteNews(item.id)} className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm font-medium">
                  <Trash2 size={16} /> Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
