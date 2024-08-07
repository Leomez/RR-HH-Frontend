/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { IconButton, Divider, useTheme, Box} from "@mui/material";
import { DrawerHeader, DrawerWrapper } from "./SideBarController";
// SECCIONES
import ListaComunes from "./ListaComunes";
import ListasSuper from "./ListaSuper";
import ListasAdmin from "./ListasAdmin";
// ICONOS
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
 

export function SideBar({ open, handleDrawerClose, drawerWidth }) {
  const permisos = useSelector((state) => state.user.rol);
  const [seccionActiva, setSeccionActiva] = useState("/");
  const location = useLocation()
  useEffect(() => {
    setSeccionActiva(location.pathname);
  },[location]) 

  const theme = useTheme();
  return (
    <DrawerWrapper variant="permanent" open={open} drawerwidth={drawerWidth}>
      <Box className="drawerClass" onClick={handleDrawerClose} sx={{ width: drawerWidth }} height={"100%"}>
        <DrawerHeader className="drawerClass">
          <IconButton className="drawerClass" onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon className="drawerClass"/>
            ) : (
              <ChevronLeftIcon className="drawerClass"/>
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box id="ListCotainer">
          <ListaComunes close={handleDrawerClose} seccionActiva={seccionActiva} theme={theme}/>          
          <Divider />
          {permisos === "ADMIN" && (
            <ListasAdmin close={handleDrawerClose} seccionActiva={seccionActiva} theme={theme}/>            
          )}{permisos === "SUP" && (
            <ListasSuper close={handleDrawerClose} seccionActiva={seccionActiva} theme={theme}/>
          )}
        </Box>
      </Box>
    </DrawerWrapper>
  );
}
