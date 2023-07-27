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
    const [modalAbrir, setModalAbrir]= useState(false)
    const [mensajes, setMensajes] = useState('');
    const [pacientes, setPacientes] = (useState([]));


    const ListarPacientes = async()=>{
        const response = await ListarPacientesRequest();
        setPacientes(response.data);
    }

    const CrearPacientes = async(pacientes)=>{
        try {
            const response = await CrearPacientesRequest(pacientes);
            setMensajes('Operacion exitosa!')
            setModalAbrir(true)
            console.log(response.data);
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
            setMensajes('Registro actulizado!');
            setModalAbrir(true)
            
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <PacientesContext.Provider value={{
            ListarPacientes, ListarPaciente, CrearPacientes, ActualizarPacientes, pacientes
        }}>
            <ErrorModal
            isOpen={modalAbrir}
            onRequestClose={()=>setModalAbrir(false)}
            errorMessage={mensajes}
            />
            {children}
            
            </PacientesContext.Provider>
    )
}



