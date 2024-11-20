import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../../Redux/Features/Alerta/alertaSlice";

const dispatch = useDispatch();

const Hooks = {
    useAlert : (cb, respuesta) =>{
        useEffect(() => {
            if (respuesta) {
                dispatch(
                    showAlert({
                        type: respuesta.success ? "success" : "error",
                        message: respuesta.message,
                    })
                );
                cb(null)
            }
        },[respuesta])//si no funciona bien probar poner dispatch en el array de dependencias
    } 
}

export default Hooks;