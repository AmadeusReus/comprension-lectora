import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const adminUser = 'admin';
    const adminPass = 'admin';

    if (username === adminUser && password === adminPass) {
      setModalContent('Inicio de sesión exitoso');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        localStorage.setItem('isAdmin', 'true');
        navigate('/AdminTextList');
      }, 1500); // Cierra el modal y redirige después de 1.5 segundos
    } else {
      setModalContent('Credenciales incorrectas');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        setUsername('');
        setPassword('');
      }, 1500); // Cierra el modal después de 1.5 segundos
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <Container fluid style={{
      height: '100vh',
      backgroundImage: 'url("https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }} className="d-flex align-items-center justify-content-center">
      <Row>
        <Col md={12} className="bg-white p-5 rounded">
          <Form onSubmit={handleLogin}> {/* Aquí utilizamos onSubmit en lugar de onClick en el botón */}
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingresa tu usuario" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                onKeyPress={handleKeyPress} // Escuchar tecla Enter
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Ingresa tu contraseña" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                onKeyPress={handleKeyPress} // Escuchar tecla Enter
              />
            </Form.Group>

            <Button variant="primary" type="submit">Iniciar sesión</Button> {/* Cambiar onClick por type="submit" */}
          </Form>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alerta</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
      </Modal>
    </Container>
  );
};

export default Login;