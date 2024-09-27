import React from 'react'
import { Box, Typography, Button, Divider } from '@mui/material'
import s from "./DiasDisponibles.module.css"
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import HealingIcon from '@mui/icons-material/Healing';

function DiasDisponibles() {

  const vac = 14
  const diasEnfermedad = 0
  const color = (dias, color1, color2) => dias > 0 ? color1 : color2

  return (
    <div className={s.container}>
      <Box className={s.box}>
        <Typography variant='subtitle2'>Vacaciones</Typography>
        <span className={`${s.boxSpan} ${color(vac, s.verde, s.gris)}`}>
          <BeachAccessIcon sx={{ pr: 1 }} />
          <Typography variant='h4'>{vac}</Typography>
        </span>
        <Typography variant='subtitle1' className={color(vac, s.verde, s.gris)} >DIAS DISPONIBLES</Typography>
      </Box>
      <Divider orientation="vertical" variant='middle' flexItem />
      <Box className={s.box}>
        <Typography variant='subtitle2'>Dias por enfermedad</Typography>
        <span className={`${s.boxSpan} ${color(diasEnfermedad, s.rojo, s.gris)}`}>
          <HealingIcon sx={{ pr: 1 }} />
          <Typography variant='h4'>{diasEnfermedad}</Typography>
        </span>
        <Typography className={color(diasEnfermedad, s.rojo, s.gris)} variant='subtitle1'>DIAS USADOS</Typography>
      </Box>
    </div>
  )
}

export default DiasDisponibles