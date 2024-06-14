import { React, useState, useEffect } from 'react'
import { Box, Paper, Typography, List, ListItem, ListItemText, IconButton, Divider, Skeleton } from '@mui/material'
import DashboardCard from '../../Componentes/Containers/DashboardCard'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';



function Permisos({ onAction }) {
    const solicitudes = useSelector(state => state.solicitudes.solicitudes)

    const permisos = solicitudes.filter(s => s.tipo === 'Permiso')

    console.log(solicitudes)

    return (
        <DashboardCard title={"PERMISOS"}>
            <List sx={{ width: '100%', bgcolor: 'background.paper', alignContent: 'right' }}>
                {permisos.length > 0 ? permisos.map((p, i) => (
                    <Box key={p.id}>
                        {i !== 0 && <Divider />}
                        <ListItem
                            secondaryAction={
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton
                                        onClick={() => onAction(p.id, 'Aprobado')}
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
                                        onClick={() => onAction(p.id, 'Rechazado')}
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
                            <ListItemText primary={p.empleado}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={'Tipo'} secondary={p.nombre_tipo} />
                            <ListItemText primary={'Fecha'} secondary={p.fecha_permiso} />
                            {p.fecha_desde && <ListItemText primary={'Fecha de inicio'} secondary={p.fecha_desde} />}
                            {p.fecha_hasta && <ListItemText primary={'Fecha de fin'} secondary={p.fecha_hasta} />}
                            <ListItemText primary={'Motivo'} secondary={p.motivo} />
                            <ListItemText primary={'Sector'} secondary={p.sector} />
                        </ListItem>
                    </Box>
                )) :
                    <ListItem>
                        <ListItemText primary={'No hay solicitudes de permisos'} />
                    </ListItem>
                }
            </List>
        </DashboardCard>
    )
}

export default Permisos



// sx={{ display: 'flex', flexDirection: 'row', width: '100%', bgcolor: 'background.paper' }}
