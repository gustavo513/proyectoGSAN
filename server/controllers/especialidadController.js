import { pool } from "../database/database.js";

export const getEspecialidades = async(req, res) => {
   
    try {
        
        const [resultado] = await pool.query('SELECT * FROM especialidades');
        res.json(resultado);

    } catch (error) {
        return  res.status(500).json( {message: error.message} );
    }
    
}

export const getEspecialidad = async(req, res) => {
    
    try {

        const {id} = req.params;

        const [resultado] = await pool.query('SELECT * FROM especialidades WHERE especialidadid = ?', [id]);
        
        if(resultado.length === 0){
            return res.status(404).json({message: 'Registro de especialidad no encontrado'});
        }else{
            res.json(resultado[0]); 
        }

    } catch (error) {
        return res.status(500).json( {message: error.message} );
    }

}

export const createEspecialidad = async(req, res) => {
    
    try {
        
        const [resultado] = await pool.query('INSERT INTO especialidades set ?', [req.body]);
        res.json(resultado);


    } catch (error) {
        return res.status(500).json( {message: error.message} );
    }

}

export const updateEspecialidad = async(req, res) => {
    try {
        const [resulatdo] = await pool.query('UPDATE especialidades set ? WHERE especialidadid = ?', [req.body, req.params.id]);
        res.json(resulatdo);
    } catch (error) {
        return res.status(500).json( {message: error.message} );
    }
}

export const deleteEspecialidad = async(req, res) => {
    res.send('Borrando especialidad');
}