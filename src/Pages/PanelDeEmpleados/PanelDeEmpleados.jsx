import { Box, Typography, AppBar, Container, Grid, Tab, Tabs } from "@mui/material";
import { useState, useEffect } from "react";
import { CustomTabPanel } from "./CustonTabPanel";
import CrearNuevoEmpleado from "../../Servicios/Empleados/Crear/CrearNuevoEmpleado";
import ListadoEmpleados from "../../Servicios/Empleados/Listado/ListadoEmpleados";
import ListadoEmpleadosXs from "../../Servicios/Empleados/Listado/ListadoEmpleadosXs";

export function Empleados() {
  const [index, setIndex] = useState(0);

// manejo el breakpoint para vista movil
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)
  function handleResize() {
    setIsMobile(window.innerWidth <= 600)
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
            <Tab label="Legajo" disabled sx={{":focus": {outline: 'none'}}}/>
            {/* <Tab label="Asistencia" sx={{":focus": {outline: 'none'}}}/> */}
          </Tabs>
        </Box>
        <CustomTabPanel value={index} index={0}>
          <Box>
            <Typography variant='h6'> EMPLEADOS </Typography>
            {isMobile ? <ListadoEmpleadosXs /> : <ListadoEmpleados />}            
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={index} index={1}>
          <Box>
            <CrearNuevoEmpleado />
            {/* <CargarRecibo/> */}
          </Box>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
