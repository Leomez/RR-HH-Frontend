import { Typography, Card, Box, Skeleton, Backdrop, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export const ModalDeRespuesta = ({ open, setOpen, respuesta }) => {

    const navigate = useNavigate();
    const cargando = useSelector(state => state.loading)

    const handlerClose = () => {
        setOpen(false)
        navigate('/', { replace: true })
    }

    return (
        <>
            <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handlerClose} >
                <Card sx={{ width: '60%', display: 'flex', margin: 'auto', padding: '3rem' }}>
                    {cargando ? <Skeleton variant="rectangular" width={210} height={118} /> :
                        !respuesta.data?.success && respuesta.status ? <Box >
                            <Typography color={'error'} variant="h4">Error: {respuesta.status}</Typography>
                            <Typography
                                fontSize={{ xs: '120%', md: '150%' }}
                                fontWeight={'500'}
                                variant="h4">{respuesta.data.message}
                            </Typography>
                            <Typography sx={{ padding: 2 }} >{respuesta.data?.error}</Typography>
                            <Button onClick={handlerClose} variant="contained" color="primary">Iniciar Sesión</Button>
                        </Box> : <Box >
                            <Typography color={'success'} variant="h4">{respuesta.message}</Typography>
                            <Typography
                                fontSize={{ xs: '120%', md: '150%' }}
                                fontWeight={'500'}
                                variant="h5">{`¡Excelente ${respuesta.nombreUsuario}! Ahora podras ingresar con tu email y contraseña`}
                            </Typography>
                            <Button onClick={handlerClose} variant="contained" color="primary">Iniciar Sesión</Button>
                        </Box>}
                </Card>
            </Backdrop>
        </>
    )
}
