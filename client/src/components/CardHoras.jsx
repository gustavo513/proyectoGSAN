import { useEffect } from 'react';

function CardHoras({ horas }) {


    return (
        Array.isArray(horas) ? (
            horas.map(hora => (
                <option key={hora} value={hora}>{hora}</option>
            ))
        ) : null
    )
}

export default CardHoras;