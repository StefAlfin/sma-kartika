import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Kontak() {
  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan atau membutuhkan informasi lebih lanjut.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Alamat</h3>
                    <p className="text-gray-600 mt-1">
                      Jl. Jenderal Sudirman No. 123<br />
                      Kebayoran Baru, Jakarta Selatan<br />
                      DKI Jakarta 12190
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Telepon</h3>
                    <p className="text-gray-600 mt-1">(021) 123-4567</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Email</h3>
                    <p className="text-gray-600 mt-1">info@smakartikajakarta.sch.id</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Jam Operasional Kantor</h3>
                    <p className="text-gray-600 mt-1">
                      Senin - Jumat: 07.00 - 15.00 WIB<br />
                      Sabtu, Minggu, Hari Libur: Tutup
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-3xl p-4 shadow-sm h-full min-h-[400px] flex flex-col">
            <div className="w-full h-full bg-gray-200 rounded-2xl overflow-hidden relative">
               {/* Embed Google Maps or placeholder */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24050215712!2d106.74563!3d-6.2297465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14d30079f01%3A0x2e74f2341fff266d!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
