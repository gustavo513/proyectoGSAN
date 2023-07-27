import {  useEffect } from "react";
import { useHorarioMedico } from "../context/HorarioMedicoContext";
import { useHorario } from "../context/HorarioContext";
import { addDays, format, startOfMonth } from 'date-fns'




function DiasDisponibles(medicoId) {
    const {horariosMedicos, ListarHorariosMedicos} = useHorarioMedico();

    useEffect(() => {
        ListarHorariosMedicos();
    },[]);
    
    const semanaDias = [0,1,2,3,4,5,6];

    const idMedico = parseInt(medicoId);

    const objetMedico = horariosMedicos.filter(horario => horario.medicoid === idMedico);

    const dias = objetMedico.map(dias => dias.dia);

    const DiasNoDisponibles = semanaDias.filter(dia => !dias.includes(dia));

    

    return DiasNoDisponibles;

}

export default DiasDisponibles;