import { useState, useEffect } from "react";
import { Target, Eye } from "lucide-react";

export default function VisiMisi() {
  const [vision, setVision] = useState("");
  const [missions, setMissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if (data.vision) setVision(data.vision);
        if (data.missions) setMissions(data.missions);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch config:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="text-center py-20 text-gray-500">Memuat data...</div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Visi & Misi</h1>
          <div className="w-24 h-1 bg-green-600 mx-auto rounded"></div>
        </div>

        {/* Visi */}
        <div className="bg-white rounded-3xl p-10 shadow-sm mb-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-green-50 opacity-10">
            <Eye size={200} />
          </div>
          <div className="relative z-10 w-20 h-20 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
            <Eye size={40} className="-rotate-3" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Visi Kami</h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto font-medium">
            "{vision}"
          </p>
        </div>

        {/* Misi */}
        <div className="bg-white rounded-3xl p-10 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 left-0 p-8 text-green-50 opacity-10">
            <Target size={200} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 transform -rotate-3">
                <Target size={40} className="rotate-3" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Misi Kami</h2>
              <p className="text-gray-500 mt-4">Langkah-langkah strategis kami dalam mewujudkan visi sekolah.</p>
            </div>
            
            <div className="md:w-2/3">
              <ul className="space-y-6">
                {missions.map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">
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
