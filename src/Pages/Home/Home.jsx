import React from 'react'
import { Box, Skeleton, Card } from "@mui/material";
import Grid from "@mui/material/Grid2"
import s from "./Home.module.css";
import Notificaciones from '../../Servicios/Notificaciones/Notificaciones';
import NotificacionDeMensajes from '../../Servicios/Mensajes/Mensajes';
import AsistenciaPersonal from '../../Servicios/Asistencia/AsistenciaPersonal';
import Timer from '../../Servicios/Asistencia/Temporizador';
import Perfil from '../../Servicios/Perfil/Perfil';
import DiasDisponibles from '../../Componentes/DiasDisponible/DiasDisponibles';



function Home() {
    return (
        <Box sx={{ flexGrow: 1 }} >
            <Grid container spacing={2} >
                {/* Contenedor Izquierdo */}
                <Grid item size={{ xs: 12, md: 4, lg: 3 }} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Card sx={{ flexGrow: 1, borderTop: "#1976d2 3px solid", p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Perfil />
                        <Box sx={{ display: { xs: 'flex', md: 'flex' }, flexDirection: {xs: 'row', md: 'column'}, flexGrow: 1 }}>
                            <DiasDisponibles />
                            {/* <AsistenciaPersonal /> */}
                            <Timer />
                        </Box>
                    </Card>
                </Grid>

                {/* Contenedor Derecho */}
                <Grid item  size={{ xs: 12, md: 8, lg: 9 }} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Notificaciones />
                        <NotificacionDeMensajes />
                    </Box>
                </Grid>
            </Grid>
        </Box>




        // <Box sx={{ flexGrow: 1, flexDirection: 'row' }}>
        //     <Grid container spacing={2}>
        //         <Grid container height={'100%'} flexDirection={'column'} size={{ xs: 12, md: 3 }}>
        //             <Card sx={{ height: "inherit", borderTop: "#4f5a92 3px solid", pt: 2, pb: 2 }}>
        //                 <Box>
        //                     <Perfil />
        //                     <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}>
        //                         <DiasDisponibles />
        //                         {/* <AsistenciaPersonal /> */}
        //                         <Timer />
        //                     </Box>
        //                 </Box>
        //             </Card>
        //         </Grid>
        //         <Grid container height={'100%'} flexDirection={'column'} spacing={2} size={{ xs: 12, md: 9 }}>
        //             <Notificaciones />
        //             <NotificacionDeMensajes />
        //         </Grid>
        //     </Grid>
        // </Box>

    )
}

export default Home