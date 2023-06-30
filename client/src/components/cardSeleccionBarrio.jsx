function CardSeleccionBarrio({ barrios }) {
        
    return (
        
            barrios.map(barrio => (
                <option key={barrio.barrioId} value={barrio.barrioId}>{barrio.descripcion}</option>

            ))
        
    )

}

export default CardSeleccionBarrio;