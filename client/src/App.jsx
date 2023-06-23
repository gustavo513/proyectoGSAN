import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Especialidades from './pages/EspecialidadesPages/Especialidades.jsx';
import NotFound from './pages/NotFound.jsx';
import NavBar from './components/NavBar.jsx';
import Horarios from './pages/HorariosPages/Horarios.jsx';
import Medicos from './pages/MedicosPages/Medicos.jsx';
import HorariosMedicos from './pages/HorariosMedicosPages/HorariosMedicos.jsx';
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
              {/* Rutas De HorariosMedicos*/}
              <Route path='/horariosMedicos' element={<HorariosMedicos />} />


              {/* Rutas De Medicos*/}
              <Route path='/medicos' element={<Medicos />} />



              {/* Rutas De Horarios*/}


              <Route path='/horarios' element={<Horarios />} />



              {/* Rutas De Especialidades*/}
              <Route path='/especialidades' element={<Especialidades />} />



              {/* Ruta Raiz */}
              <Route path='/' element={<Home />} />

              {/* Rutas No Encontradas */}
              <Route path='*' element={<NotFound />} />


            </Routes>
          </PrincipalContextProvider>


        </div>

      </div>
    

  )
}

export default App
