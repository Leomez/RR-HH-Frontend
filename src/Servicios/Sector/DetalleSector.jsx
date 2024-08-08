import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, Box, Typography, Button, Divider } from '@mui/material';
import InfoBox from '../../Utils/InfoBox';
import SelectEncargados from './SelectEncargados';
import retornarEmpleado from '../../Utils/buscarEmpleado';

function DetalleSector({ sector: s, empleados, encargado }) {
    const [openEncargados, setOpenEncargados] = useState(false);
    const [encargadoValue, setEncargadoValue] = useState('');

    // Memorizar los cálculos para evitar recalculaciones innecesarias
    const enc = useMemo(() => {
        return encargado === 'Sin dato' ? 'Sin encargado' : retornarEmpleado(empleados, encargado.empleadoId);
    }, [encargado, empleados]);

    const empleadosSector = useMemo(() => {
        return empleados.filter(e => e.sector_id === s.id);
    }, [empleados, s.id]);

    useEffect(() => {
        if (encargado && encargado.empleadoId) {
            setEncargadoValue(encargado.empleadoId);
        } else {
            setEncargadoValue('Sin encargado');
        }
    }, [encargado]);

    const handleClick = () => {
        setOpenEncargados(true);
    };

    const handleClose = (nuevoEncargado) => {
        if (nuevoEncargado) {
            setEncargadoValue(nuevoEncargado);
        }
        setOpenEncargados(false);
    };

    const leyendaBoton = useMemo(() => {
        return encargadoValue.includes('Sin encargado') ? "Seleccionar Encargado" : "Cambiar Encargado";
    }, [encargadoValue]);

    return (
        <Card
            className="custom-card"
            key={s.id}
            sx={{ minWidth: '255px', margin: '0.5rem', width: '400px' }}>
            <CardContent>
                <Typography variant='h5'>
                    {s.nombre_sector}
                </Typography>
                <Divider variant='insets' />
                <InfoBox label={"Cantidad de empleados: "} value={empleadosSector.length} />
                <InfoBox label={"Encargado del sector: "} value={enc} />
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
                    <Button sx={{ margin: 'auto' }} variant='outlined' onClick={handleClick}>
                        {leyendaBoton}
                    </Button>
                </Box>
                {openEncargados && <SelectEncargados
                    open={openEncargados}
                    value={encargadoValue}
                    onClose={handleClose}
                    keepMounted
                    sector={s}
                    empleados={empleadosSector}
                />}
            </CardContent>
        </Card>
    );
}

export default React.memo(DetalleSector);
