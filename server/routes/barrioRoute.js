import {Router} from 'express';
import {
    getBarrio,
    getBarrios,
    createBarrio,
    updateBarrio,
    deleteBarrio
} from '../controllers/barrioController.js';

const router = Router();

//obtener un barrio por su id
router.get('/barrios/:id', getBarrio);

//listar todos los barrios
router.get('/barrios', getBarrios);

//registrar un barrio
router.post('/barrios', createBarrio);

//actualizar un barrio
router.put('/barrios/:id', updateBarrio);

export default router;