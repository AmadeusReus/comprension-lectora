const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener opciones para una pregunta específica
router.get('/:idPregunta', (req, res) => {
    const { idPregunta } = req.params;

    db.query('SELECT * FROM opciones WHERE IDpregunta = ?', [idPregunta], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        console.log(results);
        res.status(200).json(results);
    });
});

router.post('/:idPregunta', (req, res) => {
    const { idPregunta } = req.params;
    const {descripcion} = req.body;
    const {correcta} = req.body;

    const query = 'INSERT INTO opciones (IDpregunta, descripcion, correcta) VALUES (?,?,?)';

    db.query(query, [idPregunta, descripcion, correcta], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Opciones creadas con éxito' });
    });
});

router.put('/:idopciones', (req, res) => {
    const { idopciones } = req.params; 
    const { descripcion, correcta } = req.body;

    const query = 'UPDATE opciones SET descripcion = ?, correcta = ? WHERE idopciones = ?';
    db.query(query, [descripcion, correcta, idopciones], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar la opción: ' + err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No se encontró la opción con el id proporcionado' });
        }
        res.status(200).json({ message: 'Opción actualizada con éxito' });
    });
});


router.delete('/:idPregunta', (req, res) => {
    const { idPregunta } = req.params;
    
    db.query('DELETE FROM opciones WHERE idPregunta = ?', [idPregunta], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar la opción: ' + err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No se encontró la opción con el id proporcionado' });
        }
        res.status(200).json({ message: 'Opción eliminada con éxito' });
    });
});

module.exports = router;

//esta ruta la usamos para obtener datos para agregar, editar o borrar las opciones en los componentes