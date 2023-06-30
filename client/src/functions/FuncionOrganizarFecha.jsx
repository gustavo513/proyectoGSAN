function OrdenarFecha(fecha) {
    const date = new Date(fecha);

    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const año = date.getFullYear();
    const nuevaFecha = dia + "-" + mes + "-" + año;

    return nuevaFecha;

}

export default OrdenarFecha;