import React from 'react'
import { Card, Typography, Box, Stack } from '@mui/material'
import CustomNoRowsOverlay from '../../Utils/NoRows'


function NotificacionDeMensajes() {
    return (
        <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <Box display="flex" bgcolor="#1976d2" position="sticky" top="0" alignItems="center" p={1}>
                <Typography color="white" variant="h6">Mensajes</Typography>
            </Box>
            <Stack sx={{ flexGrow: 1, overflowY: "auto" }}>
                <Box>
                    <CustomNoRowsOverlay mensaje="Proximamente mansajes acá..." />
                </Box>
            </Stack>
        </Card>
    )
}

export default NotificacionDeMensajes