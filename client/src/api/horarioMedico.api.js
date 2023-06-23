import axios from "axios";

export const CrearHorarioMedicoRequest = async(horario) => {
    return await axios.post('http://localhost:4000/horariosmedicos', horario);    
}

export const ListarHorariosMedicosRequest = async() => {
    return await axios.get('http://localhost:4000/horariosmedicos');
}

export const ListarHorarioMedicoRequest = async(id) => {
    return await axios.get(`http://localhost:4000/horariosmedicos/${id}`);
}

export const ActualizarHorarioMedicoRequest = async(id, newData) => {
    return await axios.put(`http://localhost:4000/horariosmedicos/${id}`, newData);
}

export const HorarioMedicoRequest = async(id) => {
    return await axios.get(`http://localhost:4000/horariosmedicos/gethorariosmedicosbymedicoid/${id}`);
}