
function SeleccioneEspecialidad(especialidadId, especialidades) {

    const especialidadFiltrada = especialidades.find(
        especialidad => especialidad.especialidadId === especialidadId
    );

    if (especialidadFiltrada) {
        const descripcion = especialidadFiltrada.descripcion;
        console.log(descripcion);
        return descripcion;
    } else {
        console.log("Especialidad no encontrada");
        return null;
    }
}

export default SeleccioneEspecialidad;