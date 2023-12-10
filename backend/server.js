const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const nivelesConTextos = require('./routes/nivelesConTextos');
const preguntasRoutes = require('./routes/PreguntasRoutes');
const opcionesRoutes = require('./routes/OpcionesRoutes');
const TextoDetalleRoutes = require('./routes/TextoDetalleRoutes');

dotenv.config({ path: './base_datos.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas API
app.use('/nivelesConTextos', nivelesConTextos);
app.use('/preguntas', preguntasRoutes);
app.use('/opciones', opcionesRoutes);
app.use('/textoDetalle', TextoDetalleRoutes);

// Sirve los archivos estáticos del build de React
app.use(express.static(path.join(__dirname, '../build')));

// Captura cualquier otra ruta y devuelve el index.html del frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });  

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Hola calabaza, El servidor está corriendo en el puerto ${PORT}`);
});