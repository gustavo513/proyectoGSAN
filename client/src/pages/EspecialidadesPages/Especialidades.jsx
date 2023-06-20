import { useEffect, useState } from "react";
import CardEspecialidad from "../../components/CardEspecialidad.jsx";
import { useEspecialidad } from "../../context/EspecialidadContext.jsx";
import EspecialidadForm from "./EspecialidadForm.jsx";
import { Modal, Button, Box } from "@mui/material";
import { styled } from '@mui/system';


function Especialidades() {
    const {  CargarEspecialidades, especialidades } = useEspecialidad();

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => {setModalOpen(false); CargarEspecialidades()};

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

    const Especialidad = styled('div')({
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
        CargarEspecialidades();
    },[])
    
    
    function renderMain() {
        if(especialidades.length === 0) return <h2>No hay especialidades</h2>
        return <CardEspecialidad especialidades={especialidades} />
    }
   
    return(
        <div>
            <Especialidad>Especialidades</Especialidad>
            
            
            <BotonCrear>
            <Button variant='outlined' onClick={handleOpenModal}>Crear Especialidad</Button>
            </BotonCrear>


            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="Crear Especialidad"
            >
                <Box sx={style}>
                    <EspecialidadForm handleClose={handleCloseModal} />
                </Box>
            </Modal>

            <Lista>
                {
                    renderMain()
                }
            </Lista>

        </div>
    )
}

export default Especialidades;