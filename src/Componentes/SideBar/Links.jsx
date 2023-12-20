/* eslint-disable react-hooks/rules-of-hooks */
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmojiPeopleTwoToneIcon from "@mui/icons-material/EmojiPeopleTwoTone";
import PunchClockTwoToneIcon from "@mui/icons-material/PunchClockTwoTone";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import RequestPageIcon from '@mui/icons-material/RequestPage';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import { useTheme } from "@mui/material";

const rutas = () => {
  const theme = useTheme();
  return {
    rutasComunes: [
      {
        nombreSeccion: "Home",
        icono: <HomeIcon sx={{ color: theme.palette.primary.main }} />,
        ruta: "/",
      },
      {
        nombreSeccion: "Mensajes",
        icono: (
          <PunchClockTwoToneIcon sx={{ color: theme.palette.primary.main }} />
        ),
        ruta: "mensajes",
      },
      {
        nombreSeccion: "Mis Recibos",
        icono: <RequestPageIcon sx={{ color: theme.palette.primary.main }} />,
        ruta: "recibos",
      },
      {
        nombreSeccion: "Mi Perfil",
        icono: <FaceRetouchingNaturalIcon sx={{ color: theme.palette.primary.main }} />,
        ruta: "perfil",
      },
    ],
    rutasAdmin: [
      {
        nombreSeccion: "Dashboard",
        icono: (
          <EmojiPeopleTwoToneIcon sx={{ color: theme.palette.primary.light }} />
        ),
        ruta: "dashboard",
      },
      {
        nombreSeccion: "Cargar Empleados",
        icono: <PersonAddIcon sx={{ color: theme.palette.primary.light }} />,
        ruta: "crear-empleado",
      },
      {
        nombreSeccion: "Cargar Recibos",
        icono: <ReceiptLongIcon sx={{ color: theme.palette.primary.light }} />,
        ruta: "cargarRecibos",
      },
    ],
    rutasEmpleado: [
      {
        nombreSeccion: "Home",
        icono: <HomeIcon sx={{ color: theme.palette.primary.main }} />,
        ruta: "/",
      },
      {
        nombreSeccion: "Mi Asistencia",
        icono: (
          <PunchClockTwoToneIcon sx={{ color: theme.palette.primary.main }} />
        ),
        ruta: "mensajes",
      },      
    ],
  };
};

export default rutas;
