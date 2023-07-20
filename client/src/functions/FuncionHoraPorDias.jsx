import { useHorarioMedico } from "../context/HorarioMedicoContext";
import { useHorario } from "../context/HorarioContext";
import { useEffect, useState } from "react";


function FuncionHoraPorDias(medicoId, dia) {
   const { HorarioPorMedicoIdYHorarioId,ListarHorariosMedicos, horariosMedicos } = useHorarioMedico();
   const { ListarHorarios, horarios, ListarHorario } = useHorario();
   const [horasData, setHorasData] = useState();

   let diaNumber;

   switch (dia) {
      case 'Sun':
         diaNumber = 0;
         break;
      case 'Mon':
         diaNumber = 1;
         break;
      case 'Tue':
         diaNumber = 2;
         break;
      case 'Wed':
         diaNumber = 3;
         break;
      case 'Thu':
         diaNumber = 4;
         break;
      case 'Fri':
         diaNumber = 5;
         break;
      case 'Sat':
         diaNumber = 6;
         break;
      default:
         break;
   }

   const dataMedico = parseInt(medicoId);
   const medicoEncontrado = horariosMedicos.filter(horario => horario.medicoid === dataMedico);
   const diasHorarioId = medicoEncontrado.map(horario => horario.horarioid);
   const diasDeHorarioFiltrados = horarios.filter(horario => diasHorarioId.includes(horario.horarioId))
        .map(horario => horario.dia);
   const diccionarioDiasHoras = {};

   for (let i = 0 ; i < diasHorarioId.length; i++) {
      const key = diasHorarioId[i];
      const value = diasDeHorarioFiltrados[i];
      diccionarioDiasHoras[key] = value;
   }

   const horario = getKeyByValue(diccionarioDiasHoras, diaNumber);
   const horarioId = parseInt(horario);

   useEffect(() => {
      const fetchData = async () => {
         if (!isNaN(horarioId) && !isNaN(dataMedico)) {
            const data = await   HorarioPorMedicoIdYHorarioId(dataMedico, horarioId);
            setHorasData(data);
         }
      };

      fetchData();

      ListarHorariosMedicos();
      ListarHorarios();
   }, [horarioId, dataMedico]);

   
   

   return  horasData;
}

function getKeyByValue(diccionarioDiasHoras, diaNumber) {
   for (const key in diccionarioDiasHoras) {
     if (diccionarioDiasHoras[key] === diaNumber) {
       return key;
     }
   }
   return null; // Value not found
}

export default FuncionHoraPorDias;
