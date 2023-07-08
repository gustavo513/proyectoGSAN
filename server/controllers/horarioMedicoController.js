import {pool} from '../database/database.js';

export const getHorarioMedico = async(req, res) => {
    try{
        const id = req.params.id;
        const [result] = await pool.query('SELECT horariomedicoid, hm.horarioId, hm.medicoId, nombre, apellido, e.descripcion AS especialidad, intervConsulta, dia, desde, hasta, h.estado FROM horariosmedicos hm JOIN horarios h ON (hm.horarioId = h.horarioId) JOIN medicos m ON (m.medicoId = hm.medicoId) JOIN especialidades e ON (m.especialidadId = e.especialidadId) WHERE horariomedicoid = ?', [id]);
        if(result.length == 0){
            return res.status(404).json( {message: 'Registro de horario medico no encontrado...'} );
        }
        else{
            res.json(result);
        }
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const getHorariosMedicos = async(req, res) => {
    try{
        const [result] = await pool.query('SELECT horariomedicoid, hm.horarioid, hm.medicoid, nombre, apellido, e.descripcion AS especialidad, intervConsulta, dia, desde, hasta, h.estado FROM horariosmedicos hm JOIN horarios h ON (hm.horarioId = h.horarioId) JOIN medicos m ON (m.medicoId = hm.medicoId) JOIN especialidades e ON (m.especialidadId = e.especialidadId) ORDER BY horarioMedicoId ASC');
        res.json(result);
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const getHorariosMedicosByMedicoIdAndHorarioId = async(req, res) => {
    try{
        const medicoId = req.params.medicoId;
        const horarioId = req.params.horarioId;
        const [result] = await pool.query('SELECT horarioMedicoId, hm.medicoId, hm.horarioId, dia, desde, hasta, intervConsulta FROM horariosmedicos hm JOIN horarios h ON (hm.horarioId = h.horarioId) JOIN medicos m ON (hm.medicoId = m.medicoId) WHERE hm.medicoId = ? AND hm.horarioId = ?', [medicoId, horarioId]);
        res.json(result);
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const createHorarioMedico = async(req, res) => {
    try{
        const {horarioId, medicoId} = req.body;
        const result = await pool.query('INSERT INTO horariosmedicos SET ?', {horarioId, medicoId});
        res.json({
            horarioId,
            medicoId
        });
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const updateHorarioMedico = async(req, res) => {
    try{
        const id = req.params.id;
        const {horarioId, medicoId} = req.body;
        const result = await pool.query('UPDATE horariosmedicos SET ? WHERE horarioMedicoId = ?', [ {horarioId, medicoId}, id]);
        res.json(result);
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const deleteHorarioMedico = async(req, res) => {
    try{
        const id = req.params.id;
        const result = await pool.query('DELETE FROM horariosmedicos WHERE horarioMedicoId = ?', [id]);
        res.json(result);
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}