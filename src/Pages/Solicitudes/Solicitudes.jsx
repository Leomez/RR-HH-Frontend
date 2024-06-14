import { React, useState } from 'react'
import { Typography, Divider } from '@mui/joy'
import { Box, Button, Drawer, Paper, Tabs, Tab } from '@mui/material'
import { TabPanel } from '../SolicitudesAlSupervisor/TabPanel';
import SettingsIcon from '@mui/icons-material/Settings';
import ConfigurarTipoSolicitudes from '../../Servicios/Solicitudes/configurarSolicitudes/ConfigurarTipoSolicitudes';
import ListadoDeSolicitudes from '../../Servicios/Solicitudes/ListadoDeSolicitudes';

function Solicitudes() {

    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState(0)

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
                <Button
                    sx={{ marginLeft: '1rem' }}
                    onClick={toggleDrawer}
                    startIcon={<SettingsIcon />}
                    size='small'
                    variant='outlined'
                    color="primary">
                    Configurar tipos de solicitudes
                </Button>
                <Drawer anchor='right' open={open} onClose={toggleDrawer}>
                    <ConfigurarTipoSolicitudes close={setOpen} />
                </Drawer>
            </Box>
            <Divider />
            {/* panel de solicitudes */}
            <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={index} onChange={(event, newValue) => setIndex(newValue)}>
                        <Tab label="SOLICITUDES" sx={{ ":focus": { outline: 'none' } }} />
                        <Tab label="CALENDARIO" sx={{ ":focus": { outline: 'none' } }} />
                    </Tabs>
                </Box>
                <TabPanel value={index} index={0}>
                    <ListadoDeSolicitudes />
                    {/* {'Listado de solicitudes elevadas'} */}
                </TabPanel>
                <TabPanel value={index} index={1}>
                </TabPanel>
            </Paper>
        </div>
    )
}

export default Solicitudes
