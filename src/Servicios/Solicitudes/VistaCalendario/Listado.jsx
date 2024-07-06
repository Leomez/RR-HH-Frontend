import React from 'react'
import { List, ListItem, ListItemText, Typography, Box, Card, CardContent } from '@mui/material'

function Listado({ listado }) {
    // console.log(listado);
    const uniqueArray = Array.from(
        listado.reduce((acc, item) => acc.set(item.tipo, item), new Map()).values()
    );
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    Tipos de Evento
                </Typography>
            </CardContent>
            <div>
                <List>
                    {uniqueArray.map(t => {
                        return <ListItem>
                            <Box
                                key={t.tipo}
                                display="flex"
                                alignItems="center"
                                sx={{
                                    width: '100%',
                                    maxWidth: 360,
                                    bgcolor: t.color,
                                    borderRadius: 2,
                                    padding: '0.3rem'                                   
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