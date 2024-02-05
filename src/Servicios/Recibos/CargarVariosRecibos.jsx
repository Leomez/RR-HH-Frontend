import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Select, MenuItem } from "@mui/material";
import { fetchEmpleados } from "../../Redux/Features/Empleado/empleadoSlice";
import { mesesDelAnio } from "../../Utils/meses";
import { cargarRecibos } from "../../Redux/Features/Recibos/recibosDeSueldoSlice";
import { showAlert } from "../../Redux/Features/Alerta/alertaSlice";
import RecibosDataGrid from "./RecibosDataGrid";

export default function ListadoParaCargar() {
  const dispatch = useDispatch();
  useEffect(() => {
    //fetch de empleados desde el back al cargar la pagina
    dispatch(fetchEmpleados());
  }, [dispatch]);
  const [datos, setDatos] = useState([]);
  const [selectedPeriodos, setSelectedPeriodos] = useState({}); // Estado para almacenar los periodos seleccionados
  const [selectedFiles, setSelectedFiles] = useState({});

  const userToken =useSelector((state) => state.user.token)
  const empleados = useSelector((state) => state.empleado.empleados); // Estado global para almacenar los empleados
  const respuesta = useSelector((state) => state.recibos.reciboCargado);
  // const [res, setRes] = useState("");

  useEffect(() => {
    // console.log(respuesta);
    if (respuesta) {
      dispatch(
        showAlert({
          type: respuesta.success ? "success" : "error",
          message: respuesta.message,
        })
      );
      // Restablecer la respuesta para evitar mostrarla nuevamente
      dispatch(cargarRecibos(null));
      // Restablecer los datos y el formulario
    }
  }, [respuesta, dispatch]);

  //funcion para todos los empleados con el mismo periodo
  const setAllPeriodos = (mes) => {
    const updatedPeriodos = {};
    empleados.forEach((empleado) => {
      updatedPeriodos[empleado.id] = mes;
    });
    setSelectedPeriodos(updatedPeriodos);
  };

  function handleLimpiarSeleccion(empleadoId) {
    const inputFile = document.getElementById(`fileInput-${empleadoId}`);
    if (inputFile) {
      inputFile.value = null; //Esto va a forzar el reinicio del input para que pueda volver a seleccionar el mismo archivo en caso de haberlo limpiado por error.
    }
    setSelectedFiles({
      ...selectedFiles,
      [empleadoId]: null,
    });

    setSelectedPeriodos({
      ...selectedPeriodos,
      [empleadoId]: null,
    });

    setDatos((prevDatos) => {
      const updatedDatos = prevDatos.filter(
        (empleado) => empleado.id_empleado !== empleadoId
      );
      return updatedDatos;
    });
  }

  function handleLimpiarTodasLasSelecciones() {
    empleados.forEach((e) => {
      const inputFile = document.getElementById(`fileInput-${e.id}`);
      if (inputFile) {
        inputFile.value = null; //Esto va a forzar el reinicio del input para que pueda volver a seleccionar el mismo archivo en caso de haberlo limpiado por error.
      }
    })
    setSelectedFiles({});
    setDatos([]);
    setSelectedPeriodos({});
  }

  function handleSelectedPeriodos(e, params) {
    setSelectedPeriodos({
      ...selectedPeriodos,
      [params.row.id]: e.target.value,
    });
  }

  function handleFileChange(e, empleadoId) {
    console.log(e);
    const file = e.target.files[0];
    const periodo = selectedPeriodos[empleadoId];

    if (file) {
      // Verifica si ya hay un archivo seleccionado para este empleado
      if (selectedFiles[empleadoId]) {
        // Elimina el archivo anterior antes de agregar el nuevo
        const updatedFiles = { ...selectedFiles };
        delete updatedFiles[empleadoId];
        setSelectedFiles(updatedFiles);

        // Elimina el dato anterior del estado datos
        const updatedDatos = datos.filter(
          (dato) => dato.id_empleado !== empleadoId
        );
        setDatos(updatedDatos);
      }

      setSelectedFiles((prevSelectedFiles) => ({
        ...prevSelectedFiles,
        [empleadoId]: file.name, // Guarda el nombre del archivo
      }));

      setDatos((prevDatos) => [
        ...prevDatos,
        {
          recibo: file,
          id_empleado: empleadoId,
          periodo: periodo,
        },
      ]);
    }
  }

  async function handlerSubmit() {
    dispatch(cargarRecibos({arrayFormData: datos, token: userToken}));
    handleLimpiarTodasLasSelecciones()
    // setSelectedPeriodos({});
    // setSelectedFiles({});
    // setDatos([]);    
  }

  return (
    <Box paddingBottom={"2rem"} borderBottom={"1px solid grey"}>
      <Typography>
        Aca va una lista de empleados con sus respectivos recibos de sueldo...
      </Typography>
      {/* Select para elegir el mismo mes para todos */}
      <Select
        value="vaciar"
        variant="filled"
        onChange={(e) => setAllPeriodos(e.target.value)}
        sx={{ marginBottom: "10px", width: 250 }}
      >
        <MenuItem value="">Vaciar todos los períodos</MenuItem>
        <MenuItem value="vaciar">Seleccionar período para todos</MenuItem>{" "}
        {/* Cambiar value a "vaciar" */}
        {mesesDelAnio.map((mes, index) => (
          <MenuItem key={index} value={mes}>
            {mes}
          </MenuItem>
        ))}
      </Select>
      <div style={{ height: 300, width: "100%" }}>
        <RecibosDataGrid
          empleados={empleados}
          selectedPeriodos={selectedPeriodos}
          handleSelectedPeriodos={handleSelectedPeriodos}
          handleFileChange={handleFileChange}
          selectedFiles={selectedFiles}
          handleLimpiarSeleccion={handleLimpiarSeleccion}
        />
      </div>
      <Box sx={{ marginTop: "1rem" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlerSubmit()}
        >
          Subir Recibos
        </Button>
        <Button
          variant="outlined"
          sx={{ marginX: "1rem" }}
          onClick={handleLimpiarTodasLasSelecciones}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );
}
