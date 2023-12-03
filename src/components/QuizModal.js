import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const QuizModal = ({ show, onHide, puntaje, totalPreguntas, preguntasYRespuestas }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Resumen del Quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Tu puntaje final es: {puntaje} de {totalPreguntas}</h4>
        <p>Revisemos cómo te fue en cada pregunta:</p>
        <ul>
          {preguntasYRespuestas.map((item, index) => (
            <li key={index}>
              <p>Pregunta: {item.pregunta}</p>
              <p>Tu respuesta: {item.respuestaDada} {item.esCorrecta ? '✅' : '❌'}</p>
              {item.esCorrecta ? null : <p>Respuesta correcta: {item.respuestaCorrecta}</p>}
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuizModal;