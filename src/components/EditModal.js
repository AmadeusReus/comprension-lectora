import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

// Objeto para mapear los ID de nivel a las cadenas correspondientes
const nivelLabels = {
    1: 'Básico',
    2: 'Intermedio',
    3: 'Avanzado',
  };

const EditModal = ({ show, onHide, detalle }) => {
    const [textoEditado, setTextoEditado] = useState({
        ...detalle.texto,
        // Convertimos el ID del nivel a su representación en cadena para el select
        nivel: nivelLabels[detalle.texto.IDnivel],
      });
    const [preguntasEditadas, setPreguntasEditadas] = useState(detalle.preguntas);
    const [alertModalContent, setAlertModalContent] = useState("");
    const [showAlertModal, setShowAlertModal] = useState(false);

    const handleChangeTexto = (e) => {
        setTextoEditado({ ...textoEditado, [e.target.name]: e.target.value });
    };

    // useEffect para actualizar el estado si detalle cambia
    useEffect(() => {
        setTextoEditado({
          ...detalle.texto,
          nivel: nivelLabels[detalle.texto.IDnivel],
        });
        setPreguntasEditadas(detalle.preguntas);
      }, [detalle]);

      const handleChangeNivel = (e) => {
        // Encuentra el ID del nivel basado en la etiqueta seleccionada
        const nivelID = Object.keys(nivelLabels).find(key => nivelLabels[key] === e.target.value);
        // Actualiza el estado con el ID del nivel, no con la etiqueta
        setTextoEditado({ ...textoEditado, IDnivel: nivelID });
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

    const handleRemoveQuestion = async (indexPregunta) => {
        if (preguntasEditadas.length > 1) {
            const preguntaAEliminar = preguntasEditadas[indexPregunta];
            if (preguntaAEliminar.idpregunta) {
                try {
                    await axios.delete(`http://localhost:3001/preguntas/${preguntaAEliminar.idpregunta}`);
                    const updatedPreguntas = preguntasEditadas.filter((_, idx) => idx !== indexPregunta);
                    setPreguntasEditadas(updatedPreguntas);
                    setAlertModalContent("Pregunta eliminada con éxito.");
                    setShowAlertModal(true);
                } catch (error) {
                    console.error('Error al eliminar la pregunta:', error);
                    setAlertModalContent("Error al eliminar la pregunta. Por favor, revisa la consola para más detalles.");
                    setShowAlertModal(true);
                }
            } else {
                const updatedPreguntas = preguntasEditadas.filter((_, idx) => idx !== indexPregunta);
                setPreguntasEditadas(updatedPreguntas);
            }
        } else {
            setAlertModalContent("No puedes eliminar la única pregunta existente.");
            setShowAlertModal(true);
        }
    };
    

    
    const handleRemoveOption = async (indexPregunta, indexOpcion) => {
        const opciones = preguntasEditadas[indexPregunta].opciones;
        if (opciones.length > 1) {
            const opcionAEliminar = opciones[indexOpcion];
            if (opcionAEliminar.idopciones) {
                try {
                    await axios.delete(`http://localhost:3001/opciones/${opcionAEliminar.idopciones}`);
                    const updatedOpciones = opciones.filter((_, idx) => idx !== indexOpcion);
                    const updatedPreguntas = [...preguntasEditadas];
                    updatedPreguntas[indexPregunta].opciones = updatedOpciones;
                    setPreguntasEditadas(updatedPreguntas);
                    setAlertModalContent("Opción eliminada con éxito.");
                    setShowAlertModal(true);
                } catch (error) {
                    console.error('Error al eliminar la opción:', error);
                    setAlertModalContent("Error al eliminar la opción. Por favor, revisa la consola para más detalles.");
                    setShowAlertModal(true);
                }
            } else {
                const updatedOpciones = opciones.filter((_, idx) => idx !== indexOpcion);
                const updatedPreguntas = [...preguntasEditadas];
                updatedPreguntas[indexPregunta].opciones = updatedOpciones;
                setPreguntasEditadas(updatedPreguntas);
            }
        } else {
            setAlertModalContent("Cada pregunta debe tener al menos una opción.");
            setShowAlertModal(true);
        }
    };
    


    const labelStyles = {
        fontWeight: 'bold',
        color: '#007bff',
        fontSize: '1em',
    };  

    const handleSaveChanges = async () => {
        // Validar título y contenido
    if (!textoEditado.titulo.trim() || !textoEditado.contenido.trim()) {
        setAlertModalContent("El título y el contenido son obligatorios.");
        setShowAlertModal(true);
        return;
    }

    // Validar nivel
    if (!textoEditado.IDnivel) {
        setAlertModalContent("Por favor, selecciona un nivel para el texto.");
        setShowAlertModal(true);
        return;
    }

    // Validar existencia de al menos una pregunta
    if (preguntasEditadas.length === 0) {
        setAlertModalContent("Debes agregar al menos una pregunta.");
        setShowAlertModal(true);
        return;
    }

    // Validar cada pregunta y sus opciones
    for (const pregunta of preguntasEditadas) {
        if (!pregunta.enunciado.trim()) {
            setAlertModalContent("Cada pregunta debe tener un enunciado.");
            setShowAlertModal(true);
            return;
        }
        if (pregunta.opciones.length === 0) {
            setAlertModalContent("Cada pregunta debe tener al menos una opción.");
            setShowAlertModal(true);
            return;
        }
        for (const opcion of pregunta.opciones) {
            if (!opcion.descripcion.trim()) {
                setAlertModalContent("Todas las opciones deben tener una descripción.");
                setShowAlertModal(true);
                return;
            }
        }
        if (!pregunta.opciones.some(opcion => opcion.correcta === 1)) {
            setAlertModalContent("Cada pregunta debe tener al menos una opción correcta.");
            setShowAlertModal(true);
            return;
        }
    }
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
    
            setAlertModalContent('Texto, preguntas y opciones actualizados con éxito.');
            setShowAlertModal(true);
        } catch (error) {
            console.error('Error al actualizar:', error);
            setAlertModalContent("Ocurrió un error al actualizar. Por favor, revisa la consola para más detalles.");
            setShowAlertModal(true);
        }
    };
    
    
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Editar Texto y Preguntas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <Form>
                        {/* Título */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2} style={labelStyles}>Título</Form.Label>
                            <Col sm={10}>
                                <Form.Control 
                                    type="text" 
                                    name="titulo" 
                                    value={textoEditado.titulo} 
                                    onChange={handleChangeTexto} 
                                />
                            </Col>
                        </Form.Group>
    
                        {/* Nivel */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2} style={labelStyles}>Nivel</Form.Label>
                            <Col sm={10}>
                                <Form.Control as="select" value={nivelLabels[textoEditado.IDnivel] || ''} onChange={handleChangeNivel}>
                                    {Object.entries(nivelLabels).map(([id, label]) => (
                                        <option key={id} value={label}>{label}</option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Form.Group>
    
                        {/* Contenido */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2} style={labelStyles}>Contenido</Form.Label>
                            <Col sm={10}>
                                <Form.Control 
                                    as="textarea" 
                                    rows={5} 
                                    name="contenido" 
                                    value={textoEditado.contenido} 
                                    onChange={handleChangeTexto} 
                                />
                            </Col>
                        </Form.Group>
    
                        {/* Preguntas y Opciones */}
                        {preguntasEditadas.map((pregunta, indexPregunta) => (
                            <div key={indexPregunta}>
                                <Form.Group as={Row} className="mb-3">
                                    <Col sm={8}>
                                        <Form.Label style={labelStyles}>Pregunta {indexPregunta + 1}</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="enunciado" 
                                            value={pregunta.enunciado} 
                                            onChange={(e) => handleChangePregunta(indexPregunta, e)} 
                                        />
                                    </Col>
                                    <Col sm={4} className="text-right">
                                        <Button variant="danger" size="sm" onClick={() => handleRemoveQuestion(indexPregunta)}>
                                            Eliminar Pregunta
                                        </Button>
                                    </Col>
                                </Form.Group>
    
                                {pregunta.opciones.map((opcion, indexOpcion) => (
                                    <Form.Group as={Row} key={indexOpcion} className="mb-3 align-items-center">
                                        <Col sm={7}>
                                            <Form.Label style={labelStyles}>Opción {indexOpcion + 1}</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="descripcion" 
                                                value={opcion.descripcion} 
                                                onChange={(e) => handleChangeOpcion(indexPregunta, indexOpcion, e)} 
                                            />
                                        </Col>
                                        <Col sm={3}>
                                            <Form.Check 
                                                type="radio" 
                                                label="Correcta" 
                                                checked={opcion.correcta === 1} 
                                                onChange={() => handleToggleCorrect(indexPregunta, indexOpcion)} 
                                            />
                                        </Col>
                                        <Col sm={2} className="text-right">
                                            <Button variant="danger" size="sm" onClick={() => handleRemoveOption(indexPregunta, indexOpcion)}>
                                                Eliminar Opción
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                ))}
                                <div className="text-right mb-3">
                                    <Button variant="primary" size="sm" onClick={() => handleAddOption(indexPregunta)}>
                                        Agregar Opción
                                    </Button>
                                </div>
                                <hr />
                            </div>
                        ))}
                        <div className="text-right">
                            <Button variant="primary" onClick={handleAddQuestion}>
                                Agregar Pregunta
                            </Button>
                        </div>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cerrar</Button>
                <Button variant="primary" onClick={() => handleSaveChanges(textoEditado, preguntasEditadas)}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
            <Modal show={showAlertModal} onHide={() => setShowAlertModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Alerta</Modal.Title>
                </Modal.Header>
                <Modal.Body>{alertModalContent}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAlertModal(false)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </Modal>
    );
    };
    
    export default EditModal;