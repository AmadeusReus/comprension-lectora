const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    const query = `
        SELECT n.idnivel, n.descripcionNivel, t.idTexto, t.titulo, t.contenido, t.autor, t.fechaPublicacion
        FROM niveles n
        JOIN Texto t ON n.idnivel = t.IDnivel
        ORDER BY n.idnivel, t.idTexto`;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Aquí puedes transformar los resultados en una estructura adecuada si es necesario
        res.status(200).json(results);
    });
});

module.exports = router;

//esta ruta la usamos para obtener datos para el componente AdminTextosList.js