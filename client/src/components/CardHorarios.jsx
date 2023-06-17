import { useHorario } from "../context/HorarioContext.jsx";
import { FuncionesDias } from "../functions/FuncionesDias.jsx";
import { estado } from "../functions/FuncionesEstado.jsx";
import  { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import HorarioForm from "../pages/HorariosPages/HorarioForm.jsx";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { lightBlue } from "@mui/material/colors";
import { styled } from "@mui/system";
import * as React from 'react';



const columns = [
    { id: 'dia', label: 'Dia', minWidth: 170, align: 'center' },
    { id: 'desde', label: 'Desde', minWidth: 170, align: 'center' },
    { id: 'hasta', label: 'Hasta', minWidth: 170, align: 'center' },
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


  


function CardHorarios({ horarios }) {

    

    const { EliminarHorario, ListarHorarios } = useHorario();

    const [openmodal, setOpenmodal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleOpenModal = (id) => {
        setOpenmodal(true);
        setSelectedId(id);
    }

    const handleCloseModal = () => {
        setOpenmodal(false);
        ListarHorarios();
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
                            {horarios.map((horario) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={horario.horarioId} >
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {FuncionesDias(horario.dia)}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {horario.desde}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {horario.hasta}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {estado(horario.estado)}
                                        </TableCell>
                                        <TableCell align="center" >
                                            <Espaciado>
                                                <Button variant="contained" onClick={() => handleOpenModal(horario.horarioId)}>Editar</Button>
                                                <Button variant="outlined" color="error" onClick={() => EliminarHorario(horario.horarioId)}>Borrar</Button>
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
                aria-labelledby="Editar Horario"
            >
                <Box sx={style}>
                    <HorarioForm horarioId={selectedId} handleClose={handleCloseModal} />
                </Box>
            </Modal>

        </div>
    )

}

export default CardHorarios;

