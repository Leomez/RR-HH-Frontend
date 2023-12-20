import { Box, Typography, Paper } from "@mui/material";
import MostrarRecibos from "../../Servicios/Recibos/MostrarRecibos/MostrarRecibos";

export function MisRecibos() {
  console.log("MisRecibos");
  return (
    <Paper elevation={1}>
      <Box
        sx={{
          display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          padding: "1rem",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Typography variant="subtitle1">Mis Recibos</Typography>
        <Box>
          <MostrarRecibos />
        </Box>
        {/* <h1>Mis Recibos</h1> */}
      </Box>
    </Paper>
  );
}
