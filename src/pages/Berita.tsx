import { useState, useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Search } from "lucide-react";

export default function Berita() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
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
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          />
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Mamuat berita...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredNews.map(item => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow">
                {item.imageUrl && item.imageUrl.trim() !== "" && (
                  <div className="h-64 overflow-hidden relative">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-8 flex-grow flex flex-col">
                  <div className="text-sm font-medium text-blue-600 mb-3">
                    {format(new Date(item.createdAt), "dd MMMM yyyy", { locale: id })}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">{item.title}</h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
            
            {filteredNews.length === 0 && (
              <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-gray-100">
                <p className="text-gray-500 text-lg">
                  {searchQuery ? "Berita yang Anda cari tidak ditemukan." : "Belum ada berita yang diterbitkan saat ini."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
