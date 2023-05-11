import {Router} from 'express';
import {
    getTurno,
    getTurnos,
    createTurno,
    updateTurno,
    deleteTurno
} from '../controllers/turnoController.js';

const router = Router();

//obtener un turno por su id
router.get('/turnos/:id', getTurno);

//listar todos los turnos
router.get('/turnos', getTurnos);

//registrar un turno
router.post('/turnos', createTurno);

//actualizar un turno
router.put('/turnos/:id', updateTurno);

export default router;