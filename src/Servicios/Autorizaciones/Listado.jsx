import {React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Stack } from "@mui/material";
import LicenciasTable from "./LicenciasTable"; 
import VacacionesTable from "./VacacionesTable";
import PermisosTable from "./PermisosTable";
import { getSolicitudes } from "../../Redux/Features/Solicitudes/solicitudesSlice";

const ListadoDeSolicitudes = () => {
    const solicitudes1 = useSelector((state) => state.solicitudes.solicitudes);
    const empleado_id = useSelector((state) => state.empleado.empleadoActual.id);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSolicitudes(empleado_id));
    }, []);

    const Licencias = solicitudes1.filter((solicitud) => solicitud.tipo === "Licencia");
    const vacaciones = solicitudes1.filter((solicitud) => solicitud.tipo === "Vacaciones");
    const Permisos = solicitudes1.filter((solicitud) => solicitud.tipo === "Permiso");

    // console.log(solicitudes1);
    console.log(Permisos);
    console.log(vacaciones);
    console.log(Licencias);
    return (
        <List>            
            <LicenciasTable licencias={Licencias} />
            <br />
            <VacacionesTable vacaciones={vacaciones} />
            <br />
            <PermisosTable permisos={Permisos} />            
        </List>
    );
};




export default ListadoDeSolicitudes;