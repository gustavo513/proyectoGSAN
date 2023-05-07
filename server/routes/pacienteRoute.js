import {Router} from 'express';
import {
    getPaciente,
    getPacientes,
    createPaciente,
    updatePaciente,
    deletePaciente
} from '../controllers/pacienteController.js';

const router = Router();

//obtener un paciente por su id
router.get('/pacientes/:id', getPaciente);

//listar todos los pacientes
router.get('/pacientes', getPacientes);

//registrar un paciente
router.post('/pacientes', createPaciente);

//actualizar un paciente
router.put('/pacientes/:id', updatePaciente);

export default router;