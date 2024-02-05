import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, Avatar, Typography, Card, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { obtenerNotificaciones } from "../../Redux/Features/Notificaciones/notificacionesSlice";
import CustomNoRowsOverlay from "../../Utils/NoRows";

const Notificaciones = () => {
  const dispatch = useDispatch();
  const idEmpleado = useSelector((state) => state.empleado.empleadoActual.id);
  const userToken = useSelector((state) => state.user.token)
  const notificaciones = useSelector(
    (state) => state.notificaciones.notificaciones.data
  );
  notificaciones &&
    notificaciones.map((notificacion) => console.log(notificacion.contenido));
  useEffect(() => {
    dispatch(obtenerNotificaciones({id: idEmpleado, token: userToken}));
  }, []);
  

  return (
    <Box sx={{ height: "100%" }}>
      <Card sx={{ height: "inherit", borderTop: "#4f5a92 3px solid" }}>
        <Box display={"flex"} alignItems={"center"} p={1}>
          <Box>
            <Typography variant="h6">Notificaciones</Typography>
          </Box>
        </Box>
        <Stack
          sx={{ maxHeight: { xs: "15rem", md: "10rem" }, overflow: "auto" }}
        >
          {notificaciones && notificaciones.length > 0 ? (
            notificaciones.map((n, index) => {
              return (
                <Box
                  p={2}
                  key={index}
                  sx={{
                    ":hover": { backgroundColor: "#eee" },
                    borderBottom: "1px solid #0000004f",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 500 }}
                    variant="subtitle2"
                  >
                    {n.titulo}
                  </Typography>
                  <Box
                    padding={2}
                    sx={{
                      backgroundColor: "#045cb31a",
                      paddingTop: 0,
                      borderRadius: "7px",
                    }}
                  >
                    <Typography variant="caption">{n.fecha}</Typography>
                    <Typography
                      sx={{ fontSize: "1rem", fontWeight: 400, lineHeight: 2 }}
                      variant="body1"
                    >
                      {n.contenido}
                    </Typography>
                  </Box>
                  <Button
                    sx={{ marginTop: 2 }}
                    variant="text"
                    component={Link}
                    to={`/${n.tag}`}
                    // onClick={() => handleAccion(n.tag)}
                  >
                    {n.accion}
                  </Button>
                </Box>
              );
            })
          ) : (
            <Box>
              <CustomNoRowsOverlay mensaje="No hay notificaciones" />
            </Box>
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default Notificaciones;
