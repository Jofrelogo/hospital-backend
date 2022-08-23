/*
    Hospitales
    Ruta: '/api/hospitales'
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
const {validarJWT} = require("../middlewares/validar-jwt");
const {getHospitales, crearHospitales, updateHospitales, deleteHospitales} = require('../controllers/hospitales.controller')

const route = Router();

route.get('/', validarJWT, getHospitales);

route.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearHospitales);

route.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateHospitales);

route.delete('/:id',
    validarJWT,
    deleteHospitales
);


module.exports = route;
