import SeleccioneEspecialidad from "../functions/SeleccioneEspecialidad";

function CardSeleccionMedico({ medicos, especialidad, especialidades }) {



  if (!especialidad) {
    return (
      medicos.map((medico) => (
        <option key={medico.medicoId} value={medico.medicoId}>
          {medico.nombre} {medico.apellido}
        </option>
      ))
    )
  } else {
    const especialidadId = parseInt(especialidad);
    
    const especialidadDescripcion = SeleccioneEspecialidad(especialidadId, especialidades)
    
    const medicosFiltrados = medicos.filter(medico => medico.especialidad === especialidadDescripcion)

    return (
      medicosFiltrados.map((medico) => (
        <option key={medico.medicoId} value={medico.medicoId}>
          {medico.nombre} {medico.apellido}
        </option>
      ))
    )
    
    
    
  }

}




export default CardSeleccionMedico;