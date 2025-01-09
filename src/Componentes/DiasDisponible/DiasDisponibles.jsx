import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, Divider, IconButton } from '@mui/material'
import s from "./DiasDisponibles.module.css"
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import HealingIcon from '@mui/icons-material/Healing';
import { getLicenciasXEmpleado, getVacacionesDisponibles } from '../../Redux/Features/Licencias/LicenciasSlice';
import PopoverLicencias from './PopoverLicencias';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { quitarGuionBajo } from '../../Utils/QuitarGuionBajo';


function DiasDisponibles() {

  const dispatch = useDispatch();
  const licencias = useSelector(state => state.licencias.licenciasXEmpleado)
  const vacaciones = useSelector(state => state.licencias.vacacionesDisponibles)
  const userId = useSelector(state => state.user.empleadoId)
  const [anchorEl, setAnchorEl] = useState(null)
  const [licencia, setLicencia] = useState(null)
  const [licenciaInfo, setLicenciaInfo] = useState({ tipo: "Cargando...", dias_pendientes: 0, icono: HealingIcon })
  const licenciasArray = useMemo(() => licencias.map(lic => quitarGuionBajo(lic.tipo)), [licencias]);

  useEffect(() => {
    if (licencias.length === 0) {
      dispatch(getLicenciasXEmpleado(userId));
      dispatch(getVacacionesDisponibles(userId));
    }
  }, [dispatch, userId, licencias.length]);

  useEffect(() => {
    if (licencia) {
      // console.log(licencia);
      // console.log(licencias);
      const selectedLicencia = licencias.find(lic => quitarGuionBajo(lic.tipo) === licencia.tipo);
      // console.log(selectedLicencia);
      setLicenciaInfo({
        tipo: selectedLicencia.tipo,
        dias_pendientes: selectedLicencia.dias_pendientes,
        icono: licencia.icono
      });
    } else {
      setLicenciaInfo({
        tipo: licencias.length > 0 ? licencias.find(lic => lic.tipo === 'Cuidado familiar').tipo : "Cargando...",
        dias_pendientes: licencias.length > 0 ? licencias.find(lic => lic.tipo === 'Cuidado familiar').dias_pendientes : 0,
        icono: HealingIcon
      })
    }
  }, [licencia, licencias]);

  // console.log(vacaciones);
  const handlerClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined


  const Icon = licenciaInfo ? licenciaInfo.icono : HealingIcon
  const color = (dias, color1, color2) => dias > 0 ? color1 : color2

  return (
    <div className={s.container}>

      <Box className={s.box}>
        <Box>
          <Typography
            variant='subtitle2'>
            Vacaciones
          </Typography>
          <span className={`${s.boxSpan} ${color(vacaciones, s.verde, s.gris)}`}>
            <BeachAccessIcon sx={{ pr: 1 }} />
            <Typography
              variant='h4'>
              {vacaciones}
            </Typography>
          </span>
          <Typography
            variant='subtitle1'
            className={color(vacaciones, s.verde, s.gris)} >
            DIAS DISPONIBLES
          </Typography>
        </Box>
      </Box>

      <Divider orientation="vertical" variant='middle' flexItem />

      <Box className={s.box}>
        <PopoverLicencias open={open} handleClose={handleClose} licencias={licenciasArray} setLicencia={setLicencia} />
        <Box>
          <Box display='flex' flexDirection='row'>
            <IconButton sx={{ padding: 0 }} aria-describedby={id} variant='' onClick={handlerClick} size='small' >
              <ArrowDropDownIcon color='primary' />
            </IconButton>
            <Typography
              variant='subtitle2'>
              {quitarGuionBajo(licenciaInfo.tipo)}
            </Typography>
          </Box>
          <span className={`${s.boxSpan} ${color(licenciaInfo.dias_pendientes, s.verde, s.gris)}`}>
            <Icon sx={{ pr: 1 }} />
            <Typography
              variant='h4'>
              {licenciaInfo.dias_pendientes}
            </Typography>
          </span>
          <Typography
            className={color(licenciaInfo.dias_pendientes, s.verde, s.gris)}
            variant='subtitle1'>
            DIAS DISPONIBLES
          </Typography>
        </Box>
      </Box>

    </div>
  )
}

export default DiasDisponibles