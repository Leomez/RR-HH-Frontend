import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  TextField,
  Typography,
  Box,
  Divider,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import { mesesDelAnio } from "../../Utils/meses";
import { useDispatch } from "react-redux";
import { cargarRecibo } from "../../Redux/Features/Recibos/recibosDeSueldoSlice";
import { showAlert } from "../../Redux/Features/Alerta/alertaSlice";
import { Error } from "../../Componentes/Error";
export default function CargarRecibo() {
  const dispatch = useDispatch();
  const empleados = useSelector((state) => state.empleado.empleados);
  const respuesta = useSelector((state) => state.recibos.reciboCargado);
  const userToken = useSelector((state) => state.user.token)
  const inputsVacios = {
    unSoloRecibo: true,
    periodo: "",
    monto: "",
    id_empleado: "",
    reciboDesc: "",
    recibo: null, // Este campo se manejará como un archivo
  };
  const [data, setData] = useState(inputsVacios);
  const error = empleados.error ? empleados.error : null  
  if (error) {
    return <Error error={error}/>
  }

  useEffect(() => {
    if (respuesta) {
      // Verificar si hay una respuesta y mostrar la alerta si es así
      dispatch(
        showAlert({
          type: respuesta.success ? "success" : "error",
          message: respuesta.message,
        })
      );
      dispatch(cargarRecibo(null)); // Restablece la respuesta para evitar mostrarla nuevamente
    }
  }, [respuesta, dispatch]);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Creo una nueva instancia del objeto de archivo
    const updatedFile = new File([selectedFile], selectedFile.name, {
      type: selectedFile.type,
    });

    setData({
      ...data,
      recibo: updatedFile,
    });
  };

  const handleBorrarArchivo = () => {
    const inputFile = document.getElementById('fileInput');
    if (inputFile) {
      inputFile.value = null; //Esto va a forzar el reinicio del input para que pueda volver a seleccionar el mismo archivo en caso de haberlo limpiado por error.
    }
    setData({
      ...data,
      recibo: null,
    });
  };

  const handleCancelar = () => {
    setData(inputsVacios);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(cargarRecibo({datos: data, token: userToken}));
      setData(inputsVacios);
      e.target.reset();
    } catch (error) {
      console.error("Error al cargar el recibo: ", error);
    }
  };

  return (
    <Box>
      <Typography variant="caption">
        Cargar recibo a un solo empleado
      </Typography>
      <Divider />

      <Box component={"form"} p={2} onSubmit={handleSubmit}>
        <Box sx={{ paddingBottom: "1rem" }}>
          <InputLabel htmlFor="periodo" sx={{ width: "100%" }}>
            Periodo
          </InputLabel>
          <Select
            sx={{ width: "100%" }}
            label="Periodo"
            variant="outlined"
            value={data.periodo}
            name="periodo"
            onChange={handleInputChange}
            id="periodo" // Asocia un ID con el label
          >
            <MenuItem value=" ">Seleccione periodo</MenuItem>
            {mesesDelAnio.map((mes, index) => (
              <MenuItem key={index} value={mes}>
                {mes}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ paddingBottom: "1rem" }}>
          <TextField
            fullWidth
            label="Monto"
            name="monto"
            value={data.monto}
            onChange={handleInputChange}
            required
          />
        </Box>
        <Box sx={{ paddingBottom: "1rem" }}>
          <InputLabel sx={{ width: "100%" }}>Legajo</InputLabel>
          <Select
            sx={{ width: "100%" }}
            value={data.id_empleado}
            name="id_empleado"
            onChange={handleInputChange}
          >
            {empleados.map((empleado) => (
              <MenuItem key={empleado.id} value={empleado.id}>
                {`${empleado.legajo} - ${empleado.nombre_empleado} ${empleado.apellido_empleado}`}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <TextField
          fullWidth
          label="Descripción del Recibo"
          name="reciboDesc"
          value={data.reciboDesc}
          onChange={handleInputChange}
          required
        />
        <Box mt={2}>
          <input
            type="file"
            accept=".pdf"
            id="fileInput" // ID para asociarlo con el label personalizado
            onChange={handleFileChange}
            style={{ display: "none" }} // Oculta el input de archivo
            required
          />
          <label htmlFor="fileInput">
            <Button
              component="span" // Esto permite que el botón funcione como un botón de carga de archivo
              variant="text"
              color="primary"
            >
              Seleccionar Archivo
            </Button>
          </label>
          {data.recibo && (
            <Box display={"block"}>
              <Typography variant="caption">
                Archivo seleccionado: {data.recibo.name}
              </Typography>
              <DeleteForeverTwoToneIcon
                sx={{ padding: "0 1rem" }}
                color="success"
                onClick={handleBorrarArchivo}
              />
            </Box>
          )}
        </Box>
        <Box mt={2} display={"flex"} textAlign="center">
          <Button type="submit" variant="contained" color="primary">
            Cargar Recibo
          </Button>
          <Button
            variant="outlined"
            sx={{ marginX: "1rem" }}
            onClick={handleCancelar}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
