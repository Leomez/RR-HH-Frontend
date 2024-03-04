import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RutasAdmin } from "./RutasAdmin";
import LoginPage from "../Pages/LoginPage/LoginPage";
import Registrarse from "../Servicios/Login/RegistroForm";
import NotFound from "../Pages/NotFound/NotFoun";
import { RutasComunes } from "./RutasComunes";
import { RutasSuper } from "./RutasSuper";


export const AppRouter = () => {
  const usuario = useSelector((state) => state.user);
  const autenticado = usuario ? usuario.isAuth : false
  console.log(autenticado);
  

  let elementToRender;
  if (autenticado) {
    console.log('autorizado...');
    if (usuario.rol === "ADMIN") {
      elementToRender = <RutasAdmin />;
    } else if (usuario.rol === "SUPER") {
      elementToRender = <RutasSuper />;
    } else {
      elementToRender = <RutasComunes />;
    }
  } 
  else {
    elementToRender = <Navigate to="/login" replace />;
  }
  
  return (
    <Routes>
      <Route path="/*" element={elementToRender} />
      {!autenticado && <Route path="/login" element={<LoginPage />} />}
      <Route path="/registrarse" element={<Registrarse />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};
