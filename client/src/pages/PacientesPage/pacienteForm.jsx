import { usePacientes } from "../../context/pacientesContext";
import { Formik, Form } from "formik";
import { useBarrios } from "../../context/barriosContext";
import { useCiudad } from "../../context/CiudadContext";
import { useEffect, useState } from "react";
import CardSeleccionCiudad from "../../components/CardSelecCiudad";
import CardSeleccionBarrio from "../../components/cardSeleccionBarrio";
import { Button } from "@mui/material";
import { styled } from "@mui/system";

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

const Direccion = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr ",
  textAlign: "center",
  paddingRight: "5%",
  paddingLeft: "5%",
  paddingBottom: "3%",

})


function PacientesForm({ pacienteId, handleCloseModal, handleClose }) {

  const { CrearPacientes, ListarPaciente, ActualizarPacientes } = usePacientes();

  const { Barrios, CargarBarrios } = useBarrios();

  const { Ciudad, CargarCiudad } = useCiudad();



  const [pacientes, setPacientes] = useState({
    nombre: "",
    apellido: "",
    ci: "",
    fechaNac: "",
    sexo: "",
    sangre: "",
    barrioId: "",
    barrio: "",
    ciudadId: "",
    ciudad: "",
    direccion: "",
    telefono: "",
    usuarioId: "",
  });

  useEffect(() => {
    const loadPacientes = async () => {
      if (pacienteId) {
        const paciente = await ListarPaciente(pacienteId);
        const date = new Date(paciente.fechaNac);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedDate = `${year}-${month
          .toString()
          .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

        setPacientes({
          nombre: paciente.nombre,
          apellido: paciente.apellido,
          ci: paciente.ci,
          fechaNac: formattedDate,
          sexo: paciente.sexo,
          sangre: paciente.sangre,
          barrioId: paciente.barrioId,
          barrio: paciente.barrio || "",
          ciudadId: paciente.ciudadId,
          ciudad: paciente.ciudad || "",
          telefono: paciente.telefono,
          direccion: paciente.direccion,
          usuarioId: paciente.usuarioId,
        });
      }
    };

    loadPacientes();
    CargarBarrios();
    CargarCiudad();

  }, [pacienteId, ListarPaciente]);

  function renderSelectCiudad() {
    if (Ciudad.length === 0)
      return <option value="">No hay Ciudades</option>;
    return <CardSeleccionCiudad ciudades={Ciudad} />;
  }
  function renderSelectBarrio() {
    if (Barrios.length === 0)
      return <option value="">No hay Barrio</option>;
    return <CardSeleccionBarrio barrios={Barrios} />;
  }



  return (
    <div>
      <Titulo>{pacienteId ? "Editar Paciente" : "Crear Paciente"}</Titulo>

      <div>
        <Formik
          initialValues={pacientes}
          enableReinitialize={true}
          onSubmit={async (values, actions) => {

            if (pacienteId) {
              await ActualizarPacientes(pacienteId, values);

            } else {
              await CrearPacientes(values);

            }
            actions.resetForm();
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Formulario>
                <label>Nombre:</label>
                <input
                  type="text"
                  value={values.nombre}
                  name="nombre"
                  onChange={handleChange}
                />

                <label>Apellido</label>
                <input
                  type="text"
                  value={values.apellido}
                  name="apellido"
                  onChange={handleChange}
                />

                {!pacienteId && (
                  <>
                    <label>CI:</label>
                    <input
                      type="text"
                      value={values.ci}
                      name="ci"
                      onChange={handleChange}
                    />
                  </>
                )}

                <label>F. Nacimiento:</label>
                <input
                  type="date"
                  value={values.fechaNac}
                  name="fechaNac"
                  onChange={handleChange}
                />
                <label>Sexo</label>
                <select

                  value={values.sexo}
                  name="sexo"
                  onChange={handleChange}
                >
                  <option initialvalues="" hidden></option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>

                </select>
                <label>Sangre</label>
                <input
                  type="text"
                  value={values.sangre}
                  name="sangre"
                  onChange={handleChange}
                />


                <label>Barrio:</label>
                {!pacienteId && (
                  <select
                    name="barrioId"
                    value={values.barrioId}
                    onChange={handleChange}
                  >
                    <option initialvalues="" hidden></option>
                    {renderSelectBarrio()}
                  </select>
                )}
                {pacienteId && (
                  <select
                    name="barrioId"
                    value={values.barrioId}
                    onChange={handleChange}
                  >
                    <option initialvalues={values.barrioId} > {values.barrio} </option>
                    {renderSelectBarrio()}
                  </select>
                )}


                <label>Ciudad:</label>
                {!pacienteId && (
                  <select
                    name="ciudadId"
                    value={values.ciudadId}
                    onChange={handleChange}
                  >
                    <option initialvalues="" hidden></option>
                    {renderSelectCiudad()}
                  </select>
                )}

                {pacienteId && (
                  <select
                    name="ciudadId"
                    value={values.ciudadId}
                    onChange={handleChange}
                  >
                    <option initialvalues={values.ciudadId}>{values.ciudad}</option>
                    {renderSelectCiudad()}
                  </select>
                )}



                <label>Telefono:</label>
                <input
                  type="text"
                  value={values.telefono}
                  name="telefono"
                  onChange={handleChange}
                />

                <label>Usuario:</label>
                <select name="usuarioId" value={values.usuarioId} onChange={handleChange}>
                  <option initialvalues="" hidden></option>
                  <option value="1">Usuario 1</option>
                  <option value="2">Usuario 2</option>
                </select>



              </Formulario>

              <Direccion>
                <label>Dirección:</label>
                <textarea
                  type="text"
                  value={values.direccion}
                  name="direccion"
                  onChange={handleChange}
                />
              </Direccion>

              <Botones>
                <Button variant="contained" type="submit" color="success">
                  Guardar
                </Button>
                {pacienteId && (
                  <Button
                    type="button"
                    variant="outlined"
                    color="error"
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </Button>
                )}


                {!pacienteId && (
                  <Button
                    type="button"
                    variant="outlined"
                    color="error"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                )}

              </Botones>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default PacientesForm;
