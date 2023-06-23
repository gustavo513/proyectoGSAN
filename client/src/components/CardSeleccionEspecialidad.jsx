function CardSeleccionEspecialidad({ especialidades }) {
    return (

        console.log(especialidades),

            especialidades.map(especialidad => (
                <option key={especialidad.especialidadId} value={especialidad.especialidadId}>{especialidad.descripcion}</option>

            ))
        
    )

}

export default CardSeleccionEspecialidad;