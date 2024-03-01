import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
// import LoginForm from '../../Servicios/Login/LoginForm';
import { resetConexion } from "../../Redux/Features/Login/userSlice";
// import logoPersonalTransp from "../../assets/logoPersonalTransp.png";
import logoPortal from "../../assets/PortalCOQlogo-trans.png";
import EquipoTrabajo from "../../assets/EquipoTrabajo.jpeg";
import LoadingPage from "../../Componentes/Containers/Loading";

// import empresaImage from '../../../assets/logoTransp.png';

function LoginPage() {
  useEffect(() => {
    resetConexion();
  }, []);
  //
  return (
    <div id="loginPage">
      <LoadingPage/>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          minHeight: "100vh",
          // pl: '4rem'
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            backgroundImage: `url("${EquipoTrabajo}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            textAlign: "center",
            mb: 2,
            width: "100%",
            height: "90vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: {xs: "inherit", md: "50%"},
              height: "inherit",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              zIndex: 10
            }}
          >
            <Box sx={{}}>
              <Typography variant="h4" sx={{ color: "white", mt: 10 }}>
                BIENVENIDOS
              </Typography>
              <Typography variant="h6">
                A LA PLATAFORMA DE RECURSOS HUMANOS DEL
              </Typography>
              <Box
                sx={{
                  padding: 2,
                  backdropFilter: "blur(8px)",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                }}
              >
                <Typography variant="h3" sx={{ color: "#013d78" }}>
                  Centro de Ojos Quilmes
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: {xs: 'none', md: 'flex'},
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              right: 0,
              width: "50%",
              height: "inherit",
              //   border: "solid 1px red",
              margin: "auto",
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <img
              style={{ minWidth: "30vw" }}
              src={logoPortal}
              alt="Centro de ojos - Recursos Humanos"
            />
          </Box>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Por favor, iniciá sesion para acceder a tu cuenta
        </Typography>
        {/* <LoginForm /> */}
      </Box>
    </div>
  );
}

export default LoginPage;
