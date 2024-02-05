// import { React, useEffect, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RutasAdmin } from "./RutasAdmin";
import LoginPage from "../Pages/LoginPage/LoginPage";
import Registrarse from "../Servicios/Login/RegistroForm";
import NotFound from "../Pages/NotFound/NotFoun";
import { RutasComunes } from "./RutasComunes";
import { RutasSuper } from "./RutasSuper";



export const AppRouter = () => {
  // const loading = useSelector(state => state.loading)
  const user = useSelector((state) => state.user);
  console.log(user.conexion);

  return (
    <Routes>
      {/* <div style={{width: 'calc(100% - 65px)', position: 'absolute', right: '0px' }}> */}

      {user.isAuth && user.rol === "ADMIN" ? (
        <Route path="/*" element={<RutasAdmin />} />
      ) : user.isAuth && user.rol === "SUPER" ? (
        <Route path="=/*" element={<RutasSuper />} />          
      ) :  (
        <Route path="/*" element={<RutasComunes />} />
      ) 
      // : (
      //   <Route path="login" element={<LoginPage />} />
      // )
      }
      <Route path="/registrarse" element={<Registrarse />} />
      <Route path="/notFound-404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/login" replace />} />

      {/* </div> */}
    </Routes>
  );
};
