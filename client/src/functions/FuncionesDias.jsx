 export function FuncionesDias(d) {
    let diaString = ' '
    switch (d) {

       

        case 1:
                diaString = 'Domingo'
            break;
        case 2:
                diaString = 'Lunes'
            break;
        case 3:
                diaString = 'Martes'
            break;
        case 4:
                diaString = 'Miercoles'
            break;
        case 5:
                diaString = 'Jueves'
            break;
        case 6:
                diaString = 'Viernes'
            break;
        case 7:
                diaString = 'Sabado'
            break;

        default:
            break;
    
    }

    return diaString
}

