import { useMedicos } from '../../context/MedicosContext';
import { useEffect, useState } from 'react';
import CardMedicos from '../../components/CardMedicos.jsx';
import { Modal, Button, Box } from '@mui/material';
import MedicosForm from './MedicosForm';
import { styled } from '@mui/system';



function Medicos() {


    const { medicos, ListarMedicos } = useMedicos();

    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => { setOpenModal(true) }
    const handleClose = () => { setOpenModal(false); ListarMedicos() }

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

    const Medicos = styled('div')({
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
        ListarMedicos();

    }, [])

    function renderMain() {
        if (medicos.length === 0) return <h2>No hay medicos Disponibles</h2>
        return <CardMedicos medicos={medicos} />
    }

    return (
        <div>
            <Medicos>Medicos</Medicos>


            <BotonCrear>
                <Button variant='outlined' onClick={handleOpen}>Crear Medico</Button>
            </BotonCrear>


            <Lista>
                {
                    renderMain()
                }
            </Lista>



            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="Crear Medico"
            >
                <Box sx={style}>
                    <MedicosForm handleClose={handleClose} />
                </Box>
            </Modal>

        </div>
    )
}

export default Medicos;