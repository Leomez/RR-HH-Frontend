import { combineReducers} from "@reduxjs/toolkit";
import empleadoReducer from "../Features/Empleado/empleadoSlice"
import userReducer from "../Features/Login/userSlice"
import sectoresReducer from "../Features/Sectores/sectoresSlice"
import reciboReducer from "../Features/Recibos/recibosDeSueldoSlice"
import loadingReducer from "../Features/Loading/loadingSlice";
import alertaReducer from "../Features/Alerta/alertaSlice";
import firmaReducer from "../Features/Firma/firmaSilce";
import notificacionesReducer from "../Features/Notificaciones/notificacionesSlice";
import supervisorReducer from "../Features/Supervisor/supervisorSlice";
import errorReducer from "../Features/Error/errorSlice"

const rootReducer =  combineReducers({
    empleado: empleadoReducer,
    user: userReducer,
    sectores: sectoresReducer,
    recibos: reciboReducer,
    loading: loadingReducer,
    alerta: alertaReducer,
    notificaciones: notificacionesReducer,
    firma: firmaReducer,
    supervisor: supervisorReducer,
    error: errorReducer
})


export default rootReducer