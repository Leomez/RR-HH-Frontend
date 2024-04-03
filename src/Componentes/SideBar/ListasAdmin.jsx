import React from 'react'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
import rutas from './Links'

function ListasAdmin(props) {
    const {seccionActiva, theme} = props
    return (
        <List>
            {rutas().rutasAdmin.map((ruta) => (
                <ListItem
                    key={ruta.nombreSeccion}
                    disablePadding
                    sx={{ display: "block" }}
                >
                    <Link to={ruta.ruta}>
                        <ListItemButton
                            selected={seccionActiva === (`/${ruta.ruta}`) || seccionActiva === (ruta.ruta)}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5,
                                borderLeft: (seccionActiva === (`/${ruta.ruta}`) || seccionActiva === (ruta.ruta)) ? '2px solid #1976d2' : 'none'

                                // ":focus": {backgroundColor: 'rgba(0, 0, 0, 0.06)'}                        
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                }}
                            >
                                {ruta.icono}
                            </ListItemIcon>
                            <ListItemText
                                primary={ruta.nombreSeccion}
                                sx={{
                                    color: theme.palette.primary.light,
                                    opacity: open ? 1 : 0,
                                }}
                            />
                        </ListItemButton>
                    </Link>
                </ListItem>
            ))}
        </List>
    )
}

export default ListasAdmin