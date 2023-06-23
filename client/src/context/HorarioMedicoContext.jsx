import {
    CrearHorarioMedicoRequest,
    ListarHorariosMedicosRequest,
    ListarHorarioMedicoRequest,
    ActualizarHorarioMedicoRequest,
    HorarioMedicoRequest


} from '../api/horarioMedico.api.js';

import { createContext, useContext, useState } from 'react';

export const HorarioMedicoContext = createContext();

export const useHorarioMedico = () => {
    const context = useContext(HorarioMedicoContext);
    if (!context) {
        throw new Error('useHorarioMedico debe ser usado dentro de HorarioMedicoProvider');
    }
    return useContext(HorarioMedicoContext);
}

export const HorarioMedicoContextProvider = ({ children }) => {


    const [horariosMedicos, setHorariosMedicos] = useState([]);


    const ListarHorariosMedicos = async () => {
        try {
            const response = await ListarHorariosMedicosRequest();
            setHorariosMedicos(response.data);
        } catch (error) {
            console.error(error);

        }

    }

    const ListarHorarioMedico = async (id) => {
        try {

            const response = await ListarHorarioMedicoRequest(id);
            return response.data;

        } catch (error) {
            console.error(error);

        }

    }


    const CrearHorarioMedico = async (horario) => {
        try {
            const response = await CrearHorarioMedicoRequest(horario);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const ActualizarHorarioMedico = async (id, newData) => {
        try {
            const response = await ActualizarHorarioMedicoRequest(id, newData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    // ! Queda pendiente el context del HorarioMedicoRequest al momento de crear un medico




    return (<HorarioMedicoContext.Provider value={{
        horariosMedicos, ListarHorariosMedicos, ListarHorarioMedico, CrearHorarioMedico, ActualizarHorarioMedico
    }}>
        {children}</HorarioMedicoContext.Provider>

    )

}