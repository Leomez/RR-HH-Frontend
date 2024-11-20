import React, { useState } from 'react';
import { List, ListItem, Typography, Card, CardContent, Button } from '@mui/material';
import styles from './CalendarioGrande.module.css';

function Listado(props) {
    const { listado, tiposSeleccionados, setTiposSeleccionados } = props;
    const [selectedButtons, setSelectedButtons] = useState({});
    
    const arrayDeTipos = Array.from(
        listado.reduce((acc, item) => acc.set(item.tipo, item), new Map()).values()
    );

    const handleButtonClick = (tipo) => {
        console.log(tipo, '<--- tipo');
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
                    {arrayDeTipos.map(t => (
                        <ListItem key={t.tipo}>
                            <Button
                                variant='contained'
                                className={`${selectedButtons[t.tipo] ? styles.listadoListItemSelected : ''} ${styles.listadoListItem}`}
                                onClick={() => handleButtonClick(t.tipo)}
                                sx={{
                                    bgcolor: t.color,
                                    boxShadow: selectedButtons[t.tipo] ? 0 : 10,
                                }}>
                                <Typography color='black' variant='button'>
                                    {t.tipo}
                                </Typography>
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </div>
        </Card>
    );
}

export default Listado;
