import { Music, Code, PenTool, Dumbbell, Palette, Users, Globe, Book, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Ekstrakurikuler() {
  const [selectedEkskul, setSelectedEkskul] = useState<any | null>(null);

  const ekskul = [
    { name: "Pramuka", category: "Wajib", icon: <Users size={24} />, description: "Membentuk karakter disiplin, mandiri, saling peduli, dan berjiwa kepemimpinan melalui kegiatan baris-berbaris, tali-temali, dan penjelajahan." },
    { name: "Paskibra", category: "Baris-berbaris", icon: <Users size={24} />, description: "Melatih kedisiplinan, ketahanan fisik, kerja sama tim, dan memupuk rasa cinta tanah air melalui latihan formasi baris-berbaris tingkat lanjut." },
    { name: "Palang Merah Remaja (PMR)", category: "Kesehatan", icon: <Users size={24} />, description: "Membekali siswa dengan keterampilan pertolongan pertama, pemeliharaan kesehatan, serta menumbuhkan jiwa sosial dan kemanusiaan." },
    { name: "Basket", category: "Olahraga", icon: <Dumbbell size={24} />, description: "Mengembangkan bakat dan teknik bermain olahraga bola basket, membangun kerja sama tim, serta menjaga kebugaran fisik." },
    { name: "Futsal", category: "Olahraga", icon: <Dumbbell size={24} />, description: "Wadah bagi siswa yang menggemari olahraga sepak bola di lapangan tertutup, difokuskan pada latihan teknik, penyelesaian taktik, dan sportivitas." },
    { name: "Bulu Tangkis", category: "Olahraga", icon: <Dumbbell size={24} />, description: "Latihan rutin bulu tangkis yang bertujuan membina ketangkasan, kecepatan refleks, dan konsentrasi saat bertanding." },
    { name: "Paduan Suara", category: "Kesenian", icon: <Music size={24} />, description: "Melatih teknik olah vokal, pengenalan notasi balok, harmonisasi nada, dan kekompakan dalam menyanyikan berbagai genre paduan suara." },
    { name: "Teater", category: "Kesenian", icon: <Palette size={24} />, description: "Eksplorasi mendalam seni peran, tata panggung, olah tubuh, tata rias, dan ekspresi diri untuk melatih rasa percaya diri yang tinggi." },
    { name: "Modern Dance", category: "Kesenian", icon: <Music size={24} />, description: "Menyalurkan bakat tari modern dengan penyusunan koreografi yang enerjik sehingga dapat meningkatkan kreativitas dan fleksibilitas gerak." },
    { name: "Karya Ilmiah Remaja (KIR)", category: "Akademik", icon: <Book size={24} />, description: "Wadah bagi siswa untuk berpikir kritis, bereksperimen, dan berinovasi melalui penelitian dasar serta metode penulisan karya ilmiah." },
    { name: "English Club", category: "Bahasa", icon: <Globe size={24} />, description: "Meningkatkan kemampuan berbicara dan mendengar bahasa Inggris melalui metode debate, public speech, dan aktivitas santai interaktif lainnya." },
    { name: "Klub Komputer & Pemrograman", category: "Teknologi", icon: <Code size={24} />, description: "Belajar keterampilan coding tingkat dasar, perakitan robotika ringan, serta pemahaman akan literasi teknologi informasi yang terkini." },
    { name: "Jurnalistik & Fotografi", category: "Media", icon: <PenTool size={24} />, description: "Belajar kaidah peliputan berita sekolah, teknik reportase mendalam, penulisan artikel, dan teknik menangkap momen estetis melalui lensa fotografis." },
  ];

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ekstrakurikuler</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kembangkan minat, bakat, dan kreativitasmu melalui berbagai pilihan kegiatan ekstrakurikuler di SMA Kartika. Klik pada kartu untuk melihat informasi detailnya.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ekskul.map((item, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedEkskul(item)}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center group cursor-pointer border border-transparent hover:border-blue-100"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
              <span className="inline-block bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 rounded-full mt-2">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedEkskul && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEkskul(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl z-10"
            >
              <button 
                onClick={() => setSelectedEkskul(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                aria-label="Tutup"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                  {selectedEkskul.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">{selectedEkskul.name}</h3>
                  <span className="inline-block bg-blue-100 px-3 py-1 text-xs font-bold tracking-wide text-blue-700 rounded-full mt-2">
                    {selectedEkskul.category}
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <p className="text-gray-700 leading-relaxed">
                  {selectedEkskul.description}
                </p>
              </div>
              
              <button 
                onClick={() => setSelectedEkskul(null)}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors"
              >
                Tutup
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
