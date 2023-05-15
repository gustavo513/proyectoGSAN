import {pool} from '../database/database.js';

export const getHorarioMedico = async(req, res) => {
    try{
        const id = req.params.id;
        const [result] = await pool.query('SELECT * FROM horariosmedicos WHERE horariomedicoid = ?', [id]);
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
        const [result] = await pool.query('SELECT * FROM horariosmedicos ORDER BY horarioMedicoId ASC');
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