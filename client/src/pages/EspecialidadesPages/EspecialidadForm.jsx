import { Formik, Form } from 'formik';
import { useEspecialidad } from '../../context/EspecialidadContext.jsx';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
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




function EspecialidadForm({ handleClose, especialidadId }) {

    const [especialidad, setEspecialidad] = useState({ descripcion: '' });
    const { CrearEspecialidad, ListaEspecialidad, actualizarEspecialidad } = useEspecialidad();


    useEffect(() => {
        const loadEspecialidad = async () => {
            if (especialidadId) {
                const especialidad = await ListaEspecialidad(especialidadId);
                setEspecialidad({
                    descripcion: especialidad.descripcion,
                    estado: especialidad.estado || ''
                });
            }

        };
        loadEspecialidad();
    }, [especialidadId, ListaEspecialidad]);

    return (
        <div>

            <Titulo>
                {especialidadId ? 'Editar Especialidad' : 'Crear Especialidad'}
            </Titulo>
            <div>
                <Formik
                    initialValues={especialidad}
                    enableReinitialize={true}
                    onSubmit={async (values, actions) => {
                        
                        if (especialidadId) {
                            await actualizarEspecialidad(especialidadId, values);
                            handleClose();
                        } else {
                            await CrearEspecialidad(values);

                        }
                        actions.resetForm();
                    }}
                >
                    {({ handleChange, handleSubmit, values }) => (
                        <Form onSubmit={handleSubmit}>
                            <Formulario>
                            
                                <label>Especialidad: </label>
                                <input type="text"
                                    name="descripcion"
                                    placeholder='especialida'
                                    onChange={handleChange}
                                    value={values.descripcion}
                                />
                            
                            {especialidadId && (
                                <>
                                    <label>Estado:</label>

                                    <select name="estado" value={values.estado} onChange={handleChange}>
                                        <option initialvalues="" hidden></option>
                                        <option value="D">Disponible</option>
                                        <option value="I">Inactivo</option>
                                    </select>
                                </>
                            )}

                            </Formulario>

                            <Botones>
                                <Button type='submit' variant='contained' color='success' >Guardar</Button>
                                <Button type='button' variant='outlined' color='error' onClick={handleClose}>Cancelar</Button>
                            </Botones>
                        </Form>
                    )}

                </Formik>
            </div>
        </div>
    )
}

export default EspecialidadForm