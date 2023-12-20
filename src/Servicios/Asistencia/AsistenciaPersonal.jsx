import {React, useState} from "react";
import { Box, Typography, Button } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import CardComponent from "../../Componentes/Containers/CardComponent";
import obtenerHoraActual from "../../Utils/obtenerHoraActual";

export default function AsistenciaPersonal() {

    const [inicioActividad, setInicioActividad] = useState({
        inicio: false,
        pausa: false,
        mensaje: "No iniciaste actividad",
        horaInicio: "",
        horaPausa: "",
        finPausa: "",
        horaFin: ""
    });



    //handlers
    const handleIniciarYPausarActividad = (event) => {
        event.preventDefault()
        if (!inicioActividad.inicio) {
            setInicioActividad(prevState => ({
                ...prevState,
                inicio: !prevState.inicio,
                horaInicio: obtenerHoraActual(),
                mensaje: "Iniciaste Actividad"
            }))

        }
        if (inicioActividad.inicio && !inicioActividad.pausa) {
            setInicioActividad(prevState => ({
                ...prevState,
                pausa: !prevState.pausa,
                mensaje: "Pausa iniciada",
                horaPausa: obtenerHoraActual(),
            }))
        }
        if (inicioActividad.inicio && inicioActividad.pausa) {
            setInicioActividad(prevState => ({
                ...prevState,
                pausa: !prevState.pausa,
                mensaje: "Iniciaste Actividad",
                finPausa: obtenerHoraActual()
            }))
        }

    };

    const handleFinalizarActividad = (event) => {
        event.preventDefault()
        setInicioActividad(prevState => ({
            ...prevState,
            inicio: !prevState.inicio,
            mensaje: "No iniciaste actividad"
        }))
    }

    // handlers

    return (
        <Box
            sx={{ height: "inherit" }}>
            <CardComponent
                titulo={"Mi Asistencia"}
                link={"VER MAS"}
                footer={<StarIcon/>}>
                {/* Contenido en el segundo Box del CardComponent */}
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    margin={"1rem"}
                >
                    <Box
                        display={"flex"}
                        alignItems={'center'}
                        sx={{ margin: 'auto', width: 'auto' }}>
                        <Box
                            sx={{
                                // width: 'auto',
                                backgroundColor: inicioActividad.inicio ? 'green' : 'red',
                                // margin: 'auto',
                                padding: '0px 5px',
                                borderRadius: '25px',
                            }}>
                            {inicioActividad.mensaje}
                        </Box>
                        {inicioActividad.pausa && <Typography
                            sx={{ padding: '0px 5px', color: 'primary' }}
                            variant='caption'
                        >
                            {inicioActividad.horaPausa}
                        </Typography>}
                    </Box>
                    {inicioActividad.inicio &&
                        <Box
                            display={"flex"}
                            justifyContent={'center'}
                            alignItems={"center"} >
                            <Box
                                sx={{
                                    margin: '1rem 0.5rem',
                                    backgroundColor: 'green',
                                    width: '0.5rem',
                                    height: '0.5rem',
                                    borderRadius: '50%'
                                }}>
                            </Box>
                            <Typography variant="h6">{inicioActividad.horaInicio}</Typography>
                        </Box>

                    }
                    <Button
                        variant="outlined"
                        color={inicioActividad.inicio ? 'secondary' : 'primary'}
                        onClick={handleIniciarYPausarActividad}
                    >
                        {inicioActividad.inicio && !inicioActividad.pausa ? "PAUSAR" : "INICIAR"}
                    </Button>
                    {inicioActividad.inicio &&
                        <Button
                            onClick={handleFinalizarActividad}
                            variant="outlined"
                            color='error'>
                            FINALIZAR
                        </Button>}                    
                </Box>
                {/*  */}
            </CardComponent>
        </Box>
    )
}