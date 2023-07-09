import axios from "axios";

export const ListarTurnosRequest = async() => {
    return await axios.get('http://localhost:4000/turnos');
}

export const ListarTurnoRequest = async(id) => {
    return await axios.get(`http://localhost:4000/turnos/${id}`);
}

export const ListarTurnosPorEstadoRequest = async(estado) => {
    return await axios.get(`http://localhost:4000/turnos/getturnosbyestado/${estado}`);
}

export const CrearTurnoRequest = async(turno) => {
    return await axios.post('http://localhost:4000/turnos', turno);
}

export const ActualizarTurnoRequest = async(id, newData) => {
    return await axios.put(`http://localhost:4000/turnos/${id}`, newData);
}

export const EliminarTurnoRequest = async(id) => {
    return await axios.delete(`http://localhost:4000/turnos/${id}`);
}