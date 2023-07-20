import  { useEffect } from 'react';

function CardHoras( horas ) {
    console.log(horas);
    return (
        horas.map((hora, index) => (
            <option key={index} value={hora}>{hora}</option>
          ))
    )
}

export default CardHoras;