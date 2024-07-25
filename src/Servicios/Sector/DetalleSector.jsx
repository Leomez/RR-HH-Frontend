import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, Box, Typography, Button, Divider } from '@mui/material'
import InfoBox from '../../Utils/InfoBox'
import SelectEncargados from './SelectEncargados'
import { getSupervisores } from '../../Redux/Features/Supervisor/supervisorSlice'
import retornarEmpleado from '../../Utils/buscarEmpleado'
export default function DetalleSector(props) {
    const { sector: s, empleados, encargado } = props

    // const [maxCardWidth, setMaxCardWidth] = useState(0)
    const [openEncargados, setOpenEncargados] = useState(false)
    const [encargadoValue, setEncargadoValue] = useState('');

    const enc = encargado && retornarEmpleado(empleados, encargado.empleadoId)
    // console.log(encargado);
    useEffect(() => {
        if (encargado) {
            setEncargadoValue(encargado.empleadoId);
        } else {
            setEncargadoValue('Sin encargado');
        }
    }, [encargado]);

    function handleClick() {
        setOpenEncargados(true)
    }

    function handleClose(nuevoEncargado) {
        if (nuevoEncargado) {
            setEncargadoValue(nuevoEncargado)
        }
        setOpenEncargados(false)
    }

    function handleLeyendaBoton() {
        if (encargadoValue.includes('Sin encargado')) {
            return "Seleccionar Encargado"
        } else {
            return "Cambiar Encargado"
        }
    }

    return (
        <Card
            className="custom-card"
            key={s.id}
            sx={{ minWidth: '255px', margin: '0.5rem', width: '400px'/*`${maxCardWidth + 20}px`*/ }}>
            <CardContent>
                <Typography variant='h5'>
                    {s.nombre_sector}
                </Typography>
                <Divider variant='insets' />
                <InfoBox label={"Cantidad de empleados: "} value={empleados.filter(e => e.sector_id === s.id).length} />
                <InfoBox label={"Encargado del sector: "} value={enc} />
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
                    <Button sx={{ margin: 'auto' }} variant='outlined' onClick={handleClick}>
                        {handleLeyendaBoton()}
                    </Button>
                </Box>
                {openEncargados && <SelectEncargados
                    open={openEncargados}
                    value={encargadoValue}
                    onClose={handleClose}
                    keepMounted
                    sector={s}
                    empleados={empleados.filter(e => e.sector_id === s.id)}
                />}
            </CardContent>
        </Card>
    )
}
