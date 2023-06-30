import { useEffect, useState } from "react";
import CardCiudad from "../../components/cardCiudades.jsx";
import { useCiudad } from "../../context/CiudadContext.jsx";
import CiudadForm from "./CiudadesForm.jsx";
import { Modal, Button, Box } from "@mui/material";
import { styled } from '@mui/system';



function Ciudad() {
    const {  CargarCiudad, Ciudad } = useCiudad();

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => {setModalOpen(false); CargarCiudad()};

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

    const CiudadPage = styled('div')({
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
        CargarCiudad();
    },[])
    
    
    function renderMain() {
        if(Ciudad.length === 0) return <h2>No hay Ciudad</h2>
        return <CardCiudad ciudad={Ciudad} />
    }
   
    return(
        <div>
            <CiudadPage>Ciudad</CiudadPage>
            
            
            <BotonCrear>
            <Button variant='outlined' onClick={handleOpenModal}>Crear Ciudad</Button>
            </BotonCrear>


            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="Crear Ciuadad"
            >
                <Box sx={style}>
                    <CiudadForm handleClose={handleCloseModal} />
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

export default Ciudad;