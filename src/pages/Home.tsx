import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Award, Users, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function Home() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/news')
      .then(r => r.json())
      .then(data => {
        // take only recent 3 news
        if (Array.isArray(data)) {
            setNews(data.slice(0, 3));
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcbUnG-f9wW64YsRE3jjfRb7udJVa-aUKyTg&s')" }}
        ></div>
        <div className="absolute inset-0 bg-blue-950/70"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Warnai Masa Depanmu <br/> Bersama SMA Kartika
          </h1>
          <p className="text-xl text-blue-100 font-light max-w-2xl mx-auto">
            Membangun generasi cerdas, berkarakter, dan siap bersaing di era global melalui pendidikan yang unggul dan inovatif.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pendaftaran" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium text-lg transition-colors">
              Daftar Sekarang
            </Link>
            <Link to="/visi-misi" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur px-8 py-3 rounded-md font-medium text-lg transition-colors border border-white/30">
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                {/* Gambar representasi sekolah. Bisa diganti dengan URL gambar asli SMA Kartika */}
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaCejyyN-MnCKL_7GbwQHXPKx9bkkiHhDP3g&s" 
                  alt="Gedung SMA Kartika Jakarta Selatan" 
                  className="w-full h-auto object-cover aspect-[4/3] hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-blue-900/10"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                Tentang SMA Kartika
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Membangun Karakter, <br/> Mengukir Prestasi
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                SMA Kartika Jakarta Selatan adalah institusi pendidikan menengah atas yang berkomitmen untuk memberikan pendidikan berkualitas tinggi. Kami berfokus pada pengembangan akademik sekaligus pembentukan karakter siswa yang tangguh, disiplin, dan berwawasan luas.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Dengan fasilitas yang memadai dan tenaga pendidik yang profesional, kami siap mengantarkan generasi muda untuk meraih impian dan sukses di masa depan bersama nilai-nilai kebangsaan yang kuat.
              </p>
              <div className="pt-4">
                <Link to="/visi-misi" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg group">
                  Baca Sejarah dan Visi Misi 
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats/Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Kurikulum Unggulan</h3>
              <p className="text-gray-600">Menggunakan kurikulum terbaru yang disesuaikan dengan kebutuhan dunia industri dan universitas terkemuka.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pengajar Profesional</h3>
              <p className="text-gray-600">Didukung oleh tenaga pendidik yang berpengalaman, kompeten, dan berdedikasi tinggi di bidangnya.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Prestasi Gemilang</h3>
              <p className="text-gray-600">Siswa/i kami rutin meraih juara di berbagai kompetisi akademik maupun non-akademik tingkat nasional.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Berita Terbaru</h2>
              <p className="text-gray-600 mt-2">Update kegiatan dan prestasi seputar SMA Kartika</p>
            </div>
            <Link to="/berita" className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium">
              Lihat Semua <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="h-48 bg-gray-200 w-full relative">
                  {(item.imageUrl && item.imageUrl.trim() !== "") ? (
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                      <BookOpen size={48} />
                    </div>
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="text-sm text-blue-600 font-medium mb-2">
                    {format(new Date(item.createdAt), "dd MMMM yyyy", { locale: id })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {item.content}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <Link to="/berita" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                      Baca Selengkapnya
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/berita" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
              Lihat Semua Berita <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Siap Menjadi Bagian Dari Kami?</h2>
          <p className="text-blue-100 mb-8 text-lg">Pendaftaran peserta didik baru tahun ajaran ini telah dibuka. Segera daftarkan diri Anda dan raih masa depan yang lebih baik bersama SMA Kartika.</p>
          <Link to="/pendaftaran" className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            Isi Formulir Pendaftaran
          </Link>
        </div>
      </section>
    </div>
  );
}
