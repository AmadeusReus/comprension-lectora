const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener preguntas para un texto específico
router.get('/:idTexto', (req, res) => {
    const { idTexto } = req.params;

    db.query('SELECT * FROM pregunta WHERE IDtexto = ? ', [idTexto], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

//Crear preguntas para un texto específico
router.post('/:idTexto', (req, res) => {
    const { idTexto } = req.params;
    const { enunciado } = req.body;

    const query = 'INSERT INTO pregunta (IDtexto, enunciado) VALUES (?, ?)';
    db.query(query, [idTexto, enunciado], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Pregunta creada con éxito', idPregunta: result.insertId });
    });
});

//actualizar  las preguntas
// Actualizar una pregunta específica
router.put('/:idpregunta', (req, res) => {
    const { idpregunta } = req.params;
    const { enunciado } = req.body;

    const query = 'UPDATE pregunta SET enunciado = ? WHERE idpregunta = ?';
    db.query(query, [enunciado, idpregunta], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar la pregunta: ' + err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No se encontró la pregunta con el id proporcionado' });
        }
        res.status(200).json({ message: 'Pregunta actualizada con éxito' });
    });
});

// Eliminar una pregunta específica
router.delete('/:idpregunta', (req, res) => {
    const { idpregunta } = req.params;
    
    db.query('DELETE FROM pregunta WHERE idpregunta = ?', [idpregunta], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar la pregunta: ' + err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No se encontró la pregunta con el id proporcionado' });
        }
        res.status(200).json({ message: 'Pregunta eliminada con éxito' });
    });
});

module.exports = router;