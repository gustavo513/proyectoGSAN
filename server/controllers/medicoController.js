import {pool} from '../database/database.js';

export const getMedico = async(req, res) => {
    try{
        const id = req.params.id;
        const [result] = await pool.query('SELECT medicoId, nombre, apellido, ci, fechaNac, telefono, direccion, intervConsulta, m.estado, e.descripcion AS especialidad, usuarioId FROM medicos m JOIN especialidades e ON (m.especialidadId = e.especialidadId) WHERE medicoId = ?', [id]);
        if(result.length == 0){
            return res.status(404).json( {message: 'Registro de medico no encontrado...'} );
        }
        else{
            res.json(result);
        }
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const getMedicos = async(req, res) => {
    try{
        const [result] = await pool.query('SELECT medicoId, nombre, apellido, ci, fechaNac, telefono, direccion, intervConsulta, m.estado, e.descripcion AS especialidad, usuarioId FROM medicos m JOIN especialidades e ON (m.especialidadId = e.especialidadId) ORDER BY medicoId ASC');
        res.json(result);
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const getMedicosByEspecialidadId = async(req, res) => {
    try{
        const especialidadId = req.params.especialidadId;
        const [result] = await pool.query('SELECT medicoId, nombre, apellido, intervConsulta, estado FROM medicos m WHERE especialidadId = ?', [especialidadId]);
        res.json(result);
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const createMedico = async(req, res) => {
    try{
        const {nombre, apellido, ci, fechaNac, telefono, direccion, intervConsulta, estado, especialidadId, usuarioId} = req.body;
        const result = await pool.query('INSERT INTO medicos SET ?', {nombre:nombre, apellido:apellido, ci:ci, fechaNac:fechaNac, telefono:telefono, direccion:direccion, intervConsulta:intervConsulta, especialidadId:especialidadId, usuarioId:usuarioId});
        res.json({
            nombre,
            apellido,
            ci,
            fechaNac,
            telefono,
            direccion,
            intervConsulta,
            estado,
            especialidadId,
            usuarioId
        });
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const updateMedico = async(req, res) => {
    try{
        const id = req.params.id;
        const {nombre, apellido, ci, fechaNac, telefono, direccion, intervConsulta, estado, especialidadId} = req.body;
        const result = await pool.query('UPDATE medicos SET ? WHERE medicoId = ?', [ {nombre, apellido, ci, fechaNac, telefono, direccion, intervConsulta, estado, especialidadId}, id]);
        res.json(result);
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const deleteMedico = (req, res) => {
    res.send('Eliminando medico');
}