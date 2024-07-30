import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Card, CardHeader, Typography, Skeleton } from "@mui/material";
import obtenerFechaHoy from "../../Utils/FechaDeHoy";
import { fetchSectorXId } from "../../Redux/Features/Sectores/sectoresSlice";
import { fetchEmpleados } from "../../Redux/Features/Empleado/empleadoSlice"
import PerfilSkeleton from "./PerfilSkeleton";

export default function Perfil() {
  const dispatch = useDispatch();
  const usuarioActual = useSelector((state) => state.user);
  const empleado = useSelector((state) => state.empleado.empleadoActual);
  const sector = useSelector((state) => state.sectores.sector);
  const loading = useSelector((state) => state.user.loading)
  const [fechaHoy, setFechaHoy] = useState(""); 
  const [nombreSector, setNombreSector] = useState(false); 
  
  
  useEffect( () => {          
    dispatch(empleado && fetchSectorXId({id: empleado.sector_id, token: usuarioActual.token}));    
    // dispatch(fetchEmpleados(usuarioActual.token))      
  }, [empleado, usuarioActual]);

  useEffect(() => {
    setNombreSector(sector?.nombre_sector);
  }, [sector])
  
  useEffect(() => {
    const fechaActual = obtenerFechaHoy();
    setFechaHoy(fechaActual);
  }, []);
    
  // const nombreSector = sector ? sector.nombre_sector : false   
  // console.log(nombreSector); 
  
  return (
    loading ? 
    <PerfilSkeleton/> :
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
          subheader={nombreSector || <Skeleton variant="rectangular" sx={{ margin: 'auto' }} width={100} height={18} />}
          sx={{ textAlign: "center" }}
        />
      </Card>
    </Box>  
  );
}
