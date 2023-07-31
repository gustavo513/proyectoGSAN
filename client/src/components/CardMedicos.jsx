import { estado } from '../functions/FuncionesEstado';
import { Button, Modal, Box } from '@mui/material';
import MedicosForm from '../pages/MedicosPages/MedicosForm';
import  { useState } from 'react';
import { useMedicos } from '../context/MedicosContext';
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
    { id: 'nombre', label: 'Nombre', minWidth: 170, align: 'center' },
    { id: 'apellido', label: 'Apellido', minWidth: 170, align: 'center' },
    { id: 'telefono', label: 'Telefono', minWidth: 170, align: 'center' },
    { id: 'especialidad', label: 'Especialidad', minWidth: 170, align: 'center' },
    { id: 'estado', label: 'Estado', minWidth: 170, align: 'center' },
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



function CardMedicos({ medicos }) {

    const { ListarMedicos } = useMedicos();
    const [openModal, setOpenModal] = useState(false);
    const [selectedMedicoId, setSelectedMedicoId] = useState(null);

    const handleOpenModal = (id) => {
        setOpenModal(true);
        setSelectedMedicoId(id);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        ListarMedicos();
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
                            {medicos.map((medico) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={medico.medicoId} >
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {medico.nombre}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {medico.apellido}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {medico.telefono}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {medico.especialidad}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {estado(medico.estado)}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Espaciado>
                                                <Button variant='contained' onClick={() => handleOpenModal(medico.medicoId)}>Editar</Button>
                                               
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
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="Crear Medico"
            >
                <Box sx={style}>
                    <MedicosForm medicoId={selectedMedicoId} handleCloseModal={handleCloseModal} />
                </Box>
            </Modal>

        </div>
    )
}

export default CardMedicos