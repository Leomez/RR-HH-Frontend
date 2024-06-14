import { React, useState } from 'react'
import { Typography, Box, Button, Divider, Paper, Tabs, Tab } from '@mui/material'
import { TabPanel } from './TabPanel';
import ListadoDeSolicitudes from '../../Servicios/Autorizaciones/Listado';
// import ListadoDeSolicitudes from '../../Servicios/Autorizaciones/ListadoDeSolicitudes';

export default function SoliditudesPage() {

    const [index, setIndex] = useState(0);

    return (
        <div>
            <Typography px={2} fontWeight={400} lineHeight={2} level="h4">LICENCIAS Y PERMISOS DEL PERSONAL</Typography>
            <Divider />
            <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={index} onChange={(event, newValue) => setIndex(newValue)}>
                        <Tab label="SOLICITUDES" sx={{ ":focus": { outline: 'none' } }} />
                        <Tab label="CALENDARIO" sx={{ ":focus": { outline: 'none' } }} />
                    </Tabs>
                </Box>
                <TabPanel value={index} index={0}>
                    <ListadoDeSolicitudes />
                </TabPanel>
                <TabPanel value={index} index={1}>
                </TabPanel>

            </Paper>

        </div>
    )
}
