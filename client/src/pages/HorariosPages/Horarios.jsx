import { useHorario } from '../../context/HorarioContext.jsx';
import { useEffect, useState } from 'react';
import CardHorarios from '../../components/CardHorarios.jsx';
import { Button, Modal, Box } from '@mui/material';
import HorarioForm from './HorarioForm.jsx';
import { styled } from '@mui/system';




  


function Horarios() {
    const { ListarHorarios, horarios } = useHorario();
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => {setModalOpen(false); ListarHorarios()};

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '20px'
      };

    const Horario = styled('div')({
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2%',
        marginBottom: '2%',
        fontSize: '40px',
        fontWeight: 'bold',
    })

    const BotonCrear  = styled('div')({
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2%',
    })

    const Lista = styled('div')({
        display: 'flex',
        justifyContent: 'center',
    })


    useEffect(() => {
        ListarHorarios();
    }, [])



    function renderMain() {
        if (horarios.length === 0) return <h2>No hay horarios</h2>
        return <CardHorarios horarios={horarios} />
    }


    return (
        <div>

            <Horario>Horarios</Horario>
            

                <BotonCrear>
                <Button variant='outlined' onClick={handleOpen}>Crear Horario</Button>
                </BotonCrear>
                <Modal
                    open={modalOpen}
                    onClose={handleClose}
                    aria-labelledby="Crear Horario"
                >
                    <Box sx={style}>
                        <HorarioForm handleClose={handleClose} />
                    </Box>
                </Modal>

            
            <Lista>
                {renderMain()}
            </Lista>
        </div>
    )
}

export default Horarios