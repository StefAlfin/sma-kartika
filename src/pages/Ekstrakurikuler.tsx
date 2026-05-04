import { Music, Code, PenTool, Dumbbell, Palette, Users, Globe, Book } from "lucide-react";

export default function Ekstrakurikuler() {
  const ekskul = [
    { name: "Pramuka", category: "Wajib", icon: <Users size={24} /> },
    { name: "Paskibra", category: "Baris-berbaris", icon: <Users size={24} /> },
    { name: "Palang Merah Remaja (PMR)", category: "Kesehatan", icon: <Users size={24} /> },
    { name: "Basket", category: "Olahraga", icon: <Dumbbell size={24} /> },
    { name: "Futsal", category: "Olahraga", icon: <Dumbbell size={24} /> },
    { name: "Bulu Tangkis", category: "Olahraga", icon: <Dumbbell size={24} /> },
    { name: "Paduan Suara", category: "Kesenian", icon: <Music size={24} /> },
    { name: "Teater", category: "Kesenian", icon: <Palette size={24} /> },
    { name: "Modern Dance", category: "Kesenian", icon: <Music size={24} /> },
    { name: "Karya Ilmiah Remaja (KIR)", category: "Akademik", icon: <Book size={24} /> },
    { name: "English Club", category: "Bahasa", icon: <Globe size={24} /> },
    { name: "Klub Komputer & Pemrograman", category: "Teknologi", icon: <Code size={24} /> },
    { name: "Jurnalistik & Fotografi", category: "Media", icon: <PenTool size={24} /> },
  ];

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ekstrakurikuler</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kembangkan minat, bakat, dan kreativitasmu melalui berbagai pilihan kegiatan ekstrakurikuler di SMA Kartika.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ekskul.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center group cursor-pointer border border-transparent hover:border-blue-100">
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
    </div>
  );
}
