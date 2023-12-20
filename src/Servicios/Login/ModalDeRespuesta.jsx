import { Modal, Typography, Card, Box, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export const ModalDeRespuesta = ({ open }) => {

    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(open)
    const cargando = useSelector(state => state.loading)
    const nuevoUsuario = useSelector(state => state.user.nuevoUsuario)
    useEffect(() => {
        setModalOpen(open);
    }, [open]);

    const handleModal = () => {
        if (nuevoUsuario.success) {
            navigate('/', {replace: true})
        }
        setModalOpen(false)        
    }
    return (<>

        <Modal sx={{ display: 'flex' }} open={modalOpen} onClose={handleModal} >
            <Card sx={{ width: '60%', display: 'flex', margin: 'auto', padding: '3rem' }}>
                {cargando ? <Skeleton variant="rectangular" width={210} height={118}/> :
                   !nuevoUsuario.success && nuevoUsuario.status ? <Box >
                        <Typography color={'error'} variant="h4">Error: {nuevoUsuario.status}</Typography>
                        <Typography
                            fontSize={{ xs: '120%', md: '150%' }}
                            fontWeight={'500'}
                            variant="h4">{nuevoUsuario.data.message}
                        </Typography>
                        <Typography sx={{ padding: 2 }} >{nuevoUsuario && nuevoUsuario.data.error}</Typography>
                    </Box> : <Box >
                        <Typography color={'success'} variant="h4">{nuevoUsuario.message}</Typography>
                        <Typography
                            fontSize={{ xs: '120%', md: '150%' }}
                            fontWeight={'500'}
                            variant="h5">{`¡Excelente ${nuevoUsuario.nombreUsuario}! Ahora podras ingresar con tu email y contraseña`}
                        </Typography>
                        {/* <Typography sx={{ padding: 2 }} >{nuevoUsuario && nuevoUsuario.data}</Typography> */}
                    </Box>}
            </Card>
        </Modal>
    </>
    )
}
