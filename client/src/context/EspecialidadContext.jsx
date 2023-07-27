import {
  crearEspecialidadRequest,
  listarEspecialidadRequest,
  especialidadRequest,
  actualizarEspecialidadRequest,
  elminarEspecialidadRequest,
} from "../api/especialidad.api.js";
import { createContext, useContext, useState } from "react";
import ErrorModal from "../mensajes/MENSAJES.jsx";
export const EspecialidadContext = createContext();

export const useEspecialidad = () => {
  const context = useContext(EspecialidadContext);
  if (!context) {
    throw new Error(
      "useEspecialidad debe ser usado dentro de EspecialidadProvider"
    );
  }
  return useContext(EspecialidadContext);
};

export const EspecialidadContextProvider = ({ children }) => {
  const [especialidades, setEspecialidad] = useState([]);
  const [mensajes, setMensajes] = useState("");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const CargarEspecialidades = async () => {
    try {
      const response = await listarEspecialidadRequest();
      setEspecialidad(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const CrearEspecialidad = async (especialidad) => {
    try {
      const response = await crearEspecialidadRequest(especialidad);
      setMensajes("Operacion realizada con exito.");
      setMostrarAlerta(true);

      setTimeout(() => {
        setMostrarAlerta(false);
      }, 2000);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const ListaEspecialidad = async (id) => {
    try {
      const response = await especialidadRequest(id);
      return response.data[0];
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarEspecialidad = async (id, especialidad) => {
    try {
      const response = await actualizarEspecialidadRequest(id, especialidad);
      setMensajes(" Registro actualizado.");
      setMostrarAlerta(true);

      setTimeout(() => {
        setMostrarAlerta(false);
      }, 2000);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const EliminarEspecialidad = async (id) => {
    try {
      await elminarEspecialidadRequest(id);
      setEspecialidad(
        especialidades.filter(
          (especialidad) => especialidad.especialidadId !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EspecialidadContext.Provider
      value={{
        CrearEspecialidad,
        CargarEspecialidades,
        especialidades,
        ListaEspecialidad,
        actualizarEspecialidad,
        EliminarEspecialidad,
      }}
    >
      <ErrorModal
        isOpen={mostrarAlerta}
        onRequestClose={() =>setMostrarAlerta(false)}
        errorMessage={mensajes}
      />
      {children}
    </EspecialidadContext.Provider>
  );
};
