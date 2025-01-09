import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { rutas } from "./util";
import { Box, Typography, Card, Stack, Button, Skeleton } from "@mui/material";
import { obtenerNotificaciones, deleteNotificacion, updateNotificacion } from "../../Redux/Features/Notificaciones/notificacionesSlice";
import CustomNoRowsOverlay from "../../Utils/NoRows";
import { redirect, useNavigate } from "react-router-dom";

const Notificaciones = () => {
  const dispatch = useDispatch();
  const idEmpleado = useSelector((state) => state.empleado.empleadoActual.id);
  const userToken = useSelector((state) => state.user.token);
  const notificaciones = useSelector((state) => state.notificaciones.notificaciones);
  const loading = useSelector((state) => state.notificaciones.loading);
  const navigate = useNavigate();


  useEffect(() => {
    if (idEmpleado) {
      dispatch(obtenerNotificaciones({ id: idEmpleado, token: userToken }));
    }
  }, [idEmpleado, userToken, dispatch]);


  // console.log(notificaciones);

  const handlerEliminar = (id) => {
    dispatch(deleteNotificacion({ id, token: userToken }));
    dispatch(obtenerNotificaciones({ id: idEmpleado, token: userToken }));
  };

  const handlerVer = (id, tag) => {
    // console.log(id);
    dispatch(updateNotificacion({ id, token: userToken }));
    navigate(rutas[tag]);
  };


  return (
    <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      <Box display="flex" bgcolor="#1976d2" position="sticky" top="0" alignItems="center" p={1}>
        <Typography color="white" variant="h6">Notificaciones</Typography>
      </Box>
      <Stack sx={{ flexGrow: 1, overflowY: "scroll", gap: 2, padding: 2, height: "20rem" }}>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        ) : notificaciones && notificaciones.length > 0 ? (
          notificaciones.map((n, index) => (
            <Box
              key={index}
              p={2}
              sx={{
                ":hover": { backgroundColor: "#eee", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" },
                borderBottom: "1px solid #0000004f",
                // borderLeft: "1px solid #0000004f",                
                borderRadius: "7px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Typography sx={{ fontSize: "1rem", fontWeight: 500 }} variant="subtitle2">
                {n.titulo}
              </Typography>
              <Box padding={2} sx={{ backgroundColor: "#045cb31a", borderRadius: "7px" }}>
                <Typography variant="caption">{n.fecha}</Typography>
                <Typography sx={{ fontSize: "1rem", fontWeight: 400, lineHeight: 2 }} variant="body1">
                  {n.contenido}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Button onClick={() => handlerEliminar(n.id)} sx={{ marginTop: 2 }} color="error" variant="text">
                  Eliminar
                </Button>
                <Button onClick={() => handlerVer(n.id, n.tag)} sx={{ marginTop: 2 }} variant="text" color={`${n.estado === "pending" ? "info" : "success"}`}>
                  {n.estado === "pending" ? "Ver" : "Leído"}
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Box>
            <CustomNoRowsOverlay mensaje="No hay notificaciones" />
          </Box>
        )}
      </Stack>
    </Card>
  );
};

export default Notificaciones;
