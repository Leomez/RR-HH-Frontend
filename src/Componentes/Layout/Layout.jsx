/* eslint-disable */

import { React, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar";
import { SideBar } from "../SideBar/SideBar";
import LoginPage from "../../Pages/LoginPage/LoginPage";
import S from "./Layout.module.css";
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

  return (
    <div id="layout">
      <NavBar
        open={openMenu}
        handleOpenMenu={handleOpenMenu}
        drawerWidth={drawerWidth}
      />
      {auth ? (
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
            {/* <Outlet /> */}
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
          </Box>{" "}
        </>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}
