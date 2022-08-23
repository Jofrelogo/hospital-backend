const express = require('express');
const cors = require('cors');

require('dotenv').config();

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Carpeta pública
app.use( express.static('public'))

// Lectura y parseo del body
app.use(express.json());

//Base de Datos
dbConnection();

//User: mean_user
//PASS: xea2cT50C5nkOybS

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.route'));
app.use('/api/hospitales', require('./routes/hospitales.route'));
app.use('/api/medicos', require('./routes/medicos.route'));
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/todo', require('./routes/busquedas.router'));
app.use('/api/upload', require('./routes/uploads.router'));



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto 3000')
});
