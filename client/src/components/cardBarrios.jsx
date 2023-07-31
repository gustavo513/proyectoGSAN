
import { useBarrios } from '../context/barriosContext';
//import { estado } from '../functions/FuncionesEstado';
import  { useState } from 'react';
import BarriosForm from '../pages/barriosPages/barriosForm';
import { Button, Modal, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { lightBlue } from "@mui/material/colors";
import { styled } from "@mui/system";
const columns = [
   // { id: 'especiaelidad', label: 'Especialidad', minWidth: 170, align: 'center' },
    { id: 'barrio', label: 'Barrios', minWidth: 170, align: 'center' },

    {
        id: 'acciones',
        label: 'Acciones',
        minWidth: 360,
        align: 'center',

    },
   
]



const Espaciado = styled('div')({
    display: 'flex',
    justifyContent: 'space-around',
})



function CardBarrios({ barrio }) {


    const { EliminarBarrios, CargarBarrios } = useBarrios();

    const [openmodal, setOpenmodal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleOpenModal = (barrioId) => {
        setOpenmodal(true);
        setSelectedId(barrioId);
    }

    const handleCloseModal = () => {
        setOpenmodal(false);
        CargarBarrios();
    }


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


    return (

        <div>

            <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom: 3, boxShadow: 24 }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead  >
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, fontWeight: 'bold', backgroundColor: lightBlue[600], color: 'white', fontSize: '20px' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {barrio.map((barrios) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={barrios.barrioId} >
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {barrios.descripcion}
                                        </TableCell>
                                       
                                        <TableCell align="center">
                                            <Espaciado>
                                                <Button variant='contained' onClick={() => handleOpenModal(barrios.barrioId)}>Editar</Button>
                                                
                                            </Espaciado>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>

                            

                    </Table>
                </TableContainer>
                
            </Paper>




            <Modal
                open={openmodal}
                onClose={handleCloseModal}
                aria-labelledby="Crear Horario"
            >
                <Box sx={style}>
                    <BarriosForm barrioId={selectedId} handleClose={handleCloseModal} />
                </Box>
            </Modal>

        </div>
    )
}

export default CardBarrios;