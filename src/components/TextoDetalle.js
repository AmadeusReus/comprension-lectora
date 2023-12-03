import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Pregunta from './Pregunta';
import QuizModal from './QuizModal';

const TextoDetalle = () => {
    let { textoId } = useParams();
    textoId = parseInt(textoId, 10);

    const [texto, setTexto] = useState(null);
    const [preguntas, setPreguntas] = useState([]);
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [puntaje, setPuntaje] = useState(0);
    const [quizTerminado, setQuizTerminado] = useState(false);
    const [respuestasUsuario, setRespuestasUsuario] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Cargar el texto
        axios.get(`http://localhost:3001/nivelesConTextos/${textoId}`)
            .then(respuesta => {
                setTexto(respuesta.data);
            })
            .catch(error => {
                console.error('Error al obtener el texto:', error);
            });

        // Cargar las preguntas para el texto
        axios.get(`http://localhost:3001/preguntas/${textoId}`)
            .then(respuesta => {
                setPreguntas(respuesta.data);
            })
            .catch(error => {
                console.error('Error al obtener las preguntas:', error);
            });
    }, [textoId]);
    
    const handleRespuestaSeleccionada = (respuestaDada, esCorrecta) => {
        setRespuestasUsuario(prevRespuestas => [
            ...prevRespuestas,
            {
                pregunta: texto.preguntas[preguntaActual].pregunta,
                respuestaDada,
                respuestaCorrecta: texto.preguntas[preguntaActual].respuestaCorrecta,
                esCorrecta
            }
        ]);

        if (esCorrecta) {
            setPuntaje(prevPuntaje => prevPuntaje + 1);
        }

        const siguientePregunta = preguntaActual + 1;
        if (siguientePregunta < texto.preguntas.length) {
            setPreguntaActual(siguientePregunta);
        } else {
            setShowModal(true); // Muestra el modal en lugar de una alerta
            setQuizTerminado(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // Aquí puedes redirigir al usuario o resetear el quiz
    };

    if (!texto) {
        return <div>Cargando...</div>; // O alguna otra indicación de carga
    }

    return (
        <div>
            <h2>{texto.titulo}</h2>
            {!quizTerminado && (
                <Pregunta
                    pregunta={texto.preguntas[preguntaActual].pregunta}
                    opciones={texto.preguntas[preguntaActual].opciones}
                    respuestaCorrecta={texto.preguntas[preguntaActual].respuestaCorrecta}
                    onRespuestaSeleccionada={handleRespuestaSeleccionada}
                />
            )}
            <QuizModal
                show={showModal}
                onHide={handleCloseModal}
                puntaje={puntaje}
                totalPreguntas={texto.preguntas.length}
                preguntasYRespuestas={respuestasUsuario}
            />
        </div>
    );
};

export default TextoDetalle;
