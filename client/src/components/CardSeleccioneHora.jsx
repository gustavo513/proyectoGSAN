function CardSeleccioneHora({ horarios }) {
   
    return (
        horarios.map(horario => (
            <option key={horario.horarioId} value={horario.horarioId}>{horario.desde}  {horario.hasta}</option>
        ))
    )
}

export default CardSeleccioneHora;