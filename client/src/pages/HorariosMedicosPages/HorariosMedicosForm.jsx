import { Formik, Form } from "formik";
import { useHorarioMedico } from "../../context/HorarioMedicoContext";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import CardSeleccionEspecialidad from "../../components/CardSeleccionEspecialidad";
import { useEspecialidad } from "../../context/EspecialidadContext";
import { useMedicos } from "../../context/MedicosContext";
import CardSeleccionMedico from "../../components/CardSeleccionMedico";
import { useHorario } from "../../context/HorarioContext";
import CardSeleccioneHora from "../../components/CardSeleccioneHora";



const Titulo = styled('div')({
    fontSize: '40px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
})

const Botones = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    gap: '20%',
})


const Formulario = styled('div')({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    paddingBottom: '3%',

})






function HorariosMedicosForm({ horariomedicoId, handleClose }) {

    const { CargarEspecialidades, especialidades } = useEspecialidad();
    const { ListarMedicos, medicos } = useMedicos();

    const { ListarHorarioMedico, CrearHorarioMedico, ActualizarHorarioMedico } = useHorarioMedico();

    const [especialidadId, setEspecialidadId] = useState('');

    const handleEspecialidadChange = (e) => {
        setEspecialidadId(e.target.value);
    }

    const [diaSeleccionado, setDiaSeleccionado] = useState('');

    const handleDiaChange = (e) => {
        setDiaSeleccionado(e.target.value);
    }

    const { HorariosPorDia } = useHorario();
    const [horarios, setHorarios] = useState([]);

    const resetHorarioId = () => {
        setHorarioMedico({ horarioId: '' });
    }

    const resetForm = () => {
        setEspecialidadId('');
        setDiaSeleccionado('');
        setHorarios([]);
        setHorarioMedico({ medicoId: '', horarioId: '' });
    };


    const [horarioMedico, setHorarioMedico] = useState({ medicoId: ' ', horarioId: ' ' });

    useEffect(() => {

        if (diaSeleccionado) {
            const loadHorario = async () => {
                const horario = await HorariosPorDia(parseInt(diaSeleccionado));
                setHorarios(horario);
            }
            loadHorario();
        }

        if (horariomedicoId) {
            const loadHorarioMedico = async () => {
                const horario = await ListarHorarioMedico(horariomedicoId);
                
                setHorarioMedico({
                    medicoId: horario.medicoId,
                    horarioId: horario.horarioId,
                    desde: horario.desde,
                    hasta: horario.hasta
                });
            }
            loadHorarioMedico();
        };

        CargarEspecialidades();

        ListarMedicos();



    }, [HorariosPorDia, diaSeleccionado, ListarHorarioMedico, horariomedicoId]);


    function renderEspecialidades() {
        if (especialidades.length === 0) return <option value=''>No hay especialidades</option>
        return <CardSeleccionEspecialidad especialidades={especialidades} />
    }


    function renderMedicos() {
        if (medicos.length === 0) return <option value=''>No hay medicos</option>
        return <CardSeleccionMedico medicos={medicos} especialidad={especialidadId} especialidades={especialidades} />
    }


    function renderHoras() {
        if (horarios.length === 0) return <option value=''>No hay horarios disponibles</option>
        return <CardSeleccioneHora horarios={horarios} />
    }


   

    return (
        <div>
            <Titulo>
                {horariomedicoId ? 'Editar Horario Medico' : 'Crear Horario Medico'}
            </Titulo>

            <Formik
                initialValues={horarioMedico}
                enableReinitialize={true}
                onSubmit={async (values) => {



                    if (horariomedicoId) {
                        await ActualizarHorarioMedico(horariomedicoId, values);
                        handleClose();

                        
                    } else {
                        await CrearHorarioMedico(values);
                    }

                    if (diaSeleccionado) {
                        resetHorarioId();
                    }



                    resetForm();

                }}
            >{({ handleChange, handleSubmit, values }) => (
                <Form onSubmit={handleSubmit}>
                    <Formulario>

                        {!horariomedicoId && (
                            <label>Especialidad: </label>
                        )}
                        {!horariomedicoId && (
                            <select name="especialidadId" value={especialidadId} onChange={handleEspecialidadChange} >
                                <option initialvalues="" ></option>
                                {
                                    renderEspecialidades()

                                }

                            </select>
                        )}



                        <label>Medico: </label>
                        {!horariomedicoId && (
                            <select name="medicoId" value={values.medicoId} onChange={handleChange}>
                                <option initialvalues=""></option>
                                {renderMedicos()}
                            </select>
                        )}
                        {horariomedicoId && (
                            <select name="medicoId" value={values.medicoId} onChange={handleChange}>
                                <option initialvalues={values.medicoId} > {values.nombre} {values.apellido}</option>
                                {renderMedicos()}
                            </select>
                        )}


                        <label>Dia:</label>
                        <select name="dia" value={diaSeleccionado} onChange={handleDiaChange}>
                            <option initialvalues=""></option>
                            <option value="1">Domingo</option>
                            <option value="2">Lunes</option>
                            <option value="3">Martes</option>
                            <option value="4">Miercoles</option>
                            <option value="5">Jueves</option>
                            <option value="6">Viernes</option>
                            <option value="7">Sabado</option>
                        </select>






                        <label>Horas Disponibles: </label>
                        {!horariomedicoId && (
                            <select name="horarioId" value={values.horarioId} onChange={handleChange}>
                                <option initialvalues=""></option>
                                {renderHoras()}
                            </select>
                        )}


                        {horariomedicoId && (
                            <select name="horarioId" value={values.horarioId} onChange={handleChange}>
                                {(!diaSeleccionado) && (
                                    <option initialvalues={values.horarioId} hidden> {values.desde} {values.hasta}</option>
                                )}
                                {(diaSeleccionado) && (
                                
                                        <option initialvalues=""></option>
                                        
                                   
                                )}

                                {renderHoras()}
                            </select>
                        )}

                    </Formulario>

                    <Botones>
                        <Button type="submit" variant="contained" color="success"
                        >Guardar</Button>
                        <Button type="button" variant="outlined" color="error" onClick={handleClose}>Cancelar</Button>
                    </Botones>


                </Form>
            )}
            </Formik>
        </div>
    )
}

export default HorariosMedicosForm;