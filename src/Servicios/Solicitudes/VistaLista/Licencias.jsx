import { React, useState, useEffect } from 'react'
import { Box, Paper, Typography, List, ListItem, ListItemText, IconButton, Divider, Skeleton } from '@mui/material'
import DashboardCard from '../../../Componentes/Containers/DashboardCard'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function Licencias({onAction}) {
    const solicitudes = useSelector(state => state.solicitudes.solicitudes)

    const licencias = solicitudes.filter(s => s.tipo === 'Licencia')

    // console.log(permisos)

    return (
        <DashboardCard title={"LICENCIAS"}>
            <List sx={{ width: '100%', bgcolor: 'background.paper', alignContent: 'right' }}>
                {licencias.length > 0 ? licencias.map((l, i) => (
                    <Box key={l.id}>
                        {i !== 0 && <Divider />}
                        <ListItem
                            secondaryAction={
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton 
                                    onClick={() => onAction(l.id, 'Aprobado')}
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
                                    onClick={() => onAction(l.id, 'Rechazado')}
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
                            <ListItemText primary={l.empleado} />                            
                        </ListItem>
                        <ListItem>
                        <ListItemText primary={'Tipo'} secondary={l.nombre_tipo} />
                            {/* {<ListItemText primary={'Fecha'} secondary={l.fecha_permiso} />} */}
                            {l.fecha_desde && <ListItemText primary={'Fecha de inicio'} secondary={l.fecha_desde} />}
                            {l.fecha_hasta && <ListItemText primary={'Fecha de fin'} secondary={l.fecha_hasta} />}
                            {/* <ListItemText primary={'Cantidad disponibles'} secondary={l.cant_dias} /> */}
                            <ListItemText primary={'Dias solicitadas'} secondary={l.dias_solicitados} />
                            <ListItemText primary={'Motivo'} secondary={l.motivo} />
                            <ListItemText primary={'Sector'} secondary={l.sector} />
                        </ListItem>
                    </Box>
                )) :
                    <ListItem>
                        <ListItemText secondary={'No hay solicitudes de licencias.'} />
                    </ListItem>
                }
            </List>
        </DashboardCard>
    )
}

export default Licencias
