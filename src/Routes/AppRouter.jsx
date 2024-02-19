import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RutasAdmin } from "./RutasAdmin";
import LoginPage from "../Pages/LoginPage/LoginPage";
import Registrarse from "../Servicios/Login/RegistroForm";
import NotFound from "../Pages/NotFound/NotFoun";
import { RutasComunes } from "./RutasComunes";
import { RutasSuper } from "./RutasSuper";

export const AppRouter = () => {
  const user = useSelector((state) => state.user);
  const auth = user? user.isAuth : null
  console.log(auth);

  let elementToRender;
  if (auth) {
    console.log('autorizado...');
    if (user.rol === "ADMIN") {
      elementToRender = <RutasAdmin />;
    } else if (user.rol === "SUPER") {
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
      {!auth && <Route path="/login" element={<LoginPage />} />}
      <Route path="/registrarse" element={<Registrarse />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};
