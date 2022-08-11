const {response} = require('express');
const bcrypt = require('bcryptjs');
const  Usuario = require('../models/usuario.model')
const {generarJWT} = require("../helpers/jwt");

const login = async (req, res = response) => {

    const {email, password } = req.body;

    try {
        const usuarioDB = await Usuario.findOne({ email });

        // Verificar Email
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El email no son validos',
            });
        }

        // Verificar Password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'La contraseña no son validos',
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id)

        res.json({
            ok: true,
            msg: 'Genera Token',
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        })
    }

}

module.exports = {
    login
}
