import {pool} from '../database/database.js';

export const getCiudad = async(req, res) => {
    try{
        const id = req.params.id;
        const [result] = await pool.query('SELECT * FROM ciudades WHERE ciudadid = ?', [id]);
        if(result.length == 0){
            return res.status(404).json( {message: 'Registro de ciudad no encontrado...'} );
        }
        else{
            res.json(result);
        }
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const getCiudades = async(req, res) => {
    try{
        const [result] = await pool.query('SELECT * FROM ciudades ORDER BY ciudadid ASC');
        res.json(result);
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const createCiudad = async(req, res) => {
    try{
        const {ciudadId, descripcion} = req.body;
        const result = await pool.query('INSERT INTO ciudades SET ?', {descripcion});
        res.json({
            descripcion
        });
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const updateCiudad = async(req, res) => {
    try{
        const id = req.params.id;
        const {descripcion} = req.body;
        const result = await pool.query('UPDATE ciudades SET ? WHERE ciudadid = ?', [ {descripcion}, id]);
        res.json(result);
    }
    catch(error){
        return res.status(500).json( {message: error.message} );
    }
}

export const deleteCiudad = (req, res) => {
    res.send('Eliminando ciudad');
}