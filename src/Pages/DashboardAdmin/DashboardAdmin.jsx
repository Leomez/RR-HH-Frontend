import { Box, Container, Grid } from "@mui/material";
import ChartPresentismo from "../../Servicios/Asistencia/AsistenciaChardCard";
import AsistenciaPersonal from "../../Servicios/Asistencia/AsistenciaPersonal";
import Tareas from "../../Servicios/Tareas/TareasCard";
import Perfil from "../../Servicios/Perfil/Perfil";
import Notificaciones from "../../Servicios/Mensajes/Notificaciones";


export function Dashboard() {
    return (
        <div id="dashboard">
            <Box component='main' sx={{ flexGrow: 1 }}>                
                <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3} >
                            <Perfil />
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Notificaciones />
                        </Grid>
                        <Grid item container spacing={3} xs={12} md={12}>
                            <Grid item xs={12} md={3}>
                                <Box height={'100%'} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                                    <Box height={'95%'}>
                                        <AsistenciaPersonal />
                                    </Box>
                                    <Box height={'95%'}>
                                        <AsistenciaPersonal />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <ChartPresentismo />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Container>
                                <Tareas />
                            </Container>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    )
}