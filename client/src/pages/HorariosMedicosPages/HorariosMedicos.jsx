import { useHorarioMedico } from '../../context/HorarioMedicoContext';
import { useEffect, useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import { styled } from '@mui/system';
import HorariosMedicosForm from './HorariosMedicosForm';
import CardHorariosMedicos from '../../components/CardHorariosMedicos';


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

const Titulo = styled('div')({
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


function HorariosMedicos() {

    const { ListarHorariosMedicos, horariosMedicos } = useHorarioMedico();

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => { ListarHorariosMedicos(); setModalOpen(false)};

    useEffect(() => {
        ListarHorariosMedicos();
    }, [])


    function renderMain() {
        if (horariosMedicos.length === 0) return <h2>No hay horarios</h2>
        return <CardHorariosMedicos horariosmedicos={horariosMedicos} />
    }



    return (
        <div>
            <Titulo>Horarios Medicos</Titulo>
            

            <BotonCrear>
            <Button variant='outlined' onClick={handleOpen}>Crear Horario Medico</Button>
            </BotonCrear>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="Crear Horario"
            >
                <Box sx={style}>
                    <HorariosMedicosForm handleClose={handleClose} />
                </Box>
            </Modal>

        
        <Lista>
            {renderMain()}
        </Lista>
        </div>
    )
}

export default HorariosMedicos