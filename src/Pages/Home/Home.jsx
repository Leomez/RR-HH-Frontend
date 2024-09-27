import React from 'react'
import { Box, Skeleton, Card } from "@mui/material";
import Grid from "@mui/material/Grid2"
import s from "./Home.module.css";
import Notificaciones from '../../Servicios/Mensajes/Notificaciones';
import AsistenciaPersonal from '../../Servicios/Asistencia/AsistenciaPersonal';
import Timer from '../../Servicios/Asistencia/Temporizador';
import Perfil from '../../Servicios/Perfil/Perfil';
import DiasDisponibles from '../../Componentes/DiasDisponible/DiasDisponibles';



function Home() {
    return (
        <Box sx={{ flexGrow: 1, flexDirection: 'row' }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Card sx={{ height: "inherit", borderTop: "#4f5a92 3px solid", pt: 2, pb: 2 }}>
                        <Box>
                            <Perfil />
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}>
                                <DiasDisponibles />
                                {/* <AsistenciaPersonal /> */}
                                <Timer/>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 9 }}>
                    <Box>
                        <Notificaciones />
                    </Box>
                </Grid>
            </Grid>
        </Box>

    )
}

export default Home