import "./home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="container">
        <div className="row">
          <Link to={"/turnos"}>
            <div className="button blue"> Turnos </div>
          </Link>
          <Link to={"/pacientes"}>
            <div className="button ">PACIENTES</div>
          </Link>
          <Link to={"/barrios"}>
            <div className="button ">BARRIOS</div>
          </Link>
          <Link to={"/ciudades"}>
            <div className="button">CIUDADES</div>
          </Link>
        </div>
        <div className="row">
          <Link to={"/medicos"}>
            <div className="button ">MEDICOS</div>
          </Link>
          <Link to={"/horarios"}>
            <div className="button">HORARIOS</div>
          </Link>
          <Link to={"horariosmedicos"}>
            <div className="button"> HORARIOS MEDICOS </div>
          </Link>

          <Link to={"/especialidades"}>
            <div className="button"> ESPECIALIDADES </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
