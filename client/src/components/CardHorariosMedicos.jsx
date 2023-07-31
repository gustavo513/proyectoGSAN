import { useHorarioMedico } from "../context/HorarioMedicoContext.jsx";
import { FuncionesDias } from "../functions/FuncionesDias.jsx";
import { estado } from "../functions/FuncionesEstado.jsx";
import  { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import HorariosMedicosForm from "../pages/HorariosMedicosPages/HorariosMedicosForm.jsx";
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
    { id: 'nombre', label: 'Nombre', minWidth: '10%', align: 'center' },
    { id: 'apellido', label: 'Apellido', minWidth: '10%', align: 'center' },
    { id: 'especialidad', label: 'Especialidad', minWidth: '10%', align: 'center' },
    { id: 'intervConsulta', label: 'Int.Consulta', minWidth: '10%', align: 'center' },
    { id: 'dia', label: 'Dia', minWidth: '10%', align: 'center' },
    { id: 'desde', label: 'Desde', minWidth: '10%', align: 'center' },
    { id: 'hasta', label: 'Hasta', minWidth: '10%', align: 'center' },
    { id: 'estado', label: 'Estado', minWidth: '10%', align: 'center' },
    {
        id: 'acciones',
        label: 'Acciones',
        minWidth: 360,
        align: 'center',

    },

]

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

const Espaciado = styled('div')({
    display: 'flex',
    justifyContent: 'space-around',
})


function CardHorariosMedicos({horariosmedicos}) {


    const { ListarHorariosMedicos } = useHorarioMedico();
    const [openmodal, setOpenmodal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleOpenModal = (id) => {
        setOpenmodal(true);
        setSelectedId(id);
    }

    const handleCloseModal = () => {
        setOpenmodal(false);
        ListarHorariosMedicos();
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
                            {horariosmedicos.map((horariomedico) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={horariomedico.horariomedicoid} >
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {horariomedico.nombre}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {horariomedico.apellido}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {horariomedico.especialidad}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {horariomedico.intervConsulta}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {FuncionesDias(horariomedico.dia)}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {horariomedico.desde}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {horariomedico.hasta}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '20px' }}>
                                            {estado(horariomedico.estado)}
                                        </TableCell>
                                        <TableCell align="center" >
                                            <Espaciado>
                                                <Button variant="contained" onClick={() => handleOpenModal(horariomedico.horariomedicoid)}>Editar</Button>
                                               
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
                    <HorariosMedicosForm horariomedicoId={selectedId} handleClose={handleCloseModal} />
                </Box>
            </Modal>
        </div>
    )
}

export default CardHorariosMedicos;