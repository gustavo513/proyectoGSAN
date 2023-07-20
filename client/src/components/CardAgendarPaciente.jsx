function CardAgendarPaciente({ pacientes }) {
    return (
        pacientes.map((paciente) => (
            <option key={paciente.pacienteid} value={paciente.pacienteid}>
                {paciente.nombre} {paciente.apellido}
            </option>
        ))
    )
}

export default CardAgendarPaciente;