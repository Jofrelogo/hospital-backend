const {response} = require('express');
const bcrypt = require('bcryptjs');
const  Usuario = require('../models/usuario.model')
const {generarJWT} = require("../helpers/jwt");
const {googleVerify} = require("../helpers/google-verify");

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
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        })
    }

}

const googleSignIn = async (req, res = response) => {

    try {
        const {email, given_name, family_name, picture } = await googleVerify(req.body.token);

        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: given_name,
                apellido: family_name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar usuario
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            msg: 'Genera Token google',
            email,
            nombre: given_name,
            apellido: family_name,
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es correto'
        })
    };
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        msg: 'nuevo Token',
        token,
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}
