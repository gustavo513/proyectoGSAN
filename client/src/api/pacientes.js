import axios from 'axios';

export const CrearPacientesRequest = async(Paciente)=>{
    return await axios.post('http://localhost:4000/pacientes', Paciente);
}

export const ListarPacientesRequest = async()=>{
    return await axios.get('http://localhost:4000/pacientes');
}

export const ListarPacienteRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/pacientes/${id}`);
}

export const ActualizarPacientesRequest = async(id,newData)=>{
    return await axios.put(`http://localhost:4000/pacientes/${id}`, newData);
}