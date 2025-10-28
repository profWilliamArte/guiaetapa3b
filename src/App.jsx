import  { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CarritoProvider } from './context/CarritoContext' // 👈

import Header from './components/Header'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Error405 from './pages/Error405'
import Movil from './pages/Movil'
import Laptop from './pages/Laptop'
import Tienda from './pages/Tienda'
import Detalle from './pages/Detalle'
import Busquedas from './pages/Busquedas'
import Categorias from './pages/Categorias'

import Tablas from './pages/Tablas'
import ExplicacionContext from './pages/ExplicacionContext'
import ExplicaDatatable from './pages/ExplicaDatatable'


const App = () => {
  const [darkMode, setDarkMode] = useState(true); // por defecto oscuro

  // Función para cambiar el tema de PrimeReact dinámicamente
  const updatePrimeReactTheme = (isDark) => {
    const themeLink = document.getElementById('primereact-theme');
    if (themeLink) {
      themeLink.href = isDark
        ? 'node_modules/primereact/resources/themes/arya-blue/theme.css'  // oscuro
        : 'node_modules/primereact/resources/themes/lara-light-blue/theme.css'; // claro
    }
  };

  // Hook que aplica el tema cada vez que cambia darkMode
  useEffect(() => {
    updatePrimeReactTheme(darkMode);
    document.body.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Función toggle para cambiar el modo oscuro/claro
  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <CarritoProvider> {/* 👈 Envuelve TODO */}
      <BrowserRouter>
        <div className="app">
          <Header darkMode={darkMode} toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />

            <Route path="/movil" element={<Movil />} />
            <Route path="/laptop" element={<Laptop />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/tablas" element={<Tablas />} />
            <Route path="/categorias/:id" element={<Categorias />} />
            <Route path="/detalle/:id/:nombre" element={<Detalle />} />
            <Route path="/busquedas" element={<Busquedas />} />

            <Route path="/context" element={<ExplicacionContext />} />
            <Route path="/datatable" element={<ExplicaDatatable />} />

            <Route path="*" element={<Inicio />} />

          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </CarritoProvider>
  )
}

export default App