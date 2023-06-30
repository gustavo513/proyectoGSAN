function CardSeleccionCiudad({ ciudades }) {
    return (
        
            ciudades.map(ciudad => (
                <option key={ciudad.ciudadId} value={ciudad.ciudadId}>{ciudad.descripcion}</option>

            ))
        
    )

}

export default CardSeleccionCiudad;