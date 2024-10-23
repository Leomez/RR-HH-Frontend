import React from 'react'
import { List, ListItem, ListItemText, Typography, Box, Card, CardContent } from '@mui/material'
import styles from './CalendarioGrande.module.css'

function Listado({ listado }) {
    // console.log(listado);
    const arrayDeTipos = Array.from(
        listado.reduce((acc, item) => acc.set(item.tipo, item), new Map()).values()
    );
    return (
        <Card className={styles.listadoCard}>
            <CardContent className={styles.listadoCardContent}>
                <Typography variant="h5" component="div">
                    Tipos de Evento
                </Typography>
            </CardContent>
            <div>
                <List>
                    {arrayDeTipos.map(t => {
                        console.log(t);
                        return <ListItem
                            key={t.tipo}
                        >
                            <Box
                                className={styles.listadoListItem}
                                sx={{                                    
                                    bgcolor: t.color,                                                                       
                                }}>
                                <Typography>
                                    {t.tipo}
                                </Typography>
                            </Box>
                        </ListItem>
                    })}
                </List>
            </div>
        </Card>
    )
}

export default Listado