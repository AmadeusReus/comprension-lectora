import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
// Importar Container para usar como fondo
import { Container } from 'react-bootstrap';

function Niveles() {
  const [niveles, setNiveles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/nivelesConTextos')
      .then(respuesta => {
        const datosAgrupados = agruparTextosPorNivel(respuesta.data);
        setNiveles(datosAgrupados);
      })
      .catch(error => {
        console.error('Error al obtener los textos:', error);
      });
  }, []);

  // Función para agrupar textos por nivel
  const agruparTextosPorNivel = (textos) => {
    const nivelesMap = new Map();
  
    textos.forEach(texto => {
      
      const nivelId = texto.idnivel;
      const nivelDescripcion = texto.descripcionNivel;
  
      if (!nivelesMap.has(nivelId)) {
        nivelesMap.set(nivelId, {
          id: nivelId,
          nombre: nivelDescripcion,
          textos: []
        });
      }
      nivelesMap.get(nivelId).textos.push(texto);
    });
  
    return Array.from(nivelesMap.values());
  };

  return (
    // <Accordion defaultActiveKey="0">
    <Container /*fluid style={{
      height: '100vh',
      backgroundImage: 'url("https://cdn.pixabay.com/photo/2014/10/03/16/52/natural-471949_1280.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}*/>
      <Accordion>
        {niveles.map((nivel, index) => (
          <Accordion.Item eventKey={String(index)} key={nivel.id}>
            <Accordion.Header>
              <h2 className="mb-4">{nivel.nombre}</h2>
            </Accordion.Header>
            <Accordion.Body style={{ fontSize: '1rem', fontFamily: 'Arial, sans-serif' }}>
              {nivel.textos.map(texto => (
                <div key={texto.idTexto}>
                  <h4>
                    <Link to={`/texto/${texto.idTexto}`} style={{ color: '#007bff' }}><h4 className="lead">{texto.titulo}</h4></Link> {/* Link al TextoDetalle */}
                  </h4>
                  <p>{texto.contenido.substring(0, 100)}...</p>
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}

export default Niveles;

