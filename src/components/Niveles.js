import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';

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
      // Asegúrate de que la propiedad 'IDnivel' y 'descripcionNivel' existen en cada objeto 'texto'
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
    <Accordion defaultActiveKey="0">
      {niveles.map((nivel, index) => (
        <Accordion.Item eventKey={String(index)} key={nivel.id}>
          <Accordion.Header>{nivel.nombre}</Accordion.Header>
          <Accordion.Body>
            {nivel.textos.map(texto => (
              <div key={texto.idTexto}>
                <h6>
                  <Link to={`/texto/${texto.idTexto}`}>{texto.titulo}</Link>
                </h6>
                <p>{texto.contenido.substring(0, 100)}...</p>
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default Niveles;
