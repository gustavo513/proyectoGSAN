import { EspecialidadContextProvider } from "./EspecialidadContext";
import { MedicosContextProvider } from "./MedicosContext";
import { HorarioContextProvider } from "./HorarioContext";
import { createContext } from "react";

export const PrincipalContext = createContext();


export const PrincipalContextProvider = ({ children }) => {
    return (
        <EspecialidadContextProvider >
            <HorarioContextProvider >
                <MedicosContextProvider >
                    {children}
                </MedicosContextProvider>
            </HorarioContextProvider>
        </EspecialidadContextProvider>
    )
};


