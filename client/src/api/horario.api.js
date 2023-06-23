import axios from 'axios';

export const CrearHorarioRequest = async(horario)=>{
    return await axios.post('http://localhost:4000/horarios',horario);
}

export const ListarHorariosRequest = async()=>{
    return await axios.get('http://localhost:4000/horarios');
}

export const ListarHorarioRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/horarios/${id}`);
}

export const ActualizarHorarioRequest = async(id,newData)=>{
    return await axios.put(`http://localhost:4000/horarios/${id}`, newData);
}

export const EliminarHorarioRequest = async(id)=>{
    return await axios.delete(`http://localhost:4000/horarios/${id}`);
}

export const HorariosPorDiaRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/horarios/gethorariobydiaid/${id}`);
}