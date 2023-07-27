import { Formik, Form } from "formik";
import { useTurnos } from "../../context/TurnosContext";
import { useMedicos } from "../../context/MedicosContext";
import { usePacientes } from "../../context/pacientesContext";
import { useEspecialidad } from "../../context/EspecialidadContext";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import CardSeleccionMedico from "../../components/CardSeleccionMedico";
import CardAgendarPaciente from "../../components/CardAgendarPaciente";
import CardSeleccionEspecialidad from "../../components/CardSeleccionEspecialidad";

const Titulo = styled("div")({
  fontSize: "40px",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
});

const Botones = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: "20%",
});

const Formulario = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
});
function TurnosForm({ turnoId, handleClose }) {
  const { CargarEspecialidades, especialidades } = useEspecialidad();
  const { CrearTurno, ListarTurno, ActualizarTurno } = useTurnos();
  const { ListarMedicos, medicos } = useMedicos();
  const { ListarPacientes, pacientes } = usePacientes();

  const [especialidadId, setEspecialidadId] = useState("");

  const handleEspecialidadChange = (e) => {
    setEspecialidadId(e.target.value);
  };

  const [turno, setTurno] = useState({
    fecha: "",
    hora: "",
    total: "",
    pacienteid: "",
    medicoid: "",
    usuarioid: "",
  });

  useEffect(() => {
    if (turnoId) {
      const loadTurno = async () => {
        const response = await ListarTurno(turnoId);
        const date = new Date(response.fecha);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedDate = `${year}-${month
          .toString()
          .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

        setTurno({
          fecha: formattedDate,
          hora: response.hora,
          total: response.total,
          pacienteid: response.pacienteId,
          medicoid: response.medicoId,
          usuarioid: response.usuarioId,
        });
      };

      loadTurno();
    }

    ListarMedicos();
    ListarPacientes();
    CargarEspecialidades();
  }, []);

  function renderMedicos() {
    if (medicos.length === 0)
      return <option value=""> No hay medicos disponibles </option>;
    return (
      <CardSeleccionMedico
        medicos={medicos}
        especialidad={especialidadId}
        especialidades={especialidades}
      />
    );
  }
  function renderPacientes() {
    if (pacientes.length === 0)
      return <option value={""}> No hay pacientes </option>;
    return <CardAgendarPaciente pacientes={pacientes} />;
  }

  function renderEspecialidades() {
    if (especialidades.length === 0)
      return <option value="">No hay especialidades</option>;
    return <CardSeleccionEspecialidad especialidades={especialidades} />;
  }

  const resetEspecialidad = () => {
    setEspecialidadId("");
  };

  return (
    <div>
      <Titulo>{turnoId ? "Editar Turno" : "Crear Turno"}</Titulo>
      <div>
        <Formik
          initialValues={turno}
          enableReinitialize={true}
          onSubmit={async (values, actions) => {
            if (turnoId) {
              await ActualizarTurno(turnoId, values);
              handleClose();
            } else {
              await CrearTurno(values);
            }
            actions.resetForm();
            resetEspecialidad();
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Formulario>
                <label >Nro Cedula:</label>
              <input type="number" />

                <label>Paciente:</label>
                <select
                  name="pacienteid"
                  value={values.pacienteid}
                  onChange={handleChange}
                >
                  <option initialvalues="" hidden></option>
                  {renderPacientes()}
                </select>

                {!turnoId && <label>Especialidad: </label>}
                {!turnoId && (
                  <select
                    name="especialidadId"
                    value={especialidadId}
                    onChange={handleEspecialidadChange}
                  >
                    <option initialvalues=""></option>
                    {renderEspecialidades()}
                  </select>
                )}

                <label>Medico:</label>
                <select
                  name="medicoid"
                  value={values.medicoid}
                  onChange={handleChange}
                >
                  <option initialvalues="" hidden></option>
                  {renderMedicos()}
                </select>
                <label>Fecha:</label>
                <input
                  type="date"
                  name="fecha"
                  value={values.fecha}
                  onChange={handleChange}
                />

                <label>Hora</label>
                <input
                  type="time"
                  name="hora"
                  value={values.hora}
                  onChange={handleChange}
                />

                <label>Total:</label>
                <input
                  type="text"
                  name="total"
                  value={values.total}
                  onChange={handleChange}
                />

                <label>Usuario:</label>
                <select
                  name="usuarioid"
                  value={values.usuarioid}
                  onChange={handleChange}
                >
                  <option initialvalues="" hidden></option>
                  <option value="1">Admin</option>
                </select>
              </Formulario>

              <Botones>
                <Button variant="contained" type="submit" color="success">
                  Guardar
                </Button>

                <Button
                  type="button"
                  variant="outlined"
                  color="error"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
              </Botones>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default TurnosForm;
