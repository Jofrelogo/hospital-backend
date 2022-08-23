const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const {generarJWT} = require("../helpers/jwt");

const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre apellido email role google img')
            .skip(desde)
            .limit(5),

        Usuario.countDocuments()
    ])

    res.json({
        ok: true,
        msg: 'get usuarios',
        usuarios,
        total
    })
}

const crearUsuarios = async (req, res = response) => {

    const {email, nombre, apellido, password} = req.body;

    try {

        const existeEmail = await Usuario.findOne({email})

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya esta registrado',
            });
        }

        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar Usuario
        await usuario.save();

        // Agregar Token
        const token = await generarJWT(usuario.uid)

        res.json({
            ok: true,
            msg: 'crear usuarios',
            usuario,
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

const updateUsuarios = async (req, res = response) => {
    // TODO: Validar token y comparar si el usuario es correcto
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id',
            });
        }

        // Actualizaciones
        const {password, google, email, ...campos} = req.body;

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({email: req.body.email});
            if (existeEmail) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        campos.email = email;

        const usuarioActua = await Usuario.findByIdAndUpdate(uid, campos, {new: true})

        res.json({
            ok: true,
            msg: 'actualizar usuarios',
            usuario: usuarioActua
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }
}

const deleteUsuarios = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id',
            });
        };

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    updateUsuarios,
    deleteUsuarios,
}
