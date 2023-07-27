function CardAgendarPaciente({ pacientes, cedula }) {
    
    const pacienteElegido = pacientes.filter(paciente => paciente.ci === cedula);
    
    return (
        pacienteElegido.map((paciente) => (
            <option key={paciente.pacienteid} value={paciente.pacienteid} >
                {paciente.nombre} {paciente.apellido}
            </option>
        ))
    )
}

export default CardAgendarPaciente;