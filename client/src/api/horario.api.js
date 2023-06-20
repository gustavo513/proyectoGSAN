import axios from 'axios';

export const CrearHorarioRequest = (horario)=>{
    return axios.post('http://localhost:4000/horarios',horario);
}

export const ListarHorariosRequest = ()=>{
    return axios.get('http://localhost:4000/horarios');
}

export const ListarHorarioRequest = (id)=>{
    return axios.get(`http://localhost:4000/horarios/${id}`);
}

export const ActualizarHorarioRequest = (id,newData)=>{
    return axios.put(`http://localhost:4000/horarios/${id}`, newData);
}

export const EliminarHorarioRequest = (id)=>{
    return axios.delete(`http://localhost:4000/horarios/${id}`);
}