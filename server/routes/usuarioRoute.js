import {Router} from 'express';
import {getUsuarios, getUsuario, createUsuario, updateUsuarios, deletUsuarios} from '../controllers/usuarioController.js';

const router = Router();

router.get('/usuarios', getUsuarios);

router.get('/usuarios/:id', getUsuario);

router.post('/usuarios', createUsuario);

router.put('/usuarios/:id', updateUsuarios);

router.delete('/usuarios/:id', deletUsuarios);

export default router;