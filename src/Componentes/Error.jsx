import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography, Card, Button } from '@mui/material'
import { logoutUser } from '../Redux/Features/Login/userSlice'
import { useNavigate } from 'react-router-dom'

export const Error = ({ error }) => {
    const dispatch = useDispatch()
    console.log(error, 'error el el componente error')
    const navigate = useNavigate()
    const handleClose = (e) => {
        e.preventDefault()
        dispatch(logoutUser())
        navigate('/', { replace: true })
    }
    return (
        <Card >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30rem' }}>
                <Box sx={{ margin: 'auto' }}>
                    <Typography variant="h5" >Hubo un error</Typography>
                    <Typography variant="body1" color="#000">
                        <Typography color={'error'}>{error.status}</Typography>
                        <Typography>{error.data.message}</Typography>
                        {
                            error.data.message === 'Token inválido' &&
                            <Typography variant='body1' color={'info'}>Se agoto el tiempo de su sesion. Cierre y vuelva a iniciar </Typography>}
                    </Typography>
                    {
                        error.data.message === 'Token inválido' &&
                        <Button variant="contained" onClick={handleClose}>Cerrar</Button>
                    }
                </Box>
            </Box>
        </Card>
    );
}
