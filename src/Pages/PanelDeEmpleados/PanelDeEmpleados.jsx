import { Box, Typography, AppBar, Container, Grid, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { CustomTabPanel } from "./CustonTabPanel";
import CrearNuevoEmpleado from "../../Servicios/Empleados/Crear/CrearNuevoEmpleado";
import ListadoEmpleados from "../../Servicios/Empleados/Listado/ListadoEmpleados";
import ListadoEmpleadosXs from "../../Servicios/Empleados/Listado/ListadoEmpleadosXs";
import Legajo from "../../Servicios/Empleados/Legajo/Legajo";
import { setVerLegajo } from "../../Redux/Features/Empleado/empleadoSlice";


export function Empleados() {
  const [index, setIndex] = useState(0);

// manejo el breakpoint para vista movil
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)
  const [legajo, setLegajo] = useState(null)
  const verLegajo = useSelector(state => state.empleado.verLegajo)
  const dispatch = useDispatch()
  function handleResize() {
    setIsMobile(window.innerWidth <= 600)
  }

  function handlerVerLegajo(idEmpleado) {
    setLegajo(idEmpleado)
    dispatch(setVerLegajo(idEmpleado))
    setIndex(2)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
// 
  const handleChange = (event, newIndex) => {
    setIndex(newIndex);
  };
  
  return (
    <div id="PanelEmpleados">
      <Box component="main">
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={index} onChange={handleChange}>
            {/* <Tab label="Tareas" /> */}
            <Tab label="listado" sx={{":focus": {outline: 'none'}}} />
            <Tab label="Cargar Empleado" sx={{":focus": {outline: 'none'}}} />
            <Tab label="Legajo" disabled={verLegajo} sx={{":focus": {outline: 'none'}}}/>
            {/* <Tab label="Asistencia" sx={{":focus": {outline: 'none'}}}/> */}
          </Tabs>
        </Box>
        <CustomTabPanel value={index} index={0}>
          <Box>
            <Typography variant='h6'> EMPLEADOS </Typography>
            {isMobile ? <ListadoEmpleadosXs /> : <ListadoEmpleados verLegajo={handlerVerLegajo} />}            
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={index} index={1}>
          <Box>
            <CrearNuevoEmpleado />
            {/* <CargarRecibo/> */}
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={index} index={2}>
          <Box>
            <Typography variant='h6'> LEGAJO </Typography>
            <Legajo legajo={legajo}/>
            {/* <Legajo/> */}
          </Box>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
