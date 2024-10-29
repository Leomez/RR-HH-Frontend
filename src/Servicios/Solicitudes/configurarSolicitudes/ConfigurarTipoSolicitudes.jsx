import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Box, Stack, TextField, Typography, Button } from '@mui/material'
import { crearTipoSolicitud } from '../../../Redux/Features/Solicitudes/solicitudesSlice';


const ConfigurarTipoSolicitudes = ({close}) => {

  const dispatch = useDispatch()
  const inputs = { nombre: '', caracteristicas: '' }
  const [tipoSolicitud, setTipoSolicitud] = useState(inputs)
//   const errorRespuesta = useSelector(state => state.tipoSolicitud.error)

//   const error = errorRespuesta ? errorRespuesta : ''



  function handleChange(value) {
    if (value.target.name === 'canti_dias') {
      setTipoSolicitud({ ...tipoSolicitud, [value.target.name]: parseInt(value.target.value) })
    } else
    setTipoSolicitud({ ...tipoSolicitud, [value.target.name]: value.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(tipoSolicitud);
    dispatch(crearTipoSolicitud(tipoSolicitud))
    setTipoSolicitud(inputs)
    close(false)
  }

  function handleClose() {
    setTipoSolicitud(inputs)
    close(false)
  }

  return (
    <Stack
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '1rem',
        margin: '5rem 1rem'
      }}
      spacing={1}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" gutterBottom>
        Configurar Tipo de Solicitudes
      </Typography>
      <TextField        
        name="nombre"
        value={tipoSolicitud.nombre}
        onChange={handleChange}
        id="nombre"
        label="Denominacion*"
        variant="outlined"
      />
      {/* <TextField
        id="canti_dias"
        name="canti_dias"
        value={tipoSolicitud.canti_dias}
        onChange={handleChange}
        label="Cantidad de dias"
        type="number"
        variant="outlined"
        inputProps={{ min: 0, max: 90 }}
      /> */}
      <TextField
        name="caracteristicas"
        value={tipoSolicitud.caracteristicas}
        onChange={handleChange}
        id="caracteristicas"
        multiline
        rows={4}        
        placeholder="Descripción"
        label="Descripción"
        helperText='Ej: antiguedad mayor a 5 años'
        variant="outlined"
      />
      <Typography variant="caption" display="block" gutterBottom sx={{ color: 'red' }}>Los campos con * son obligatorios</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-around', paddingTop: '1rem' }}>
        <Button variant='contained' onClick={handleSubmit} >Guardar</Button>
        <Button variant="outlined"   type="reset" onClick={handleClose} >Limpiar</Button>
      </Box>
    </Stack>
  )
}


export default ConfigurarTipoSolicitudes