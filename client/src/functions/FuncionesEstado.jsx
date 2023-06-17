export function estado(e) {
    let estado = '';
    switch (e) {
        case 'D':
                estado = 'Disponible';
            break;
        
        case 'I':
                estado = 'Inactivo';
            break;

        case 'A':
                estado = 'Ausente';
            break;

        default:
            break;
        
    }

    return estado;
    
}