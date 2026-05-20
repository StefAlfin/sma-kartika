import { Music, Code, PenTool, Dumbbell, Palette, Users, Globe, Book, X, Trophy, Microscope, Monitor, Camera, Guitar, Gamepad2, Plane, Star, Layout, Library, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const getIcon = (name: string, size = 24) => {
  switch (name) {
    case 'Users': return <Users size={size} />;
    case 'Dumbbell': return <Dumbbell size={size} />;
    case 'Music': return <Music size={size} />;
    case 'Palette': return <Palette size={size} />;
    case 'Book': return <Book size={size} />;
    case 'Globe': return <Globe size={size} />;
    case 'Code': return <Code size={size} />;
    case 'PenTool': return <PenTool size={size} />;
    case 'Trophy': return <Trophy size={size} />;
    case 'Microscope': return <Microscope size={size} />;
    case 'Monitor': return <Monitor size={size} />;
    case 'Camera': return <Camera size={size} />;
    case 'Layout': return <Layout size={size} />;
    case 'Heart': return <Heart size={size} />;
    case 'Star': return <Star size={size} />;
    case 'Library': return <Library size={size} />;
    default: return <Star size={size} />;
  }
};

export default function Ekstrakurikuler() {
  const [selectedEkskul, setSelectedEkskul] = useState<any | null>(null);
  const [ekskul, setEkskul] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/extracurriculars')
      .then(async res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, API tidak merespon JSON, tapi HTML (kemungkinan di Vercel API belum ada)");
        }
        return res.json();
      })
      .then(data => {
        setEkskul(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch extracurriculars:", err);
        setEkskul([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ekstrakurikuler</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kembangkan minat, bakat, dan kreativitasmu melalui berbagai pilihan kegiatan ekstrakurikuler di SMA Kartika. Klik pada kartu untuk melihat informasi detailnya.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Memuat data...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ekskul.map((item, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedEkskul(item)}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center group cursor-pointer border border-transparent hover:border-green-100"
              >
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  {getIcon(item.iconName)}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                <span className="inline-block bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 rounded-full mt-2">
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        )}
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
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                  {getIcon(selectedEkskul.iconName, 24)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">{selectedEkskul.name}</h3>
                  <span className="inline-block bg-green-100 px-3 py-1 text-xs font-bold tracking-wide text-green-700 rounded-full mt-2">
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
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition-colors"
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
