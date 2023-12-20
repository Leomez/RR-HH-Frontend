import { Container, Typography, Grid, Divider, Card } from "@mui/material";
import CargarRecibo from "../../Servicios/Recibos/CargarUnRecibo";
import ListadoParaCargar from "../../Servicios/Recibos/CargarVariosRecibos";
import Alerta from "../../Servicios/Alerta/Alerta";


export default function CargarRecibos() {
    
    return (
        <Container maxWidth="lg">
            <Typography variant="h5" align="center" gutterBottom>
                Cargar Recibos de Sueldo
            </Typography>
            <Grid container spacing={2}>
                {/* Izquierda */}
                <Grid item xs={12} md={7}>
                    <ListadoParaCargar />
                </Grid>
                {/* Separador vertical */}
                <Grid item xs={12} md={1}>
                    <Divider orientation="vertical" />
                </Grid>
                {/* Derecha */}
                <Grid item xs={12} md={4}>
                    <Card sx={{p:1}}>
                        <CargarRecibo />
                    </Card>
                </Grid>
            </Grid>
            <Alerta />
        </Container>
    )
}
