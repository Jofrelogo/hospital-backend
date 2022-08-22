const {response} = require('express');
const bcrypt = require('bcryptjs');
const Hospital = require('../models/hospital.model')

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

    res.json({
        ok: true,
        msg: 'actualizar hospital',
    })
}

const deleteHospitales = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Hospital eliminado'
    });
}

module.exports = {
    getHospitales,
    crearHospitales,
    updateHospitales,
    deleteHospitales
}
