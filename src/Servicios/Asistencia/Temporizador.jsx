// Importaciones
import React, { useState, useEffect } from 'react';
import s from './Temporizador.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import { nuevoIngreso, nuevoInicioPausa, nuevoFinPausa, nuevoSalida } from '../../Redux/Features/Asistencia/asistenciaSlice';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Clock from '../../Componentes/Clock/Clock';


const Timer = () => {
  const [esActivo, setEsActivo] = useState(false);
  const [estaEnPausa, setEstaEnPausa] = useState(false);
  const [HoraEntrada, setHoraEntrada] = useState(null);
  const [HoraPausa, setHoraPausa] = useState(null);
  const [HoraFin, setHoraFin] = useState(null)
  // const [elapsedTime, setElapsedTime] = useState(0);
  const [estadoDeActividad, setEstadoDeAtividad] = useState("")
  // const [estadoDePausa, setEstadoDePausa] = useState("")
  const { ingreso, inicioPausa, finPausa, salida, loading, error } = useSelector(state => state.asistencia)
  const { empleadoId } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (salida) {
      setEstadoDeAtividad("Jornada Finalizada")
      setHoraFin(salida)
      setEsActivo(false)
      setEstaEnPausa(false)
      setHoraEntrada(ingreso)
      setHoraPausa(inicioPausa)
    } else if (ingreso) {
      setEstadoDeAtividad("Jornada Iniciada")
      setEsActivo(true)
      setHoraEntrada(ingreso)
      if (inicioPausa) {
        setEstaEnPausa(true)
        setHoraPausa(inicioPausa)
        setEstadoDeAtividad("Pausa Iniciada")
      } else if (finPausa) {
        setEstaEnPausa(false)
        setHoraPausa(inicioPausa)
        // setPauseTime(finPausa)
        setEstadoDeAtividad("Jornada Iniciada")
      }
    } else if (!salida && !ingreso) {
      setEstadoDeAtividad("Jornada No Iniciada")
    }
  }, [salida, ingreso, inicioPausa, finPausa]);




  const handleStart = () => {
    dispatch(nuevoIngreso(empleadoId))
    setEsActivo(true);
    if (!HoraEntrada) {
      setHoraEntrada(Date.now());
    }
  };

  const handlePause = () => {
    if (estaEnPausa) {
      dispatch(nuevoFinPausa(empleadoId))
      setEstaEnPausa(false);
      setEstadoDeAtividad("Jornada Iniciada")
      return;
    }
    dispatch(nuevoInicioPausa(empleadoId))
    setEstaEnPausa(true);
    setHoraPausa(Date.now());
    setEstadoDeAtividad("Pausa Iniciada")
  };

  const handleFinish = () => {
    dispatch(nuevoSalida(empleadoId))
    setEsActivo(false);
    setEstaEnPausa(false);
    setHoraEntrada(null);
    setHoraPausa(null);
    setHoraFin(Date.now())
    setEstadoDeAtividad("Jornada Finalizada")
  };

  const formatTime = (seconds) => {
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    const getMinutes = `0${Math.floor((seconds % 3600) / 60)}`.slice(-2);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <Box>
      <Box className={s.timerContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStart}
          disabled={esActivo}
          size='small'
        >
          <Typography variant='button'>
            INICIAR TU ACTIVIDAD
          </Typography>
        </Button>
        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          {/* <AccessTimeIcon fontSize="large" color={esActivo ? 'primary' : 'disabled'} /> */}
          <Typography variant="h3">
            <Clock size={110} padding={5} />
          </Typography>
          <Box mt={2}>
            <Button
              variant="outlined"
              color="default"
              onClick={handlePause}
              disabled={!esActivo}
              size='small'
            >
              {estaEnPausa ? 'REANUDAR' : 'PAUSA'}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleFinish}
              disabled={!esActivo}
              style={{ marginLeft: 10 }}
              size='small'
            >
              FINALIZAR
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className={s.displayContainer}>
        <Typography className={s.display} variant='caption'>INICIO: {HoraEntrada ? HoraEntrada : '--:--'}</Typography>
        <Typography className={s.display} variant='caption' >FIN: {esActivo ? '--:--' : HoraFin}</Typography>
        <Typography className={s.display} variant='caption' >PAUSA: {estaEnPausa ? HoraPausa : '--:--'}</Typography>
      </Box>
    </Box>
  );
};

export default Timer;
