import { EspecialidadContextProvider } from "./EspecialidadContext";
import { MedicosContextProvider } from "./MedicosContext";
import { HorarioContextProvider } from "./HorarioContext";
import { BarriosContextProvider } from "./barriosContext";
import { CiudadContextProvider } from "./CiudadContext";
import { PacientesContextProvider } from "./pacientesContext";
import { createContext } from "react";

export const PrincipalContext = createContext();

export const PrincipalContextProvider = ({ children }) => {
  return (
    <EspecialidadContextProvider>
      <HorarioContextProvider>
        <MedicosContextProvider>
          <BarriosContextProvider>
            <CiudadContextProvider>
              <PacientesContextProvider>
              {children}
              </PacientesContextProvider>
            
            </CiudadContextProvider>
          </BarriosContextProvider>
        </MedicosContextProvider>
      </HorarioContextProvider>
    </EspecialidadContextProvider>
  );
};
