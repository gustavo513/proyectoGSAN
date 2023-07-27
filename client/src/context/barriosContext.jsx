import {
    crearBarrioRequest,
    listarBarriosRequest,
    barrioRequest,
    actualizarBarrioRequest,
    eliminarBarrioRequest
} from '../api/barrio.api.js';
import { createContext, useContext, useState } from 'react';
import ErrorModal from "../mensajes/MENSAJES.jsx";


export const BarriosContext = createContext();

export const useBarrios = () => {
    const context = useContext(BarriosContext);
    if (!context) {
        throw new Error('useBarrio debe ser usado dentro de BarrioProvider ',);
    }
    return useContext(BarriosContext);
}

export const BarriosContextProvider = ({ children }) => {

    const [Barrios, setBarrios] = useState([]);
    const [modalAbrir, setModalAbrir] = useState(false);
    const [mensajes, setMensajes] = useState('')

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
            setMensajes(" Operacion Realizada con exito !!!");
            setModalAbrir(true);

            setTimeout(() => {
                setModalAbrir(false);
            }, 2000);
            
        } catch (error) {
            console.error(error);
            setMensajes(" Error al inserta");
            setModalAbrir(true)
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


    const actualizarBarrios = async (id, barrio) => {
        try {
            const response = await actualizarBarrioRequest(id, barrio);
            setMensajes("Operacion realizada con exito !!!")
            setModalAbrir(true);

            // Ocultar la alerta después de 1 segundos (1000 milisegundos)
            setTimeout(() => {
                setModalAbrir(false);
            }, 2000);
            
        } catch (error) {
            console.error(error);
            setMensajes(" ERROR AL ACTUALIZAR");
            setModalAbrir(true)
        }
    }


    const Eliminarbarrios = async (id) => {
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
        }}>
        <ErrorModal
        isOpen={modalAbrir}
        onRequestClose={() => setModalAbrir(false)}
        errorMessage={mensajes}
      />
        {children}
        </BarriosContext.Provider>
    )
}