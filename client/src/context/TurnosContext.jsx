import {
    ListarTurnosRequest,
    ListarTurnoRequest,
    ListarTurnosPorEstadoRequest,
    CrearTurnoRequest,
    ActualizarTurnoRequest,
    EliminarTurnoRequest
} from '../api/turnos.api.js';

import { createContext, useContext, useState } from 'react';

export const TurnosContext = createContext();

export const useTurnos = () => {
    const context = useContext(TurnosContext);
    if (!context) {
        throw new Error('useTurnos debe ser usado dentro de TurnosProvider');
    }
    return useContext(TurnosContext);

}

export const TurnosContextProvider = ({ children }) => {

    const [turnos, setTurnos] = useState([]);

    const ListarTurnos = async () => {
        try {
            const response = await ListarTurnosRequest();
            setTurnos(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const ListarTurno = async (id) => {
        try {
            const response = await ListarTurnoRequest(id);
            return response.data[0];
        } catch (error) {
            console.error(error);
        }
    }

    const ListarTurnosPorEstado = async(estado) => {
        try {
            const response = await ListarTurnosPorEstadoRequest(estado);
            setTurnos (response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const CrearTurno = async (turno) => {
        try {
            const response = await CrearTurnoRequest(turno);
            
        } catch (error) {
            console.error(error);
        }
    }

    const ActualizarTurno = async (id, newData) => {
        try {
            const response = await ActualizarTurnoRequest(id, newData);
            
        } catch (error) {
            console.error(error);
        }
    }
    

    return(<TurnosContext.Provider value={{
        turnos,ListarTurnos,ListarTurno,ListarTurnosPorEstado,CrearTurno,ActualizarTurno
    }}>{children}</TurnosContext.Provider>

    )
}