// src/components/Pregunta.js
import React, { useState } from 'react';

const Pregunta = ({ pregunta, opciones, respuestaCorrecta, onRespuestaSeleccionada }) => {
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState('');
  const [mostrarRetroalimentacion, setMostrarRetroalimentacion] = useState(false);
  const [esRespuestaCorrecta, setEsRespuestaCorrecta] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const esCorrecta = respuestaSeleccionada === respuestaCorrecta;
    setEsRespuestaCorrecta(esCorrecta);
    onRespuestaSeleccionada(esCorrecta);
    setMostrarRetroalimentacion(true); // Mostrar retroalimentación después de enviar respuesta
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>{pregunta}</h3>
        {opciones.map((opcion, index) => (
          <label key={index}>
            <input
              type="radio"
              value={opcion}
              name="respuesta"
              checked={respuestaSeleccionada === opcion}
              onChange={(e) => setRespuestaSeleccionada(e.target.value)}
              disabled={mostrarRetroalimentacion} // Deshabilitar después de enviar
            />
            {opcion}
          </label>
        ))}
        <button type="submit" disabled={mostrarRetroalimentacion}>Confirmar respuesta</button>
      </form>
      {mostrarRetroalimentacion && (
        <div className={esRespuestaCorrecta ? 'correcta' : 'incorrecta'}>
          {esRespuestaCorrecta ? 'Correcto!' : 'Incorrecto!'}
        </div>
      )}
    </div>
  );
};

export default Pregunta;
