import s from "./CrearEmpleadoNuevo.module.css"
import CardComponent from "../../Componentes/Containers/CardComponent"
import { Box } from "@mui/material";
import CrearNuevoEmpleado from "../../Servicios/Empleados/Crear/CrearNuevoEmpleado";

export default function NuevoEmpleado() {
    return (
        <div className={s.cardComponent}>
            <Box >
                <CardComponent
                    titulo={'Cargar nuevo empleado'}
                >
                    <CrearNuevoEmpleado />
                </CardComponent>
            </Box>
        </div>
    )
}