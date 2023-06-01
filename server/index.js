import express from 'express';
import {PORT} from './config.js';
import pacientesRoute from './routes/pacienteRoute.js';
import ciudadesRoute from './routes/ciudadRoute.js';
import barriosRoute from './routes/barrioRoute.js';
import medicosRoute from './routes/medicoRoute.js';
import usuariosRoute from './routes/usuarioRoute.js';
import turnoRoute from './routes/turnoRoute.js';
import horariosRoute from './routes/horarioRoute.js';
import horariosMedicosRoute from './routes/horarioMedicoRoute.js';
import especialidadesRoute from './routes/especialidadRoute.js';

const app = express();

//procesa los datos del cliente en formato json
app.use(express.json());

app.use(pacientesRoute);
app.use(ciudadesRoute);
app.use(barriosRoute);
app.use(medicosRoute);
app.use(usuariosRoute);
app.use(turnoRoute);
app.use(horariosRoute);
app.use(horariosMedicosRoute);
app.use(especialidadesRoute);

app.listen(PORT);
console.log(`El servidor se esta ejecutando en el puerto ${PORT}`);