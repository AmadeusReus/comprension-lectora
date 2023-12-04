const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nivelesConTextos = require('./routes/nivelesConTextos');  // Actualizado
const preguntasRoutes = require('./routes/PreguntasRoutes');
const opcionesRoutes = require('./routes/OpcionesRoutes');
const TextoDetalleRoutes = require('./routes/TextoDetalleRoutes');

dotenv.config({ path: './base_datos.env' });

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido al backend de la aplicación de comprensión lectora.' });
});

app.use('/nivelesConTextos', nivelesConTextos);  // Actualizado
app.use('/preguntas', preguntasRoutes);
app.use('/opciones', opcionesRoutes);
app.use('/textoDetalle', TextoDetalleRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Hola calabaza, el servidor está corriendo en el puerto ${PORT}`);
});
