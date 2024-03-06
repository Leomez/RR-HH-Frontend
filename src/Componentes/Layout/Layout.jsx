/* eslint-disable */

import { React, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar";
import { SideBar } from "../SideBar/SideBar";
import LayoutSkelton from "./LayoutSkelton";
import LoginPage from "../../Pages/LoginPage/LoginPage";
import S from "./Layout.module.css";
import { ErrorModal } from "../ErrorModal";



export function Layout({ children }) {
  const drawerWidth = 240;
  const auth = useSelector((state) => state.user.isAuth);
  const loading = useSelector((state) => state.loading);
  const [openMenu, setOpenMenu] = useState(false);


  function handleOpenMenu(e) {
    if (e.target.classList.contains("drawerClass")) {
      setOpenMenu(!openMenu);
    }
  }
  // loading ? console.log('cargando...') : '';
  return (
    <div id="layout">
      <ErrorModal/>
      <NavBar
        open={openMenu}
        handleOpenMenu={handleOpenMenu}
        drawerWidth={drawerWidth}
      />
      {
        // loading ?
          // <LayoutSkelton /> :
          auth ? (
            <>
              <SideBar
                open={openMenu}
                handleDrawerClose={handleOpenMenu}
                drawerWidth={drawerWidth}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "5rem",
                }}
              >
                <div
                  id="layoutContainer"
                  style={{
                    width: "calc(100% - 90px)",
                    margin: "auto",
                    height: "auto",
                    position: "absolute",
                    right: "1rem",
                  }}
                >
                  {children}
                </div>
              </Box>
            </>
          ) : (
            // <LoginPage />
            <Box>
              <div>
                {children}
              </div>
            </Box>
          )
      }
    </div>
  );
}
