import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal, Container, Row, Col, Card } from 'react-bootstrap';
import EditModal from './EditModal';

const AdminTextoEditar = () => {
    const { textoId } = useParams();
    const navigate = useNavigate();
    const [detalle, setDetalle] = useState({ texto: {}, preguntas: [] });
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    

    useEffect(() => {
        axios.get(`http://localhost:3001/textoDetalle/${textoId}`)
            .then(respuesta => {
                setDetalle(respuesta.data);
            })
            .catch(error => {
                console.error('Error al obtener los detalles del texto:', error);
            });
    }, [textoId]);

    const handleEdit = () => {
        setShowEditModal(true); // Muestra el modal de edición
    };

    const handleDelete = () => {
        setShowDeleteConfirmModal(true);
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:3001/textoDetalle/${textoId}`)
            .then(() => {
                alert('Texto eliminado con éxito.');
                navigate('/TextoList');
            })
            .catch(error => {
                console.error('Error al eliminar el texto:', error);
                alert('Ocurrió un error al intentar eliminar el texto.');
            });
    };

    if (!detalle.texto.idTexto) {
        return <div>Cargando...</div>;
    }

    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <Card>
                        <Card.Header as="h5">{detalle.texto.titulo}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {detalle.texto.contenido}
                            </Card.Text>
                            <Button variant="primary" onClick={handleEdit}><span role="img" aria-label='eliminar'>✏</span>Editar Texto</Button>{' '}
                            <Button variant="danger" onClick={handleDelete}><span role="img" aria-label='eliminar'>➖</span>Eliminar Texto</Button>{' '}
                            <Button variant="secondary" onClick={() => navigate('/TextoList')}>Volver a Títulos<span role="img" aria-label='volver'>↩</span></Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <EditModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                detalle={detalle}
            />

            <Modal show={showDeleteConfirmModal} onHide={() => setShowDeleteConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de que deseas eliminar este texto? Se borraran todas las preguntas y opciones relacionadas al texto</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteConfirmModal(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={confirmDelete}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AdminTextoEditar;