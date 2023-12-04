const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta para obtener los detalles de un texto específico por su ID, incluyendo preguntas y opciones
router.get('/:idTexto', (req, res) => {
    const { idTexto } = req.params;
    const queryTexto = 'SELECT * FROM Texto WHERE idTexto = ?';
    const queryPreguntas = 'SELECT * FROM pregunta WHERE IDtexto = ?';
    const queryOpciones = 'SELECT * FROM opciones WHERE IDpregunta IN (SELECT idpregunta FROM pregunta WHERE IDtexto = ?)';

    // Primero, obtenemos el texto
    db.query(queryTexto, [idTexto], (err, resultadosTexto) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Después, las preguntas asociadas a ese texto
        db.query(queryPreguntas, [idTexto], (err, resultadosPreguntas) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Finalmente, las opciones asociadas a esas preguntas
            db.query(queryOpciones, [idTexto], (err, resultadosOpciones) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                // Aquí puedes combinar todos los datos en una estructura de respuesta adecuada
                const respuesta = {
                    texto: resultadosTexto[0], // Asumiendo que siempre hay un texto correspondiente
                    preguntas: resultadosPreguntas.map(pregunta => {
                        return {
                            ...pregunta,
                            opciones: resultadosOpciones.filter(opcion => opcion.IDpregunta === pregunta.idpregunta)
                        };
                    })
                };

                res.status(200).json(respuesta);
            });
        });
    });
});

module.exports = router;
