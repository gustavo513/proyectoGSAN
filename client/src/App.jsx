import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Especialidades from './pages/EspecialidadesPages/Especialidades.jsx';
import NotFound from './pages/NotFound.jsx';
import NavBar from './components/NavBar.jsx';
import Horarios from './pages/HorariosPages/Horarios.jsx';
import Medicos from './pages/MedicosPages/Medicos.jsx';
import Barrios from './pages/barriosPages/barrios.jsx';
import Ciudad from './pages/CiudadesPage/ciudades.jsx';
import Pacientes from './pages/PacientesPage/paciente.jsx';
import { PrincipalContextProvider } from './context/PrincipalContext.jsx';
import { CssBaseline } from '@mui/material'








function App() {

  

  return (
    
      <div>

        <CssBaseline />
        <NavBar />
        <div>
          <PrincipalContextProvider>
            <Routes>

              {/* Rutas De Medicos*/}
              <Route path='/medicos' element={<Medicos />} />



              {/* Rutas De Horarios*/}


              <Route path='/horarios' element={<Horarios />} />
              {/* Ruta Pacientes*/}
                <Route path='/pacientes'element = {<Pacientes/>}/>

              {/* Rutas De Especialidades*/}
              <Route path='/especialidades' element={<Especialidades />} />
              {/* Rutas barrios*/}
              <Route path='/barrios' element = {<Barrios/>}/>

              {/* Ruta Raiz */}
              <Route path='/' element={<Home />} />

              {/* Rutas No Encontradas */}
              <Route path='*' element={<NotFound />} />
              {/* Rutas de ciudades */}
              <Route path='/ciudades' element = {<Ciudad/>}/>

            </Routes>
          </PrincipalContextProvider>


        </div>

      </div>
    

  )
}

export default App
