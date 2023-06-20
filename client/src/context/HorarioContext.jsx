import {
    CrearHorarioRequest,
    ListarHorariosRequest,
    ListarHorarioRequest,
    ActualizarHorarioRequest,
    EliminarHorarioRequest
} from '../api/horario.api.js';
import { createContext, useContext, useState } from 'react';


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


        const ListarHorarios = async()=>{
            const response = await ListarHorariosRequest();
            setHorarios(response.data); 
        }   



        const CrearHorario = async(horario)=>{
            try {
                const response = await CrearHorarioRequest(horario);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }

  

        const ListarHorario = async(id)=>{
            try {
                
                const response = await ListarHorarioRequest(id);
                return response.data[0];
                
            } catch (error) {
                console.error(error);
            }
        }

        const ActualizarHorario = async(id, newData)=>{
            try {
                const response =  await ActualizarHorarioRequest(id, newData);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        const EliminarHorario = async(id)=>{
             await EliminarHorarioRequest(id);
            setHorarios(horarios.filter(horario => horario.horarioId  !== id));
        }

        return (<HorarioContext.Provider value={{
            CrearHorario,horarios, ListarHorarios, ListarHorario, ActualizarHorario, EliminarHorario
        }}>
        {children}</HorarioContext.Provider>)
    }


