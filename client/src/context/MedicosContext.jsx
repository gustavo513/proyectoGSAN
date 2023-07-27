import {
    CrearMedicoRequest,
    ListarMedicosRequest,
    ListarMedicoRequest,
    ActualizarMedicoRequest,
    MedicosPorEspecialidadRequest
} from '../api/medico.api.js'
import { useState, createContext, useContext } from 'react'

import ErrorModal from "../mensajes/MENSAJES.jsx";

export const MedicosContext = createContext();

export const useMedicos = () => {

    const context = useContext(MedicosContext);
    if (!context) {
        throw new Error('useMedicos must be used within a MedicosProvider');
    }

    return useContext(MedicosContext);

}



export const MedicosContextProvider = ({ children }) => {

    const [medicos, setMedicos] = (useState([]));
   
    const [mensajes, setMensajes] = useState("");
    const [mostrarAlerta, setMostrarAlerta] = useState(false);


    const ListarMedicos = async () => {
        const response = await ListarMedicosRequest();
        setMedicos(response.data);
    }

    const MedicosPorEspecialidad = async (id) => {
        try {
            const response = await MedicosPorEspecialidadRequest(id);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const CrearMedico = async (medico) => {
        try {
            const response = await CrearMedicoRequest(medico);
            setMensajes(" Operacion realizada con exito!");
            setMostrarAlerta(true);
      
            setTimeout(() => {
              setMostrarAlerta(false);
            }, 2000);
            
          } catch (error) {
            console.error(error);
          }
    }

    const ListarMedico = async (id) => {
        try {
            const response = await ListarMedicoRequest(id);
            return response.data[0];
        } catch (error) {
            console.error(error);
        }

    }

    const ActualizarMedico = async (id, newData) => {
        try {
            const response = await ActualizarMedicoRequest(id, newData);
            setMensajes(" Operacion realizada con exito!");
            setMostrarAlerta(true);
      
            setTimeout(() => {
              setMostrarAlerta(false);
            }, 2000);
            
          } catch (error) {
            console.error(error);
          }
    }


    return (
        <MedicosContext.Provider value={{
            ListarMedicos, ListarMedico, CrearMedico, ActualizarMedico, medicos, MedicosPorEspecialidad
        }}>
             <ErrorModal
        isOpen={mostrarAlerta}
        onRequestClose={() =>setMostrarAlerta(false)}
        errorMessage={mensajes}
      />
            {children}</MedicosContext.Provider>
    )
}



