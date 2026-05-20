import { useState, useEffect } from "react";
import { BookOpen, Library, FlaskConical, Activity, Monitor, Wifi, Coffee, Users } from "lucide-react";

// Helper to render icon correctly based on name
const getIcon = (iconName: string) => {
  switch (iconName) {
    case "BookOpen": return <BookOpen size={28} />;
    case "Library": return <Library size={28} />;
    case "FlaskConical": return <FlaskConical size={28} />;
    case "Activity": return <Activity size={28} />;
    case "Monitor": return <Monitor size={28} />;
    case "Wifi": return <Wifi size={28} />;
    case "Coffee": return <Coffee size={28} />;
    case "Users": return <Users size={28} />;
    default: return <BookOpen size={28} />;
  }
};

export default function Fasilitas() {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/facilities')
      .then(res => res.json())
      .then(data => {
        setFacilities(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch facilities:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Fasilitas Sekolah</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            SMA Kartika menyediakan berbagai fasilitas modern untuk menunjang kegiatan pembelajaran dan ekstra siswa.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Memuat fasilitas...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((item, index) => (
              <div key={item.id || index} className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row hover:shadow-md transition-shadow group">
                <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden relative">
                  <img 
                    src={item.imageUrl || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="w-full md:w-3/5 p-6 flex flex-col">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                    {getIcon(item.iconName)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
            
            {facilities.length === 0 && (
              <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-gray-100">
                <p className="text-gray-500 text-lg">Data fasilitas belum tersedia.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
