import { Link, useLocation, useOutlet } from "react-router-dom";
import { BookOpen, MapPin, Phone, Mail, Menu, X, Facebook, Instagram, Twitter } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentOutlet = useOutlet();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { name: "Beranda", path: "/" },
    { name: "Visi & Misi", path: "/visi-misi" },
    { name: "Jurusan", path: "/jurusan" },
    { name: "Ekstrakurikuler", path: "/ekstrakurikuler" },
    { name: "Galeri", path: "/galeri" },
    { name: "Berita", path: "/berita" },
    { name: "Kontak", path: "/kontak" },
    { name: "Pendaftaran", path: "/pendaftaran" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 px-4 md:px-8 text-sm hidden md:flex justify-between items-center">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><Phone size={14} /> (021) 123-4567</span>
          <span className="flex items-center gap-2"><Mail size={14} /> info@smakartikajakarta.sch.id</span>
        </div>
        <div className="flex gap-4">
          <Link to="/admin" className="hover:text-blue-200">Admin Login</Link>
        </div>
      </div>

      {/* Main NavBar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-3">
              <BookOpen className="h-10 w-10 text-blue-600" />
              <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-900 leading-tight">SMA KARTIKA</span>
                <span className="text-xs text-gray-500 font-medium">JAKARTA SELATAN</span>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-1 border-l pl-6 ml-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              >
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {currentOutlet}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-blue-400" />
                <span className="font-bold text-xl">SMA Kartika</span>
              </div>
              <p className="text-gray-400 text-sm">
                Mendidik generasi muda yang berkarakter, cerdas, dan siap menghadapi tantangan masa depan.
              </p>
              <div className="flex items-center gap-4 text-gray-400">
                <a href="#" className="hover:text-white"><Facebook size={20} /></a>
                <a href="#" className="hover:text-white"><Instagram size={20} /></a>
                <a href="#" className="hover:text-white"><Twitter size={20} /></a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Tautan Cepat</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/visi-misi" className="hover:text-blue-400">Visi & Misi</Link></li>
                <li><Link to="/jurusan" className="hover:text-blue-400">Jurusan</Link></li>
                <li><Link to="/ekstrakurikuler" className="hover:text-blue-400">Ekstrakurikuler</Link></li>
                <li><Link to="/pendaftaran" className="hover:text-blue-400">Pendaftaran Online</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Kontak</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-3">
                  <MapPin size={18} className="text-blue-400 shrink-0" />
                  <span>Jl. Jenderal Sudirman No. 123, Kebayoran Baru, Jakarta Selatan</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-blue-400 shrink-0" />
                  <span>(021) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-blue-400 shrink-0" />
                  <span>info@smakartikajakarta.sch.id</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Buletin Kami</h3>
              <p className="text-sm text-gray-400 mb-4">Dapatkan berita dan informasi terbaru dari sekolah.</p>
              <div className="flex">
                <input type="email" placeholder="Email Anda" className="w-full px-3 py-2 text-sm text-gray-900 bg-white rounded-l focus:outline-none" />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r text-sm font-medium transition">Kirim</button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} SMA Kartika Jakarta Selatan. Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
}
