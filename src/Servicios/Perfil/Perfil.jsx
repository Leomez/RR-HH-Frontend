
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Card, CardHeader, Typography, Skeleton } from "@mui/material";
import obtenerFechaHoy from "../../Utils/FechaDeHoy";
import { fetchSectorXId } from "../../Redux/Features/Sectores/sectoresSlice";
import { fetchEmpleados } from "../../Redux/Features/Empleado/empleadoSlice"
import PerfilSkeleton from "./PerfilSkeleton";
import s from "./Perfil.module.css";


export default function Perfil() {
  const dispatch = useDispatch();
  const usuarioActual = useSelector((state) => state.user);
  const empleado = useSelector((state) => state.empleado.empleadoActual);
  const sector = useSelector((state) => state.sectores.sector);
  const loading = useSelector((state) => state.user.loading)
  const [fechaHoy, setFechaHoy] = useState("");
  const [nombreSector, setNombreSector] = useState(false);


  
  useEffect(() => {
    dispatch(empleado && fetchSectorXId(empleado.sector_id));
    // dispatch(fetchEmpleados(usuarioActual.token))      
  }, [empleado, usuarioActual]);

  useEffect(() => {
    setNombreSector(sector?.nombre_sector);
  }, [sector])

  useEffect(() => {
    const fechaActual = obtenerFechaHoy();
    setFechaHoy(fechaActual);
  }, []);


  return (
    loading ? (
      <PerfilSkeleton />
    ) : (
      // <Card sx={{ height: "inherit", borderTop: "#4f5a92 3px solid" }}>
      <Box className={s.perfilContainer}>
        <Box className={s.fechaContainer}>
          <Typography variant="caption" className={s.fecha}>
            {fechaHoy}
          </Typography>
        </Box>
        <span className={s.infoContainer}>
          <Avatar alt={usuarioActual.user} src={usuarioActual.foto} className={s.avatar} />
          <CardHeader
            title={usuarioActual.user}
            subheader={nombreSector || <Skeleton variant="rectangular" sx={{ margin: 'auto' }} width={100} height={18} />}
            sx={{ textAlign: "center" }}
          />
        </span>
      </Box>
      // </Card>
    )
  );
}
