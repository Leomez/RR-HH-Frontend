import { Navigate, Route, Routes } from "react-router-dom";
import { RutasComunes } from "./RutasComunes";

export const RutasSuper = () => {
    return(
        <Routes>
            <Route path="/*" element={<RutasComunes />} />
            <Route path="*" element={<Navigate to={'/'} replace/>}/>
        </Routes>
    )
}



