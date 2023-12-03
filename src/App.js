import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ColorSchemesExample from './components/Navbar.js'; // Tu barra de navegación
import Niveles from './components/Niveles.js'; // Asegúrate de que la ruta es correcta
import TextoDetalle from './components/TextoDetalle.js';

import Inicio from './containers/Inicio';
import Sobre from './containers/Sobre';
import Contacto from './containers/Contacto';

function App() {
  return (
    <Router>
      <ColorSchemesExample /> {/* Esto renderiza la Navbar */}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/Niveles" element={<Niveles />} />
        <Route path="/texto/:textoId" element={<TextoDetalle />} />
        {/* ...otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;
