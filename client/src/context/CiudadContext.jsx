import {
  crearCiudadRequest,
  listarCiudadRequest,
  CiudadRequest,
  eliminarCiudadRequest,
  actualizarCiudadRequest,
} from "../api/ciudad.api.js";
import { createContext, useContext, useState } from "react";
import ErrorModal from "../mensajes/MENSAJES.jsx";
export const CiudadContext = createContext();

export const useCiudad = () => {
  const context = useContext(CiudadContext);
  if (!context) {
    throw new Error("useBarrio debe ser usado dentro de BarrioProvider ");
  }
  return useContext(CiudadContext);
};

export const CiudadContextProvider = ({ children }) => {
  const [Ciudad, setCiudad] = useState([]);
  const [modalAbrir, setModalAbrir] = useState(false);
  const [mensajes, setMensajes] = useState('');
  const CargarCiudad = async () => {
    try {
      const response = await listarCiudadRequest();

      setCiudad(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const CrearCiudad = async (Ciudad) => {
    try {
      const response = await crearCiudadRequest(Ciudad);
      setMensajes("Operacion Realizado con exito!");
      setModalAbrir(true);
      setTimeout(() => {
        setModalAbrir(false);
      }, 2000);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const ListaCiudad = async (id) => {
    try {
      const response = await CiudadRequest(id);
      return response.data[0];
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarCiudad = async (id, Ciudad) => {
    try {
      const response = await actualizarCiudadRequest(id, Ciudad);
      setMensajes(" Actulizado con exito!");
      setModalAbrir(true);

      setTimeout(() => {
        setModalAbrir(false);
      }, 1000);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const EliminarCiudad = async (id) => {
    try {
      await eliminarCiudadRequest(id);
      setCiudad(Ciudad.filter((Ciudad) => Ciudad.CiudadId !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CiudadContext.Provider
      value={{
        CrearCiudad,
        CargarCiudad,
        Ciudad,
        ListaCiudad,
        actualizarCiudad,
        EliminarCiudad,
      }}
    >
      <ErrorModal
        isOpen={modalAbrir}
        onRequestClose={() =>setModalAbrir(false)}
        errorMessage={mensajes}
      />
      {children}
    </CiudadContext.Provider>
  );
};
