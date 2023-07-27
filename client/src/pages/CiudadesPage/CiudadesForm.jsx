import { Formik, Form } from 'formik';
import { useCiudad } from '../../context/CiudadContext.jsx';
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




function CiudadForm({ handleClose, ciudadId }) {

    const [Ciudad, setCiudad] = useState({ descripcion: '' });
    const { CrearCiudad, ListaCiudad, actualizarCiudad } = useCiudad();


    useEffect(() => {
        const loadCiudad = async () => {
            if (ciudadId) {
                const barrio = await ListaCiudad(ciudadId);
                setCiudad({
                    descripcion: barrio.descripcion,
                
                });
            }

        };
        loadCiudad();
    }, [ciudadId, ListaCiudad]);

    return (
        <div>

            <Titulo>
                {ciudadId ? 'Editar Ciudad' : 'Crear Ciudad'}
            </Titulo>
            <div>
                <Formik
                    initialValues={Ciudad}
                    enableReinitialize={true}
                    onSubmit={async (values, actions) => {
                        
                        if (ciudadId) {
                            await actualizarCiudad(ciudadId, values);
                            handleClose();
                        } else {
                            await CrearCiudad(values);

                        }
                        actions.resetForm();
                    }}
                >
                    {({ handleChange, handleSubmit, values }) => (
                        <Form onSubmit={handleSubmit}>
                            <Formulario>
                            
                                <label>Ciudad: </label>
                                <input type="text"
                                    name="descripcion"
                                    placeholder='Ciudad'
                                    onChange={handleChange}
                                    value={values.descripcion}
                                />
                         
                           

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

export default CiudadForm