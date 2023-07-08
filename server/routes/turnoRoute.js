import {Router} from 'express';
import {
    getTurno,
    getTurnos,
    getTurnosByEstado,
    getTurnosByMedicoIdAndFecha,
    createTurno,
    updateTurno,
    deleteTurno
} from '../controllers/turnoController.js';

const router = Router();

//obtener un turno por su id
router.get('/turnos/:id', getTurno);

//listar todos los turnos
router.get('/turnos', getTurnos);

//listar todos los turnos con un estado especifico
router.get('/turnos/getturnosbyestado/:estado', getTurnosByEstado);

//listar todos los turnos para un medico particular en una fecha especifica
router.get('/turnos/getturnosbymedicoidandfecha/:medicoId/:fecha', getTurnosByMedicoIdAndFecha);

//registrar un turno
router.post('/turnos', createTurno);

//actualizar un turno
router.put('/turnos/:id', updateTurno);

export default router;