import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ColorSchemesExample from './components/Navbar.js';
import Niveles from './components/Niveles.js';
import TextoDetalle from './components/TextoDetalle.js';
import TextosList from './components/AdminTextosList.js';
import AdminTextoEditar from './components/AdminTextoEditar.js';
// import AddTextoPreguntas from './components/AddTextoPreguntas.js';

import Inicio from './containers/Inicio';
import Sobre from './containers/Sobre';
import Login from './containers/Login.js';

function App() {
  return (
    <Router>
      <ColorSchemesExample /> {/* Esto renderiza la Navbar */}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Niveles" element={<Niveles />} /> 
        {/* el usuario vera los niveles y los textos */}
        <Route path="/texto/:textoId" element={<TextoDetalle />} />
        {/* el usuario vera en detalle el texto y podrá resolver preguntas en esta ruta */}
        <Route path="/TextoList" element={<TextosList/>}/>
        {/* ruta para que el admin pueda ver y agregar textos */}
        <Route path="/TextoEdit/:textoId" element={<AdminTextoEditar/>} />
        {/* ruta para que el admin pueda editar y borrar los textos */}
        {/* <Route path="/Agregar" element={<AddTextoPreguntas/>} /> */}
        {/* ...otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;
