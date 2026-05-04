import { useState, ChangeEvent, FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

export default function Pendaftaran() {
  const [formData, setFormData] = useState({
    fullName: "",
    nisn: "",
    email: "",
    phone: "",
    address: "",
    major: "MIPA"
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pendaftaran Online</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Silakan isi formulir di bawah ini dengan data yang benar untuk mendaftar sebagai calon peserta didik baru.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 relative">
          {success ? (
             <div className="text-center py-12">
               <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle2 size={40} />
               </div>
               <h2 className="text-2xl font-bold text-gray-900 mb-3">Pendaftaran Berhasil!</h2>
               <p className="text-gray-600 mb-8">Data pendaftaran Anda telah kami terima. Tim panitia PPDB akan segera menghubungi Anda melalui nomor telepon atau email yang terdaftar untuk informasi selanjutnya.</p>
               <button 
                 onClick={() => setSuccess(false)}
                 className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" 
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" 
                    placeholder="Nomor Induk Siswa Nasional"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Aktif</label>
                  <input 
                    required 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" 
                    placeholder="budi@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nomor HP/WhatsApp</label>
                  <input 
                    required 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" 
                    placeholder="08123456789"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Jurusan Pilihan</label>
                <select 
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white"
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none" 
                  placeholder="Masukkan alamat lengkap domisili saat ini"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-70 flex justify-center"
                >
                  {loading ? "Mengirim Data..." : "Kirim Formulir Pendaftaran"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
