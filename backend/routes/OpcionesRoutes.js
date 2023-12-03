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

module.exports = router;