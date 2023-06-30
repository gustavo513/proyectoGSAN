import { 
    crearBarrioRequest, 
    listarBarriosRequest, 
    barrioRequest, 
    actualizarBarrioRequest,
    eliminarBarrioRequest 
} from '../api/barrio.api.js';
import { createContext, useContext, useState } from 'react';

export const BarriosContext = createContext();

export const useBarrios = () => {
    const context = useContext(BarriosContext);
    if (!context) {
        throw new Error('useBarrio debe ser usado dentro de BarrioProvider ', );
    }
    return useContext(BarriosContext);
}

export const BarriosContextProvider = ({ children }) => {

    const [Barrios, setBarrios] = useState([]);

    const CargarBarrios = async () => {
        try {
            const response = await listarBarriosRequest();
            setBarrios(response.data);
            
        } catch (error) {
            console.error(error);
        }
        
    }


    const CrearBarrios = async (barrios) => {
        try {
            const response = await crearBarrioRequest(barrios);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const ListaBarrios = async (id) => {
        try {
            const response = await barrioRequest(id);
            
            return response.data[0];
            
        } catch (error) {
            console.error(error);
        }
    }


    const actualizarBarrios = async(id, barrio) => {
        try {
            const response = await actualizarBarrioRequest(id, barrio);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    const Eliminarbarrios= async(id) => {
        try {
           await eliminarBarrioRequest(id);
           setBarrios(Barrios.filter(barrio => barrio.barrioId !== id));
        } catch (error) {
            console.error(error);
        }
    }
    

   

    return (
        <BarriosContext.Provider value={{
            CrearBarrios, CargarBarrios, Barrios, ListaBarrios, actualizarBarrios, Eliminarbarrios
        }}>{children}</BarriosContext.Provider>
    )
}