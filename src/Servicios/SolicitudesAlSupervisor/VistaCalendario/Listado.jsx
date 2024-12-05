import React, { useState } from 'react'
import { List, ListItem, ListItemText, Typography, Box, Card, CardContent, Button } from '@mui/material'
import styles from './CalendarioGrande.module.css'

function Listado(props) {
    const { listado, tiposSeleccionados, setTiposSeleccionados } = props;
    const [selectedButtons, setSelectedButtons] = useState({});
     // console.log(listado);
    const uniqueArray = Array.from(
        listado.reduce((acc, item) => acc.set(item.tipo, item), new Map()).values()
    );

    const handleButtonClick = (tipo) => {        
        setSelectedButtons((prevSelected) => {
            const newSelected = { ...prevSelected, [tipo]: !prevSelected[tipo] };
            const newTiposSeleccionados = Object.keys(newSelected).filter(key => newSelected[key]);
            setTiposSeleccionados(newTiposSeleccionados);
            return newSelected;
        });
    };

    return (
        <Card className={styles.listadoCard}>
            <CardContent className={styles.listadoCardContent}>
                <Typography variant="h5" component="div">
                    Tipos de Evento
                </Typography>
            </CardContent>
            <div>
                <List>
                    {uniqueArray.map(t => {
                        return <ListItem>
                            <Button
                                variant='contained'
                                onClick={() => handleButtonClick(t.tipo)}
                                key={t.tipo}
                                className={`${selectedButtons[t.tipo] ? styles.listadoListItemSelected : ''} ${styles.listadoListItem}`}
                                sx={{                                    
                                    bgcolor: t.color,   
                                    boxShadow: selectedButtons[t.tipo] ? 0 : 10,                                                                    
                                }}>
                                <Typography>
                                    {t.tipo}
                                </Typography>
                            </Button>
                        </ListItem>
                    })}
                </List>
            </div>
        </Card>
    )
}

export default Listado