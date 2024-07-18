/* eslint-disable */
import { React, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { NavBar } from "../NavBar";
import { SideBar } from "../SideBar/SideBar";
import { Footer } from "../Footer/Footer"
import styles from "./Layout.module.css"


export function Layout({ children }) {
  const drawerWidth = 255;
  const auth = useSelector((state) => state.user.isAuth);
  const loading = useSelector((state) => state.loading);
  const [openMenu, setOpenMenu] = useState(false);

  function handleOpenMenu(e) {
    if (e.target.classList.contains("drawerClass")) {
      setOpenMenu(!openMenu);
    } else {
      setOpenMenu(false);
    }
  }

  function hadlerClose() {
    setOpenMenu(false);
  }

  return (
    <Box>
      <div id="layout" className={styles.layout}>
        <NavBar
          open={openMenu}
          handleOpenMenu={handleOpenMenu}
          drawerWidth={drawerWidth}
        />
        {
          auth ? (
            <>
              <SideBar
                open={openMenu}
                handleDrawerClose={handleOpenMenu}
                drawerWidth={drawerWidth}
              />
              <Box>
                <div onClick={hadlerClose} className={styles.layoutContainer} id="layoutContainer">
                  {children}
                  {/* <Footer /> */}
                </div>
              </Box>
            </>
          ) : (
            <Box>
              <div>
                {children}
              </div>
            </Box>
          )
        }
      </div>
    </Box>
  );
}
