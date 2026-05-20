import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { CheckCircle2, Search, AlertCircle, UploadCloud, FileText, Trash2 } from "lucide-react";

export default function Pendaftaran() {
  const [activeTab, setActiveTab] = useState<"daftar" | "pengumuman">("daftar");
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    fetch('/api/config')
      .then(r => r.json())
      .then(data => setConfig(data))
      .catch(console.error);
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    nisn: "",
    email: "",
    phone: "",
    address: "",
    major: "MIPA"
  });
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [searchNisn, setSearchNisn] = useState("");
  const [announcementResult, setAnnouncementResult] = useState<any | null>(null);
  const [announcementLoading, setAnnouncementLoading] = useState(false);
  const [announcementError, setAnnouncementError] = useState("");

  const handleSearchAnnouncement = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchNisn) return;
    
    setAnnouncementLoading(true);
    setAnnouncementError("");
    setAnnouncementResult(null);

    try {
      const res = await fetch("/api/registrations");
      const regs = await res.json();
      const match = regs.find((r: any) => r.nisn === searchNisn && r.batch === config?.announcementBatch);
      
      if (match) {
        setAnnouncementResult(match);
      } else {
        setAnnouncementError("Data tidak ditemukan atau NISN salah pada gelombang yang sedang diumumkan.");
      }
    } catch (err: any) {
      setAnnouncementError("Terjadi kesalahan, gagal mengambil data.");
    } finally {
      setAnnouncementLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const errors: { [key: string]: string } = {};
    if (!/^\d+$/.test(formData.nisn)) {
      errors.nisn = "NISN hanya boleh berisi angka (0-9).";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Format email tidak valid.";
    }
    if (!/^(\+?62|0)\d{9,13}$/.test(formData.phone)) {
      errors.phone = "Format nomor HP tidak valid (harus 10-14 digit, diawali 0 atau +62).";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setError("Terdapat kesalahan pada isian formulir. Mohon periksa kembali.");
      return;
    }

    setFormErrors({});
    setLoading(true);
    setError("");
    
    try {
      const payload = {
        ...formData,
        documents: files.map(f => ({ name: f.name, size: f.size, type: f.type }))
      };

      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error("Gagal mengirim pendaftaran");
      
      setSuccess(true);
      setFormData({
        fullName: "",
        nisn: "",
        email: "",
        phone: "",
        address: "",
        major: "MIPA"
      });
      setFiles([]);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Penerimaan Peserta Didik Baru</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {config?.activeBatch ? `Pendaftaran Gelombang Terkini: ${config.activeBatch}` : 'Silakan gunakan layanan pendaftaran di bawah ini.'}
          </p>
        </div>

        {config?.isAnnouncementOpen && (
          <div className="flex bg-gray-200 rounded-lg p-1 mb-8 max-w-sm mx-auto">
            <button
              onClick={() => setActiveTab("daftar")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "daftar" ? "bg-white shadow-sm text-gray-900" : "text-gray-600 hover:text-gray-900"}`}
            >
              Formulir Pendaftaran
            </button>
            <button
              onClick={() => setActiveTab("pengumuman")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "pengumuman" ? "bg-white shadow-sm text-gray-900" : "text-gray-600 hover:text-gray-900"}`}
            >
              Cek Pengumuman
            </button>
          </div>
        )}

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
          {activeTab === "pengumuman" && config?.isAnnouncementOpen ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 border-b pb-4">Pengumuman Kelulusan</h2>
              <p className="text-gray-600 mb-6">
                Gelombang: <span className="font-semibold text-gray-800">{config?.announcementBatch}</span>
              </p>

              <form onSubmit={handleSearchAnnouncement} className="mb-8">
                <label className="text-sm font-medium text-gray-700 block mb-2">Masukkan NISN</label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={searchNisn}
                    onChange={e => setSearchNisn(e.target.value)}
                    placeholder="Contoh: 0012345001"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all font-mono"
                    required
                  />
                  <button 
                    disabled={announcementLoading} 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
                  >
                    {announcementLoading ? "Memeriksa..." : <><Search size={20} /> Cek</>}
                  </button>
                </div>
              </form>

              {announcementError && (
                <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl flex items-start gap-4">
                  <AlertCircle className="shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold">Info</h4>
                    <p>{announcementError}</p>
                  </div>
                </div>
              )}

              {announcementResult && (
                <div className={`p-6 rounded-2xl border-2 ${announcementResult.status === 'Lulus' ? 'bg-green-50 border-green-200' : announcementResult.status === 'Ditolak' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
                  <h3 className="text-xl font-bold mb-4 text-center">Status Kelulusan</h3>
                  <div className="space-y-3 bg-white p-6 rounded-xl border border-gray-100 mb-6 text-center">
                    <div>
                      <div className="text-sm text-gray-500">Nama Siswa</div>
                      <div className="font-bold text-gray-900 text-lg">{announcementResult.fullName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">NISN</div>
                      <div className="font-mono text-gray-700">{announcementResult.nisn}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Pilihan Jurusan</div>
                      <div className="font-medium text-gray-700">{announcementResult.major}</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className={`inline-block px-6 py-2 rounded-full text-lg font-bold tracking-wide uppercase ${announcementResult.status === 'Lulus' ? 'bg-green-600 text-white' : announcementResult.status === 'Ditolak' ? 'bg-red-600 text-white' : 'bg-yellow-500 text-white'}`}>
                      {announcementResult.status}
                    </span>
                    {announcementResult.status === 'Lulus' && (
                      <p className="mt-4 text-green-800 font-medium">Selamat! Anda dinyatakan LULUS seleksi penerimaan siswa baru SMA Kartika.</p>
                    )}
                    {announcementResult.status === 'Ditolak' && (
                      <p className="mt-4 text-red-800 font-medium">Mohon maaf, Anda dinyatakan TIDAK LULUS seleksi pendaftaran kali ini.</p>
                    )}
                    {announcementResult.status === 'Pending' && (
                      <p className="mt-4 text-yellow-800 font-medium">Berkas pendaftaran Anda masih dalam tahap seleksi.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              {success ? (
             <div className="text-center py-12">
               <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle2 size={40} />
               </div>
               <h2 className="text-2xl font-bold text-gray-900 mb-3">Pendaftaran Berhasil!</h2>
               <p className="text-gray-600 mb-8">Data pendaftaran Anda telah kami terima. Tim panitia PPDB akan segera menghubungi Anda melalui nomor telepon atau email yang terdaftar untuk informasi selanjutnya.</p>
               <button 
                 onClick={() => setSuccess(false)}
                 className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                 Kembali ke Form Mendaftar
               </button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
                  <input 
                    required 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none" 
                    placeholder="Contoh: Budi Santoso"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">NISN</label>
                  <input 
                    required 
                    name="nisn"
                    value={formData.nisn}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.nisn ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-green-500 focus:ring-green-200'} focus:ring-2 transition-all outline-none`} 
                    placeholder="Nomor Induk Siswa Nasional"
                  />
                  {formErrors.nisn && <p className="text-sm text-red-500 mt-1">{formErrors.nisn}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Aktif</label>
                  <input 
                    required 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-green-500 focus:ring-green-200'} focus:ring-2 transition-all outline-none`} 
                    placeholder="budi@example.com"
                  />
                  {formErrors.email && <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nomor HP/WhatsApp</label>
                  <input 
                    required 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-green-500 focus:ring-green-200'} focus:ring-2 transition-all outline-none`} 
                    placeholder="08123456789"
                  />
                  {formErrors.phone && <p className="text-sm text-red-500 mt-1">{formErrors.phone}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Jurusan Pilihan</label>
                <select 
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none bg-white"
                >
                  <option value="MIPA">Matematika dan Ilmu Pengetahuan Alam (MIPA)</option>
                  <option value="IPS">Ilmu Pengetahuan Sosial (IPS)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Alamat Lengkap</label>
                <textarea 
                  required 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none resize-none" 
                  placeholder="Masukkan alamat lengkap domisili saat ini"
                ></textarea>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700 block">Dokumen Pendukung (KK, Akta, Ijazah/SKL)</label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:border-green-500 hover:bg-green-50 transition-colors flex flex-col items-center justify-center cursor-pointer relative">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <UploadCloud className="text-gray-400 mb-3" size={40} />
                  <p className="font-medium text-gray-700">Pilih atau letakkan dokumen di sini</p>
                  <p className="text-sm text-gray-500 mt-1">PDF, JPG, atau PNG (Maks 5MB)</p>
                </div>

                {files.length > 0 && (
                  <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-sm text-gray-600">
                      <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3">Nama Berkas</th>
                          <th className="px-4 py-3 w-32">Ukuran</th>
                          <th className="px-4 py-3 w-16">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {files.map((file, index) => (
                          <tr key={index} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                            <td className="px-4 py-3 flex items-center gap-3">
                              <FileText size={18} className="text-green-600 shrink-0" />
                              <span className="truncate max-w-[200px] sm:max-w-xs">{file.name}</span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </td>
                            <td className="px-4 py-3">
                              <button 
                                type="button" 
                                onClick={() => removeFile(index)}
                                className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-70 flex justify-center"
                >
                    {loading ? "Mengirim Data..." : "Kirim Formulir Pendaftaran"}
                  </button>
                </div>
              </form>
            )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
