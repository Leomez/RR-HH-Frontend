import { React, useState } from "react";
import { Box, Grid } from "@mui/material";
import Perfil from "../../Servicios/Perfil/Perfil";
import Notificaciones from "../../Servicios/Mensajes/Notificaciones";
import AsistenciaPersonal from "../../Servicios/Asistencia/AsistenciaPersonal";
// import LoadingPage from "../../Componentes/Containers/Loading";
// import Registrarse from "../../Servicios/Login/RegistroForm";

export function Home() {

    
    return (
        <div id="homeContainer">
            <Box component={"main"} sx={{ flexGrow: 1 }}>                
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <Box boxShadow={3} sx={{ height: '100%' }}>
                                <Perfil />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Box boxShadow={3} sx={{ height: '100%' }}>
                                <Notificaciones />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4}>
                            <Box boxShadow={3} sx={{ height: '100%' }}>
                                <AsistenciaPersonal />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4}>
                            <Box boxShadow={3} sx={{ height: '100%' }}>
                                {/* <Perfil /> */}
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4}>
                            <Box boxShadow={3} sx={{ height: '100%' }}>
                                {/* <Perfil /> */}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    )
}