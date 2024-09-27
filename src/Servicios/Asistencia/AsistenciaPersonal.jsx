import s from "./Asistencia.module.css"
import { red, green } from "@mui/material/colors";
import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, Skeleton } from "@mui/material";
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import CardComponent from "../../Componentes/Containers/CardComponent";
import obtenerHoraActual from "../../Utils/obtenerHoraActual";
import { nuevoIngreso, nuevoInicioPausa, nuevoFinPausa, nuevoSalida } from "../../Redux/Features/Asistencia/asistenciaSlice";

export default function AsistenciaPersonal() {
    const dispatch = useDispatch();
    const { ingreso, inicioPausa, finPausa, salida, loading, error } = useSelector(state => state.asistencia)
    const { empleadoId } = useSelector(state => state.user)


    const [inicioActividad, setInicioActividad] = useState({
        inicio: false,
        pausa: false,
        mensaje: "No iniciaste actividad",
        mensajePausa: ""
    });

    useEffect(() => {
        if(ingreso){
            setInicioActividad(prevState => ({
                ...prevState,
                inicio: true,
                mensaje: `Iniciaste actividad a las ${ingreso}hs`
            }))
        } else if (ingreso && inicioPausa && !finPausa) {
            setInicioActividad(prevState => ({
                ...prevState,
                pausa: true,
                mensajePausa: `Pausa iniciada a las ${inicioPausa}hs`,
                
            }))
        } else if (ingreso && inicioPausa && finPausa) {
            setInicioActividad(prevState => ({
                ...prevState,
                pausa: false,
                mensajePausa: ""
            }))
        } else if (salida) {
            setInicioActividad({
                inicio: false,
                pausa: false,
                mensaje: "No iniciaste actividad",
                mensajePausa: ""
            })

        }
    }, [ingreso, inicioPausa, finPausa, salida])

    console.log(ingreso && ingreso);
    console.log(inicioPausa && inicioPausa);
    console.log(finPausa && finPausa);
    console.log(salida && salida);
    console.log(inicioActividad);


    //handlers
    const handleIniciarYPausarActividad = (event) => {
        event.preventDefault()
        if (!inicioActividad.inicio) {
            dispatch(nuevoIngreso(empleadoId))
            setInicioActividad(prevState => ({
                ...prevState,
                inicio: !prevState.inicio                
            }))
            console.log(ingreso && ingreso);
        }
        if (inicioActividad.inicio && !inicioActividad.pausa) {
            dispatch(nuevoInicioPausa(empleadoId))
            setInicioActividad(prevState => ({
                ...prevState,
                pausa: !prevState.pausa
            }))
            console.log(inicioPausa && inicioPausa);
        }
        if (inicioActividad.inicio && inicioActividad.pausa) {
            dispatch(nuevoFinPausa(empleadoId))
            setInicioActividad(prevState => ({
                ...prevState,
                pausa: !prevState.pausa
                // finPausa: obtenerHoraActual()
            }))
            console.log(finPausa && finPausa);
        }

    };

    const handleFinalizarActividad = (event) => {
        event.preventDefault()
        dispatch(nuevoSalida(empleadoId))
        console.log(salida && salida);
        setInicioActividad(prevState => ({
            ...prevState,
            inicio: !prevState.inicio,            
        }))
    }

    // handlers

    return (
        <Box
            sx={{ height: "inherit", width: '100%' }}>
            <Box className={s.innerContainer}>
                {/* Contenido en el segundo Box del CardComponent */}
                <Box className={s.pausaContainer}>
                    <span ><PauseCircleOutlineIcon className={s.pausaIcon}/></span>
                    <Typography>{"pausa"}</Typography>
                </Box>
                <Box
                    className={s.actividadContainer}>
                    <Box
                        className={s.actividad}
                        sx={{backgroundColor: inicioActividad.inicio ? green[400] : red[300]}}>
                        { !loading ? <Typography>{inicioActividad.mensaje}</Typography> : <Skeleton variant="rectangular" width={100} height={60} />}
                    </Box>
                    {inicioActividad.pausa && <Typography
                        sx={{ padding: '0px 5px', color: 'primary' }}
                        variant='caption'
                    >
                        {inicioPausa && inicioPausa}
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
                        {ingreso ? <Typography variant="h6">{ingreso}</Typography> : <Skeleton variant="rectangular" width={100} height={20} />}
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

                {/*  */}
            </Box>
        </Box>
    )
}