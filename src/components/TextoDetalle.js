import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pregunta from './Pregunta';
import QuizModal from './QuizModal';
import { Container, Card } from 'react-bootstrap';

const TextoDetalle = () => {
  let { textoId } = useParams();
  let navigate = useNavigate();
  const [textoDetalle, setTextoDetalle] = useState(null);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [quizTerminado, setQuizTerminado] = useState(false);
  const [respuestasUsuario, setRespuestasUsuario] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/textoDetalle/${textoId}`)
      .then(respuesta => {
        setTextoDetalle(respuesta.data);
      })
      .catch(error => {
        console.error('Error al obtener los detalles del texto:', error);
      });
  }, [textoId]);

    const handleRespuestaSeleccionada = (respuestaDada) => {
    const opcionCorrecta = textoDetalle.preguntas[preguntaActual].opciones.find(o => o.correcta).descripcion;
    const esCorrecta = respuestaDada === opcionCorrecta;

    setRespuestasUsuario(prevRespuestas => [
        ...prevRespuestas,
        {
            pregunta: textoDetalle.preguntas[preguntaActual].enunciado,
            respuestaDada,
            respuestaCorrecta: opcionCorrecta,
            esCorrecta
        }
    ]);

    if (esCorrecta) {
        setPuntaje(prevPuntaje => prevPuntaje + 1);
    }

    const siguientePregunta = preguntaActual + 1;
    if (siguientePregunta < textoDetalle.preguntas.length) {
        setPreguntaActual(siguientePregunta);
    } else {
        setShowModal(true); // Muestra el modal en lugar de una alerta
        setQuizTerminado(true);
    }
};


    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/niveles')
    };

    if (!textoDetalle) {
        return <Container className="text-center py-5"><h2>Cargando texto...</h2></Container>;
      }

      return (
        <Container className="py-5">
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>{textoDetalle.texto.titulo}</Card.Title>
              <Card.Text>{textoDetalle.texto.contenido}</Card.Text>
            </Card.Body>
          </Card>
    
          {!quizTerminado ? (
            <Pregunta
              pregunta={textoDetalle.preguntas[preguntaActual].enunciado}
              opciones={textoDetalle.preguntas[preguntaActual].opciones.map(o => o.descripcion)}
              respuestaCorrecta={textoDetalle.preguntas[preguntaActual].opciones.find(o => o.correcta).descripcion}
              onRespuestaSeleccionada={handleRespuestaSeleccionada}
              resetear={preguntaActual}
            />
          ) : (
            <QuizModal
              show={showModal}
              onHide={handleCloseModal}
              puntaje={puntaje}
              totalPreguntas={textoDetalle.preguntas.length}
              preguntasYRespuestas={respuestasUsuario}
            />
          )}
        </Container>
      );
    };
    
    export default TextoDetalle;