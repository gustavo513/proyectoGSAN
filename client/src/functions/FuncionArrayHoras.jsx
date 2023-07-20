function FuncionArrayHoras(horas) {

    const desde = horas.desde
    const hasta = horas.hasta
    const intervalo = horas.intervConsulta

    const startTime = new Date(`2000-01-01T${desde}`);
    const endTime = new Date(`2000-01-01T${hasta}`);
    const result = [];

    let currentTime = startTime;
    while (currentTime < endTime) {
        const timeString = currentTime.toLocaleTimeString('en-US', { hour12: false });
        result.push(timeString);
        currentTime = new Date(currentTime.getTime() + intervalo * 60000); // Add intervalo minutes to the current time
    }

    return result;
}

export default FuncionArrayHoras;