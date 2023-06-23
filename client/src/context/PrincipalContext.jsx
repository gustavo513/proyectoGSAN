import { EspecialidadContextProvider } from "./EspecialidadContext";
import { MedicosContextProvider } from "./MedicosContext";
import { HorarioContextProvider } from "./HorarioContext";
import { HorarioMedicoContextProvider } from "./HorarioMedicoContext";
import { createContext } from "react";

export const PrincipalContext = createContext();


export const PrincipalContextProvider = ({ children }) => {
    return (
        <EspecialidadContextProvider >
            <HorarioContextProvider >
                <MedicosContextProvider >
                    <HorarioMedicoContextProvider >
                        {children}
                    </HorarioMedicoContextProvider>
                </MedicosContextProvider>
            </HorarioContextProvider>
        </EspecialidadContextProvider>
    )
};


