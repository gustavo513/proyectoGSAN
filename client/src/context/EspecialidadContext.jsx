import { 
    crearEspecialidadRequest, 
    listarEspecialidadRequest, 
    especialidadRequest, 
    actualizarEspecialidadRequest,
    elminarEspecialidadRequest 
} from '../api/especialidad.api.js';
import { createContext, useContext, useState } from 'react';

export const EspecialidadContext = createContext();

export const useEspecialidad = () => {
    const context = useContext(EspecialidadContext);
    if (!context) {
        throw new Error('useEspecialidad debe ser usado dentro de EspecialidadProvider');
    }
    return useContext(EspecialidadContext);
}

export const EspecialidadContextProvider = ({ children }) => {

    const [especialidades, setEspecialidad] = useState([]);

    const CargarEspecialidades = async () => {
        try {
            const response = await listarEspecialidadRequest();
            setEspecialidad(response.data);
        } catch (error) {
            console.error(error);
        }
        
    }


    const CrearEspecialidad = async (especialidad) => {
        try {
            const response = await crearEspecialidadRequest(especialidad);
            
        } catch (error) {
            console.error(error);
        }
    }

    const ListaEspecialidad = async (id) => {
        try {
            const response = await especialidadRequest(id);
            return response.data[0];
        } catch (error) {
            console.error(error);
        }
    }


    const actualizarEspecialidad = async(id, especialidad) => {
        try {
            const response = await actualizarEspecialidadRequest(id, especialidad);
           
        } catch (error) {
            console.error(error);
        }
    }


    const EliminarEspecialidad = async(id) => {
        try {
           await elminarEspecialidadRequest(id);
           setEspecialidad(especialidades.filter(especialidad => especialidad.especialidadId !== id));
        } catch (error) {
            console.error(error);
        }
    }
    

   

    return (
        <EspecialidadContext.Provider value={{
            CrearEspecialidad, CargarEspecialidades, especialidades, ListaEspecialidad, actualizarEspecialidad, EliminarEspecialidad
        }}>{children}</EspecialidadContext.Provider>
    )
}