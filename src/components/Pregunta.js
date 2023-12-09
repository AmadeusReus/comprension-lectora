import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const Pregunta = ({ pregunta, opciones, respuestaCorrecta, onRespuestaSeleccionada, resetear }) => {
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState('');
  const [mostrarRetroalimentacion, setMostrarRetroalimentacion] = useState(false);
  const [esRespuestaCorrecta, setEsRespuestaCorrecta] = useState(false);

  useEffect(() => {
    // Limpia el estado cuando se resetea la pregunta
    setRespuestaSeleccionada('');
    setMostrarRetroalimentacion(false);
    setEsRespuestaCorrecta(false);
  }, [resetear]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const esCorrecta = respuestaSeleccionada === respuestaCorrecta;
    setEsRespuestaCorrecta(esCorrecta);
    onRespuestaSeleccionada(respuestaSeleccionada, esCorrecta);
    setMostrarRetroalimentacion(true);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>{pregunta}</h3>
      {opciones.map((opcion, index) => (
        <Form.Check
          type="radio"
          label={opcion}
          name="respuesta"
          value={opcion}
          id={`respuesta-${index}`}
          checked={respuestaSeleccionada === opcion}
          onChange={(e) => setRespuestaSeleccionada(e.target.value)}
          disabled={mostrarRetroalimentacion}
          key={index}
        />
      ))}
      <Button type="submit" disabled={!respuestaSeleccionada || mostrarRetroalimentacion}>Confirmar respuesta</Button>
      {mostrarRetroalimentacion && (
        <Alert variant={esRespuestaCorrecta ? 'success' : 'danger'}>
          {esRespuestaCorrecta ? 'Correcto!' : 'Incorrecto!'}
        </Alert>
      )}
    </Form>
  );
};

export default Pregunta;