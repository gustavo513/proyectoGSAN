import {pool} from '../database/database.js';


export const getUsuarios = async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM usuarios');
        res.json(result);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getUsuario = async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM usuarios WHERE usuarioId = ?', [req.params.id]);
        
        if(result.length === 0){
            return res.status(404).json({message: 'Registro de usuario no encontrado'});
        }else{
            res.json(result[0]); 
        }
       
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const createUsuario = async(req, res) => {
    try {
        
        const [resultado] = await pool.query('INSERT INTO usuarios set ?', [req.body]);
        res.json(resultado);

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const updateUsuarios = async(req, res) => {
    try {
        const [resulatdo] = await pool.query('UPDATE usuarios set ? WHERE usuarioId = ?', [req.body, req.params.id]);
        res.json(resulatdo);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const deletUsuarios = async(req, res) => {
    res.send('Borrando usuario');
}