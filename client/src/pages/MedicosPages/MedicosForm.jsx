import { useMedicos } from "../../context/MedicosContext";
import { Formik, Form } from "formik";
import { useEspecialidad } from "../../context/EspecialidadContext";
import { useEffect, useState } from "react";
import CardSeleccionEspecialidad from "../../components/CardSeleccionEspecialidad";
import { Button } from "@mui/material";
import { styled } from "@mui/system";



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





function MedicosForm({ medicoId, handleCloseModal, handleClose }) {

    const { CargarEspecialidades, especialidades } = useEspecialidad();
    const { CrearMedico, ListarMedico, ActualizarMedico } = useMedicos();

    const [medicos, setMedicos] = useState({
        nombre: "",
        apellido: "",
        ci: "",
        fechaNac: "",
        telefono: "",
        direccion: "",
        intervConsulta: "",
        especialidadId: "",
        especialidad: '',
        usuarioId: "",
    });




    useEffect(() => {


        const loadMedicos = async () => {
            if (medicoId) {
                const medico = await ListarMedico(medicoId);
                const date = new Date(medico.fechaNac);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;



                setMedicos({
                    nombre: medico.nombre,
                    apellido: medico.apellido,
                    ci: medico.ci,
                    fechaNac: formattedDate,
                    telefono: medico.telefono,
                    direccion: medico.direccion,
                    intervConsulta: medico.intervConsulta,
                    especialidad: medico.especialidad || '',
                    especialidadId: medico.especialidadId,
                    usuarioId: medico.usuarioId,
                    estado: medico.estado || ''
                });


            }
        };


        loadMedicos();
        CargarEspecialidades();


    }, [medicoId, ListarMedico]);





    function renderSelect() {
        if (especialidades.length === 0) return <option value=''>No hay especialidades</option>
        return <CardSeleccionEspecialidad especialidades={especialidades} />
    }



    return (
        <div>

            <Titulo>{(medicoId) ? 'Editar Medico' : 'Crear Medico'}</Titulo>

            <div>
                <Formik
                    initialValues={medicos}
                    enableReinitialize={true}
                    onSubmit={async (values, actions) => {
                        
                        if (medicoId) {
                            await ActualizarMedico(medicoId, values);
                            
                            handleCloseModal();

                        } else {
                            await CrearMedico(values);
                        }
                        actions.resetForm();
                    }}
                >

                    {({ handleChange, handleSubmit, values }) => (
                        <Form onSubmit={handleSubmit}>

                            <Formulario>


                                <label >Nombre:</label>
                                <input type="text" value={values.nombre} name="nombre" onChange={handleChange} />



                                <label>Apellido</label>
                                <input type="text" value={values.apellido} name="apellido" onChange={handleChange} />

                                {!medicoId && (
                                    <>
                                        <label>CI:</label>
                                        <input type="text" value={values.ci} name="ci" onChange={handleChange} />
                                    </>
                                )}



                                <label>F. Nacimiento:</label>
                                <input type="date" value={values.fechaNac} name="fechaNac" onChange={handleChange} />






                                <label >Telefono:</label>
                                <input type="text" value={values.telefono} name="telefono" onChange={handleChange} />



                                <label >Direccion:</label>
                                <input type="text" value={values.direccion} name="direccion" onChange={handleChange} />



                                <label >Intervalo Consulta:</label>
                                <input type="text" value={values.intervConsulta} name="intervConsulta" onChange={handleChange} />



                                <label >Especialidad:</label>
                                {!medicoId && (
                                    <select name="especialidadId" value={values.especialidadId} onChange={handleChange}>
                                        <option initialvalues="" hidden></option>
                                        {
                                            renderSelect()
                                        }
                                    </select>
                                )}
                                {medicoId && (
                                    <select name="especialidadId" value={values.especialidadId} onChange={handleChange}>
                                        <option initialvalues={values.especialidadId}>{values.especialidad}</option>
                                        {
                                            renderSelect()
                                        }
                                    </select>
                                )}




                                <label >Usuario:</label>
                                <select name="usuarioId" value={values.usuarioId} onChange={handleChange}>
                                    <option initialvalues="" hidden></option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>

                                </select>
                                {medicoId && (
                                    <>
                                        <label >Estado:</label>
                                        <select name="estado" value={values.estado || ""} onChange={handleChange}>
                                            <option initialvalues="" hidden></option>
                                            <option value="D">Disponible</option>
                                            <option value="A">Ausente</option>
                                            <option value="I">Inactivo</option>

                                        </select>
                                    </>
                                )}

                            </Formulario>

                            <Botones>
                                <Button variant="contained" type="submit" color="success" >Guardar</Button>
                                {!medicoId &&(
                                    <Button type="button" variant="outlined" color="error" onClick={handleClose} >Cancelar</Button>
                                )}
                                {medicoId &&(
                                    <Button type="button" variant="outlined" color="error" onClick={handleCloseModal} >Cancelar</Button>
                                   
                                )}
                                

                            </Botones>

                        </Form>
                    )}

                </Formik>
            </div>

        </div>
    )
}

export default MedicosForm;