import { FlaskConical, Globe, Calculator, Book, Code, Microscope } from "lucide-react";

export default function Jurusan() {
  const majors = [
    {
      id: "mipa",
      title: "Matematika dan Ilmu Pengetahuan Alam (MIPA)",
      description: "Jurusan yang berfokus pada ilmu eksakta, mengembangkan kemampuan analisis, logika, dan pemahaman fenomena alam. Sangat cocok bagi siswa yang bercita-cita menjadi dokter, insinyur, peneliti, atau ahli IT.",
      icon: <Microscope size={32} />,
      subjects: ["Matematika Peminatan", "Fisika", "Biologi", "Kimia"]
    },
    {
      id: "ips",
      title: "Ilmu Pengetahuan Sosial (IPS)",
      description: "Jurusan yang mendalami interaksi manusia, masyarakat, dan ekonomi. Mengasah kemampuan berpikir kritis tentang isu-isu sosial. Cocok untuk calon ekonom, sosiolog, diplomat, hingga pengusaha.",
      icon: <Globe size={32} />,
      subjects: ["Geografi", "Sejarah Peminatan", "Sosiologi", "Ekonomi"]
    }
  ];

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Jurusan & Program Studi</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kami menyediakan dua program penjurusan utama yang disesuaikan dengan minat, bakat, dan rencana karir siswa di masa depan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {majors.map(major => (
            <div key={major.id} className="bg-white rounded-3xl p-8 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                {major.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{major.title}</h2>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                {major.description}
              </p>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Book size={18} className="text-green-600" />
                  Mata Pelajaran Peminatan
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {major.subjects.map((subject, idx) => (
                    <li key={idx} className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-700 font-medium flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      {subject}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Mata Pelajaran Wajib */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Mata Pelajaran Wajib (Semua Jurusan)</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
               "Pendidikan Agama dan Budi Pekerti", 
               "Pendidikan Pancasila dan Kewarganegaraan", 
               "Bahasa Indonesia", 
               "Matematika Wajib", 
               "Sejarah Indonesia", 
               "Bahasa Inggris", 
               "Seni Budaya", 
               "Pendidikan Jasmani, Olahraga, dan Kesehatan",
               "Prakarya dan Kewirausahaan"
            ].map((subject, idx) => (
              <span key={idx} className="bg-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
