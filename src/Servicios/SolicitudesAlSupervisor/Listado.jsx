import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import LicenciasTable from "./LicenciasTable"; 
import VacacionesTable from "./VacacionesTable";
import PermisosTable from "./PermisosTable";
import { getSolicitudes, elevarSolicitud } from "../../Redux/Features/Solicitudes/solicitudesSlice";

const ListadoDeSolicitudes = ({solicitudes}) => {    
    const empleado_id = useSelector((state) => state.empleado.empleadoActual.id);
    const dispatch = useDispatch();    

    const [open, setOpen] = useState(false);
    const [sol, setSol] = useState([])
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);
    const [accion, setAccion] = useState("");
    
    useEffect(() => {        
        setSol(solicitudes)
    }, [dispatch, solicitudes]);

    const handleDialogOpen = (solicitudId, estado) => {
        setSelectedSolicitud({ solicitudId, estado });
        setAccion(estado);
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setSelectedSolicitud(null);
        setAccion("");         
    };

    const handleConfirm = () => {
        if (selectedSolicitud) {
            dispatch(elevarSolicitud(selectedSolicitud)).then(() => {
                dispatch(getSolicitudes(empleado_id));
                handleDialogClose();
            });
        }
    };

    const licencias = sol.filter((solicitud) => solicitud.tipo === "Licencia");
    const vacaciones = sol.filter((solicitud) => solicitud.tipo === "Vacaciones");
    const permisos = sol.filter((solicitud) => solicitud.tipo === "Permiso");

    return (
        <>
            <List>            
                <LicenciasTable licencias={licencias} onAction={handleDialogOpen} />
                <br />
                <VacacionesTable vacaciones={vacaciones} onAction={handleDialogOpen}/>
                <br />
                <PermisosTable permisos={permisos} onAction={handleDialogOpen}/>            
            </List>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Confirmar Acción</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas {accion.toLowerCase() === "elevado" ? "elevar" : "rechazar"} esta solicitud?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ListadoDeSolicitudes;
