import axios from 'axios';

export const crearEspecialidadRequest = async(especialidad)=>{
    return await axios.post('http://localhost:4000/especialidades', especialidad);
}

export const listarEspecialidadRequest = async()=>{
    return await axios.get('http://localhost:4000/especialidades');
}

export const especialidadRequest = async(id) => {
    return await axios.get(`http://localhost:4000/especialidades/${id}`);
}

export const actualizarEspecialidadRequest = async(id, especialidad) => {
    return await axios.put(`http://localhost:4000/especialidades/${id}`, especialidad);
}

export const elminarEspecialidadRequest = async(id) => {
    return await axios.delete(`http://localhost:4000/especialidades/${id}`);
}