/* eslint-disable react/prop-types */
import { React } from "react";
import { Link } from "react-router-dom";
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
import HomeIcon from "@mui/icons-material/Home";
import EmojiPeopleTwoToneIcon from "@mui/icons-material/EmojiPeopleTwoTone";
import PunchClockTwoToneIcon from "@mui/icons-material/PunchClockTwoTone";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
// RUTAS
import rutas from "./Links";
import { useSelector } from "react-redux";

export function SideBar({ open, handleDrawerClose, drawerWidth }) {
  const permisos = useSelector((state) => state.user.rol);
  // console.log(permisos);

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
            {rutas().rutasComunes.map((ruta, index) => (
              <ListItem
                key={ruta.nombreSeccion}
                disablePadding
                sx={{ display: "block" }}
              >
                <Link to={ruta.ruta}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
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
                  sx={{ display: "block" }}
                >
                  <Link to={ruta.ruta}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
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
