const {response} = require('express');
const bcrypt = require('bcryptjs');
const Medico = require('../models/medico.model')

const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre apellido img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        msg: 'get medicos',
        medicos
    })
}

const crearMedicos = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    })

    try {
        const medicoBD = await medico.save()
        res.json({
            ok: true,
            msg: 'crear medicos',
            medico: medicoBD
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Comuniquese con el administrador'
        })
    }


}

const updateMedicos = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizar medicos',
    })
}

const deleteMedicos = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Medicos eliminado'
    });
}

module.exports = {
    getMedicos,
    crearMedicos,
    updateMedicos,
    deleteMedicos
}
