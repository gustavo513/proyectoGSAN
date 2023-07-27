import {
    CrearPacientesRequest,
    ListarPacienteRequest,
    ListarPacientesRequest,
    ActualizarPacientesRequest,
} from '../api/pacientes.js'
import { useState, createContext, useContext } from 'react'

import ErrorModal from '../mensajes/MENSAJES.jsx';

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
    const [mensajes, setMensajes] = useState("");
    const [mostrarAlerta, setMostrarAlerta] = useState(false);



    const ListarPacientes = async () => {
        const response = await ListarPacientesRequest();
        setPacientes(response.data);
    }

    const CrearPacientes = async (pacientes) => {
        try {
            const response = await CrearPacientesRequest(pacientes);
            setMensajes('Operacion exitosa!')
            setMostrarAlerta(true);

            setTimeout(() => {
                setMostrarAlerta(false);
            }, 2000);

        } catch (error) {
            console.error(error);
        }
    }

    const ListarPaciente = async (id) => {
        try {
            const response = await ListarPacienteRequest(id);
            return response.data[0];
        } catch (error) {
            console.error(error);
        }

    }

    const ActualizarPacientes = async (id, newData) => {
        try {
            const response = await ActualizarPacientesRequest(id, newData);
            setMensajes('Registro actulizado!');
            setMostrarAlerta(true);

            setTimeout(() => {
                setMostrarAlerta(false);
            }, 2000);


        } catch (error) {
            console.error(error);
        }
    }


    return (
        <PacientesContext.Provider value={{
            ListarPacientes, ListarPaciente, CrearPacientes, ActualizarPacientes, pacientes
        }}>
            <ErrorModal
                isOpen={mostrarAlerta}
                onRequestClose={() => setMostrarAlerta(false)}
                errorMessage={mensajes}
            />
            {children}</PacientesContext.Provider>
    )
}



