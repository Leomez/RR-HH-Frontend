import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Dialog, DialogTitle, Button, DialogContent, Card, CardContent } from "@mui/material";
import { resetConexion, resetUserError } from "../../Redux/Features/Login/userSlice";
import logoPortal from "../../assets/PortalCOQlogo-trans.png";
import EquipoTrabajo from "../../assets/EquipoTrabajo.jpeg";
import LoadingPage from "../../Componentes/Containers/Loading";
// import Footer from "../../Componentes/Footer/Footer";
import style from "./LoginPage.module.css";

function LoginPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    resetUserError();
    // resetConexion();
  }, []);

  const loading = useSelector(state => state.user.loading);
  const error = useSelector(state => state.user.error);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error && error.showError) {
      console.log('error');
      setOpen(true);
    }
  }, [error]);

  const handleClose = () => {
    setOpen(false);
    dispatch(resetUserError());
    dispatch(resetConexion());
  };
  console.log(error);
  return (
    <div id="loginPage">
      {error && <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography>{error.errorData && error.errorData.status}</Typography>
        </DialogTitle>
        <DialogContent>
          <Card>
            <CardContent>
              <Typography>
                {error.errorData && error.errorData.data && error.errorData.data.error}
              </Typography>
            </CardContent>
          </Card>
        </DialogContent>
        <Button onClick={handleClose} variant='outlined' color='info'>Cerrar</Button>
      </Dialog>}
      <LoadingPage loading={loading} />
      <Box className={style.container}>
        <Box className={style.banner} sx={{ backgroundImage: `url("${EquipoTrabajo}")` }}>
          <Box className={style.baseBannerText}>
            <Box>
              <Typography variant="h4" sx={{ color: "white", mt: 10 }}>
                BIENVENIDOS
              </Typography>
              <Typography variant="h6">
                A LA PLATAFORMA DE RECURSOS HUMANOS DEL
              </Typography>
              <Box className={style.logoContainer}>
                <Typography variant="h3" sx={{ color: "#013d78" }}>
                  Centro de Ojos Quilmes
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className={style.logo}>
            <img
              className={style.logoImage}
              src={logoPortal}
              alt="Centro de ojos - Recursos Humanos"
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default LoginPage;
