
import { Button, Modal, Box } from '@mui/material';
import PacientesForm from '../pages/PacientesPage/pacienteForm';
import React, { useState } from 'react';
import { usePacientes } from '../context/pacientesContext';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { lightBlue } from "@mui/material/colors";
import { styled } from "@mui/system";


import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import CardPacienteEspecifico from './CardPacienteEspecifico';

import OrdenarFecha from '../functions/FuncionOrganizarFecha';






const columns = [
    { id: 'nombre', label: 'Nombre', minWidth: '10%', align: 'center' },
    { id: 'apellido', label: 'Apellido', minWidth: '10%', align: 'center' },

    { id: 'ci', label: 'CI', minWidth: '10%', align: 'center' },
    { id: 'fechaNac', label: 'FechaNac', minWidth: '10%', align: 'center' },
    { id: 'sexo', label: 'Sexo', minWidth: '5%', align: 'center' },

    { id: 'telefono', label: 'Telefono', minWidth: '10%', align: 'center' },

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






function CardPacientes({ pacientes }) {

    const { ListarPacientes } = usePacientes();
    const [openModal, setOpenModal] = useState(false);
    const [selectedPacienteId, setSelectedPacienteId] = useState(null);
    const [iconSelect, setIconSelect] = useState(0);

    const handleIconSelect = (val, id) => {
        setIconSelect(val);
        setOpenModal(true);
        setSelectedPacienteId(id)
    }

    const handleOpenModal = (id) => {
        setOpenModal(true);
        setSelectedPacienteId(id);
    }

    const handleCloseModal = () => {
        setIconSelect(0);
        setOpenModal(false);
        ListarPacientes();
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

    const iconColor = {
        color: lightBlue[600],
    }




   




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
                            {pacientes.map((paciente) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={paciente.pacienteid} >
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {paciente.nombre}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {paciente.apellido}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {paciente.ci}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {OrdenarFecha(paciente.fechaNac)}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {paciente.sexo}
                                        </TableCell>

                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {paciente.telefono}
                                        </TableCell>


                                        <TableCell align="center">
                                            <Espaciado>
                                                <Button variant='contained' onClick={() => handleOpenModal(paciente.pacienteid)}>Editar</Button>
                                                <Button variant="outlined" color="error" >Borrar</Button>
                                                <IconButton sx={ iconColor} onClick={() => handleIconSelect(1, paciente.pacienteid)}>
                                                    <AddCircleIcon />
                                                </IconButton>
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
                onClose={() => {setOpenModal(false), setIconSelect(0)} }
                aria-labelledby="Crear Paciente"
            >
                <Box sx={style}>
                    {iconSelect === 0 &&(
                    <PacientesForm pacienteId={selectedPacienteId} handleCloseModal={handleCloseModal} />
                    )}
                    {iconSelect === 1 && (
                    <CardPacienteEspecifico pacienteId={selectedPacienteId} handleCloseModal={handleCloseModal} />
                    )}
                </Box>
            </Modal>

        </div>
    )
}

export default CardPacientes