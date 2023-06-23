import { useMedicos } from "../context/MedicosContext";

function SeleccioneMedico(medicos, especialidadSeleccionada) {

    const { MedicosPorEspecialidad } = useMedicos();


    if (medicos.length === 0) { return <option value=''>No hay especialidades</option> }
    else if (!especialidadSeleccionada) {
        return (
            medicos.map(medico => (
                <option key={medico.medicoId} value={medico.medicoId}>{medico.nombre} {medico.apellido}</option>
            ))
        )
    }   
    else {
        const especialidad = parseInt(especialidadSeleccionada);
        console.log('Antes de llamar a MedicosPorEspecialidad');
        MedicosPorEspecialidad(especialidad)
            .then(medicosFiltrados => {
                console.log('Después de llamar a MedicosPorEspecialidad', medicosFiltrados);
                return (

                    medicosFiltrados.map(medico => (
                        <option key={medico.medicoId} value={medico.medicoId}>{medico.nombre} {medico.apellido}</option>
                    ))
                
                    
                );
            })
            .catch(error => {
                console.error(error);
            });
    }

}

export default SeleccioneMedico;