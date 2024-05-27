import { Navigate, Route, Routes } from "react-router-dom";
import { RutasComunes } from "./RutasComunes";
import SoliditudesPage from "../Pages/SolicitudesAlSupervisor/SoliditudesPage";

// import { }

export const RutasSuper = () => {
    return(
        <Routes>
            <Route path="/*" element={<RutasComunes />} />
            <Route path="/solicitudesAAutorizar" element={<SoliditudesPage />} />
            <Route path="*" element={<Navigate to={'/'} replace/>}/>
        </Routes>
    )
}



