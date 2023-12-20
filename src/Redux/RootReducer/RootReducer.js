import { combineReducers} from "@reduxjs/toolkit";
import empleadoReducer from "../Features/Empleado/empleadoSlice"
import userReducer from "../Features/Login/userSlice"
import sectoresReducer from "../Features/Sectores/sectoresSlice"
import reciboReducer from "../Features/Recibos/recibosDeSueldoSlice"
import loadingReducer from "../Features/Loading/loadingSlice";
import alertaReducer from "../Features/Alerta/alertaSlice";
import firmaReducer from "../Features/Firma/firmaSilce";
import notificacionesReducer from "../Features/Notificaciones/notificacionesSlice";

const rootReducer =  combineReducers({
    empleado: empleadoReducer,
    user: userReducer,
    sectores: sectoresReducer,
    recibos: reciboReducer,
    loading: loadingReducer,
    alerta: alertaReducer,
    notificaciones: notificacionesReducer,
    firma: firmaReducer
})


export default rootReducer