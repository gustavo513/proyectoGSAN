import { useEspecialidad } from '../context/EspecialidadContext'
import { estado } from '../functions/FuncionesEstado';
import React, { useState } from 'react';
import EspecialidadForm from '../pages/EspecialidadesPages/EspecialidadForm';
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
    { id: 'especiaelidad', label: 'Especialidad', minWidth: 170, align: 'center' },
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



function CardEspecialidad({ especialidades }) {


    const { EliminarEspecialidad, CargarEspecialidades } = useEspecialidad();

    const [openmodal, setOpenmodal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleOpenModal = (id) => {
        setOpenmodal(true);
        setSelectedId(id);
    }

    const handleCloseModal = () => {
        setOpenmodal(false);
        CargarEspecialidades();
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
                            {especialidades.map((especialidad) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={especialidad.especialidadId} >
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {especialidad.descripcion}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {estado(especialidad.estado)}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Espaciado>
                                                <Button variant='contained' onClick={() => handleOpenModal(especialidad.especialidadId)}>Editar</Button>
                                                <Button variant="outlined" color="error" onClick={() => EliminarEspecialidad(especialidad.especialidadId)}>Borrar</Button>
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
                    <EspecialidadForm especialidadId={selectedId} handleClose={handleCloseModal} />
                </Box>
            </Modal>

        </div>
    )
}

export default CardEspecialidad;