import React from 'react'
import { List, ListItem, Typography, Box, Card, CardContent, Checkbox } from '@mui/material'
import { estadoColors } from '../../../Utils/randomColors'
import styles from './CalendarioGrande.module.css'

function FiltroEstados({ estados, estadosSeleccionados, onChange }) {


    console.log(estadosSeleccionados, '<--- estadosSeleccionados');
    console.log(estados, '<--- estados');
    const handleToggle = (estado) => () => {
        const currentIndex = estadosSeleccionados.indexOf(estado);
        const newChecked = [...estadosSeleccionados];

        if (currentIndex === -1) {
            newChecked.push(estado);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        onChange(newChecked);
    };

    return (
        <Card className={styles.filtroCard}>
            <CardContent className={styles.filtroCardContent}>
                <Typography variant="h5" component="div">
                    Estados
                </Typography>
            </CardContent>
            <div>
                <List>
                    {estados.map(e => (
                        <ListItem key={e} className={styles.filtroListItem}>
                            <Box
                                className={styles.filtroColorBox}
                                sx={{
                                    backgroundColor: estadoColors[e.toLowerCase()],
                                }}></Box>
                            <Typography sx={{ flexGrow: 1 }}>
                                {e.toLowerCase()}
                            </Typography>
                            <Checkbox
                                checked={estadosSeleccionados.includes(e)}                                
                                onChange={handleToggle(e)}
                                sx={{
                                    color: estadoColors[e.toLowerCase()],
                                    '&.Mui-checked': {
                                        color: estadoColors[e.toLowerCase()],
                                    },
                                }}
                            />
                        </ListItem>)
                    )}
                </List>
            </div>
        </Card>
    );
}

export default FiltroEstados;
