import { useEffect, useState } from "react";
import CardBarrios from "../../components/cardBarrios.jsx";
import { useBarrios } from "../../context/barriosContext.jsx";
import BarriosForm from "./barriosForm.jsx";
import { Modal, Button, Box } from "@mui/material";
import { styled } from '@mui/system';



function Barrios() {
    const {  CargarBarrios, Barrios } = useBarrios();

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => {setModalOpen(false); CargarBarrios()};

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

    const Barrio = styled('div')({
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
        CargarBarrios();
    },[])
    
    
    function renderMain() {
        if(Barrios.length === 0) return <h2>No hay Barrios</h2>
        return <CardBarrios barrio={Barrios} />
    }
   
    return(
        <div>
            <Barrio>Barrios</Barrio>
            
            
            <BotonCrear>
            <Button variant='outlined' onClick={handleOpenModal}>Crear Barrios</Button>
            </BotonCrear>


            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="Crear barrio"
            >
                <Box sx={style}>
                    <BarriosForm handleClose={handleCloseModal} />
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

export default Barrios;