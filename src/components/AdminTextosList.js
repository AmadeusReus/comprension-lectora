import React, { useState, useEffect } from 'react';
import { Table, Button, InputGroup, FormControl, Pagination, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddTextoModal from './AddTextoModal';

const TextosList = () => {
  const [textos, setTextos] = useState([]);
  const [filteredTextos, setFilteredTextos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [textosPerPage] = useState(5);
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  const apiBaseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://warm-depths-43892-d980a21423f1.herokuapp.com';

    const fetchTextos = () => {
      axios.get(`${apiBaseUrl}/nivelesConTextos`)
        .then(response => {
          setTextos(response.data);
        })
        .catch(error => {
          console.error('Error al obtener los textos:', error);
        });
    }

  useEffect(() => {
    fetchTextos();
  }, []);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/nivelesConTextos`)
      .then(response => {
        setTextos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los textos:', error);
      });
  }, []);

  useEffect(() => {
    const results = textos.filter(texto =>
      texto.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCurrentPage(1);
    setFilteredTextos(results);
  }, [searchTerm, textos]);

  const indexOfLastTexto = currentPage * textosPerPage;
  const indexOfFirstTexto = indexOfLastTexto - textosPerPage;
  const currentTextos = filteredTextos.slice(indexOfFirstTexto, indexOfLastTexto);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredTextos.length / textosPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTitleClick = (id) => {
    navigate(`/TextoEdit/${id}`);
  };

  const titleStyles = {
    fontWeight: 'bold', // Letra en negrita
    color: 'black',   // Color azul 
    fontSize: '1.2em',  // Tamaño de letra ligeramente más grande
  };
  
  const cellTitleStyles = {
    fontWeight: 'bold', // Letra en negrita
    color: '#007bff',   // Color azul (puedes elegir el color que prefieras)
  };

  const cellDescriptionStyles = {
    fontStyle: 'italic', // Letra en cursiva
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card>
            <Card.Header as="h5" style={titleStyles}>Lista de Textos</Card.Header>
            <Card.Body>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Buscar textos...🔎"
                  onChange={handleSearchChange}
                />
                <Button variant="outline-secondary">Buscar</Button>
              </InputGroup>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Título</th>
            <th>Nivel</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentTextos.map((texto) => (
            <tr key={texto.idTexto}>
              <td onClick={() => handleTitleClick(texto.idTexto)} style={{ ...cellTitleStyles, cursor: 'pointer' }}>{texto.titulo}</td>
              <td style={cellDescriptionStyles}>{texto.descripcionNivel}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleTitleClick(texto.idTexto)}>Ver</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-center">
        {pageNumbers.map(number => (
          <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
      <div className="d-flex justify-content-end mt-4">
                <Button variant="success" onClick={() => setShowAddModal(true)}>
                <span role="img" aria-label="suma">➕</span> Crear Nuevo Texto
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <AddTextoModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onTextAdded={fetchTextos}
      />
    </Container>
  );
};

export default TextosList;


