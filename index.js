const express = require('express');
const cors = require('cors');

require('dotenv').config();

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors())

// Lectura y parseo del body
app.use(express.json());

//Base de Datos
dbConnection();

//User: mean_user
//PASS: xea2cT50C5nkOybS

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.route'));
app.use('/api/login', require('./routes/auth.route'));



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto 3000')
});
