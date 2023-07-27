import {
    CrearHorarioRequest,
    ListarHorariosRequest,
    ListarHorarioRequest,
    ActualizarHorarioRequest,
    EliminarHorarioRequest,
    HorariosPorDiaRequest
} from '../api/horario.api.js';
import { createContext, useContext, useState } from 'react';

import ErrorModal from "../mensajes/MENSAJES.jsx";
export const HorarioContext = createContext();

export const useHorario = () => {
    const context = useContext(HorarioContext);
    if (!context) {
        throw new Error('useHorario debe ser usado dentro de HorarioProvider');
    }
    return useContext(HorarioContext);
}

export const HorarioContextProvider = ({ children }) => {

    const [horarios, setHorarios] = useState([]);

    const [mensajes, setMensajes] = useState("");
    const [mostrarAlerta, setMostrarAlerta] = useState(false);


    const ListarHorarios = async () => {
        const response = await ListarHorariosRequest();
        setHorarios(response.data);
    }



    const CrearHorario = async (horario) => {
        try {
            const response = await CrearHorarioRequest(horario);
            if (response.data === 'ERROR: El registro ya existe...') {
                window.alert(response.data);
            } else {
                setMensajes("Operacion realizada con exito.");
                setMostrarAlerta(true);

                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 2000);
            }


        } catch (error) {
            console.error(error);
        }
    }



    const ListarHorario = async (id) => {
        try {

            const response = await ListarHorarioRequest(id);
            return response.data[0];

        } catch (error) {
            console.error(error);
        }
    }

    const ActualizarHorario = async (id, newData) => {
        try {
            const response = await ActualizarHorarioRequest(id, newData);
            setMensajes(" Registro actualizado.");
            setMostrarAlerta(true);

            setTimeout(() => {
                setMostrarAlerta(false);
            }, 2000);

        } catch (error) {
            console.error(error);
        }
    }

    const EliminarHorario = async (id) => {
        await EliminarHorarioRequest(id);
        setHorarios(horarios.filter(horario => horario.horarioId !== id));
    }

    const HorariosPorDia = async (id) => {
        try {
            const response = await HorariosPorDiaRequest(id);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    return (<HorarioContext.Provider value={{
        CrearHorario, horarios, ListarHorarios, ListarHorario, ActualizarHorario, EliminarHorario, HorariosPorDia
    }}>
        <ErrorModal
            isOpen={mostrarAlerta}
            onRequestClose={() => setMostrarAlerta(false)}
            errorMessage={mensajes}
        />
        {children}</HorarioContext.Provider>)
}


