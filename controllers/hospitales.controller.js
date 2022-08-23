const {response} = require('express');
const bcrypt = require('bcryptjs');
const Hospital = require('../models/hospital.model')
const Usuario = require("../models/usuario.model");

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre apellido img',)

    res.json({
        ok: true,
        msg: 'get hospitales',
        hospitales
    })
}

const crearHospitales = async (req, res = response) => {


    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body,
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            msg: 'crear hospital',
            hospital: hospitalDB,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Comuniquese con el administrador'
        })
    }
}

const updateHospitales = async (req, res = response) => {

    try {
        const id = req.params.id;
        const uid = req.uid;

        const hostpitalDB = await Hospital.findById(id);

        if (!hostpitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id',
            });
        }

        // Actualizaciones
        const cambiosHospital = {
            ...req.body,
            usuario: uid,
        }

        const hospitalActual = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new: true})

        res.json({
            ok: true,
            msg: 'actualizar hospital',
            hospital: hospitalActual
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }

}

const deleteHospitales = async (req, res = response) => {

    const id = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id',
            });
        };

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
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
    getHospitales,
    crearHospitales,
    updateHospitales,
    deleteHospitales
}
