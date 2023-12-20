import React, { useState } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Box, Avatar, styled, createTheme } from '@mui/material';
import DownloadDoneRoundedIcon from '@mui/icons-material/DownloadDoneRounded';
import { green, red } from '@mui/material/colors';
import CardComponent from '../../Componentes/Containers/CardComponent';

const Tareas = () => {
    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState('');

    const handleChange = (event) => {
        setNuevaTarea(event.target.value);
    };

    const handleAgregarTarea = () => {
        if (nuevaTarea.trim() !== '') {
            setTareas([...tareas, { tarea: nuevaTarea, realizada: false }]);
            setNuevaTarea('');
        }
    };

    const handleMarcarRealizada = (index) => {
        const updatedTareas = [...tareas];
        updatedTareas[index].realizada = true;
        setTareas(updatedTareas);
    };

    const handleEliminarTarea = (index) => {
        const updatedTareas = [...tareas];
        updatedTareas.splice(index, 1);
        setTareas(updatedTareas);
    };

    const CustomTableCell = styled(TableCell)(({ theme }) => ({
        color: theme.palette.text.secondary, // Cambiar el color del texto
        fontSize: 14, // Cambiar el tamaño del texto
    }));

    const theme = createTheme({
        palette: {
            success: {
                main: green[200],
            },
        },
    });

    return (
        <CardComponent
            titulo={'Tareas Pendientes'}
            link={'VER MAS...'}
            footer={'un footer...'}
        >
            <Box>
                <TextField
                    label="Nueva tarea"
                    value={nuevaTarea}
                    onChange={handleChange}
                    variant="outlined"
                />
                <Button onClick={handleAgregarTarea} variant="contained" color="primary">
                    Agregar tarea
                </Button>
                <TableContainer component={Box}>
                    <Table>
                        {/* <TableHead>
                            <TableRow>
                                <TableCell>Tarea</TableCell>
                                <TableCell align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead> */}
                        <TableBody >
                            {tareas.map((tarea, index) => (
                                <TableRow sx={{ p: 0 }} key={index}>
                                    <CustomTableCell color='succes' size='sm' component="th" scope="row">
                                        {tarea.tarea}
                                    </CustomTableCell>
                                    <CustomTableCell align="center" sx={{ display: 'inline-flex' }}>

                                        <Button
                                            onClick={() => handleMarcarRealizada(index)}
                                            color="primary"
                                            sx={{
                                                p: 0,
                                                minWidth: 0,
                                            }}>
                                            <Avatar sx={{
                                                transition: 'background-color 0.3s',
                                                backgroundColor: tarea.realizada ? green[200] : red[500],
                                            }}>
                                                <DownloadDoneRoundedIcon />
                                            </Avatar>
                                        </Button>

                                             {/* <Box>
                                                 <Avatar sx={{ bgcolor: green[200] }}>
                                                     <DownloadDoneRoundedIcon />
                                                 </Avatar>
                                             </Box> */}


                                        <Button onClick={() => handleEliminarTarea(index)} color="secondary">
                                            Eliminar
                                        </Button>
                                    </CustomTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer >
            </Box>
        </CardComponent>
    );
};

export default Tareas;