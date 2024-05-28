import React from "react";
import { List, Stack } from "@mui/material";
import solicitudes from "../../Utils/Solicitudes"
import SolicitudItem from "./SolicitudesItem";

const ListadoDeSolicitudes = () => {
    
    return (
        <List>
            {solicitudes.map((solicitud, index) => (
                <Stack key={solicitud.id} display="contents" direction="column" spacing={2} alignItems="self-start">
                    {index > 0 && <hr />}
                    <SolicitudItem solicitud={solicitud} />
                </Stack>
            ))}
        </List>
    );
};




export default ListadoDeSolicitudes;