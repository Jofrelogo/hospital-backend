/*
    Medicos
    Ruta: '/api/medicos'
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
const {validarJWT} = require("../middlewares/validar-jwt");
const {getMedicos, crearMedicos, updateMedicos, deleteMedicos} = require('../controllers/medicos.controller')


const route = Router();

route.get('/', validarJWT, getMedicos);

route.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser valido').isMongoId(),
        validarCampos
    ],
    crearMedicos);

route.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser valido').isMongoId(),
        validarCampos
    ],
    updateMedicos);

route.delete('/:id',
    validarJWT,
    deleteMedicos
);


module.exports = route;
