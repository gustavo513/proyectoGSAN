import axios from 'axios';

export const CrearMedicoRequest = async(medico)=>{
    return await axios.post('http://localhost:4000/medicos', medico);
}

export const ListarMedicosRequest = async()=>{
    return await axios.get('http://localhost:4000/medicos');
}

export const ListarMedicoRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/medicos/${id}`);
}

export const ActualizarMedicoRequest = async(id,newData)=>{
    return await axios.put(`http://localhost:4000/medicos/${id}`, newData);
}

export const MedicosPorEspecialidadRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/medicos/getmedicosbyespecialidadid/${id}`);
}