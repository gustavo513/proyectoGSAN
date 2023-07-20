import { Formik, Form } from 'formik';
import { useBarrios } from '../../context/barriosContext.jsx';
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




function BarriosForm({ handleClose, barrioId }) {

    const [barrios, setbarrios] = useState({ descripcion: '' });
    const { CrearBarrios, ListaBarrios, actualizarBarrios } = useBarrios();


    useEffect(() => {
        const loadbarrios = async () => {
            if (barrioId) {
                
                const barrio = await ListaBarrios(barrioId);
                
                setbarrios({
                    descripcion: barrio.descripcion,
                
                });
            }

        };
        loadbarrios();
    }, [barrioId, ListaBarrios]);



    return (
        <div>

            <Titulo>
                {barrioId ? 'Editar Barrio' : 'Crear Barrio'}
            </Titulo>
            <div>
                <Formik
                    initialValues={barrios}
                    enableReinitialize={true}
                    onSubmit={async (values, actions) => {
                        
                        if (barrioId) {
                            await actualizarBarrios(barrioId, values);
                            handleClose();
                        } else {
                            await CrearBarrios(values);

                        }
                        actions.resetForm();
                    }}
                >
                    {({ handleChange, handleSubmit, values }) => (
                        <Form onSubmit={handleSubmit}>
                            <Formulario>
                            
                                <label>Barrios: </label>
                                <input type="text"
                                    name="descripcion"
                                    placeholder='barrio'
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

export default BarriosForm