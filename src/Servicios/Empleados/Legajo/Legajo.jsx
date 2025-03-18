import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Card, Box, CardMedia, Grid2 as Grid, TextField } from '@mui/material';
import s from './Legajo.module.css';

function Legajo() {
  const empleado = useSelector(state => state.empleado.legajo);
  const placeholder = '/noFoto.png';
  useEffect(() => {
    console.log(empleado, 'empleado');
  }, [empleado]);
  console.log(empleado.foto, 'foto');

  return (
    <div id='legajo' className={s.container}>
      <Box className={s.header}>
        <CardMedia
          component='img'
          sx={{ width: 150, height: 150 }}
          className={s.photo}
          image={placeholder}
          alt='Empleado'
        />
        <Box className={s.headerText}>
          <Typography className={s.nombreHeader} variant='h4'>
            {`${empleado.nombre_empleado || 'Nombre'} ${empleado.apellido_empleado || 'Apellido'}`}
          </Typography>
          <Typography variant='subtitle1' className={s.jobTitle}>
            {empleado.cargo || 'Cargo'}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2} className={s.content}>
        <Grid item xs={12} md={3} className={s.sidebar}>
          <Box className={s.infoContainer}>
            <Grid item xs={6} md={3}><TextField variant='filled' label='Legajo' value= {empleado.legajo || '00000'}/></Grid>
            <Grid item xs={6} md={3}><TextField variant='filled' label= 'DNI'  value={empleado.dni || 'XX.XXX.XXX'}/></Grid>
            <Grid item xs={12} md={6}><TextField variant='filled' label= "Correo" value ={empleado.email || 'correo@example.com'}/></Grid>
            <Grid item xs={6} md={3}><TextField variant='filled' label= "Teléfono"  value={empleado.telefono || '(XX) XXXX-XXXX'}/></Grid>
            <Grid item xs={6} md={3}><TextField variant='filled' label= "Tel Alternativo"  value={empleado.telefono_alternativo || '(XX) XXXX-XXXX'}/></Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={9}>
          <Card className={s.detailsCard}>
            <Typography variant='h6' className={s.sectionTitle}>Domicilio</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} ><TextField label='Calle' value={empleado.calle || ''} fullWidth disabled /></Grid>
              <Grid item xs={6} md={2}><TextField label='Número' value={empleado.numero || ''} fullWidth disabled /></Grid>
              <Grid item xs={6} md={2}><TextField label='Piso' value={empleado.piso || ''} fullWidth disabled /></Grid>
              <Grid item xs={6} md={2}><TextField label='Depto' value={empleado.depto || ''} fullWidth disabled /></Grid>
              <Grid item xs={12} md={6}><TextField label='Ciudad' value={empleado.ciudad || ''} fullWidth disabled /></Grid>
              <Grid item xs={12} md={6}><TextField label='Código Postal' value={empleado.codigoPostal || ''} fullWidth disabled /></Grid>
            </Grid>
          </Card>

          <Card className={s.detailsCard}>
            <Typography variant='h6' className={s.sectionTitle}>Datos del Puesto</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}><TextField label='Categoría' value={empleado.categoria || ''} fullWidth disabled /></Grid>
              <Grid item xs={12} md={4}><TextField label='Sector' value={empleado.sector || ''} fullWidth disabled /></Grid>
              <Grid item xs={12} md={4}><TextField label='Turno' value={empleado.turno || ''} fullWidth disabled /></Grid>
              <Grid item xs={12} md={6}><TextField label='Permisos' value={empleado.permisos || ''} fullWidth disabled /></Grid>
              <Grid item xs={12} md={6}><TextField label='Fecha de Ingreso' value={empleado.fechaIngreso || ''} fullWidth disabled /></Grid>
              <Grid item xs={12} md={6}><TextField label='Estado' value={empleado.estado || ''} fullWidth disabled /></Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Legajo;

