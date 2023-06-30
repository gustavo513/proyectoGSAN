import axios from 'axios';

export const crearBarrioRequest = async(barrio)=>{
    return await axios.post('http://localhost:4000/barrios', barrio);
}

export const listarBarriosRequest = async()=>{
    return await axios.get('http://localhost:4000/barrios');
}

export const barrioRequest = async(id) => {
    return await axios.get(`http://localhost:4000/barrios/${id}`);
}

export const actualizarBarrioRequest = async(id, barrio) => {
    return await axios.put(`http://localhost:4000/barrios/${id}`, barrio);
}

export const eliminarBarrioRequest = async(id) => {
    return await axios.delete(`http://localhost:4000/barrios/${id}`);
}