import { pool } from "../database/database.js";

export const getHorario = async(req, res) => {
    

    try {
        
        const {id} = req.params;

        const [resultado] = await pool.query('SELECT * FROM horarios WHERE horarioid = ?', [id]);
        
        if (resultado.length === 0){
            return res.status(404).json( {message: 'Registro de horario no encontrado...'} );
        }else{
            res.json(resultado);
        }

    } catch (error) {
        return res.status(500).json( {message: error.message} );
    }

}

export const getHorarios = async(req, res) => {
    
    try {
        
        const [resultado] = await pool.query('SELECT * FROM horarios ORDER BY horarioId ASC');
        res.json(resultado);


    } catch (error) {
        return  res.status(500).json( {message: error.message} );
    }

}

export const getHorariosByDiaId = async(req, res) => {
    try{
        const {dia} = req.params;
        const [resultado] = await pool.query('SELECT * FROM horarios WHERE dia = ? ORDER BY horarioId ASC', [dia]);
        res.json(resultado);
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const postHorario = async(req, res) => {
    

    try {
        
        const [resulado] = await pool.query('INSERT INTO horarios SET ?', [req.body]);
        res.json(resulado);


    } catch (error) {
        return res.status(500).json( {message: error.message} );
    }


}

export const putHorario = async(req, res) => {
    try {
        
        const {id} = req.params;

        const [resulado] =  await pool.query('UPDATE horarios SET ? WHERE horarioid = ?', [req.body, id]);
        res.json(resulado);

    } catch (error) {
        return res.status(500).json( {message: error.message} );
    }
}

export const deleteHorario = async(req, res) => {
    res.send('borrandoHorario');
}