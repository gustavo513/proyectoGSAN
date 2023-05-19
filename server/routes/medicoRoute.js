import {Router} from 'express';
import {
    getMedico,
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico
} from '../controllers/medicoController.js';

const router = Router();

//obtener un medico por su id
router.get('/medicos/:id', getMedico);

//listar todos los medicos
router.get('/medicos', getMedicos);

//registrar un medico
router.post('/medicos', createMedico);

//actualizar un medico
router.put('/medicos/:id', updateMedico);

export default router;