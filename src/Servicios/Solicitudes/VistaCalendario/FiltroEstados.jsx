import React from 'react'
import { List, ListItem, Typography, Box, Card, CardContent, Checkbox } from '@mui/material'
import { estadoColors } from '../../../Utils/randomColors'

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
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    Estados
                </Typography>
            </CardContent>
            <div>
                <List>
                    {estados.map(e => {
                        console.log(e.toLowerCase())
                        return (<ListItem key={e}>
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{
                                    width: '100%',
                                    maxWidth: 360,
                                    borderRadius: 2,
                                    padding: '0.3rem',
                                    height: '1rem'                                   
                                }}
                            >
                                <Box sx={{ 
                                    backgroundColor: estadoColors[e.toLowerCase()], 
                                    width: '1rem', 
                                    height: '1rem', 
                                    borderRadius: '50%', 
                                    marginRight: '1rem'
                                }}></Box>   
                                <Typography sx={{ flexGrow: 1 }}>
                                    {e.toLowerCase()}
                                </Typography>
                                <Checkbox 
                                    checked={estadosSeleccionados.includes(e)}
                                    // defaultChecked={e} 
                                    onChange={handleToggle(e)}
                                    sx={{
                                        color: estadoColors[e.toLowerCase()],
                                        '&.Mui-checked': {
                                            color: estadoColors[e.toLowerCase()],
                                        },
                                    }}
                                />
                            </Box>
                        </ListItem>)
                    })}
                </List>
            </div>
        </Card>
    );
}

export default FiltroEstados;
