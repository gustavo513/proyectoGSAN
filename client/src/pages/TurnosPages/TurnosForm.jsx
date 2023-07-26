import { Formik, Form } from "formik";
import { useTurnos } from "../../context/TurnosContext";
import { useMedicos } from "../../context/MedicosContext";
import { usePacientes } from "../../context/pacientesContext";
import { useEspecialidad } from '../../context/EspecialidadContext';
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import CardSeleccionMedico from '../../components/CardSeleccionMedico';
import CardAgendarPaciente from "../../components/CardAgendarPaciente";
import CardSeleccionEspecialidad from '../../components/CardSeleccionEspecialidad';
import CardHoras from "../../components/CardHoras";
import moment from "moment";
import DiasDisponibles from "../../functions/FuncionDiasDisponibles";
import FuncionHoraPorDias from "../../functions/FuncionHoraPorDias";
import FuncionArrayHoras from "../../functions/FuncionArrayHoras";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//!Should solve the problem
{/*const isWeekday = (date) => {
  const disabledDays = [0, 6]; // Sunday (0) and Saturday (6) are disabled
  const day = getDay(date);
  return !disabledDays.includes(day);
};*/}


const Titulo = styled("div")({
    fontSize: "40px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
});

const Botones = styled("div")({
    display: "flex",
    justifyContent: "center",
    gap: "20%",
});

const Formulario = styled("div")({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    paddingBottom: "3%",

});
function TurnosForm({ turnoId, handleClose }) {
    const { CargarEspecialidades, especialidades } = useEspecialidad();
    const { CrearTurno, ListarTurno, ActualizarTurno } = useTurnos();
    const { ListarMedicos, medicos } = useMedicos();
    const { ListarPacientes, pacientes } = usePacientes();
    const [selectedDate, setSelectedDate] = useState(null);

    const [updateDate, setUpdateDate] = useState(null);


    const [formattedDate, setFormattedDate] = useState("");

    const handleChangeDate = (date) => {
        setSelectedDate(date);
        const formattedDate = date.toLocaleDateString('en-CA');
        setFormattedDate(formattedDate);
    }

    const [especialidadId, setEspecialidadId] = useState('');

    const handleEspecialidadChange = (e) => {
        setEspecialidadId(e.target.value);
    }

    const [medicoElegido, setMedicoElegido] = useState(null);

    const desabilitar = DiasDisponibles(medicoElegido);
    console.log(desabilitar);

    const isWeekday = (date) => {

        const day = date.getDay();
        return !desabilitar.includes(day);
    };


    const horaObjeto = FuncionHoraPorDias(formattedDate, medicoElegido)
    const horas = (horaObjeto !== undefined) ? FuncionArrayHoras(horaObjeto) : 'Espere';


    const [turno, setTurno] = useState({
        fecha: "",
        hora: "",
        total: "",
        pacienteid: "",
        medicoid: "",
        usuarioid: ""
    });

    useEffect(() => {

        if (turnoId) {
            const loadTurno = async () => {
                const response = await ListarTurno(turnoId);
                const date = new Date(response.fecha);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const formattedDate = `${year}-${month
                    .toString()
                    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

                setTurno({

                    fecha: formattedDate,
                    hora: response.hora,
                    total: response.total,
                    pacienteid: response.pacienteId,
                    medicoid: response.medicoId,
                    usuarioid: response.usuarioId

                });
                setMedicoElegido(response.medicoId);
                setSelectedDate(date);
                setFormattedDate(formattedDate);
                

            }

            loadTurno();
        }

        ListarMedicos();
        ListarPacientes();
        CargarEspecialidades();
    }, []);

    function renderMedicos() {
        if (medicos.length === 0) return <option value=""> No hay medicos disponibles </option>
        return <CardSeleccionMedico medicos={medicos} especialidad={especialidadId} especialidades={especialidades} />

    }
    function renderPacientes() {
        if (pacientes.length === 0) return <option value={""}> No hay pacientes </option>
        return < CardAgendarPaciente pacientes={pacientes} />
    }

    function renderEspecialidades() {
        if (especialidades.length === 0) return <option value=''>No hay especialidades</option>
        return <CardSeleccionEspecialidad especialidades={especialidades} />
    }

    function renderHoras() {
        if (horas === 'Espere') return <option value=''>No hay horas disponibles</option>
        return <CardHoras horas={horas} />
    }

    const resetEspecialidad = () => {
        setEspecialidadId("");
    }

    console.log(horaObjeto);

    console.log(horas);

    return (
        <div>
            <Titulo>{turnoId ? "Editar Turno" : "Crear Turno"}</Titulo>
            <div>
                <Formik
                    initialValues={turno}
                    enableReinitialize={true}
                    onSubmit={async (values, actions) => {

                        values.fecha = formattedDate;

                        if (turnoId) {
                            await ActualizarTurno(turnoId, values);
                            handleClose();
                        }
                        else {

                            await CrearTurno(values);
                        }
                        actions.resetForm();
                        resetEspecialidad();

                    }}
                >
                    {({ handleChange, handleSubmit, values }) => (
                        <Form onSubmit={handleSubmit}>

                            <Formulario>
                                <label >Paciente:</label>
                                <select name="pacienteid" value={values.pacienteid} onChange={handleChange}>
                                    <option initialvalues="" hidden></option>
                                    {renderPacientes()}
                                </select>

                                {!turnoId && (


                                    <label>Especialidad: </label>
                                )}
                                {!turnoId && (
                                    <select name="especialidadId" value={especialidadId} onChange={handleEspecialidadChange} >
                                        <option initialvalues="" ></option>
                                        {
                                            renderEspecialidades()

                                        }

                                    </select>

                                )}



                                <label >Medico:</label>
                                {!turnoId && (


                                    <select name="medicoid" value={values.medicoid} onChange={(e) => { handleChange(e), setMedicoElegido(e.target.value) }}>
                                        <option initialvalues="" hidden></option>
                                        {renderMedicos()}
                                    </select>
                                )}

                                {turnoId && (



                                    <select name="medicoid" value={values.medicoid} onChange={(e) => { handleChange(e), setMedicoElegido(e.target.value) }}>
                                        <option initialvalues={values.medicoid} hidden></option>
                                        {renderMedicos()}
                                    </select>

                                )}




                                <label>Fecha:</label>
                               


                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(e) => { handleChangeDate(e) }}
                                        minDate={new Date()}
                                        filterDate={isWeekday}

                                    />
                               

                                


                                   
                               
                                <input type="hidden" name="fecha" value={values.fecha} /> {/* Add this hidden input */}

                                {/*<input type="date" name="fecha" value={values.fecha} onChange={(e) => { handleChange(e), setDate(e.target.value) }} />
                                */}
                                <label >Hora</label>
                                {!turnoId &&(
                                <select name="hora" value={values.hora} onChange={handleChange}>
                                    <option initialvalues="" hidden></option>
                                    {renderHoras()}
                                </select>
                                )}
                                {turnoId &&(
                                <select name="hora" value={values.hora} onChange={handleChange}>
                                    <option initialvalues={values.hora} hidden></option>
                                    {renderHoras()}
                                </select>
                                )}
                                {/*
                                <input type="time" name="hora" value={values.hora} onChange={handleChange} />
                                */}
                                <label >Total:</label>
                                <input type="text" name="total" value={values.total} onChange={handleChange} />


                                <label >Usuario:</label>
                                <select name="usuarioid" value={values.usuarioid} onChange={handleChange}>
                                    <option initialvalues="" hidden></option>
                                    <option value="1">Admin</option>
                                </select>

                            </Formulario>


                            <Botones>
                                <Button variant="contained" type="submit" color="success" >
                                    Guardar
                                </Button>
                                <Button
                                    type="button"
                                    variant="outlined"
                                    color="error"
                                    onClick={handleClose}
                                >
                                    Cancelar
                                </Button>
                            </Botones>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default TurnosForm;