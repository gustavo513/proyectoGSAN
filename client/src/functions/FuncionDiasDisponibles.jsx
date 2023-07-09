import { useState, useEffect } from "react";
import { useHorarioMedico } from "../context/HorarioMedicoContext";
import { useHorario } from "../context/HorarioContext";
import { addDays, format, startOfMonth } from 'date-fns'




function DiasDisponibles(medicoId) {

    const { ListarHorariosMedicos, horariosMedicos } = useHorarioMedico();
    const { ListarHorarios, horarios } = useHorario();

    const dataMedico = parseInt(medicoId);

    const medicoEncontrado = horariosMedicos.filter(horario => horario.medicoid === dataMedico);

    const diasHorarioId = medicoEncontrado.map(horario => horario.horarioid);

    const diasDeHorarioFiltrados = horarios.filter(horario => diasHorarioId.includes(horario.horarioId))
        .map(horario => horario.dia);
    // ? El codigo correspondiente que se encuentra en la parte superior genera un array que 
    // ? contiene los dias que dispone un medico en formato numerico representado entre
    // ? [0,6], primero que nada filtra los datos listados en el array de objetos horarios
    // ? recorre el array a traves de la variable horario que ayuda a recorrer los datos
    // ? que se encuentran en la tabla horarios, con este valor realizamos el metodo includes
    // ? que nos permite verificar si el valor que se encuentra en la tabla de horarios conincide
    // ? con el valor que se encuentra en el array diasDeHorarioId, si esta condicion es verdadera
    // ? se procede a mapear el registro para poder capturar unicamente el valor del campo dia.



    const calendarioMedico = Calendario(diasDeHorarioFiltrados);
   


    useEffect(() => {
        ListarHorariosMedicos();
        ListarHorarios();
    }, []);

    return calendarioMedico;



}


function Calendario(diasDisponibles) {
    
    const fechaActual = new Date();
    // ? El codigo genera un array el cual contiene la fecha actual 

    const primerDiaMes = startOfMonth(fechaActual);
    // ? Utilizando el valor de la fecha actual se obtiene el primer dia del mes
    // ? al cual corresponde la fecha actual

    const Calendario = [];
    //? Genera un array calendatio, el cual contendra los dias del mes disponibles

    let fecha = primerDiaMes;
    //? Carga la fecha del primer dia del mes en la variable fecha

    while (fecha.getMonth() === fechaActual.getMonth()){
        //? Compara el valor del mes de la variabel fecha  con el de la fechaActual
        //? en caso de ser true este entra dentro del bucle
        const diaSemana = fecha.getDay();
        //? Genera un array que carga todos los valores de la semana representados de manera 
        //? numeriaca entre 0 y 6


        if(diasDisponibles.includes(diaSemana)){
            //? Compara los valores que se encuentran dentro del array diasDisponibles,
            //? estos representan los dias que un doctor esta disponible en la semana
            //? representando los dias con los valores desde el 0 al 6, en caso de que 
            //? estos valores se encuentren dentro del array diaSemana se procede a cargar
            //? estos valores dentro del bucle if.
            const fechaFormateada = format(fecha, 'yyyy-MM-dd');
            //? Genera una nueva fecha formateada con el formato yyyy-MM-dd
            Calendario.push(fechaFormateada);
            //? Este valor de la fecha formateada es cargada dentro del array Calendario
        }

        fecha = addDays(fecha, 1);
        //? Avanza un dia a partir de una fecha dada en la variable fecha

    }

    
    
      return Calendario;

}

export default DiasDisponibles;