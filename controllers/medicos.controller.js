const {response} = require('express');
const bcrypt = require('bcryptjs');
const Medico = require('../models/medico.model')
const Hospital = require("../models/hospital.model");

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

    try {
        const id = req.params.id;
        const uid = req.uid;


        const medicoDB = await Medico.findById(id);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un medico con ese id',
            });
        };

        const hospitalBD = await Hospital.findById(req.body.hospital);

        if (!hospitalBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id',
            });
        };

        // Actualizaciones
        const cambiosMedico = {
            ...req.body,
            usuario: uid,
        }

        const medicoActual = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true})

        res.json({
            ok: true,
            msg: 'actualizar medico',
            medico: medicoActual
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }
}

const deleteMedicos = async (req, res = response) => {

    const id = req.params.id;

    try {

        const medicoDB = await Medico.findById(id);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un medico con ese id',
            });
        };

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico eliminado'
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
    getMedicos,
    crearMedicos,
    updateMedicos,
    deleteMedicos
}
