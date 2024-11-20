import { Container, Typography, Divider, Card } from "@mui/material";
import Grid from '@mui/material/Grid2/Grid2';
import CargarRecibo from "../../Servicios/Recibos/CargarUnRecibo";
import ListadoParaCargar from "../../Servicios/Recibos/Componentes/ListadoParaCargar";
import Alerta from "../../Servicios/Alerta/Alerta";


export default function CargarRecibos() {
    
    return (
        <Container maxWidth="lg">
            <Typography variant="h5" align="center" gutterBottom>
                Cargar Recibos de Sueldo
            </Typography>
            <Grid container spacing={2}>
                {/* Izquierda */}
                <Grid item size={{ xs: 12, md: 8 }} >
                    <ListadoParaCargar />
                </Grid>
                {/* Separador vertical */}
                <Grid item size={{ xs: 12, md: 0 }}>
                    <Divider orientation="vertical" />
                </Grid>
                {/* Derecha */}
                <Grid item size={{ xs: 12, md: 3 }}>
                    <Card sx={{p:1, width:'max-content'}}>
                        <CargarRecibo />
                    </Card>
                </Grid>
            </Grid>
            <Alerta />
        </Container>
    )
}
