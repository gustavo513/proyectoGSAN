import axios from 'axios';

export const crearCiudadRequest = async(barrio)=>{
    return await axios.post('http://localhost:4000/ciudades', barrio);
}

export const listarCiudadRequest = async()=>{
    return await axios.get('http://localhost:4000/ciudades');
}

export const CiudadRequest = async(id) => {
    return await axios.get(`http://localhost:4000/ciudades/${id}`);
}

export const actualizarCiudadRequest = async(id, ciudad) => {
    return await axios.put(`http://localhost:4000/ciudades/${id}`, ciudad);
}

export const eliminarCiudadRequest = async(id) => {
    return await axios.delete(`http://localhost:4000/ciudades/${id}`);
}