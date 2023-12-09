import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Sobre = () => {
  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
      <Row>
        <Col md={12} className="text-center">
          <h1 className="mb-4">Página de Sobre</h1>
          <p className="lead">Hecho por S Herrera</p>
          {/* Contenido adicional aquí si es necesario */}
        </Col>
      </Row>
    </Container>
  );
};

export default Sobre;