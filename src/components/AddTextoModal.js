import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddTextoModal = ({ show, onHide }) => {
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

    const handleSubmit = async () => {
        // Validar que se llenen todos los campos requeridos antes de enviar
        if (!nuevoTexto.titulo || !nuevoTexto.contenido || preguntasNuevas.some(p => p.enunciado === '' || p.opciones.some(o => o.descripcion === ''))) {
            alert('Por favor, completa todos los campos requeridos antes de guardar.');
            return;
        }

        // Validar preguntas y opciones
        for (const pregunta of preguntasNuevas) {
            if (!pregunta.enunciado.trim()) {
                alert('Cada pregunta debe tener un enunciado.');
                return;
            }
            if (pregunta.opciones.length === 0 || pregunta.opciones.some(opcion => opcion.descripcion.trim() === '')) {
                alert('Cada pregunta debe tener al menos una opción y todas las opciones deben tener descripciones.');
                return;
            }
            if (!pregunta.opciones.some(opcion => opcion.correcta === 1)) {
                alert('Cada pregunta debe tener al menos una opción correcta, marca la correcta para poder continuar.');
                return;
            }
        }

        try {
            // Primero, enviar el nuevo texto al servidor
            const responseTexto = await axios.post('http://localhost:3001/textoDetalle', nuevoTexto);
            const idTexto = responseTexto.data.idTexto;

            // Luego, para cada pregunta, enviarla al servidor y crear las opciones asociadas
            for (const pregunta of preguntasNuevas) {
                const responsePregunta = await axios.post(`http://localhost:3001/preguntas/${idTexto}`, {
                    enunciado: pregunta.enunciado,
                    IDtexto: idTexto 
                });
                const idPregunta = responsePregunta.data.idPregunta;

                // Para cada opción en la pregunta actual, enviarla al servidor
                for (const opcion of pregunta.opciones) {
                    await axios.post(`http://localhost:3001/opciones/${idPregunta}`, {
                        descripcion: opcion.descripcion,
                        correcta: opcion.correcta,
                        IDpregunta: idPregunta 
                    });
                }
            }

            alert('Texto, preguntas y opciones creadas con éxito.');
            onHide(); // Cierra el modal
        } catch (error) {
            console.error('Error:', error);
            alert('Error al agregar el texto, las preguntas y las opciones. Por favor, revisa la consola para más detalles.');
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Nuevo Texto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Campos para el nuevo texto */}
                    {/* ... */}
                    <Form.Group className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" name="titulo" value={nuevoTexto.titulo} onChange={handleChangeTexto} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nivel</Form.Label>
                        <Form.Control
                            as="select"
                            name="IDnivel"
                            value={nuevoTexto.IDnivel}
                            onChange={(e) => setNuevoTexto({ ...nuevoTexto, IDnivel: e.target.value })}
                        >
                            <option value="">Selecciona un nivel</option>
                            <option value="1">Básico</option>
                            <option value="2">Intermedio</option>
                            <option value="3">Avanzado</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Contenido</Form.Label>
                        <Form.Control as="textarea" rows={15} name="contenido" value={nuevoTexto.contenido} onChange={handleChangeTexto} />
                    </Form.Group>
                    {/* Otros campos para el texto como 'autor', 'fechaPublicacion', etc. */}

                    {/* Campos para agregar preguntas y opciones */}
                    {preguntasNuevas.map((pregunta, indexPregunta) => (
                        <div key={indexPregunta}>
                            <Form.Group className="mb-3">
                                <Form.Label>Pregunta {indexPregunta + 1}</Form.Label>
                                <Form.Control type="text" value={pregunta.enunciado} onChange={(e) => handleChangePregunta(indexPregunta, e)} />
                            </Form.Group>
                            {pregunta.opciones.map((opcion, indexOpcion) => (
                                <Form.Group key={indexOpcion} className="mb-3">
                                    <Form.Label>Opción {indexOpcion + 1}</Form.Label>
                                    <Form.Control type="text" value={opcion.descripcion} onChange={(e) => handleChangeOpcion(indexPregunta, indexOpcion, e)} />
                                    <Form.Check 
                                        type="radio"
                                        label="Correcta"
                                        checked={opcion.correcta === 1}
                                        onChange={() => handleToggleCorrect(indexPregunta, indexOpcion)}
                                    />
                                </Form.Group>
                            ))}
                            <Button variant="primary" onClick={() => handleAddOption(indexPregunta)}>Agregar Opción</Button>
                        </div>
                    ))}
                    <Button variant="primary" onClick={handleAddQuestion}>Agregar Pregunta</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cerrar</Button>
                <Button variant="primary" onClick={handleSubmit}>Guardar Todo</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddTextoModal;


