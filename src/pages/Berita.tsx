import { useState, useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Search, ChevronLeft, ArrowRight, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Berita() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNews, setSelectedNews] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/news')
      .then(async res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, API tidak merespon JSON, tapi HTML (kemungkinan di Vercel API belum ada)");
        }
        return res.json();
      })
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch news:", err);
        setNews([]);
        setLoading(false);
      });
  }, []);

  const filteredNews = news.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(query)) ||
      (item.content && item.content.toLowerCase().includes(query))
    );
  });

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {selectedNews ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-8 pb-0">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="flex items-center text-sm font-medium text-green-600 hover:text-green-800 transition-colors mb-6 group"
                >
                  <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                  Kembali ke Daftar Berita
                </button>
                <div className="text-sm font-medium text-gray-500 mb-3">
                  {format(new Date(selectedNews.createdAt), "dd MMMM yyyy", { locale: id })}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                  {selectedNews.title}
                </h1>
              </div>

              {selectedNews.imageUrl && selectedNews.imageUrl.trim() !== "" && (
                <div className="w-full h-80 md:h-[28rem] relative mb-8">
                  <img
                    src={selectedNews.imageUrl}
                    alt={selectedNews.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-8 pt-0">
                <div className="prose prose-green max-w-none text-gray-700 whitespace-pre-line text-lg leading-relaxed">
                  {selectedNews.content}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Berita & Pengumuman</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Dapatkan informasi terkini seputar kegiatan, prestasi, dan pengumuman dari SMA Kartika.
                </p>
              </div>

              <div className="max-w-2xl mx-auto mb-16 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari berita berdasarkan judul atau konten..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white shadow-sm"
                />
              </div>

              {loading ? (
                <div className="text-center py-20 text-gray-500">Memuat berita...</div>
              ) : (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                    <table className="w-full text-left min-w-full relative">
                      <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-4 text-sm font-semibold text-gray-600">Tanggal</th>
                          <th className="px-6 py-4 text-sm font-semibold text-gray-600">Judul Berita</th>
                          <th className="px-6 py-4 text-sm font-semibold text-gray-600">Ringkasan</th>
                          <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredNews.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
                              {format(new Date(item.createdAt), "dd MMM yyyy", { locale: id })}
                            </td>
                            <td className="px-6 py-5">
                              <div className="font-semibold text-gray-900 max-w-sm line-clamp-2">
                                {item.title}
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <div className="text-sm text-gray-600 max-w-md line-clamp-2">
                                {item.content}
                              </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap text-right text-sm">
                              <button
                                onClick={() => setSelectedNews(item)}
                                className="inline-flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-100 px-4 py-2 rounded-xl font-medium transition-colors"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Baca Detail
                              </button>
                            </td>
                          </tr>
                        ))}
                        {filteredNews.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-6 py-16 text-center text-gray-500">
                              {searchQuery ? "Berita yang Anda cari tidak ditemukan." : "Belum ada berita yang diterbitkan saat ini."}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
