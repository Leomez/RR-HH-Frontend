/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Card,
  Modal,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import personal from "../assets/Personal.png";
// import { logout } from "../Redux/Features/Login/loginSlice"
import { AppBarWrapper } from "./SideBar/SideBarController";
// import ModalCustom from "./Containers/Modal";
import LoginForm from "../Servicios/Login/LoginForm";
import Logout from "../Servicios/Login/Logout";

export function NavBar({ open, handleOpenMenu, drawerWidth }) {
  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  const auth = useSelector((state) => state.user.isAuth);
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal(!openModal);
  };
  // function handleLogout() {
  //     dispatch(logout())
  //     navigate('/', { replace: true })
  // }
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
              onClick={handleModal}
              sx={{
                color: "#fff",
                ":focus": { outline: "none" },
                ":hover": { border: "1px solid #fff", borderRadius: "3px" },
              }}
            >
              <Typography>INGRESAR</Typography>
            </Button>
          )}
          <Modal open={openModal} onClose={handleModal}>
            <Box>
              <Card
                sx={{
                  padding: { xs: "10%", md: "5%" },
                  width: { md: "30%" },
                  maxWidth: "70%",
                  margin: "auto",
                  position: "relative",
                }}
              >
                <Button
                  color="error"
                  variant="contained"
                  onClick={handleModal}
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
                <LoginForm handleModal={handleModal} />
              </Card>
            </Box>
          </Modal>
        </Toolbar>
      </AppBarWrapper>
    </Box>
  );
}
