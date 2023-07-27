import {
  CrearHorarioRequest,
  ListarHorariosRequest,
  ListarHorarioRequest,
  ActualizarHorarioRequest,
  EliminarHorarioRequest,
  HorariosPorDiaRequest,
} from "../api/horario.api.js";
import { createContext, useContext, useState } from "react";

import ErrorModal from "../mensajes/MENSAJES.jsx";

export const HorarioContext = createContext();

export const useHorario = () => {
  const context = useContext(HorarioContext);
  if (!context) {
    throw new Error("useHorario debe ser usado dentro de HorarioProvider");
  }
  return useContext(HorarioContext);
};

export const HorarioContextProvider = ({ children }) => {
  const [horarios, setHorarios] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [modalAbrir, setModalAbrir] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const ListarHorarios = async () => {
    const response = await ListarHorariosRequest();
    setHorarios(response.data);
  };

  const CrearHorario = async (horario) => {
    try {
      const response = await CrearHorarioRequest(horario);

      if (response.status != 400) {
        setErrorMessage("OPERACION REALIZADA CON EXITO !!!");
        setModalAbrir(true);
        setTimeout(() => {
          setModalAbrir(false);
        }, 2000);
      }
    } catch (error) {
      console.error(error);

      setErrorMessage(
        "Error al registrar horario !!!. Por favor verifica si el horario ya existe y vuelve a intentarlo"
      );
      setModalAbrir(true);
    }
  };

  const ListarHorario = async (id) => {
    try {
      const response = await ListarHorarioRequest(id);
      return response.data[0];
    } catch (error) {
      console.error(error);
    }
  };

  const ActualizarHorario = async (id, newData) => {
    try {
      const response = await ActualizarHorarioRequest(id, newData);
       setErrorMessage("OPERACION REALIZADA CON EXITO !!!");
      setModalAbrir(true);
      setTimeout(() => {
        setModalAbrir(false);
      }, 1000);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage('Error al Actualizar ')
    }
  };

  const EliminarHorario = async (id) => {
    await EliminarHorarioRequest(id);
    setHorarios(horarios.filter((horario) => horario.horarioId !== id));
  };

  const HorariosPorDia = async (id) => {
    try {
      const response = await HorariosPorDiaRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HorarioContext.Provider
      value={{
        CrearHorario,
        horarios,
        ListarHorarios,
        ListarHorario,
        ActualizarHorario,
        EliminarHorario,
        HorariosPorDia,
      }}
    >
     
      <ErrorModal
        isOpen={modalAbrir}
        onRequestClose={() => setModalAbrir(false)}
        errorMessage={errorMessage}
      />
      {children}
    </HorarioContext.Provider>
  );
};
