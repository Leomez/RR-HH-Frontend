import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Box, Typography, Skeleton } from "@mui/material"
import SelectorDeMes from "./SelectorDeMes"
import RecibosGrid from "./RecibosGrid"
import { fetchEmpleados } from "../../../Redux/Features/Empleado/empleadoSlice"
import setAllPeriodos from "../utils/setearTodosLosMeses"
// src/components/ListadoParaCargar.js

export default function ListadoParaCargar() {
  const dispatch = useDispatch()
  const [datos, setDatos] = useState([]);
  const [mesSeleccionado, setMesSeleccionado] = useState({}); // Estado para almacenar los periodos seleccionados
  

  const userToken = useSelector((state) => state.user.token)
  const empleados = useSelector((state) => state.empleado.empleados);

  useEffect(() => {
    dispatch(fetchEmpleados())
    console.log(mesSeleccionado);
    // setEmp(empleados)
  }, [dispatch])
  
 

  // function handleLimpiarSeleccion(empleadoId) {
  //   const inputFile = document.getElementById(`fileInput-${empleadoId}`);
  //   if (inputFile) {
  //     inputFile.value = null; //Esto va a forzar el reinicio del input para que pueda volver a seleccionar el mismo archivo en caso de haberlo limpiado por error.
  //   }
  //   setSelectedFiles({
  //     ...selectedFiles,
  //     [empleadoId]: null,
  //   });

  //   setSelectedPeriodos({
  //     ...selectedPeriodos,
  //     [empleadoId]: null,
  //   });

  //   setDatos((prevDatos) => {
  //     const updatedDatos = prevDatos.filter(
  //       (empleado) => empleado.id_empleado !== empleadoId
  //     );
  //     return updatedDatos;
  //   });
  // }

  const error = empleados.error ? empleados.error : null
  if (error) {
    return <Error error={error} />
  }



  return (
    <Box>
      {/* <Typography variant="h6">Componente para cargar los datos</Typography> */}
      {/* <Typography>Aca va una lista de empleados con sus respectivos recibos de sueldo...</Typography> */}
      <SelectorDeMes empleados={empleados} setMesSeleccionado={setMesSeleccionado} setAllPeriodos={setAllPeriodos} />
      {empleados ?
        <Box>
          <RecibosGrid
            empleados={empleados}
            mesSeleccionado={mesSeleccionado}  
            setMesSeleccionado={setMesSeleccionado}           
          />
        </Box> :
        <Skeleton width={200} height={30} />
      }
    </Box>
  )
}