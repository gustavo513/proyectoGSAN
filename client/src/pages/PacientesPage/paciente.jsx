import { usePacientes } from '../../context/pacientesContext';
import { useEffect, useState } from 'react';
import CardPacientes from '../../components/cardPacientes';
import { Modal, Button, Box } from '@mui/material';
import PacientesForm from './pacienteForm';
import { styled } from '@mui/system';



function Pacientes() {


    const { pacientes, ListarPacientes } = usePacientes();

    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => { setOpenModal(true) }
    const handleClose = () => { setOpenModal(false); ListarPacientes() }

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

    const Pacientes = styled('div')({
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2%',
        marginBottom: '2%',
        fontSize: '40px',
        fontWeight: 'bold',
    })

    const BotonCrear = styled('div')({
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2%',
    })

    const Lista = styled('div')({
        display: 'flex',
        justifyContent: 'center',
    })


    useEffect(() => {
        ListarPacientes();

    }, [])



    function renderMain() {
        if (pacientes.length === 0) return <h2>No hay pacientes Disponibles</h2>
        return <CardPacientes pacientes={pacientes} />
    }

    return (
        <div>
            <Pacientes>Pacientes</Pacientes>


            <BotonCrear>
                <Button variant='outlined' onClick={handleOpen}>Crear Pacientes</Button>
            </BotonCrear>


            <Lista>
                {
                    renderMain()
                }
            </Lista>



            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="Crear Paciente"
            >
                <Box sx={style}>
                    <PacientesForm handleClose={handleClose} />
                </Box>
            </Modal>

        </div>
    )
}

export default Pacientes;