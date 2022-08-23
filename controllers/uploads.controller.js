const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { actualizarImagen } = require("../helpers/actualizar-imagen");



const fileUpload = ( req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validacion tipo
    const tipoValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tipoValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital (tipo)'
        })
    };

    // Procesar la imagen...
    const file = req.files.imagen

    const nombreCortado = file.name.split('.');
    const extencion = nombreCortado[nombreCortado.length -1];

    // Validacion que existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        })
    };

    // Validar xxtencios
    const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extencionesValidas.includes(extencion)) {
        res.status(400).json({
            ok: false,
            msg: 'No es una extencion permitida'
        })
    };

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extencion}`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imegen
    file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        };

        // Actualizar la BD
        actualizarImagen( tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo cargado',
            nombreArchivo
        });
    });
}

const getFile = (req, res= response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}`);

    //imagen por defecto
    if ( fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathNoImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathNoImg);
    }
}

module.exports = {
    fileUpload,
    getFile
}
