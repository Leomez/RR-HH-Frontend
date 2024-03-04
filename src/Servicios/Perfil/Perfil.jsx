import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Card, CardHeader, Typography, Skeleton } from "@mui/material";
import obtenerFechaHoy from "../../Utils/FechaDeHoy";
import { fetchSectorXId } from "../../Redux/Features/Sectores/sectoresSlice";
import { logoutUser } from "../../Redux/Features/Login/userSlice";
// import { fetchEmpleados } from "../../Redux/Features/Empleado/empleadoSlice"

// const empleado = {
//     nombre: "Juan Perez",
//     fotoPerfil: "https://upload.wikimedia.org/wikipedia/commons/3/3b/FrayJuanPerez.jpg",
//     sector: "Mantenimiento"
// }

export default function Perfil() {
  const dispatch = useDispatch();

  const usuarioActual = useSelector((state) => state.user);
  // console.log(usuarioActual.token);
  const empleado = useSelector((state) => state.empleado.empleadoActual);
  const [fechaHoy, setFechaHoy] = useState("");
  // const [sector, setSector] = useState("")
  console.log(empleado);
  useEffect(() => {   
    dispatch(logoutUser()) 
    dispatch(empleado && fetchSectorXId({id: empleado.sector_id, token: usuarioActual.token}));
    // dispatch(fetchEmpleados(usuarioActual.token))    
  }, [dispatch, empleado.sector_id, empleado]);
  
    const sector = useSelector((state) => state.sectores.sector);
    const nombreSector = sector ? sector.nombre_sector : null     
  
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
          subheader={nombreSector || <Skeleton variant="rectangular" width={100} height={18} />}
          sx={{ textAlign: "center" }}
        />
      </Card>
    </Box>
  );
}
