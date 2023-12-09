import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditModal = ({ show, onHide, detalle }) => {
    const [textoEditado, setTextoEditado] = useState(detalle.texto);
    const [preguntasEditadas, setPreguntasEditadas] = useState(detalle.preguntas);

    const handleChangeTexto = (e) => {
        setTextoEditado({ ...textoEditado, [e.target.name]: e.target.value });
    };

    const handleChangeNivel = (e) => {
        setTextoEditado({ ...textoEditado, nivel: e.target.value });
    };

    const handleChangePregunta = (indexPregunta, e) => {
        const updatedPreguntas = [...preguntasEditadas];
        updatedPreguntas[indexPregunta] = { ...updatedPreguntas[indexPregunta], [e.target.name]: e.target.value };
        setPreguntasEditadas(updatedPreguntas);
    };

    const handleChangeOpcion = (indexPregunta, indexOpcion, e) => {
        const updatedPreguntas = [...preguntasEditadas];
        updatedPreguntas[indexPregunta].opciones[indexOpcion] = { ...updatedPreguntas[indexPregunta].opciones[indexOpcion], [e.target.name]: e.target.value };
        setPreguntasEditadas(updatedPreguntas);
    };

    const handleAddOption = (indexPregunta) => {
        const updatedPreguntas = [...preguntasEditadas];
        updatedPreguntas[indexPregunta].opciones.push({ descripcion: '', correcta: 0 });
        setPreguntasEditadas(updatedPreguntas);
    };

    const handleToggleCorrect = (indexPregunta, indexOpcion) => {
        const updatedPreguntas = [...preguntasEditadas];
        updatedPreguntas[indexPregunta].opciones = updatedPreguntas[indexPregunta].opciones.map((opcion, idx) => {
            return idx === indexOpcion ? { ...opcion, correcta: 1 } : { ...opcion, correcta: 0 };
        });
        setPreguntasEditadas(updatedPreguntas);
    };

    const handleAddQuestion = () => {
        setPreguntasEditadas([...preguntasEditadas, { enunciado: '', opciones: [] }]);
    };

    const handleRemoveQuestion = (indexPregunta) => {
        setPreguntasEditadas(preguntasEditadas.filter((_, idx) => idx !== indexPregunta));
    };

    const handleRemoveOption = (indexPregunta, indexOpcion) => {
        const updatedPreguntas = [...preguntasEditadas];
        updatedPreguntas[indexPregunta].opciones = updatedPreguntas[indexPregunta].opciones.filter((_, idx) => idx !== indexOpcion);
        setPreguntasEditadas(updatedPreguntas);
    };

    const isFormValid = () => {
        // Validar título y contenido
        if (!textoEditado.titulo.trim() || !textoEditado.contenido.trim()) {
            alert("El título y el contenido son obligatorios.");
            return false;
        }
    
        // Validar cada pregunta y sus opciones
        for (const pregunta of preguntasEditadas) {
            if (!pregunta.enunciado.trim()) {
                alert("Todas las preguntas deben tener un enunciado.");
                return false;
            }
            if (pregunta.opciones.length === 0 || pregunta.opciones.some(op => !op.descripcion.trim())) {
                alert("Todas las preguntas deben tener al menos una opción y todas las opciones deben tener una descripción.");
                return false;
            }
            if (pregunta.opciones.every(op => op.correcta === 0)) {
                alert("Cada pregunta debe tener al menos una opción correcta.");
                return false;
            }
        }
    
        return true;
    };

    const handleSaveChanges = async () => {
        if (!isFormValid()) return;
        try {
            // Actualizar el texto
            await axios.put(`http://localhost:3001/textoDetalle/${textoEditado.idTexto}`, textoEditado);
    
            // Actualizar, crear o eliminar preguntas y opciones
            for (let pregunta of preguntasEditadas) {
                if (pregunta.idpregunta) {
                    // Actualizar pregunta existente
                    await axios.put(`http://localhost:3001/preguntas/${pregunta.idpregunta}`, pregunta);
    
                    for (let opcion of pregunta.opciones) {
                        if (opcion.idopciones) {
                            // Actualizar o eliminar opción existente
                            if (opcion.isDeleted) {
                                await axios.delete(`http://localhost:3001/opciones/${opcion.idopciones}`);
                            } else {
                                await axios.put(`http://localhost:3001/opciones/${opcion.idopciones}`, opcion);
                            }
                        } else {
                            // Crear nueva opción
                            await axios.post(`http://localhost:3001/opciones/${pregunta.idpregunta}`, opcion);
                        }
                    }
                } else {
                    // Crear nueva pregunta y sus opciones
                    let response = await axios.post(`http://localhost:3001/preguntas/${textoEditado.idTexto}`, pregunta);
                    let idPregunta = response.data.idPregunta;
    
                    for (let opcion of pregunta.opciones) {
                        await axios.post(`http://localhost:3001/opciones/${idPregunta}`, opcion);
                    }
                }
            }
    
            alert('Texto, preguntas y opciones actualizados con éxito.');
            onHide();
        } catch (error) {
            console.error('Error al actualizar:', error);
            alert('Ocurrió un error al actualizar. Por favor, revisa la consola para más detalles.');
        }
    };
    
    
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Editar Texto y Preguntas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Formulario para editar texto */}
                    <Form.Group className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" name="titulo" value={textoEditado.titulo} onChange={handleChangeTexto} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nivel</Form.Label>
                        <Form.Control as="select" value={textoEditado.nivel} onChange={handleChangeNivel}>
                            <option value="Básico">Básico</option>
                            <option value="Intermedio">Intermedio</option>
                            <option value="Avanzado">Avanzado</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Contenido</Form.Label>
                        <Form.Control as="textarea" rows={5} name="contenido" value={textoEditado.contenido} onChange={handleChangeTexto} />
                    </Form.Group>

                    {preguntasEditadas.map((pregunta, indexPregunta) => (
                        <div key={indexPregunta}>
                            <Form.Group className="mb-3">
                                <Form.Label>Pregunta {indexPregunta + 1}</Form.Label>
                                <Button variant="danger" size="sm" onClick={() => handleRemoveQuestion(indexPregunta)}>
                                        Eliminar Pregunta
                                    </Button>
                                <Form.Control 
                                    type="text" 
                                    name="enunciado"
                                    value={pregunta.enunciado}
                                    onChange={(e) => handleChangePregunta(indexPregunta, e)}
                                />
                            </Form.Group>
                            {pregunta.opciones.map((opcion, indexOpcion) => (
                                <Form.Group key={indexOpcion} className="mb-3">
                                    <Form.Label>Opción {indexOpcion + 1}</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="descripcion"
                                        value={opcion.descripcion}
                                        onChange={(e) => handleChangeOpcion(indexPregunta, indexOpcion, e)}
                                    />
                                    <Form.Check 
                                        type="radio"
                                        name={`correctOption-${indexPregunta}`}
                                        checked={opcion.correcta === 1}
                                        onChange={() => handleToggleCorrect(indexPregunta, indexOpcion)}
                                        label="Correcta"
                                    />
                                    <Button variant="danger" size="sm" onClick={() => handleRemoveOption(indexPregunta, indexOpcion)}>
                                        Eliminar Opción
                                    </Button>
                                </Form.Group>
                            ))}
                            <Button variant="primary" size="sm" onClick={() => handleAddOption(indexPregunta)}>
                                Agregar Opción
                            </Button>
                            <hr />
                        </div>
                    ))}
                    <Button variant="primary" onClick={handleAddQuestion}>
                        Agregar Pregunta
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cerrar</Button>
                <Button variant="primary" onClick={() => handleSaveChanges(textoEditado, preguntasEditadas)} disabled={!isFormValid()}>Guardar Cambios</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;
