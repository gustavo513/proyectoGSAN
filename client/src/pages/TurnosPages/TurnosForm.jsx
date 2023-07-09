import { Form, Formik } from 'formik';
import { useTurnos } from '../../context/TurnosContext';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import { useMedicos } from '../../context/MedicosContext';
import { useEspecialidad } from '../../context/EspecialidadContext';
import CardSeleccionMedico from '../../components/CardSeleccionMedico';
import DiasDisponibles from '../../functions/FuncionDiasDisponibles';
import CardSeleccionEspecialidad from '../../components/CardSeleccionEspecialidad';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';



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


function TurnosForm({ turnoId, handleClose }) {

    const { CargarEspecialidades, especialidades } = useEspecialidad();

    const { CrearTurno, ListarTurno, ActualizarTurno } = useTurnos();
    const { ListarMedicos, medicos } = useMedicos();
    const [medicoElegido, setMedicoElegido] = useState(null);

    const [especialidadId, setEspecialidadId] = useState('');

    const handleEspecialidadChange = (e) => {
        setEspecialidadId(e.target.value);
    }


    const [turno, setTurno] = useState({ fecha: '', hora: '', total: '', pacienteId: '', medicoId: '', usuarioId: '' });




    useEffect(() => {
        ListarMedicos();
        CargarEspecialidades();
    }, [])


    function renderMedicos() {
        if (medicos.length === 0) return <option value=""> No hay medicos disponibles </option>
        return <CardSeleccionMedico medicos={medicos} especialidad={especialidadId} especialidades={especialidades} />

    }


    function renderEspecialidades() {
        if (especialidades.length === 0) return <option value=''>No hay especialidades</option>
        return <CardSeleccionEspecialidad especialidades={especialidades} />
    }

    const dias = DiasDisponibles(medicoElegido);
    console.log(dias);



    return (
        <div>

            <Titulo>{turnoId ? 'Editar Turno' : 'Crear Turno'}</Titulo>

            <Formik
                initialValues={turno}
                enableReinitialize={true}
                onSubmit={async (actions, values) => {
                    console.log(values);
                    await CrearTurno(values);
                    actions.resetForm();


                }}
            >{({ handleSubmit, handleChange, values }) => (
                <Form onSubmit={handleSubmit}>
                    <Formulario>

                        <label>Especialidad: </label>

                        <select name="especialidadId" value={especialidadId} onChange={handleEspecialidadChange} >
                            <option initialvalues="" ></option>
                            {
                                renderEspecialidades()

                            }

                        </select>

                        <label>Medico:</label>
                        <select name="medicoId" value={values.medicoId} onChange={(event) => { handleChange(event); setMedicoElegido(event.target.value) }}>
                            <option initialvalues=""></option>
                            {renderMedicos()}
                        </select>

                        <label>Fecha:</label>
                        <input type="date" name="fecha" onChange={handleChange} />
                        <label>Hora:</label>
                        <select name="hora" onChange={handleChange}>
                            <option initialvalues="" hidden></option>
                        </select>
                    </Formulario>
                </Form>
            )}

            </Formik>


        </div>
    )
}


export default TurnosForm;