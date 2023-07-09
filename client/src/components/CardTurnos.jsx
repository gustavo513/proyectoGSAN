import { useTurnos } from "../context/TurnosContext";
import { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import TurnosForm from "../pages/TurnosPages/TurnosForm";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from "@mui/system";
import { lightBlue } from "@mui/material/colors";
import OrdenarFecha from "../functions/FuncionOrganizarFecha";
import FuncionAjustarHora from "../functions/FuncionAjustarHora";



const columns = [
    { id: 'paciente', label: 'Paciente', minWidth: '30%', align: 'center' },
    { id: 'fecha', label: 'Fecha', minWidth: '10%', align: 'center' },
    { id: 'hora', label: 'Hora', minWidth: '10%', align: 'center' },
    { id: 'estado', label: 'Estado', minWidth: '10%', align: 'center' },
    { id: 'medico', label: 'Medico', minWidth: '30%', align: 'center' },
    { id: 'total', label: 'Total', minWidth: '10%', align: 'center' },
    {
        id: 'acciones',
        label: 'Acciones',
        minWidth: 300,
        align: 'center',

    },

]

const Espaciado = styled('div')({
    display: 'flex',
    justifyContent: 'space-around',
})


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


function CardTurnos({ turnos }) {

    const { ListarTurnos } = useTurnos();

    const [openmodal, setOpenmodal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    

    const handleOpenModal = (id) => {
        setOpenmodal(true);
        setSelectedId(id);
    }

    const handleCloseModal = () => {
        setOpenmodal(false);
        ListarTurnos();
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
                            {turnos.map((turno) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={turno.turnoId} >
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {turno.nombrePaciente} {turno.apellidoPaciente}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {OrdenarFecha(turno.fecha)}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {FuncionAjustarHora(turno.hora)}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {turno.estado}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {turno.nombreMedico} {turno.apellidoMedico}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {turno.total}
                                        </TableCell>
                                        <TableCell align="center" >
                                            <Espaciado>
                                                <Button variant="contained" onClick={() => handleOpenModal(turno.turnoId)}>Editar</Button>
                                                <Button variant="outlined" color="error" onClick={() => EliminarHorario(turno.turnoId)}>Borrar</Button>
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
                aria-labelledby="Editar Turno"
            >
                <Box sx={style}>
                    <TurnosForm turnoId={selectedId} handleClose={handleCloseModal} />
                </Box>
            </Modal>

        </div>
    )
}

export default CardTurnos;