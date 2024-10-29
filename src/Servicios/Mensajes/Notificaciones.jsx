import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, Avatar, Typography, Card, Stack, Button, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { obtenerNotificaciones } from "../../Redux/Features/Notificaciones/notificacionesSlice";
import CustomNoRowsOverlay from "../../Utils/NoRows";

const Notificaciones = () => {
  const dispatch = useDispatch();
  const idEmpleado = useSelector((state) => state.empleado.empleadoActual.id);
  const userToken = useSelector((state) => state.user.token)
  const notificaciones = useSelector((state) => state.notificaciones.notificaciones.data);
  const loading = useSelector((state) => state.notificaciones.loading)

  // notificaciones &&
  //   notificaciones.map((notificacion) => console.log(notificacion.contenido));
  useEffect(() => {
    dispatch(idEmpleado && obtenerNotificaciones({ id: idEmpleado, token: userToken }));
  }, []);


  return (
    
    <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      <Box display="flex" bgcolor="#1976d2" position="sticky" top="0" alignItems="center" p={1}>
        <Typography color="white" variant="h6">Notificaciones</Typography>
      </Box>
      <Stack sx={{ flexGrow: 1, overflowY: "auto" }}>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        ) : notificaciones && notificaciones.length > 0 ? (
          notificaciones.map((n, index) => (
            <Box
              key={index}
              p={2}
              sx={{
                ":hover": { backgroundColor: "#eee" },
                borderBottom: "1px solid #0000004f",
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
              <Button sx={{ marginTop: 2 }} variant="text" component={Link} to={`/${n.tag}`}>
                {n.accion}
              </Button>
            </Box>
          ))
        ) : (
          <Box>
            <CustomNoRowsOverlay mensaje="No hay notificaciones" />
          </Box>
        )}
      </Stack>
    </Card>

    // loading ? <Skeleton variant='rectangular' width={400} height={180} /> :
    //   <Box id="notificaciones" sx={{ height: "100" }}>
    //     <Card sx={{ height: "auto", overflow: "auto"}}>
    //       <Box display={"flex"} bgcolor={"#1976d2"} position={'sticky'} top={'0'} alignItems={"center"} p={1}>
    //         <Typography color="white" variant="h6">Notificaciones</Typography>
    //       </Box>
    //       <Stack
    //         sx={{ maxHeight: { xs: "15rem", md: "100%" }, overflow: "auto" }}
    //       >
    //         {notificaciones && notificaciones.length > 0 ? (
    //           notificaciones.map((n, index) => {
    //             return (
    //               <Box
    //                 p={2}
    //                 key={index}
    //                 sx={{
    //                   ":hover": { backgroundColor: "#eee" },
    //                   borderBottom: "1px solid #0000004f",
    //                 }}
    //               >
    //                 <Typography
    //                   sx={{ fontSize: "1rem", fontWeight: 500 }}
    //                   variant="subtitle2"
    //                 >
    //                   {n.titulo}
    //                 </Typography>
    //                 <Box
    //                   padding={2}
    //                   sx={{
    //                     backgroundColor: "#045cb31a",
    //                     paddingTop: 0,
    //                     borderRadius: "7px",
    //                   }}
    //                 >
    //                   <Typography variant="caption">{n.fecha}</Typography>
    //                   <Typography
    //                     sx={{ fontSize: "1rem", fontWeight: 400, lineHeight: 2 }}
    //                     variant="body1"
    //                   >
    //                     {n.contenido}
    //                   </Typography>
    //                 </Box>
    //                 <Button
    //                   sx={{ marginTop: 2 }}
    //                   variant="text"
    //                   component={Link}
    //                   to={`/${n.tag}`}
    //                 // onClick={() => handleAccion(n.tag)}
    //                 >
    //                   {n.accion}
    //                 </Button>
    //               </Box>
    //             );
    //           })
    //         ) : (
    //           <Box>
    //             <CustomNoRowsOverlay mensaje="No hay notificaciones" />
    //           </Box>
    //         )}
    //       </Stack>
    //     </Card>
    //   </Box>
  );
};

export default Notificaciones;
