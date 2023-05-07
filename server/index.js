import express from 'express';
import {PORT} from './config.js';
import pacientesRoute from './routes/pacienteRoute.js';
import ciudadesRoute from './routes/ciudadRoute.js';

const app = express();

//procesa los datos del cliente en formato json
app.use(express.json());

app.use(pacientesRoute);
app.use(ciudadesRoute);

app.listen(PORT);
console.log(`El servidor se esta ejecutando en el puerto ${PORT}`);