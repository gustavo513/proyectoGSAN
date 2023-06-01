import {Router} from 'express';
import {
    getHorarioMedico,
    getHorariosMedicos,
    getHorariosMedicosByMedicoId,
    createHorarioMedico,
    updateHorarioMedico,
    deleteHorarioMedico
} from '../controllers/horarioMedicoController.js';

const router = Router();

//obtener un horario medico por su id
router.get('/horariosmedicos/:id', getHorarioMedico);

//listar todos los horarios medicos
router.get('/horariosmedicos', getHorariosMedicos);

//listar todos los horarios medicos de un solo medico
router.get('/horariosmedicos/gethorariosmedicosbymedicoid/:medicoId', getHorariosMedicosByMedicoId);

//registrar un horario medico
router.post('/horariosmedicos', createHorarioMedico);

//actualizar un horario medico
router.put('/horariosmedicos/:id', updateHorarioMedico);

//eliminar un horario medico
router.delete('/horariosmedicos/:id', deleteHorarioMedico);

export default router;