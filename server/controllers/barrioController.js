import {pool} from '../database/database.js';

export const getBarrio = async(req, res) => {
    try{
        const id = req.params.id;
        const [result] = await pool.query('SELECT * FROM barrios WHERE barrioid = ?', [id]);
        if(result.length == 0){
            return res.status(404).json( {message: 'Registro de barrio no encontrado...'} );
        }
        else{
            res.json(result);
        }
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const getBarrios = async(req, res) => {
    try{
        const [result] = await pool.query('SELECT * FROM barrios ORDER BY barrioid ASC');
        res.json(result);
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const createBarrio = async(req, res) => {
    try{
        const {descripcion} = req.body;
        const result = await pool.query('INSERT INTO barrios SET ?', {descripcion});
        res.json({
            descripcion
        });
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const updateBarrio = async(req, res) => {
    try{
        const id = req.params.id;
        const {descripcion} = req.body;
        const result = await pool.query('UPDATE barrios SET ? WHERE barrioid = ?', [ {descripcion}, id]);
        res.json(result);
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const deleteBarrio = (req, res) => {
    res.send('Eliminando barrio');
}