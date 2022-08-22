const fs = require('fs');
const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const borrarImagen = (pathViejo) => {
    if (fs.existsSync(pathViejo)) {
        // Borrar imagen anterior
        fs.unlinkSync(pathViejo);
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {

    switch (tipo) {
        case 'medicos' :
            const medico = await Medico.findById(id);

            if (!medico) {
                console.log('No existe un medico por ID');
                return false;
            }

            borrarImagen(`./uploads/medicos/${medico.img}`);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;

        case 'usuarios' :
            const usuario = await Usuario.findById(id);

            if (!usuario) {
                console.log('No existe un usuario por ID');
                return false;
            }

            borrarImagen(`./uploads/usuarios/${usuario.img}`);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;

        case 'hospitales' :
            const hospital = await Hospital.findById(id);

            if (!hospital) {
                console.log('No existe un hospital por ID');
                return false;
            }

            borrarImagen(`./uploads/hospitales/${hospital.img}`);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

            break;

    }
}

module.exports = {
    actualizarImagen
}
