import { React, useState } from 'react'
import { Typography, Divider } from '@mui/joy'
import { Box, Button, Drawer } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import ConfigurarTipoSolicitudes from '../../Servicios/Solicitudes/configurarSolicitudes/ConfigurarTipoSolicitudes';

function Solicitudes() {

    const [open, setOpen] = useState(false)

    const toggleDrawer = () => {
        setOpen(!open)
    }

    return (
        <div>
            <Typography px={2} fontWeight={400} lineHeight={2} level="h4">SOLICITUDES</Typography>
            <Divider />
            <Box sx={{                
                alignItems: 'center',
                paddingY: '1rem'
            }} display={'flex'}>
                <Button sx={{ marginLeft: '1rem' }} onClick={toggleDrawer} startIcon={<SettingsIcon />} size='small' variant='outlined' color="primary">Configurar tipos de solicitudes</Button>
                <Drawer anchor='right' open={open} onClose={toggleDrawer}>
                    <ConfigurarTipoSolicitudes close={setOpen} />
                </Drawer>

            </Box>
            <Divider />
        </div>
    )
}

export default Solicitudes
