import React, { useState, useEffect } from 'react';
import { Table, Button, InputGroup, FormControl, Pagination } from 'react-bootstrap';
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

  const fetchTextos = () => {
    axios.get('http://localhost:3001/nivelesConTextos')
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
    axios.get('http://localhost:3001/nivelesConTextos')
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

  return (
    <>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Buscar textos... 🔎"
          onChange={handleSearchChange}
        />
        <Button variant="outline-secondary" id="button-addon2">
          Buscar
        </Button>
      </InputGroup>
      <Table striped bordered hover>
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
              <td onClick={() => handleTitleClick(texto.idTexto)} style={{ cursor: 'pointer' }}>{texto.titulo}</td>
              <td>{texto.descripcionNivel}</td>
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
      <div className="d-flex justify-content-center mt-4">
        <Button variant="success" onClick={() => setShowAddModal(true)}>Crear Nuevo</Button>
      </div>

      <AddTextoModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onTextAdded={fetchTextos}
      />
    </>
  );
};

export default TextosList;


