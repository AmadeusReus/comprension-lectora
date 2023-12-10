import React, { useState } from 'react';
import { Modal, Button, Form, FormGroup, FormLabel, FormControl, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const AddTextoModal = ({ show, onHide, onTextAdded }) => {

    const [showAlertModal, setShowAlertModal] = useState(false);
    const [alertModalContent, setAlertModalContent] = useState("");
    const apiBaseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://warm-depths-43892-d980a21423f1.herokuapp.com';
    const [nuevoTexto, setNuevoTexto] = useState({
        titulo: '',
        contenido: '',
        autor: '',
        fechaPublicacion: '',
        IDnivel: ''
    });
    
    const [preguntasNuevas, setPreguntasNuevas] = useState([]);

    const handleChangeTexto = (e) => {
        const { name, value } = e.target;
        setNuevoTexto({ ...nuevoTexto, [name]: value });
    };

    const handleAddQuestion = () => {
        setPreguntasNuevas([...preguntasNuevas, { enunciado: '', opciones: [{ descripcion: '', correcta: 0 }] }]);
    };

    const handleChangePregunta = (indexPregunta, e) => {
        const nuevasPreguntas = [...preguntasNuevas];
        nuevasPreguntas[indexPregunta].enunciado = e.target.value;
        setPreguntasNuevas(nuevasPreguntas);
    };

    const handleAddOption = (indexPregunta) => {
        const nuevasPreguntas = [...preguntasNuevas];
        nuevasPreguntas[indexPregunta].opciones.push({ descripcion: '', correcta: 0 });
        setPreguntasNuevas(nuevasPreguntas);
    };

    const handleChangeOpcion = (indexPregunta, indexOpcion, e) => {
        const nuevasPreguntas = [...preguntasNuevas];
        nuevasPreguntas[indexPregunta].opciones[indexOpcion].descripcion = e.target.value;
        setPreguntasNuevas(nuevasPreguntas);
    };

    const handleToggleCorrect = (indexPregunta, indexOpcion) => {
        const nuevasPreguntas = [...preguntasNuevas];
        nuevasPreguntas[indexPregunta].opciones.forEach((opcion, idx) => {
            opcion.correcta = idx === indexOpcion ? 1 : 0;
        });
        setPreguntasNuevas(nuevasPreguntas);
    };

    const handleShowAlertModal = (message) => {
        setAlertModalContent(message);
        setShowAlertModal(true);
    };

    const handleCloseAlertModal = () => {
        setShowAlertModal(false);
        if (alertModalContent.includes('éxito')) {
            onHide();
            onTextAdded(); // Redirige al usuario a TextosList
        }
    };

    const labelStyles = {
        fontWeight: 'bold',
        color: '#007bff',
        fontSize: '1em',
    };  

    const handleSubmit = async () => {
        // Validar que se llenen todos los campos requeridos antes de enviar
        if (!nuevoTexto.titulo || !nuevoTexto.contenido || preguntasNuevas.some(p => p.enunciado === '' || p.opciones.some(o => o.descripcion === ''))) {
            handleShowAlertModal('✋🧐 Por favor, completa todos los campos requeridos antes de guardar.');
            return;
        }
        if (!nuevoTexto.IDnivel) {
            handleShowAlertModal('⚠️ Por favor, selecciona un nivel para el texto.');
            return;
        }
        if (preguntasNuevas.length === 0) {
            handleShowAlertModal('👀 Debes agregar al menos una pregunta.');
            return;
        }
        // Validar preguntas y opciones
        for (const pregunta of preguntasNuevas) {
            if (!pregunta.enunciado.trim()) {
                handleShowAlertModal('😬 Cada pregunta debe tener un enunciado.');
                return;
            }
            if (pregunta.opciones.length === 0 || pregunta.opciones.some(opcion => opcion.descripcion.trim() === '')) {
                handleShowAlertModal('😑 Cada pregunta debe tener al menos una opción y todas las opciones deben tener descripciones.');
                return;
            }
            if (!pregunta.opciones.some(opcion => opcion.correcta === 1)) {
                handleShowAlertModal('😐 Cada pregunta debe tener al menos una opción correcta, marca la correcta para poder continuar.');
                return;
            }
        }

        try {
            // Primero, enviar el nuevo texto al servidor
            const responseTexto = await axios.post('${apiBaseUrl}/textoDetalle', nuevoTexto);
            const idTexto = responseTexto.data.idTexto;

            // Luego, para cada pregunta, enviarla al servidor y crear las opciones asociadas
            for (const pregunta of preguntasNuevas) {
                const responsePregunta = await axios.post(`${apiBaseUrl}/preguntas/${idTexto}`, {
                    enunciado: pregunta.enunciado,
                    IDtexto: idTexto 
                });
                const idPregunta = responsePregunta.data.idPregunta;

                // Para cada opción en la pregunta actual, enviarla al servidor
                for (const opcion of pregunta.opciones) {
                    await axios.post(`${apiBaseUrl}/opciones/${idPregunta}`, {
                        descripcion: opcion.descripcion,
                        correcta: opcion.correcta,
                        IDpregunta: idPregunta 
                    });
                }
            }

            handleShowAlertModal('Texto, preguntas y opciones creadas con éxito. 👍✅');
            //onHide(); // Cierra el modal
        } catch (error) {
            console.error('Error:', error);
            handleShowAlertModal('🤨 Error al agregar el texto, las preguntas y las opciones. Por favor, revisa la consola para más detalles.');
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Agregar Nuevo Texto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Campo de Título */}
                    <FormGroup className="mb-3">
                        <FormLabel style={labelStyles}>Título</FormLabel>
                        <FormControl type="text" name="titulo" value={nuevoTexto.titulo} onChange={handleChangeTexto} />
                    </FormGroup>
                    
                    {/* Campo de Nivel */}
                    <FormGroup className="mb-3">
                        <FormLabel style={labelStyles}>Nivel</FormLabel>
                        <FormControl
                            as="select"
                            name="IDnivel"
                            value={nuevoTexto.IDnivel}
                            onChange={(e) => setNuevoTexto({ ...nuevoTexto, IDnivel: e.target.value })}
                        >
                            <option value="">Selecciona un nivel</option>
                            <option value="1">Básico</option>
                            <option value="2">Intermedio</option>
                            <option value="3">Avanzado</option>
                        </FormControl>
                    </FormGroup>

                    {/* Campo de Contenido */}
                    <FormGroup className="mb-3">
                        <FormLabel style={labelStyles}>Contenido</FormLabel>
                        <FormControl as="textarea" rows={5} name="contenido" value={nuevoTexto.contenido} onChange={handleChangeTexto} />
                    </FormGroup>

                    {/* Preguntas y Opciones */}
                    {preguntasNuevas.map((pregunta, indexPregunta) => (
                        <Row key={indexPregunta} className="mb-3">
                            <Col>
                                <FormGroup>
                                    <FormLabel style={labelStyles}>Pregunta {indexPregunta + 1}</FormLabel>
                                    <FormControl type="text" value={pregunta.enunciado} onChange={(e) => handleChangePregunta(indexPregunta, e)} />
                                </FormGroup>
                                {pregunta.opciones.map((opcion, indexOpcion) => (
                                    <FormGroup key={indexOpcion} className="ms-4">
                                        <FormLabel style={labelStyles}>Opción {indexOpcion + 1}</FormLabel>
                                        <FormControl type="text" value={opcion.descripcion} onChange={(e) => handleChangeOpcion(indexPregunta, indexOpcion, e)} />
                                        <Form.Check 
                                            type="radio"
                                            label="Correcta"
                                            checked={opcion.correcta === 1}
                                            onChange={() => handleToggleCorrect(indexPregunta, indexOpcion)}
                                        />
                                    </FormGroup>
                                ))}
                                <Button variant="primary" onClick={() => handleAddOption(indexPregunta)}>Agregar Opción</Button>
                            </Col>
                        </Row>
                    ))}
                    <Button variant="secondary" onClick={handleAddQuestion}>Agregar Pregunta</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cerrar</Button>
                <Button variant="primary" onClick={handleSubmit}>Guardar Todo</Button>
            </Modal.Footer>
            {/* Modal de Alerta */}
            <Modal show={showAlertModal} onHide={() => setShowAlertModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Alerta</Modal.Title>
              </Modal.Header>
              <Modal.Body>{alertModalContent}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseAlertModal()}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
        </Modal>

        
    );
};

export default AddTextoModal;