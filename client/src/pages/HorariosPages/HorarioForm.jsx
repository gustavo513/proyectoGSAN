import { Formik, Form } from "formik";
import { useHorario } from "../../context/HorarioContext.jsx";
import { useEffect, useState } from "react";
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






function HorarioForm({ horarioId, handleClose }) {




    const { CrearHorario, ListarHorario, ActualizarHorario } = useHorario();
    const [horarios, setHorarios] = useState({ dia: '', desde: '', hasta: '' });

    useEffect(() => {
        const loadHorario = async () => {
            if (horarioId) {
                const horario = await ListarHorario(horarioId);
                setHorarios({
                    dia: horario.dia,
                    desde: horario.desde,
                    hasta: horario.hasta,
                    estado: horario.estado || ''
                });
            }


        }

        loadHorario();


    }, [horarioId, ListarHorario]);





    return (
        <div>

            <Titulo>
                {horarioId ? 'Editar Horario' : 'Crear Horario'}
            </Titulo>

            <Formik
                initialValues={horarios}
                enableReinitialize={true}
                onSubmit={async (values, actions) => {

                    

                    if (horarioId) {
                        await ActualizarHorario(horarioId, values);
                        handleClose();
                    } else {
                          await CrearHorario(values);
                      
                    }

                    
                    
                   

                    actions.resetForm();
                }}
            >{({ handleChange, handleSubmit, values }) => (
                <Form onSubmit={handleSubmit}>
                    <Formulario>
                        


                            <label >Dia:</label>
                            <select name="dia" value={values.dia} onChange={handleChange}>
                                <option initialvalues=""></option>
                                <option value="0">Domingo</option>
                                <option value="1">Lunes</option>
                                <option value="2">Martes</option>
                                <option value="3">Miercoles</option>
                                <option value="4">Jueves</option>
                                <option value="5">Viernes</option>
                                <option value="6">Sabado</option>
                            </select>


                            <label>Desde:</label>
                            <input type="time" name="desde" value={values.desde} onChange={handleChange} />

                            <label>Hasta: </label>
                            <input type="time" name="hasta" value={values.hasta} onChange={handleChange} />

                            
                            {horarioId && (

                                <>
                                    <label>Estado:</label>
                                    <select name="estado" value={values.estado} onChange={handleChange}>

                                        <option value="D">Disponible</option>
                                        <option value="I">Inactivo</option>

                                    </select>
                                
                                </>

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

export default HorarioForm;