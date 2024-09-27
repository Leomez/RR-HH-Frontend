import { combineReducers} from "@reduxjs/toolkit";
import empleadoReducer from "../Features/Empleado/empleadoSlice";
import userReducer, { logoutUser } from "../Features/Login/userSlice";
import sectoresReducer from "../Features/Sectores/sectoresSlice";
import reciboReducer from "../Features/Recibos/recibosDeSueldoSlice";
import loadingReducer from "../Features/Loading/loadingSlice";
import alertaReducer from "../Features/Alerta/alertaSlice";
import firmaReducer from "../Features/Firma/firmaSilce";
import notificacionesReducer from "../Features/Notificaciones/notificacionesSlice";
import supervisorReducer from "../Features/Supervisor/supervisorSlice";
import errorReducer from "../Features/Error/errorSlice";
import solicitudesReducer from "../Features/Solicitudes/solicitudesSlice";
import asistenciaReducer from "../Features/Asistencia/asistenciaSlice";


const appReducer =  combineReducers({
    empleado: empleadoReducer,
    user: userReducer,
    sectores: sectoresReducer,
    recibos: reciboReducer,
    loading: loadingReducer,
    alerta: alertaReducer,
    notificaciones: notificacionesReducer,
    firma: firmaReducer,
    supervisor: supervisorReducer,
    solicitudes: solicitudesReducer,
    error: errorReducer,
    asistencia: asistenciaReducer
});

const rootReducer = (state, action) => {
    if (action.type === logoutUser.type) {        
        state = undefined;
    }
    return appReducer(state, action);
}




export default rootReducer