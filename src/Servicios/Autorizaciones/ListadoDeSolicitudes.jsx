import React from 'react';
import solicitudes from '../../Utils/Solicitudes'; // Importar los datos de solicitudes en formato JSON
import { Typography, Box, List, Stack, Chip } from '@mui/material';
import { iconos } from './iconos';

function ListadoDeSolicitudes(props) {
    console.log(solicitudes);
    return (
        <List>
            {solicitudes.map((solicitud, index) => (
                <Stack key={solicitud.id} display="contents" direction="column" spacing={2} alignItems="self-start">
                    {index > 0 && <hr />}
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="self-start">
                        {/* <Box>
                            {solicitud['Tipo de solicitud'] === "Vacaciones" ? iconos.Vacaciones : solicitud['Tipo de solicitud'] === "llegar tarde" ? iconos.llegar_tarde : solicitud['Tipo de solicitud'] === "Franco Compensatorio" ? iconos.llegar_tarde : iconos.medico}
                        </Box> */}
                        {Object.entries(solicitud).map(([atributo, valor]) => {
                            if (atributo !== "id" && valor) {
                                console.log(atributo, valor);
                                return (                                    
                                    <Box key={atributo} sx={{ width: "9rem", height: "auto", alignSelf: atributo === "estado" ? "center" : "flex-start"}}>
                                        {atributo === "estado" ? (
                                            <Chip                                                
                                                key={atributo}
                                                label={valor}
                                                variant="outlined"
                                                color={valor === "En proceso" ? "warning" : valor === "Aprobado" ? "success" : "error"}
                                                sx={{alignSelf: "center"}}
                                            />
                                        ) : (
                                            <>
                                                <Typography variant="h6" fontSize={{sm: 18, xs: 16}} component="div">{atributo}:</Typography>
                                                {valor}
                                            </>
                                        )}
                                    </Box>
                                );
                            }
                            return null;
                        })}
                    </Stack>
                </Stack>
            ))}
        </List>
    );
}

export default ListadoDeSolicitudes;

