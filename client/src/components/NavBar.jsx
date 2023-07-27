import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { styled } from '@mui/system';
import { lightBlue } from "@mui/material/colors";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Navegacion = styled('div')({

    backgroundColor: lightBlue[600],
    width: '100%',
    display: 'flex',
    height: '120px',
    alignItems: 'center',
    justifyContent: 'space-between',

});

const Sanatorio = styled('div')({
    fontSize: '50px',
    fontWeight: 'bold',
    marginLeft: '20%',
})

const Paginas = styled('div')({
    fontSize: '20px',
    fontWeight: 'bold',

})

const HomeLink = styled('div')({
    alignItems: 'center',
    display: 'flex',
    marginRight: '2%',
    gap: '30px',
    fontSize: '20px',
    fontWeight: 'bold',

})



function NavBar() {

    const navigate = useNavigate();
    const [Options, setOptions] = useState('');

    const handleSelectedChange = (event) => {
        const valor = setOptions(event.target.value)


        if (event.target.value === 'horario') {
            navigate('/horarios');
        } else if (event.target.value === 'medicos') {
            navigate('/medicos');
        } else if (event.target.value === 'especialidades') {
            navigate('/especialidades');
        }
        else if (event.target.value === 'h.medico') {
            navigate('/horariosMedicos');
        }
        else if (event.target.value === 'barrios') {
            navigate('/barrios');
        } else if (event.target.value === 'ciudades') {
            navigate('/ciudades');
        }
        else if (event.target.value === 'pacientes') {
            navigate('/pacientes');
        }
        else if (event.target.value === 'turnos') {
            navigate('/turnos');
        }
    };


    useEffect(() => {
        setOptions('');
    }, [navigate]);




    return (
        <Navegacion>
            <div>
                <Sanatorio><Link style={{ textDecoration: 'none', color: 'white' }} to="/">Sanatorio</Link></Sanatorio>
            </div>

            <HomeLink>
                <div>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to={'/'}>HOME</Link>
                </div>

                <div>
                    <Paginas>


                        <Box sx={{ minWidth: 120, backgroundColor: "lightgray" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Page</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={Options}
                                    label="Page"
                                    onChange={handleSelectedChange}
                                >
                                    <MenuItem value={'horario'}>Horarios</MenuItem>
                                    <MenuItem value={'medicos'}>Medicos</MenuItem>
                                    <MenuItem value={'especialidades'}>Especialidades</MenuItem>
                                    <MenuItem value={'h.medico'}>Hra.Medico</MenuItem>
                                    <MenuItem value={'barrios'}>Barrios</MenuItem>
                                    <MenuItem value={'ciudades'}>Ciudades</MenuItem>
                                    <MenuItem value={'pacientes'}>Pacientes</MenuItem>
                                    <MenuItem value={'turnos'}>Turnos</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>




                    </Paginas>
                </div>
            </HomeLink>

        </Navegacion>
    )
}

export default NavBar