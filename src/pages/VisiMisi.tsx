import { Target, Eye } from "lucide-react";

export default function VisiMisi() {
  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Visi & Misi</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded"></div>
        </div>

        {/* Visi */}
        <div className="bg-white rounded-3xl p-10 shadow-sm mb-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-blue-50 opacity-10">
            <Eye size={200} />
          </div>
          <div className="relative z-10 w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
            <Eye size={40} className="-rotate-3" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Visi Kami</h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto font-medium">
            "Menjadi institusi pendidikan menengah atas yang unggul dalam akademik, terdepan dalam inovasi, serta mencetak lulusan yang berkarakter, berbudaya, dan berwawasan global pada tahun 2030."
          </p>
        </div>

        {/* Misi */}
        <div className="bg-white rounded-3xl p-10 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 left-0 p-8 text-blue-50 opacity-10">
            <Target size={200} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3">
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 transform -rotate-3">
                <Target size={40} className="rotate-3" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Misi Kami</h2>
              <p className="text-gray-500 mt-4">Langkah-langkah strategis kami dalam mewujudkan visi sekolah.</p>
            </div>
            
            <div className="md:w-2/3">
              <ul className="space-y-6">
                {[
                  "Menyelenggarakan proses pembelajaran yang inovatif, kreatif, dan berbasis teknologi.",
                  "Meningkatkan kompetensi pendidik dan tenaga kependidikan secara berkelanjutan.",
                  "Mengembangkan minat, bakat, dan potensi peserta didik melalui kegiatan ekstrakurikuler yang beragam.",
                  "Menanamkan karakter disiplin, jujur, toleran, dan peduli lingkungan kepada seluruh warga sekolah.",
                  "Membangun kemitraan yang kuat dengan orang tua, masyarakat, dan institusi terkait baik di dalam maupun luar negeri."
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <p className="text-gray-700 text-lg pt-1">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
