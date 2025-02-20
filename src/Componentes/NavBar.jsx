/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Toolbar, Typography, Button, IconButton, Card, Modal, } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import personal from "../assets/Personal.png";
import { AppBarWrapper } from "./SideBar/SideBarController";
import LoginForm from "../Servicios/Login/LoginForm";
import Logout from "../Servicios/Login/Logout";
import RecuperarContrasenia from "../Servicios/Login/recuperarContrasenia";
// import ModalCustom from "./Containers/Modal";
// import { logout } from "../Redux/Features/Login/loginSlice"

export function NavBar({ open, handleOpenMenu, drawerWidth }) {
  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  const auth = useSelector((state) => state.user.isAuth);
  const MODAL = {
    open: false,
    view: 'login',
  }
  const [modal, setModal] = useState(MODAL);

  const handleModal = ({ open, opcion }) => {
    if (open) {
      setModal({ open: open, view: opcion });
    } else {
      setModal({ ...modal, open: false });
    }
  };
  
  return (
    <Box>
      <AppBarWrapper position="fixed" open={open} drawerwidth={drawerWidth}>
        <Toolbar>
          {auth && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, ":focus": { outline: "none" } }}
              onClick={handleOpenMenu}
              className="drawerClass"
            >
              <MenuIcon className="drawerClass" />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={"/"}>
              <img
                style={{ width: "7rem" }}
                src={personal}
                alt="'Centro de Ojos Quilmes - Departamento de Personal"
              />
            </Link>
          </Typography>
          {auth ? (
            <Logout onClose={handleOpenMenu} className={'logout'} />
          ) : (
            <Button
              onClick={ () => handleModal({ open: true, opcion: 'login' })}
              sx={{
                color: "#fff",
                ":focus": { outline: "none" },
                ":hover": { border: "1px solid #fff", borderRadius: "3px" },
              }}
            >
              <Typography>INGRESAR</Typography>
            </Button>
          )}
          <Modal open={modal.open} onClose={() => handleModal({open:false, opcion: 'login'})}>
            <Box>
              <Card
                sx={{ padding: { xs: "10%", md: "5%" }, width: { md: "30%" }, maxWidth: "70%", margin: "auto", position: "relative" }}
              >
                <Button color="error" variant="contained" onClick={() => handleModal({ open: false, opcion: 'login' })}
                  sx={{
                    margin: "0.5rem 0.5rem 0 0",
                    padding: 0,
                    minWidth: "0",
                    width: "2rem",
                    position: "absolute",
                    right: "0.5rem",
                    top: "0.5rem",
                  }}
                >
                  X
                </Button>
                {
                  modal.view === 'login' ?
                  <LoginForm handleModal={handleModal} />
                  :
                  <RecuperarContrasenia handleModal={handleModal} />
                }
              </Card>
            </Box>
          </Modal>
        </Toolbar>
      </AppBarWrapper>
    </Box>
  );
}
