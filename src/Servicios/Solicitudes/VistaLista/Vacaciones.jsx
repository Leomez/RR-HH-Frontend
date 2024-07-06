import { React, useState, useEffect } from 'react'
import { Box, Paper, Typography, List, ListItem, ListItemText, IconButton, Divider, Skeleton } from '@mui/material'
import DashboardCard from '../../../Componentes/Containers/DashboardCard'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';



function Vacaciones({onAction}) {
    const solicitudes = useSelector(state => state.solicitudes.solicitudes)

    const vacaciones = solicitudes.filter(s => s.tipo === 'Vacaciones')

    // console.log(permisos)

    return (
        <DashboardCard title={"VACACIONES"}>
            <List sx={{ width: '100%', bgcolor: 'background.paper', alignContent: 'right' }}>
                {vacaciones.length > 0 ? vacaciones.map((v, i) => (
                    <Box key={v.id}>
                        {i !== 0 && <Divider />}
                        <ListItem
                            secondaryAction={
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton 
                                    onClick={() => onAction(v.id, 'Aprobado')}
                                    sx={{
                                        color: 'primary.main',
                                        backgroundColor: 'primary.light',
                                        ':hover': {
                                            backgroundColor: 'primary.main',
                                            color: '#fff'
                                        }
                                    }}>
                                        <ThumbUpAltIcon />
                                    </IconButton>
                                    <IconButton 
                                    onClick={() => onAction(v.id, 'Rechazado')}
                                    sx={{
                                        color: 'error.main',
                                        backgroundColor: 'error.light',
                                        ':hover': {
                                            backgroundColor: 'error.main',
                                            color: '#fff'
                                        }
                                    }}>
                                        <ThumbDownAltIcon />
                                    </IconButton>
                                </Box>
                            }
                        >
                            <ListItemText primary={v.empleado} />                            
                        </ListItem>
                        <ListItem>
                            {/* <ListItemText primary={'Tipo'} secondary={p.nombre_tipo} /> */}
                            {/* <ListItemText primary={'Fecha'} secondary={p.fecha_permiso} /> */}
                            {v.fecha_desde && <ListItemText primary={'Fecha de inicio'} secondary={v.fecha_desde} />}
                            {v.fecha_hasta && <ListItemText primary={'Fecha de fin'} secondary={v.fecha_hasta} />}
                            {v.cant_dias && <ListItemText primary={'Días disponibles'} secondary={v.cant_dias} />}
                            {v.dias_solicitados && <ListItemText primary={'Días solicitados'} secondary={v.dias_solicitados} />}
                            {/* <ListItemText primary={'Motivo'} secondary={p.motivo} /> */}
                            <ListItemText primary={'Sector'} secondary={v.sector} />
                        </ListItem>
                    </Box>
                )) :
                    <ListItem>
                        <ListItemText secondary={'No hay solicitudes de vacaciones'} />
                    </ListItem>
                }
            </List>
        </DashboardCard>
    )
}

export default Vacaciones
