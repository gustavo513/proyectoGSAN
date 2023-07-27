import {
    CrearPacientesRequest,
    ListarPacienteRequest,
    ListarPacientesRequest,
    ActualizarPacientesRequest,
} from '../api/pacientes.js'
import { useState, createContext, useContext } from 'react'



export const PacientesContext = createContext();

export const usePacientes = () => {

    const context = useContext(PacientesContext);
    if (!context) {
        throw new Error('usePacientes must be used within a PacientesProvider');
    }

    return useContext(PacientesContext);

}



export const PacientesContextProvider = ({ children }) => {
    
    const [pacientes, setPacientes] = (useState([]));


    const ListarPacientes = async()=>{
        const response = await ListarPacientesRequest();
        setPacientes(response.data);
    }

    const CrearPacientes = async(pacientes)=>{
        try {
            const response = await CrearPacientesRequest(pacientes);
            
        } catch (error) {
            console.error(error);
        }
    }

    const ListarPaciente = async(id)=>{
        try {
            const response = await ListarPacienteRequest(id);
            return response.data[0];
        } catch (error) {
            console.error(error);
        }
            
    }

    const ActualizarPacientes = async(id, newData)=>{
        try {
            const response = await ActualizarPacientesRequest(id, newData);
           
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <PacientesContext.Provider value={{
            ListarPacientes, ListarPaciente, CrearPacientes, ActualizarPacientes, pacientes
        }}>{children}</PacientesContext.Provider>
    )
}



