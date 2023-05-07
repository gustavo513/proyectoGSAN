import {pool} from '../database/database.js';

export const getPaciente = async(req, res) => {
    try{
        const id = req.params.id;
        const [result] = await pool.query('SELECT * FROM pacientes WHERE pacienteid = ?', [id]);
        if(result.length == 0){
            return res.status(404).json( {message: 'Registro de paciente no encontrado...'} );
        }
        else{
            res.json(result);
        }
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const getPacientes = async(req, res) => {
    try{
        const [result] = await pool.query('SELECT pacienteid, nombre, apellido, ci, fechaNac, sexo, sangre, b.descripcion AS barrio, c.descripcion AS ciudad, telefono, fechaReg, ultTurno, usuarioId FROM pacientes p JOIN ciudades c ON (p.ciudadid = c.ciudadid) JOIN barrios b ON (p.barrioid = b.barrioid) ORDER BY pacienteid ASC');
        res.json(result);
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const createPaciente = async(req, res) => {
    try{
        const {nombre, apellido, ci, fechaNac, sexo, sangre, barrioId, ciudadId, direccion, telefono, usuarioId} = req.body;
        const result = await pool.query('INSERT INTO pacientes SET ?', {nombre:nombre, apellido:apellido, ci:ci, fechaNac:fechaNac, sexo:sexo, sangre:sangre, barrioId:barrioId, ciudadId:ciudadId, direccion:direccion, telefono:telefono, usuarioId:usuarioId});
        res.json({
            nombre,
            apellido,
            ci,
            fechaNac,
            sexo,
            sangre,
            barrioId,
            ciudadId,
            direccion,
            telefono,
            usuarioId
        });
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const updatePaciente = async(req, res) => {
    try{
        const id = req.params.id;
        const {nombre, apellido, ci, fechaNac, sexo, sangre, barrioId, ciudadId, direccion, telefono} = req.body;
        const result = await pool.query('UPDATE pacientes SET ? WHERE pacienteid = ?', [ {nombre, apellido, ci, fechaNac, sexo, sangre, barrioId, ciudadId, direccion, telefono}, id]);
        res.json(result);
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const deletePaciente = (req, res) => {
    res.send('Eliminando paciente');
}