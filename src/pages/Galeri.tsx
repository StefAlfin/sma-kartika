export default function Galeri() {
  const photos = [
    { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop", title: "Gedung Sekolah Utama" },
    { url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop", title: "Suasana Belajar di Kelas" },
    { url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop", title: "Laboratorium Sains" },
    { url: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=1974&auto=format&fit=crop", title: "Kegiatan Olahraga Pagi" },
    { url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop", title: "Fasilitas Perpustakaan" },
    { url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop", title: "Kegiatan Ekstrakurikuler" },
  ];

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Galeri Dokumentasi</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Momen-momen berharga dan fasilitas yang ada di SMA Kartika Jakarta Selatan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, i) => (
            <div key={i} className="group overflow-hidden rounded-2xl shadow-sm hover:shadow-md cursor-pointer relative bg-white aspect-[4/3]">
              <img 
                src={photo.url} 
                alt={photo.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg">{photo.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
