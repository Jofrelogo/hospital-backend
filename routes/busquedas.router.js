/*
    Busquedas
    Ruta: '/api/todo/:busqueda'
*/

const {validarJWT} = require("../middlewares/validar-jwt");
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas.controller')
const {Router} = require("express");

const route = Router();

route.get('/:busqueda', validarJWT, getTodo);

route.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);

module.exports = route
