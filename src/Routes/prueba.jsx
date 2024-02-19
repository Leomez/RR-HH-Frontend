// import { Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RutasPrivadas } from "./RutasPrivadas";
// import LoginPage from "../Pages/LoginPage/LoginPage";
// import Registrarse from "../Servicios/Login/RegistroForm";
// import NotFound from "../Pages/NotFound/NotFoun";
// import { RutasComunes } from "./RutasComunes";

// export const AppRouter = () => {
//   const user = useSelector((state) => state.user);
//   return (
//     <Routes>
//       {user.isAuth ? 
//         <Route path="/*" element={<RutasComunes />}>
//           {user.isAuth && user.rol === "ADMIN" && (
//             <Route path="/admin" element={<RutasPrivadas />} />
//           )}
//         </Route>
//        : 
//         <Route path="login" element={<LoginPage />} />
//       }
//       <Route path="/registrarse" element={<Registrarse />} />
//       <Route path="/notFound-404" element={<NotFound />} />
//       <Route path="*" element={<Navigate to="/login" replace />} />
//     </Routes>
//   );
// };
