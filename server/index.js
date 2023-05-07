import express from 'express';
import {PORT} from './config.js';

const app = express();

//procesa los datos del cliente en formato json
app.use(express.json());

app.listen(PORT);
console.log(`El servidor se esta ejecutando en el puerto ${PORT}`);