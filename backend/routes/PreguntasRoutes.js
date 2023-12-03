const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener preguntas para un texto específico
router.get('/:idTexto', (req, res) => {
    const { idTexto } = req.params;

    db.query('SELECT * FROM pregunta WHERE IDtexto = ?', [idTexto], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

module.exports = router;