import {pool} from '../database/database.js';

export const getTurno = async(req, res) => {
    try{
        const id = req.params.id;
        const [result] = await pool.query('SELECT * FROM turnos WHERE turnoid = ?', [id]);
        if(result.length == 0){
            return res.status(404).json( {message: 'Registro de turno no encontrado...'} );
        }
        else{
            res.json(result);
        }
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const getTurnos = async(req, res) => {
    try{
        const [result] = await pool.query('SELECT turnoId, fecha, hora, t.estado, total, t.fechaReg, p.nombre AS nombrePaciente, p.apellido AS apellidoPaciente, p.ci, m.nombre AS nombreMedico, m.apellido AS apellidoMedico, e.descripcion, usuario FROM turnos t JOIN pacientes p ON (t.pacienteId = p.pacienteId) JOIN medicos m ON (t.medicoId = m.medicoId) JOIN usuarios u ON (t.usuarioId = u.usuarioId) JOIN especialidades e ON (m.especialidadId = e.especialidadId) ORDER BY turnoid ASC');
        res.json(result);
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const getTurnosByEstado = async(req, res) => {
    try{
        const estado = req.params.estado;
        const [result] = await pool.query('SELECT turnoId, fecha, hora, t.estado, total, t.fechaReg, p.nombre AS nombrePaciente, p.apellido AS apellidoPaciente, p.ci, m.nombre AS nombreMedico, m.apellido AS apellidoMedico, e.descripcion, usuario FROM turnos t JOIN pacientes p ON (t.pacienteId = p.pacienteId) JOIN medicos m ON (t.medicoId = m.medicoId) JOIN usuarios u ON (t.usuarioId = u.usuarioId) JOIN especialidades e ON (m.especialidadId = e.especialidadId) WHERE t.estado = ? ORDER BY turnoid ASC', [estado]);
        res.json(result);
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const createTurno = async(req, res) => {
    try{
        const {fecha, hora, estado, total, pacienteid, medicoid, usuarioid} = req.body;
        const result = await pool.query('INSERT INTO turnos SET ?', {fecha:fecha, hora:hora, estado:estado, total:total, pacienteid:pacienteid, medicoid:medicoid, usuarioid:usuarioid});
        res.json({
            fecha,
            hora,
            estado,
            total,
            pacienteid,
            medicoid,
            usuarioid
        });
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const updateTurno = async(req, res) => {
    try{
        const id = req.params.id;
        const {fecha, hora, estado, total, pacienteid, medicoid, usuarioid} = req.body;
        const result = await pool.query('UPDATE turnoid SET ? WHERE turnoid = ?', [ {fecha, hora, estado, total, pacienteid, medicoid, usuarioid}, id]);
        res.json(result);
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const deleteTurno = (req, res) => {
    res.send('Eliminando turno');
}