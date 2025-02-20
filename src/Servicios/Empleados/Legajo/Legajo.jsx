import React, {useEffect} from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Typography } from '@mui/material'
import { use } from 'react';

function Legajo({legajo}) {

    console.log(legajo, 'legajo');
    const empleado = useSelector(state => state.empleado.legajo)
    useEffect(() => {
        console.log(empleado, 'empleado');
    }, [empleado])
    
  return (
    <div id='legajo'>
        <Typography p={5} variant='h6'> LEGAJO </Typography>

    </div>
  )
}

export default Legajo