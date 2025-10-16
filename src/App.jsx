import  { useState } from 'react'
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
import Resumen from './pages/Resumen'
import Glosario from './pages/Glosario'
import Autoevaluacion from './pages/Autoevaluacion'
import Tablas from './pages/Tablas'


const App = () => {

  const [darkMode, setDarkMode] = useState('dark')

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.body.setAttribute('data-bs-theme', !darkMode ? 'dark' : 'light')
  }
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
            <Route path="/resumen" element={<Resumen />} />
            <Route path="/glosario" element={<Glosario />} />
            <Route path="/autoevaluacion" element={<Autoevaluacion />} />

            <Route path="*" element={<Inicio />} />

          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </CarritoProvider>
  )
}

export default App