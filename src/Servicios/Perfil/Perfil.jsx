import { useEffect, useState } from "react";
// import { UseSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Card, CardHeader, Typography } from "@mui/material";
import obtenerFechaHoy from "../../Utils/FechaDeHoy";
import { fetchSectorXId } from "../../Redux/Features/Sectores/sectoresSlice";

// const empleado = {
//     nombre: "Juan Perez",
//     fotoPerfil: "https://upload.wikimedia.org/wikipedia/commons/3/3b/FrayJuanPerez.jpg",
//     sector: "Mantenimiento"
// }

export default function Perfil() {
  const dispatch = useDispatch();

  const usuarioActual = useSelector((state) => state.user);
  const empleado = useSelector((state) => state.empleado.empleadoActual);
  const [fechaHoy, setFechaHoy] = useState("");
  // const [sector, setSector] = useState("")
  useEffect(() => {
    dispatch(fetchSectorXId(empleado.sector_id));
  }, [dispatch, empleado.sector_id]);
  const sector = useSelector((state) => state.sectores.sector.nombre_sector); 
  

  useEffect(() => {
    const fechaActual = obtenerFechaHoy();
    setFechaHoy(fechaActual);
  }, []);

  return (
    <Box>
      <Card sx={{ height: "inherit", borderTop: "#4f5a92 3px solid" }}>
        <Typography
          variant="caption"
          sx={{ position: "relative", top: 0, left: 0, margin: "8px" }}
        >
          {fechaHoy}
        </Typography>
        <Box
          sx={{ padding: "30px", display: "flex", justifyContent: "center" }}
        >
          <Avatar
            alt={usuarioActual.user}
            src={usuarioActual.foto}
            sx={{ border: `2px solid #37db34` }}
          />
        </Box>
        <CardHeader
          title={usuarioActual.user}
          subheader={sector && sector || "sector"}
          sx={{ textAlign: "center" }}
        />
      </Card>
    </Box>
  );
}
