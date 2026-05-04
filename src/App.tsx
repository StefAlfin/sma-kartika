/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import VisiMisi from "./pages/VisiMisi";
import Jurusan from "./pages/Jurusan";
import Ekstrakurikuler from "./pages/Ekstrakurikuler";
import Kontak from "./pages/Kontak";
import Galeri from "./pages/Galeri";
import Berita from "./pages/Berita";
import Pendaftaran from "./pages/Pendaftaran";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="visi-misi" element={<VisiMisi />} />
          <Route path="jurusan" element={<Jurusan />} />
          <Route path="ekstrakurikuler" element={<Ekstrakurikuler />} />
          <Route path="kontak" element={<Kontak />} />
          <Route path="galeri" element={<Galeri />} />
          <Route path="berita" element={<Berita />} />
          <Route path="pendaftaran" element={<Pendaftaran />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
