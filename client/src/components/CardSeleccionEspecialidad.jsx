function CardSeleccionEspecialidad({ especialidades }) {
    return (

       

            especialidades.map(especialidad => (
                <option key={especialidad.especialidadId} value={especialidad.especialidadId}>{especialidad.descripcion}</option>

            ))
        
    )

}

export default CardSeleccionEspecialidad;