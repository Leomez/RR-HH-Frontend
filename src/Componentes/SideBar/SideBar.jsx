/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  IconButton,
  ListItemIcon,
  ListItemButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Box,
} from "@mui/material";
import { DrawerHeader, DrawerWrapper } from "./SideBarController";
// ICONOS

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// RUTAS
import rutas from "./Links";

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
      <Box className="drawerClass" onClick={handleDrawerClose} height={"100%"}>
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
          <List>
            {rutas().rutasComunes.map((ruta) => (
              <ListItem

                key={ruta.nombreSeccion}
                disablePadding
                sx={{ display: "block" }}
              >                
                <Link to={ruta.ruta}>
                  <ListItemButton      
                    selected={ seccionActiva === (`/${ruta.ruta}`) || seccionActiva === (ruta.ruta) }
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      borderLeft: (seccionActiva === (`/${ruta.ruta}`) || seccionActiva === (ruta.ruta)) ? '2px solid #1976d2' : 'none'
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {ruta.icono}
                    </ListItemIcon>
                    <ListItemText
                      primary={ruta.nombreSeccion}
                      sx={{
                        color: theme.palette.primary.main,
                        opacity: open ? 1 : 0,
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
          {permisos === "ADMIN" && (
            <List>
              {rutas().rutasAdmin.map((ruta) => (
                <ListItem
                  key={ruta.nombreSeccion}
                  disablePadding
                  sx={{ display: "block"}}
                >
                  <Link to={ruta.ruta}>
                    <ListItemButton
                      selected={ seccionActiva === (`/${ruta.ruta}`) || seccionActiva === (ruta.ruta) }
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5, 
                        borderLeft: (seccionActiva === (`/${ruta.ruta}`) || seccionActiva === (ruta.ruta)) ? '2px solid #1976d2' : 'none' 

                        // ":focus": {backgroundColor: 'rgba(0, 0, 0, 0.06)'}                        
                      }}                      
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {ruta.icono}
                      </ListItemIcon>
                      <ListItemText
                        primary={ruta.nombreSeccion}
                        sx={{
                          color: theme.palette.primary.light,
                          opacity: open ? 1 : 0,
                        }}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </DrawerWrapper>
  );
}
