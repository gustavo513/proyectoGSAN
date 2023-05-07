import {Router} from 'express';
import {
    getCiudad,
    getCiudades,
    createCiudad,
    updateCiudad,
    deleteCiudad
} from '../controllers/ciudadController.js';

const router = Router();

//obtener una ciudad por su id
router.get('/ciudades/:id', getCiudad);

//listar todos las ciudades
router.get('/ciudades', getCiudades);

//registrar una ciudad
router.post('/ciudades', createCiudad);

//actualizar una ciudad
router.put('/ciudades/:id', updateCiudad);

export default router;