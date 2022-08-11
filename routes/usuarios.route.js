/*
    Ruta = /api/usuarios
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
const {getUsuarios, crearUsuarios, updateUsuarios, deleteUsuarios} = require("../controllers/usuarios.controller");
const {validarJWT} = require("../middlewares/validar-jwt");


const route = Router();

route.get('/', validarJWT, getUsuarios);

route.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuarios);

route.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateUsuarios);

route.delete('/:id',
    validarJWT,
    deleteUsuarios
);


module.exports = route;
