 export function FuncionesDias(d) {
    let diaString = ' '
    switch (d) {

       

        case 0:
                diaString = 'Domingo'
            break;
        case 1:
                diaString = 'Lunes'
            break;
        case 2:
                diaString = 'Martes'
            break;
        case 3:
                diaString = 'Miercoles'
            break;
        case 4:
                diaString = 'Jueves'
            break;
        case 5:
                diaString = 'Viernes'
            break;
        case 6:
                diaString = 'Sabado'
            break;

        default:
            break;
    
    }

    return diaString
}

