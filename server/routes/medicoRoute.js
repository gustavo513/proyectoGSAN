import {Router} from 'express';
import {
    getMedico,
    getMedicos,
    getMedicosByEspecialidadId,
    createMedico,
    updateMedico,
    deleteMedico
} from '../controllers/medicoController.js';

const router = Router();

//obtener un medico por su id
router.get('/medicos/:id', getMedico);

//listar todos los medicos
router.get('/medicos', getMedicos);

//listar todos los medicos de una sola especialidad
router.get('/medicos/getmedicosbyespecialidadid/:especialidadId', getMedicosByEspecialidadId);

//registrar un medico
router.post('/medicos', createMedico);

//actualizar un medico
router.put('/medicos/:id', updateMedico);

export default router;