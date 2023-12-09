import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import EditModal from './EditModal';

const AdminTextoEditar = () => {
    const { textoId } = useParams();
    const navigate = useNavigate();
    const [detalle, setDetalle] = useState({ texto: {}, preguntas: [] });
    const [showEditModal, setShowEditModal] = useState(false); // Estado para controlar la visibilidad del modal de edición
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
        <div>
            <h2>{detalle.texto.titulo}</h2>
            <p>{detalle.texto.contenido}</p>
            <Button variant="primary" onClick={handleEdit}>Editar Texto</Button>
            <Button variant="danger" onClick={handleDelete}>Eliminar Texto</Button>
            <Button variant="secondary" onClick={() => navigate('/TextoList')}>Volver a Títulos</Button>

             {/* Modal para editar el texto */}
            <EditModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                detalle={detalle}
            />

            {/* Modal de Confirmación de Eliminación */}
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
        </div>
    );
};

export default AdminTextoEditar;






