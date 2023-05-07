import {createPool} from 'mysql2/promise';

//se establecen los parámetros para conectarse a la base de datos
export const pool = createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mysql',
    database: 'gsan'
});