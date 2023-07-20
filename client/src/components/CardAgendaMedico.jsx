function CardAgendaMedico({ medicos }) {
    return (
        medicos.map((medico) => (
            <option key={medico.medicoId} value={medico.medicoId}>
                {medico.nombre} {medico.apellido}
            </option>
        ))
    )
}

export default CardAgendaMedico;