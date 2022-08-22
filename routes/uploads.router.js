/*
    Archivos
    Ruta: '/api/upload/'
*/
const {Router} = require('express');
const expressFileUpload = require('express-fileupload');
const {validarJWT} = require("../middlewares/validar-jwt");
const {fileUpload, getFile} = require('../controllers/uploads.controller');

const route = Router();

route.use(expressFileUpload());

route.put('/:tipo/:id', validarJWT, fileUpload);

route.get('/:tipo/:foto', validarJWT, getFile);


module.exports = route
