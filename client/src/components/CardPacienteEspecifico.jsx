import { usePacientes } from "../context/pacientesContext";
import { useEffect, useState } from "react";
import { styled } from "@mui/system";
import OrdenarFecha from "../functions/FuncionOrganizarFecha";
import { Button, Modal, Box } from '@mui/material';
import PacientesForm from "../pages/PacientesPage/pacienteForm";


const Titulo = styled("div")({
    fontSize: "40px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
});


const Formulario = styled("div")({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",

    textAlign: "center",
});

const Label = styled("div")({
    paddingTop: "2%",
})

const Direccion = styled("div")({
    display: "grid",
    gridTemplateColumns: "1fr ",
    textAlign: "center",
    paddingRight: "5%",
    paddingLeft: "5%",
    paddingBottom: "3%",

})

const Botones = styled("div")({
    display: "flex",
    justifyContent: "center",
    gap: "20%",
});






function CardPacienteEspecifico({ pacienteId, handleCloseModal }) {

    
    

    const { ListarPaciente } = usePacientes();

    const [pacientes, setPacientes] = useState({
        nombre: "",
        apellido: "",
        ci: "",
        fechaNac: "",
        sexo: "",
        sangre: "",
        barrio: "",
        ciudad: "",
        direccion: "",
        telefono: "",
        usuarioId: "",
    });

    useEffect(() => {
        const loadPacientes = async () => {
            if (pacienteId) {
                const paciente = await ListarPaciente(pacienteId);
                setPacientes({
                    nombre: paciente.nombre,
                    apellido: paciente.apellido,
                    ci: paciente.ci,
                    fechaNac: paciente.fechaNac,
                    sexo: paciente.sexo,
                    sangre: paciente.sangre,
                    barrio: paciente.barrio || "",
                    barrioId: paciente.barrioId,
                    ciudad: paciente.ciudad || "",
                    ciudadId: paciente.ciudadId,
                    telefono: paciente.telefono,
                    direccion: paciente.direccion,
                    fechaReg: paciente.fechaReg,
                    ultTurno: paciente.ultTurno,
                    usuarioId: paciente.usuarioId,
                })
            }
        }
        loadPacientes();

    }, [ListarPaciente, pacienteId]);
    

    function renderEditPaciente() {
        
        <PacientesForm pacienteId={pacienteId} handleCloseModal={handleCloseModal} />
    }


    return (
        <div>

            <Titulo>{pacientes.nombre} {pacientes.apellido}</Titulo>
            <Formulario>
                <Label>Sangre:</Label>
                <Label>{pacientes.sangre}</Label>
                <Label>Barrio:</Label>
                <Label>{pacientes.barrio}</Label>
                <Label >Ciudad:</Label>
                <Label>{pacientes.ciudad}</Label>
                <Label>Usuario:</Label>
                <Label>{pacientes.usuarioId}</Label>
                <Label >Registro:</Label>
                <Label>{OrdenarFecha(pacientes.fechaReg)}</Label>
                <Label>Ultimo Turno:</Label>
                <Label>{pacientes.ultTurno === null ? "No hay Ultimo Turno " : OrdenarFecha(pacientes.ultTurno)}</Label>


            </Formulario>
            <Direccion>
                <Label>Direccion</Label>
                <Label>{pacientes.direccion}</Label>
            </Direccion>

            



        </div>
    );
}


export default CardPacienteEspecifico;