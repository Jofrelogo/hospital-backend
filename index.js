const express = require('express');
const cors = require('cors');

require('dotenv').config();

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors())

//Base de Datos
dbConnection();

//User: mean_user
//PASS: xea2cT50C5nkOybS
// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Holas Mundo'
    })
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto 3000')
});