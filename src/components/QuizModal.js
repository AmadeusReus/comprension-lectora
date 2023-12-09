import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const QuizModal = ({ show, onHide, puntaje, totalPreguntas, preguntasYRespuestas }) => {
  let navigate = useNavigate();

  const obtenerMensajeRetroalimentacion = (porcentaje) => {
    if (porcentaje === 1) {
      return "¡Excelente trabajo! ¡Has acertado todas las preguntas!";
    } else if (porcentaje > 0.75) {
      return "¡Muy bien! Tienes una comprensión sólida del material.";
    } else if (porcentaje > 0.5) {
      return "Buen esfuerzo, pero hay espacio para mejorar.";
    } else if (porcentaje > 0.25) {
      return "Sigue practicando y lo harás mejor la próxima vez.";
    } else {
      return "Parece que necesitas revisar el contenido otra vez. ¡No te desanimes!";
    }
  };

  const porcentajeCorrecto = puntaje / totalPreguntas;
  const mensajeRetroalimentacion = obtenerMensajeRetroalimentacion(porcentajeCorrecto);

  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Resumen del Quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Tu puntaje final es: {puntaje} de {totalPreguntas}</h4>
        <p>{mensajeRetroalimentacion}</p>
        <dl>
          {preguntasYRespuestas.map((item, index) => (
            <React.Fragment key={index}>
              <dt>{`Pregunta ${index + 1}: ${item.pregunta}`}</dt>
              <dd>Tu respuesta: {item.respuestaDada} {item.esCorrecta ? '✅' : '❌'}</dd>
              {!item.esCorrecta && <dd>Respuesta correcta: {item.respuestaCorrecta}</dd>}
            </React.Fragment>
          ))}
        </dl>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ () => navigate('/niveles')}>Volver a Niveles</Button>
        {/* <Button variant="primary" onClick={ () => navigate(-1)}>Intentar de nuevo</Button>*/}
      </Modal.Footer>
    </Modal>
  );
};

export default QuizModal;