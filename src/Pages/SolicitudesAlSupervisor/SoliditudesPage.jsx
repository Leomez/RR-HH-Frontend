import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Box, Button, Divider, Paper, Tabs, Tab } from '@mui/material'
import { TabPanel } from './TabPanel';
import ListadoDeSolicitudes from '../../Servicios/SolicitudesAlSupervisor/Listado';
import Calendario from '../../Servicios/SolicitudesAlSupervisor/VistaCalendario/Index';
import { getTodasSolicetudes } from '../../Redux/Features/Solicitudes/solicitudesSlice';
import { getSolicitudes } from '../../Redux/Features/Solicitudes/solicitudesSlice';
// import ListadoDeSolicitudes from '../../Servicios/Autorizaciones/ListadoDeSolicitudes';

export default function SoliditudesPage() {

    const dispatch = useDispatch()
    const [index, setIndex] = useState(0);
    const [sol, setSol] = useState([])
    const empleado_id = useSelector((state) => state.empleado.empleadoActual.id);
    const {solicitudes, loading, error} = useSelector((state) => state.solicitudes);   

    // console.log(sol);

    useEffect(() => {
        dispatch(getSolicitudes(empleado_id))
        // setSol(todasSolicitudes)
        const savedIndex = localStorage.getItem('tabIndex');
        if (savedIndex !== null) {
            setIndex(parseInt(savedIndex, 10));
        }
    }, [dispatch])

    useEffect(() => {
        setSol(solicitudes)
    },[solicitudes])
    
    const handleChange = (event, newValue) => {
        setIndex(newValue);
        // Guardar el índice del panel en localStorage
        localStorage.setItem('tabIndex', newValue);
    };


    return (
        <div>
            <Typography px={2} fontWeight={400} lineHeight={2} level="h4">LICENCIAS Y PERMISOS DEL PERSONAL</Typography>
            <Divider />
            <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={index} onChange={handleChange}>
                        <Tab label="SOLICITUDES" sx={{ ":focus": { outline: 'none' } }} />
                        <Tab label="CALENDARIO" sx={{ ":focus": { outline: 'none' } }} />
                    </Tabs>
                </Box>
                <TabPanel value={index} index={0}>
                    <ListadoDeSolicitudes solicitudes={sol} />
                </TabPanel>
                <TabPanel value={index} index={1}>
                    <Calendario
                        solicitudes={sol && sol}
                        loading={loading}
                        error={error}
                     />
                </TabPanel>

            </Paper>
        </div>
    )
}
