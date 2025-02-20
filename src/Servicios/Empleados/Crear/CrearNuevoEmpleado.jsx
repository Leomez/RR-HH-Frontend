import { useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Alert, AlertTitle, Snackbar } from "@mui/material";
import DatosEmpleadoForm from "./DatosEmpleadoForm";
import DatosPuestoForm from "./DatosPuesto"
import DireccionForm from "./DomicilioForm";
import validateForm from "./ValidarDatosCargaDeEmpleado";
import { nuevoEmpleado } from "../../../Redux/Features/Empleado/empleadoSlice";
import validarDomicilio from "./validarDomicilio";


export default function CrearNuevoEmpleado() {
  const inputVacios = {
    legajo: "",
    dni: "",
    nombre_empleado: "",
    apellido_empleado: "",
    fecha_nac: null,
    telefono: "",
    tel_alternativo: "",
    correo: "",
    fecha_ingr: null,
    cargo: "",
    sector: "",
    turno: "",
    categoria: "",
    permisos: "",
    estado: "",
    domicilio: {
      calle: "",
      numero: "",
      ciudad: "",
      cod_postal: "",
      piso: "",
      depto: "",
    },
  };
  const [inputs, setInputs] = useState(inputVacios);
  const [errores, setErrores] = useState({});
  const [alert, setAlert] = useState(false)
  const dispatch = useDispatch();
  const respuesta = useSelector(state => state.empleado.nuevoEmpleadoCreado)

  function handleChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  function handleDomicilioChange(e) {
    setInputs({
      ...inputs,
      domicilio: {
        ...inputs.domicilio,
        [e.target.name]: e.target.value,
      },
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(inputs);
    const formErrors = validateForm(inputs);
    formErrors.domicilio = validarDomicilio(inputs.domicilio);
    setErrores(formErrors);

    if (Object.keys(formErrors).length === 1 && Object.keys(formErrors.domicilio).length === 0) {
      dispatch(nuevoEmpleado(inputs))
      setInputs(inputVacios);
      setAlert(true)
      console.log(respuesta);
    } else {

      console.log(formErrors)
    }
  }
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(false)
  };

  return (
    <div id="crearEmpleadoService">
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          display: "block",
          justifyContent: "space-between",
          padding: "2rem 0",
        }}
      >
        {/* Componente de Datos del Empleado */}
        <DatosEmpleadoForm
          inputs={inputs}
          handleChange={handleChange}
          errores={errores}
        />

        {/* Componente de Domicilio */}
        <DireccionForm
          domicilio={inputs.domicilio}
          handleChange={handleDomicilioChange}
          errores={errores.domicilio}
        />

        <DatosPuestoForm inputs={inputs} handleChange={handleChange} />

        <Box sx={{
          textAlign: 'center'
        }}>
          <Button type="submit" variant="outlined">
            Cargar
          </Button>
        </Box>

      </Box>
      <Snackbar open={alert} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert 
        onClose={handleAlertClose} 
        severity={respuesta.success ? 'success' : 'error'} 
        sx={{ width: '100%' }}
        >
          <AlertTitle>{respuesta.mensaje}</AlertTitle>
          {respuesta.data && `${respuesta.data.nombre_empleado} ${respuesta.data.apellido_empleado}`}
        </Alert>
      </Snackbar>
    </div>
  );
}