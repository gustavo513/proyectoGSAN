import { useTurnos } from "../../context/TurnosContext";
import { useState, useEffect } from "react";
import { Button, Modal, Box } from "@mui/material";
import { styled } from "@mui/system";
import TurnosForm from "./TurnosForm";
import CardTurnos from "../../components/CardTurnos";





function Turnos() {

    const { ListarTurnos, turnos } = useTurnos();
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => {setModalOpen(false); ListarTurnos()};


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

    const Turno = styled('div')({
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
        ListarTurnos();
    }, [])



    function renderMain() {
        if (turnos.length === 0) return <h2>No hay turnos</h2>
        return <CardTurnos turnos={turnos} />       
    }

    

    return (
        <div>
            <Turno>Turnos</Turno>

            <BotonCrear>
                <Button variant="outlined" onClick={handleOpen}>Crear Turno</Button>
            </BotonCrear>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                arial-labelledby="Crear Turno"
            >
                <Box sx={style}>
                    <TurnosForm handleClose={handleClose}/>
                </Box>
            </Modal>

            <Lista>
                {renderMain()}
            </Lista>

        </div>
    )
}

export default Turnos;